/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin,
  Mic,
  MicOff,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers,
  Search,
} from 'lucide-react';
import { Trade, SupportedLanguage, WorkerRecord, BookingSession } from '../../types';
import { TRANSLATIONS, SUPPORTED_LANGUAGES } from '../../utils/translations';
import { ServiceCategoryGrid } from './ServiceCategoryGrid';
import { MANDATORY_CASE_STUDY_1 } from '../../data/starterData';

const speechLocaleMap: Record<SupportedLanguage, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  ta: 'ta-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  pa: 'pa-IN',
};

const simulatedVoicePrompts: Record<SupportedLanguage, string> = {
  en: 'MCB breaker is repeatedly tripping, no electricity, urgent repair needed today.',
  hi: 'MCB बार-बार गिर रहा है, घर में बिजली नहीं है, आज ही इलेक्ट्रीशियन चाहिए।',
  bn: 'এমসিবি বারবার ট্রিপ করছে, বিদ্যুৎ নেই, আজই ইলেকট্রিশিয়ান প্রয়োজন।',
  te: 'ఎంసీబీ పదే పదే ట్రిప్ అవుతోంది, విద్యుత్ లేదు, ఈరోజే ఎలక్ట్రీషియన్ కావాలి.',
  mr: 'एमसीबी वारंवार पडत आहे, घरात वीज नाही, आजच इलेक्ट्रिशियन हवा आहे.',
  ta: 'எம்சிபி மீண்டும் மீண்டும் ட்ரிப் ஆகிறது, மின்சாரம் இல்லை, இன்றே எலக்ட்ரீஷியன் தேவை.',
  gu: 'MCB વારંવાર પડી રહ્યું છે, ઘરમાં વીજળી નથી, આજે જ ઇલેક્ટ્રિશિયન જોઈએ છે.',
  kn: 'ಎಂಸಿಬಿ ಪದೇ ಪದೇ ಬೀಳುತ್ತಿದೆ, ಕರೆಂಟ್ ಇಲ್ಲ, ಇಂದೇ ಎಲೆಕ್ಟ್ರಿಷಿಯನ್ ಬೇಕು.',
  ml: 'എംസിബി വീണ്ടും വീണ്ടും ട്രിപ്പ് ആകുന്നു, വീട്ടിൽ വൈദ്യുതിയില്ല, ഇന്ന് തന്നെ ഇലക്ട്രീഷ്യനെ വേണം.',
  pa: 'MCB ਵਾਰ-ਵਾਰ ਟ੍ਰਿਪ ਹੋ ਰਿਹਾ ਹੈ, ਬਿਜਲੀ ਨਹੀਂ ਆ ਰਹੀ, ਅੱਜ ਹੀ ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ ਚਾਹੀਦਾ ਹੈ।',
};

interface CustomerHomeProps {
  currentLanguage: SupportedLanguage;
  workers: WorkerRecord[];
  activeLocation: string;
  onLocationChange: (loc: string) => void;
  activeBooking?: BookingSession | null;
  onOpenBooking?: () => void;
  onSubmitRequirement: (data: {
    rawInput: string;
    trade: Trade;
    area: string;
    urgency: 'Immediate' | 'Today' | 'Within 2-3 Days' | 'Flexible';
    quantity?: string;
  }) => void;
  onViewWorkerProfile: (worker: WorkerRecord) => void;
}

