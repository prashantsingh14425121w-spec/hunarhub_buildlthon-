/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Volume2, Pause, Play, Square, AlertCircle } from 'lucide-react';
import { speechManager, SpeechState } from '../../utils/speechManager';

interface ListenButtonProps {
  id: string;
  text: string;
  language?: string;
  label?: string;
  className?: string;
  variant?: 'compact' | 'pill' | 'subtle';
}

export function ListenButton({
  id,
  text,
  language,
  label = 'Listen',
  className = '',
  variant = 'compact',
}: ListenButtonProps) {
  const [speechState, setSpeechState] = useState<SpeechState>(() => speechManager.getState());
  const [showUnsupportedToast, setShowUnsupportedToast] = useState(false);

  useEffect(() => {
    const unsubscribe = speechManager.subscribe((newState) => {
      setSpeechState(newState);
      if (newState.currentId === id && newState.errorMessage) {
        setShowUnsupportedToast(true);
        const timer = setTimeout(() => setShowUnsupportedToast(false), 4000);
        return () => clearTimeout(timer);
      }
    });

    return () => {
      unsubscribe();
      // If this specific button was speaking when unmounted, stop it cleanly
      if (speechManager.getState().currentId === id) {
        speechManager.stop();
      }
    };
  }, [id]);

  const isCurrent = speechState.currentId === id;
  const isPlaying = isCurrent && speechState.status === 'playing';
  const isPaused = isCurrent && speechState.status === 'paused';

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!speechManager.isSupported()) {
      setShowUnsupportedToast(true);
      setTimeout(() => setShowUnsupportedToast(false), 4000);
      return;
    }

    if (isPlaying) {
      speechManager.pause();
    } else if (isPaused) {
      speechManager.resume();
    } else {
      speechManager.speak(id, text, language);
    }
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    speechManager.stop();
  };

  // Styles based on variant
  const baseButtonStyles =
    'inline-flex items-center gap-1.5 transition-all duration-150 font-medium select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134e3a]/30';

  let variantStyles = '';
  if (variant === 'pill') {
    variantStyles = isPlaying
      ? 'px-2.5 py-1 rounded-full text-xs bg-[#134e3a] text-white shadow-xs'
      : isPaused
      ? 'px-2.5 py-1 rounded-full text-xs bg-amber-100 text-amber-900 border border-amber-300'
      : 'px-2.5 py-1 rounded-full text-xs bg-[#134e3a]/10 hover:bg-[#134e3a]/20 text-[#134e3a] border border-[#134e3a]/20';
  } else if (variant === 'subtle') {
    variantStyles = isPlaying
      ? 'px-2 py-0.5 rounded text-[11px] bg-[#134e3a] text-white'
      : isPaused
      ? 'px-2 py-0.5 rounded text-[11px] bg-amber-100 text-amber-900'
      : 'px-2 py-0.5 rounded text-[11px] text-[#134e3a] hover:bg-[#134e3a]/10';
  } else {
    // Default 'compact'
    variantStyles = isPlaying
      ? 'px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#134e3a] text-white shadow-xs'
      : isPaused
      ? 'px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300'
      : 'px-2.5 py-1 rounded-lg text-xs font-semibold bg-white hover:bg-emerald-50 text-[#134e3a] border border-[#134e3a]/25 hover:border-[#134e3a]/50 shadow-2xs';
  }

  return (
    <div className={`relative inline-flex items-center gap-1.5 ${className}`}>
      {/* Main Listen / Pause / Resume button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={
          isPlaying
            ? 'Pause reading response aloud'
            : isPaused
            ? 'Resume reading response aloud'
            : 'Listen to this AI response aloud'
        }
        className={`${baseButtonStyles} ${variantStyles}`}
        title={
          isPlaying
            ? 'Click to pause'
            : isPaused
            ? 'Click to resume'
            : 'Listen to this AI response aloud'
        }
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 animate-pulse text-emerald-200" />
            <span>Pause</span>
          </>
        ) : isPaused ? (
          <>
            <Play className="w-3.5 h-3.5 text-amber-800" />
            <span>Resume</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-[#134e3a]" />
            <span>{label}</span>
          </>
        )}
      </button>

      {/* Stop button shown when actively playing or paused */}
      {(isPlaying || isPaused) && (
        <button
          type="button"
          onClick={handleStop}
          aria-label="Stop reading response aloud"
          title="Stop playback"
          className="p-1 rounded-md text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-[#1c1f1d] border border-stone-300 transition-colors cursor-pointer"
        >
          <Square className="w-3 h-3 fill-current text-stone-700" />
        </button>
      )}

      {/* Small floating unsupported or error notice */}
      {showUnsupportedToast && (
        <div
          role="alert"
          className="absolute bottom-full mb-1 left-0 z-50 whitespace-nowrap bg-stone-900 text-white text-[11px] px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1.5 animate-in fade-in duration-150"
        >
          <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
          <span>
            {speechState.errorMessage || 'Audio playback is not supported in this browser.'}
          </span>
        </div>
      )}
    </div>
  );
}
