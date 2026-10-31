/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Camera,
  MapPin,
  Clock,
  Zap,
} from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface HeroSectionProps {
  onPostRequirement: (sampleText?: string) => void;
  onExploreCaseStudy: () => void;
}

export function HeroSection({
  onPostRequirement,
  onExploreCaseStudy,
}: HeroSectionProps) {
  const [quickInput, setQuickInput] = useState('');

  const samplePrompts = [
    'MCB baar baar gir raha hai, bijli nahi hai, aaj hi chahiye (Danapur)',
    'Bathroom pipe me concealed leakage hai, wall se paani ris raha hai',
    'Balcony floor tile hollow ho gaya hai, re-fixing karwana hai',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickInput.trim()) {
      onPostRequirement(quickInput.trim());
    } else {
      onPostRequirement('MCB baar baar gir raha hai, bijli nahi hai, aaj hi chahiye.');
    }
  };

  return (
    <section id="hero" className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Grid: 12-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Value Proposition (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill trust chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#134e3a]/10 border border-[#134e3a]/15 text-[#134e3a] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>India's 1st Evidence-Based Skilled Marketplace</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              <span className="text-[#3f4541] font-medium">Zero Star Ratings</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1f1d] tracking-tight leading-[1.15]">
              Kaam Bolega,{' '}
              <span className="text-[#134e3a] underline decoration-emerald-500/40 decoration-wavy decoration-2">
                Stars Nahi.
              </span>
              <br />
              Proof-Backed Skilled Work.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#3f4541] leading-relaxed max-w-2xl font-normal">
              Find reliable electricians, plumbers, and masons evaluated on{' '}
              <strong>actual completed-work photos</strong>, promised vs. actual completion time,
              transparent quote honesty, and verified Hindi/Hinglish customer feedback.
            </p>

            {/* Interactive Requirement Input Box */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-2.5 sm:p-3 rounded-2xl border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow max-w-2xl space-y-2.5"
            >
              <div className="flex items-center gap-2 px-2 text-xs font-semibold text-[#717974]">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Type in Hindi, Hinglish, or English:</span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  placeholder="e.g. MCB baar baar gir raha hai, aaj hi chahiye (Danapur)..."
                  className="flex-1 px-3 py-2.5 text-sm text-[#1c1f1d] placeholder-[#717974] bg-[#fafaf9] rounded-xl border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#134e3a]/20 focus:border-[#134e3a]"
                />
                <button
                  type="submit"
                  className="bg-[#134e3a] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#0f3f2e] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-xs active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Evaluate Bids</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick sample chips */}
              <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-[#717974]">
                <span className="font-semibold text-[#3f4541]">Try prompt:</span>
                {samplePrompts.map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setQuickInput(sample);
                      onPostRequirement(sample);
                    }}
                    className="px-2 py-0.5 rounded-md bg-[#f5f5f3] hover:bg-emerald-50 hover:text-[#134e3a] hover:border-emerald-200 border border-transparent transition-colors text-left"
                  >
                    "{sample.slice(0, 36)}..."
                  </button>
                ))}
              </div>
            </form>

            {/* Metric Trust Tokens (No Star Ratings) */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-xl">
              <div className="p-3 rounded-xl bg-white border border-[#e5e7eb] space-y-0.5">
                <div className="text-xl sm:text-2xl font-extrabold text-[#134e3a] tabular-nums">
                  100%
                </div>
                <div className="text-[11px] font-semibold text-[#1c1f1d]">Photo Evidence</div>
                <div className="text-[10px] text-[#717974]">AI Vision verified</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#e5e7eb] space-y-0.5">
                <div className="text-xl sm:text-2xl font-extrabold text-[#134e3a] tabular-nums">
                  0%
                </div>
                <div className="text-[11px] font-semibold text-[#1c1f1d]">Fake Stars</div>
                <div className="text-[10px] text-[#717974]">Kaam bolega policy</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#e5e7eb] space-y-0.5">
                <div className="text-xl sm:text-2xl font-extrabold text-[#134e3a] tabular-nums">
                  ₹0
                </div>
                <div className="text-[11px] font-semibold text-[#1c1f1d]">Surprise Charges</div>
                <div className="text-[10px] text-[#717974]">History tracking</div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Indian Electrician Photograph & Live Evidence Card (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#e5e7eb] shadow-lg bg-white">
              {/* Authentic Photo of Indian Electrician Repairing Distribution Panel */}
              <div className="relative h-[380px] sm:h-[440px] w-full bg-stone-900">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80"
                  fallbackSrc="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                  alt="Indian electrician professionally inspecting and repairing a residential electrical distribution panel with multimeter and insulated tools"
                  className="w-full h-full object-cover object-center filter contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top Badge: Verified Work in Danapur */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#134e3a] text-xs font-bold shadow-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Verified Completed Job #J101</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>Danapur Cantt</span>
                  </div>
                </div>

                {/* Floating Evidence Card pinned at the bottom of the photo */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-md space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#1c1f1d]">Ramesh Sharma</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          Gold Band
                        </span>
                      </div>
                      <p className="text-[11px] text-[#717974]">Electrician • 28 Verified Panel Jobs</p>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-extrabold text-[#134e3a] tabular-nums">
                        92<span className="text-xs font-medium text-[#717974]">/100</span>
                      </div>
                      <div className="text-[10px] font-semibold text-[#059669]">Hunar Score</div>
                    </div>
                  </div>

                  {/* Evidence checklist */}
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#3f4541] pt-1 border-t border-stone-200">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Ferrule crimped terminals</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Zero quote inflation</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Clean wire ducting</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Punctual arrival (35m)</span>
                    </div>
                  </div>

                  {/* Hinglish Customer Quote */}
                  <div className="p-2 rounded-lg bg-stone-100/90 text-[11px] text-[#1c1f1d] italic">
                    "time pe aaye, achhe se samjhaya, saaf-safai karke gaye."
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorative Element */}
            <div className="absolute -bottom-3 -right-3 -z-10 w-24 h-24 bg-emerald-700/10 rounded-full blur-xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