export function CustomerHome({
  currentLanguage,
  workers,
  activeLocation,
  onLocationChange,
  activeBooking,
  onOpenBooking,
  onSubmitRequirement,
  onViewWorkerProfile,
}: CustomerHomeProps) {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const currentMeta =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) ||
    SUPPORTED_LANGUAGES[0];

  const [inputRequirement, setInputRequirement] = useState(
    'MCB baar baar gir raha hai, bijli nahi hai, aaj hi chahiye.'
  );
  const [selectedTrade, setSelectedTrade] = useState<Trade>('Electrician');
  const [urgency, setUrgency] = useState<'Immediate' | 'Today' | 'Within 2-3 Days' | 'Flexible'>('Immediate');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const locations = [
    'Danapur, Patna',
    'Boring Road, Patna',
    'Kankarbagh, Patna',
    'Bailey Road, Patna',
    'Phulwari Sharif, Patna',
    'Rajendra Nagar, Patna',
    'Patna City, Patna',
  ];

  const presetCaseStudies = [
    {
      label: '⚡ Mandatory Neha Case Study (Danapur MCB)',
      trade: 'Electrician' as Trade,
      text: 'MCB baar baar gir raha hai, bijli nahi hai, aaj hi chahiye.',
      area: 'Danapur, Patna',
      urgency: 'Immediate' as const,
    },
    {
      label: '💧 Concealed Pipe Leak (Kankarbagh)',
      trade: 'Plumber' as Trade,
      text: 'Bathroom wall ke andar pipe se paani ris raha hai, damp ho gaya hai.',
      area: 'Kankarbagh, Patna',
      urgency: 'Today' as const,
    },
    {
      label: '🧱 Vitrified Tile Fixing (Phulwari)',
      trade: 'Mason' as Trade,
      text: 'Living room floor me 4 tiles loose ho gayi hain, 2mm spacers ke saath fit karni hain.',
      area: 'Phulwari Sharif, Patna',
      urgency: 'Within 2-3 Days' as const,
    },
  ];

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setVoiceNotice('Microphone recording stopped. Audio transcript ready.');
    } else {
      const targetLocale = speechLocaleMap[currentLanguage] || 'hi-IN';
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = targetLocale;
          recognition.interimResults = false;

          recognition.onstart = () => {
            setIsRecording(true);
            setVoiceNotice(`Listening in ${currentMeta.nativeName} (${targetLocale})... Speak now.`);
          };

          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputRequirement(transcript);
            setIsRecording(false);
            setVoiceNotice(`Voice captured in ${currentMeta.nativeName}: "${transcript}"`);
          };

          recognition.onerror = () => {
            setIsRecording(false);
            // Fallback gracefully to simulated speech sample in chosen language
            const fallbackSample = simulatedVoicePrompts[currentLanguage] || simulatedVoicePrompts.hi;
            setInputRequirement(fallbackSample);
            setVoiceNotice(`Mic ended. Loaded ${currentMeta.nativeName} voice prompt.`);
          };

          recognition.start();
        } catch (err) {
          setIsRecording(false);
          const sample = simulatedVoicePrompts[currentLanguage] || simulatedVoicePrompts.hi;
          setInputRequirement(sample);
          setVoiceNotice(`Speech simulation loaded: "${sample}"`);
        }
      } else {
        // Fallback simulation with authentic native sentence for chosen language
        setIsRecording(true);
        setVoiceNotice(`Listening in ${currentMeta.nativeName}...`);
        setTimeout(() => {
          const sample = simulatedVoicePrompts[currentLanguage] || simulatedVoicePrompts.hi;
          setInputRequirement(sample);
          setIsRecording(false);
          setVoiceNotice(`Recognized voice (${currentMeta.nativeName}): "${sample}"`);
        }, 1500);
      }
    }
  };

  const handleSelectTradeFromGrid = (trade: Trade, defaultTask?: string) => {
    setSelectedTrade(trade);
    if (defaultTask) {
      setInputRequirement(`${trade} required for ${defaultTask}. Location: ${activeLocation}`);
    }
    // Scroll smoothly to requirement form
    const formEl = document.getElementById('requirement-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRequirement.trim()) return;

    onSubmitRequirement({
      rawInput: inputRequirement.trim(),
      trade: selectedTrade,
      area: activeLocation,
      urgency,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-10">
      {/* Top Welcome Bar & Escrow Health Card */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1c1f1d]">
              Namaste, Neha
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Verified Household
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#717974]">{t.needSkilledWork}</p>
        </div>

        {/* Location Selector & Escrow Status */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Location picker */}
          <div className="flex items-center gap-2 bg-[#fafaf9] px-3 py-1.5 rounded-xl border border-[#e5e7eb] text-xs">
            <MapPin className="w-4 h-4 text-[#134e3a]" />
            <select
              value={activeLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="bg-transparent font-semibold text-[#1c1f1d] focus:outline-none cursor-pointer"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Simulated Escrow Balance Card */}
          <button
            onClick={activeBooking ? onOpenBooking : undefined}
            disabled={!activeBooking}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs text-left transition-all ${
              activeBooking
                ? 'bg-emerald-100/70 border-emerald-300 hover:bg-emerald-100 cursor-pointer shadow-xs'
                : 'bg-emerald-50 border-emerald-200 cursor-default'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#059669]" />
            <div>
              <span className="text-[#717974] text-[10px] block">Simulated Escrow</span>
              <span className="font-bold text-[#134e3a] tabular-nums">
                {activeBooking
                  ? `₹${activeBooking.agreedPrice} (${activeBooking.status.replace(/_/g, ' ')})`
                  : '₹0.00 Active'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Active Booking Banner */}
      {activeBooking && (
        <div className="bg-emerald-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm border border-emerald-800 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 border border-emerald-700 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-800 text-emerald-200 border border-emerald-700/60">
                  Active Booking & Escrow
                </span>
                <span className="text-xs text-emerald-300 font-mono capitalize">
                  {activeBooking.status.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-100 mt-1">
                <strong>{workers.find((w) => w.id === activeBooking.selectedWorkerId)?.name || 'Worker'}</strong> ({activeBooking.requirement.trade}) • ₹{activeBooking.agreedPrice} locked in simulated escrow for "{activeBooking.requirement.task}"
              </p>
            </div>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-[#134e3a] hover:bg-emerald-50 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Track & Release Escrow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Requirement Input Box */}
      <section
        id="requirement-form"
        className="bg-white rounded-2xl border border-[#e5e7eb] p-6 sm:p-8 shadow-sm space-y-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#f3f4f0] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-[#134e3a] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Step 1: Describe What Went Wrong</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1c1f1d]">
              Describe Your Repair or Craft Requirement
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#717974]">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI extracts trade, urgency & fault without forms</span>
          </div>
        </div>

        {/* Preset Case Study Chips */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-[#717974]">
            Quick One-Click Case Studies & Presets:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {presetCaseStudies.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputRequirement(preset.text);
                  setSelectedTrade(preset.trade);
                  setUrgency(preset.urgency);
                  onLocationChange(preset.area);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border text-left transition-all ${
                  inputRequirement === preset.text
                    ? 'bg-[#134e3a] text-white border-[#134e3a] shadow-xs'
                    : 'bg-[#fafaf9] text-[#3f4541] border-[#e5e7eb] hover:bg-emerald-50 hover:border-emerald-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Trade Select Pills */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#717974]">
              Select Service Trade:
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { key: 'Electrician' as Trade, label: t.trades.electrician },
                { key: 'Plumber' as Trade, label: t.trades.plumber },
                { key: 'Mason' as Trade, label: t.trades.mason },
                { key: 'Carpenter' as Trade, label: t.trades.carpenter },
                { key: 'Painter' as Trade, label: t.trades.painter },
                { key: 'AC Technician' as Trade, label: t.trades.acTechnician },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedTrade(key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedTrade === key
                      ? 'bg-[#134e3a] text-white shadow-xs'
                      : 'bg-[#fafaf9] text-[#3f4541] border border-[#e5e7eb] hover:bg-stone-100'
                  }`}
                >
                  <span>{label}</span>
                  {label !== key && (
                    <span className="opacity-70 text-[10px] ml-1.5 font-normal">({key})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Text Area & Voice Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#717974]">
                Problem Description (Hindi, Hinglish or English):
              </label>

              {/* Voice Input Toggle Button */}
              <button
                type="button"
                onClick={handleVoiceToggle}
                aria-label="Toggle voice input recording"
                aria-pressed={isRecording}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-stone-100 text-[#3f4541] hover:bg-stone-200'
                }`}
                title={`Speak in ${currentMeta.nativeName} or English`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Recording ({currentMeta.nativeName})...</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-[#134e3a]" />
                    <span>Speak ({currentMeta.nativeName})</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <textarea
                rows={3}
                value={inputRequirement}
                onChange={(e) => setInputRequirement(e.target.value)}
                placeholder={t.typeYourProblem}
                className="w-full p-4 rounded-xl border border-[#e5e7eb] bg-[#fafaf9] text-sm text-[#1c1f1d] placeholder-[#717974] focus:outline-none focus:ring-2 focus:ring-[#134e3a]/20 focus:border-[#134e3a] font-normal"
                required
              />
            </div>

            {voiceNotice && (
              <div
                role="status"
                aria-live="polite"
                className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between animate-in fade-in duration-150"
              >
                <span>{voiceNotice}</span>
                <button
                  type="button"
                  onClick={() => setVoiceNotice(null)}
                  aria-label="Dismiss voice status"
                  className="text-emerald-700 hover:text-emerald-900 text-xs font-bold ml-2 shrink-0 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Urgency and Location row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#717974]">
                How Soon Is It Needed?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Immediate', 'Today', 'Within 2-3 Days', 'Flexible'] as const).map(
                  (urg) => (
                    <button
                      key={urg}
                      type="button"
                      onClick={() => setUrgency(urg)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border text-center transition-all ${
                        urgency === urg
                          ? 'bg-[#134e3a] text-white border-[#134e3a]'
                          : 'bg-[#fafaf9] text-[#3f4541] border-[#e5e7eb] hover:bg-stone-100'
                      }`}
                    >
                      {urg === 'Immediate' ? '⚡ Immediate (Today)' : urg}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#717974]">
                Work Location / Sector:
              </label>
              <div className="p-2.5 rounded-lg bg-[#fafaf9] border border-[#e5e7eb] text-xs font-semibold text-[#1c1f1d] flex items-center justify-between h-[42px] mt-0.5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#134e3a]" />
                  <span>{activeLocation}</span>
                </span>
                <span className="text-[11px] text-[#059669] font-bold">
                  Covered by 12 Workers
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#717974] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>Bids ranked by 5-part Hunar Score, not deceptive cheap quotes</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#134e3a] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-[#0f3f2e] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Parse Requirement & Compare Worker Bids</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </section>

      {/* Service Categories Section */}
      <ServiceCategoryGrid
        currentLanguage={currentLanguage}
        onSelectTrade={handleSelectTradeFromGrid}
      />

      {/* Featured Verified Local Workers (No Star Ratings) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1f1d] tracking-tight">
              Verified Patna & Danapur Tradesmen
            </h2>
            <p className="text-xs sm:text-sm text-[#717974]">
              Real completed jobs, strict photo verification, and transparent price bands.
            </p>
          </div>
          <span className="text-xs text-[#134e3a] font-bold">
            {workers.length} Craftsmen Enrolled
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workers.slice(0, 6).map((worker) => (
            <div
              key={worker.id}
              onClick={() => onViewWorkerProfile(worker)}
              className="bg-white rounded-2xl border border-[#e5e7eb] p-5 hover:border-[#134e3a] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={worker.profilePhoto}
                      alt={worker.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#e5e7eb]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-[#1c1f1d]">{worker.name}</h3>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-[#717974]">
                          {worker.id}
                        </span>
                      </div>
                      <p className="text-xs text-[#717974]">
                        {worker.trade} • {worker.baseLocation}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-extrabold text-[#134e3a] tabular-nums">
                      {worker.hunarScore}
                      <span className="text-xs font-normal text-[#717974]">/100</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#717974]">
                      {worker.pricingBand} Band
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#3f4541] line-clamp-2">{worker.bio}</p>

                {worker.extraChargeWarning && (
                  <div className="p-2 rounded bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{worker.extraChargeWarning}</span>
                  </div>
                )}

                {/* Evidence Quote */}
                {worker.evidenceQuotes[0] && (
                  <div className="p-2.5 rounded-lg bg-[#fafaf9] text-[11px] text-[#1c1f1d] italic border border-[#f3f4f0]">
                    "{worker.evidenceQuotes[0].quote}"
                  </div>
                )}
              </div>

                <div className="pt-3 mt-3 border-t border-[#f3f4f0] flex items-center justify-between text-xs">
                <span className="text-[#717974]">
                  {worker.completedJobsCount} completed jobs
                </span>
                <span className="text-[#134e3a] font-bold flex items-center gap-1">
                  View Evidence <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
