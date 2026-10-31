/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { XCircle, CheckCircle2, ShieldCheck, AlertCircle, TrendingDown, Scale } from 'lucide-react';

export function WhyNoStarsSection() {
  const comparisonItems = [
    {
      metric: 'Work Quality Validation',
      starFlaw: 'Generic 5-star ratings bought from friends or coerced at the doorstep.',
      hunarhubWay: 'AI Vision analysis of actual high-resolution completed-work photos against trade guidelines.',
    },
    {
      metric: 'Hidden Extra Charges',
      starFlaw: 'Workers bid ₹250 to win the lead, then demand ₹600 after dismantling appliances.',
      hunarhubWay: 'Strict Quoted vs. Paid audit. Workers who inflate bills get an upfront warning badge.',
    },
    {
      metric: 'Arrival & Punctuality',
      starFlaw: '"Bhaiya bas 10 minute me aa rahe hain" while making you wait 4 hours with no record.',
      hunarhubWay: 'Promised vs. actual completion time logged on every job and factored into score (15%).',
    },
    {
      metric: 'Customer Voice & Language',
      starFlaw: 'Forced English ratings that miss nuanced complaints or praise in regional dialects.',
      hunarhubWay: 'Natural Hindi & Hinglish feedback parsing across 5 distinct dimensions (cleanliness, honesty, behavior).',
    },
    {
      metric: 'New Worker Fairness',
      starFlaw: 'Zero stars means zero bookings; skilled new workers are buried without paid boosts.',
      hunarhubWay: 'Transparent New-Worker Baseline score of 60 with supervised trade verification.',
    },
    {
      metric: 'Payment Safety',
      starFlaw: 'Immediate cash payment leaves customers stranded if the repair fails that evening.',
      hunarhubWay: 'Simulated Platform Escrow: payment released only after photographic completion verification.',
    },
  ];

  return (
    <section id="why-no-stars" className="py-14 sm:py-20 bg-white border-b border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold">
            <XCircle className="w-3.5 h-3.5" />
            <span>The Broken Star Illusion</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1f1d] tracking-tight">
            Why Star Ratings Fail India's Skilled Trades
          </h2>
          <p className="text-sm sm:text-base text-[#3f4541] leading-relaxed">
            A 4.8-star electrician can still leave live wires exposed and charge 40% above quote. HunarHub replaces subjective stars with unshakeable mathematical proof.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-[#fafaf9] rounded-2xl border border-[#e5e7eb] overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#f5f5f3] border-b border-[#e5e7eb] px-6 py-4 text-xs font-bold text-[#717974] uppercase tracking-wider">
            <div className="md:col-span-3">Evaluation Pillar</div>
            <div className="md:col-span-4 text-red-900 flex items-center gap-1.5 mt-2 md:mt-0">
              <XCircle className="w-4 h-4 text-red-600" />
              <span>Generic Star-Rating Apps</span>
            </div>
            <div className="md:col-span-5 text-[#134e3a] flex items-center gap-1.5 mt-2 md:mt-0">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>HunarHub Evidence Engine</span>
            </div>
          </div>

          <div className="divide-y divide-[#e5e7eb]">
            {comparisonItems.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 px-6 py-4.5 gap-3 md:gap-4 items-start hover:bg-white transition-colors text-xs"
              >
                <div className="md:col-span-3 font-bold text-[#1c1f1d] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#134e3a]" />
                  <span>{item.metric}</span>
                </div>

                <div className="md:col-span-4 text-[#717974] bg-red-50/50 p-2.5 rounded-lg border border-red-100/60 leading-relaxed">
                  <span className="font-semibold text-red-900 block mb-0.5">The Problem:</span>
                  {item.starFlaw}
                </div>

                <div className="md:col-span-5 text-[#3f4541] bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100 leading-relaxed font-medium">
                  <span className="font-bold text-[#134e3a] block mb-0.5">The HunarHub Proof:</span>
                  {item.hunarhubWay}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Part Formula Summary Bar */}
        <div className="bg-[#134e3a]/5 border border-[#134e3a]/15 rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#134e3a]" />
              <h3 className="font-extrabold text-base sm:text-lg text-[#134e3a]">
                The Strict 100-Point Hunar Formula (Calculated in Code)
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#134e3a] text-white">
              Formula Total: 100%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            <div className="bg-white p-3 rounded-xl border border-[#e5e7eb] text-center">
              <div className="text-xl font-extrabold text-[#134e3a] tabular-nums">35%</div>
              <div className="text-xs font-bold text-[#1c1f1d] mt-0.5">Work Quality</div>
              <div className="text-[10px] text-[#717974]">AI Vision photo audit</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e5e7eb] text-center">
              <div className="text-xl font-extrabold text-[#134e3a] tabular-nums">20%</div>
              <div className="text-xs font-bold text-[#1c1f1d] mt-0.5">Price Honesty</div>
              <div className="text-[10px] text-[#717974]">Quoted vs final paid</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e5e7eb] text-center">
              <div className="text-xl font-extrabold text-[#134e3a] tabular-nums">20%</div>
              <div className="text-xs font-bold text-[#1c1f1d] mt-0.5">Behaviour</div>
              <div className="text-[10px] text-[#717974]">Hinglish sentiment</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e5e7eb] text-center">
              <div className="text-xl font-extrabold text-[#134e3a] tabular-nums">15%</div>
              <div className="text-xs font-bold text-[#1c1f1d] mt-0.5">Punctuality</div>
              <div className="text-[10px] text-[#717974]">Promised vs actual</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e5e7eb] text-center col-span-2 sm:col-span-1">
              <div className="text-xl font-extrabold text-[#134e3a] tabular-nums">10%</div>
              <div className="text-xs font-bold text-[#1c1f1d] mt-0.5">Reliability</div>
              <div className="text-[10px] text-[#717974]">Zero rework history</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
