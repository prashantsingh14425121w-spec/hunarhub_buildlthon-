/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PlaybackStatus = 'idle' | 'playing' | 'paused';

export interface SpeechState {
  currentId: string | null;
  status: PlaybackStatus;
  errorMessage: string | null;
}

type SpeechSubscriber = (state: SpeechState) => void;

class SpeechManager {
  private currentId: string | null = null;
  private status: PlaybackStatus = 'idle';
  private errorMessage: string | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private subscribers = new Set<SpeechSubscriber>();
  private voices: SpeechSynthesisVoice[] = [];
  private keepAliveInterval: any = null;

  constructor() {
    if (this.isSupported()) {
      this.loadVoices();
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.loadVoices();
        };

        // Clean up on tab close / reload
        window.addEventListener('beforeunload', () => {
          this.stop();
        });
      }
    }
  }

  public isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof SpeechSynthesisUtterance !== 'undefined'
    );
  }

  private loadVoices() {
    if (this.isSupported()) {
      try {
        this.voices = window.speechSynthesis.getVoices() || [];
      } catch (e) {
        this.voices = [];
      }
    }
  }

  private notify() {
    const snapshot: SpeechState = {
      currentId: this.currentId,
      status: this.status,
      errorMessage: this.errorMessage,
    };
    this.subscribers.forEach((callback) => callback(snapshot));
  }

  public subscribe(callback: SpeechSubscriber): () => void {
    this.subscribers.add(callback);
    callback({
      currentId: this.currentId,
      status: this.status,
      errorMessage: this.errorMessage,
    });
    return () => {
      this.subscribers.delete(callback);
    };
  }

  public getState(): SpeechState {
    return {
      currentId: this.currentId,
      status: this.status,
      errorMessage: this.errorMessage,
    };
  }

  /**
   * Finds the most suitable voice based on language and text content.
   */
  private pickVoice(text: string, langCode?: string): SpeechSynthesisVoice | null {
    if (!this.voices.length) {
      this.loadVoices();
    }
    if (!this.voices.length) {
      return null;
    }

    // Detect if text contains Hindi (Devanagari) script
    const hasDevanagari = /[\u0900-\u097F]/.test(text);
    const targetLang = hasDevanagari
      ? 'hi-IN'
      : langCode === 'hi'
      ? 'hi-IN'
      : langCode
      ? langCode
      : 'en-IN';

    // 1. Try exact locale match (e.g. 'hi-IN' or 'en-IN')
    let matched = this.voices.find(
      (v) => v.lang.toLowerCase() === targetLang.toLowerCase()
    );

    // 2. Try language prefix match (e.g. 'hi' or 'en')
    if (!matched) {
      const prefix = targetLang.split('-')[0].toLowerCase();
      matched = this.voices.find((v) =>
        v.lang.toLowerCase().startsWith(prefix)
      );
    }

    // 3. Fallback to English voice if Hindi voice is missing or target is general
    if (!matched && !hasDevanagari) {
      matched = this.voices.find((v) => v.lang.toLowerCase().startsWith('en'));
    }

    // 4. Default voice
    if (!matched) {
      matched = this.voices.find((v) => v.default) || this.voices[0] || null;
    }

    return matched;
  }

  /**
   * Clean text of HTML tags or Markdown asterisks for natural reading
   */
  private sanitizeForSpeech(raw: string): string {
    return raw
      .replace(/<[^>]*>/g, '') // remove HTML tags
      .replace(/[*_#`~[\]]/g, '') // remove Markdown symbols
      .replace(/\s+/g, ' ')
      .trim();
  }

  public speak(id: string, rawText: string, langCode?: string) {
    if (!this.isSupported()) {
      this.currentId = id;
      this.status = 'idle';
      this.errorMessage = 'Audio playback is not supported in this browser.';
      this.notify();
      return;
    }

    const textToSpeak = this.sanitizeForSpeech(rawText);
    if (!textToSpeak) return;

    // If already speaking this item and paused, resume
    if (this.currentId === id && this.status === 'paused') {
      this.resume();
      return;
    }

    // Stop any existing speech first
    this.stopInternal();

    try {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      this.currentUtterance = utterance;
      this.currentId = id;
      this.status = 'playing';
      this.errorMessage = null;

      const voice = this.pickVoice(textToSpeak, langCode);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else if (/[\u0900-\u097F]/.test(textToSpeak)) {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }

      utterance.rate = 0.95; // Slightly slower, very clear pace
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        this.status = 'playing';
        this.errorMessage = null;
        this.notify();
      };

      utterance.onpause = () => {
        this.status = 'paused';
        this.notify();
      };

      utterance.onresume = () => {
        this.status = 'playing';
        this.notify();
      };

      utterance.onend = () => {
        this.currentId = null;
        this.status = 'idle';
        this.currentUtterance = null;
        this.clearKeepAlive();
        this.notify();
      };

      utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
        // 'canceled' or 'interrupted' are expected when user stops or switches
        if (event.error === 'canceled' || event.error === 'interrupted') {
          this.currentId = null;
          this.status = 'idle';
          this.currentUtterance = null;
          this.clearKeepAlive();
          this.notify();
          return;
        }

        console.warn('[SpeechManager] Speech synthesis error:', event.error);
        this.currentId = null;
        this.status = 'idle';
        this.currentUtterance = null;
        this.errorMessage = 'Audio playback failed. Please check device volume.';
        this.clearKeepAlive();
        this.notify();
      };

      // Workaround for Chromium 15s pause bug: periodically check and refresh state
      this.clearKeepAlive();
      this.keepAliveInterval = setInterval(() => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);

      window.speechSynthesis.speak(utterance);
      this.notify();
    } catch (err: any) {
      console.warn('[SpeechManager] Exception initiating speech:', err);
      this.currentId = null;
      this.status = 'idle';
      this.errorMessage = 'Audio playback is not supported in this browser.';
      this.notify();
    }
  }

  public pause() {
    if (!this.isSupported()) return;
    if (this.status === 'playing') {
      try {
        window.speechSynthesis.pause();
        this.status = 'paused';
        this.notify();
      } catch (err) {
        console.warn('[SpeechManager] pause error:', err);
      }
    }
  }

  public resume() {
    if (!this.isSupported()) return;
    if (this.status === 'paused') {
      try {
        window.speechSynthesis.resume();
        this.status = 'playing';
        this.notify();
      } catch (err) {
        console.warn('[SpeechManager] resume error:', err);
      }
    }
  }

  public stop() {
    this.stopInternal();
    this.notify();
  }

  private stopInternal() {
    this.clearKeepAlive();
    if (this.isSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) {
        console.warn('[SpeechManager] cancel error:', err);
      }
    }
    this.currentId = null;
    this.status = 'idle';
    this.currentUtterance = null;
  }

  private clearKeepAlive() {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }
}

export const speechManager = new SpeechManager();
