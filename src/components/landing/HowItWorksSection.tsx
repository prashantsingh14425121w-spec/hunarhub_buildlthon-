/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  FileText,
  Scale,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface HowItWorksSectionProps {
  onStartClick: () => void;
}

export function HowItWorksSection({ onStartClick }: HowItWorksSectionProps) {
  const steps = [
    {
      number: '01',
      title: 'Post in Natural Hindi or Hinglish',
      subtitle: 'No complex menus or confusing forms',
      description:
        'Just type or speak your problem in everyday language: "MCB baar baar gir raha hai, bijli nahi hai, aaj hi chahiye." Our AI understands trade, fault severity, and urgency without guessing.',
      icon: FileText,
      badge: 'Multilingual AI Parsing',
      features: ['Hindi, Hinglish & English', 'Instant task categorization', 'Editable confirmation'],
    },
    {
      number: '02',
      title: 'Value-Based Bid Comparison',
      subtitle: 'Never fooled by deceptively cheap bids',
      description:
        'Workers submit transparent bids matched against official market rate bands (Gold, Silver, Standard, New). If a worker historically inflates final bills, an explicit warning badge flags it upfront.',
      icon: Scale,
      badge: 'Strict 5-Part Formula',
      features: ['Price honesty track record', 'Price band validation', 'Zero star rating bias'],
    },
    {
      number: '03',
      title: 'Simulated Escrow & Evidence Release',
      subtitle: 'Payment released only after proof verification',
      description:
        'Funds stay safely locked in simulated escrow while work is done. Once completed, the customer submits the after-work photo and feedback. AI vision audits the craft and recalculates the score.',
      icon: ShieldCheck,
      badge: 'Simulated Escrow Guarantee',
      features: ['Milestone proof inspection', 'AI vision craftsmanship check', 'Mathematical score update'],
    },
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-white border-y border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Evidence-First Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1f1d] tracking-tight">
            How HunarHub Protects Both Customers & Skilled Workers
          </h2>
          <p className="text-sm sm:text-base text-[#3f4541] leading-relaxed">
            Eliminating fake stars, surprise post-work billing, and unverified promises through structured photographic evidence and simulated escrow.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#fafaf9] rounded-2xl border border-[#e5e7eb] p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-[#134e3a]/30 group-hover:text-[#134e3a] transition-colors tabular-nums">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white border border-[#e5e7eb] text-[#134e3a]">
                      {step.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#134e3a] text-white flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5 text-emerald-300" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#1c1f1d]">{step.title}</h3>
                    <p className="text-xs text-[#717974] font-medium mt-0.5">{step.subtitle}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#3f4541] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[#e5e7eb] space-y-2">
                  {step.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#3f4541]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="bg-[#134e3a] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-lg sm:text-xl font-bold">Ready to see proof-based hiring in action?</h3>
            <p className="text-xs sm:text-sm text-emerald-200/90">
              Test with the live Neha MCB fault case study or enter your custom residential repair.
            </p>
          </div>
          <button
            onClick={onStartClick}
            className="bg-white text-[#134e3a] hover:bg-emerald-50 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-sm active:scale-98"
          >
            <span>Post a Requirement Now</span>
            <ArrowRight className="w-4 h-4 text-[#134e3a]" />
          </button>
        </div>
      </div>
    </section>
  );
}
