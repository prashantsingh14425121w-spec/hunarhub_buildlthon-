/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why does HunarHub strictly prohibit star ratings?',
      a: 'Star ratings in India are heavily manipulated—they can be coerced during doorstep payment, bought through fake reviews, or inflated by friends. Stars fail to show whether an electrician used proper wire ferrule crimps or left bare copper exposed. HunarHub evaluates workers purely on verifiable evidence: high-resolution work photos, time audits, price honesty, and actual customer feedback.',
    },
    {
      q: 'How is the Hunar Score calculated?',
      a: 'The Hunar Score is calculated strictly in application code (not by an LLM) on a normalized 0–100 scale using this fixed formula: Work Quality (35%) + Price Honesty (20%) + Professional Behaviour & Cleanliness (20%) + Punctuality (15%) + Reliability & Rework History (10%).',
    },
    {
      q: 'What happens if a worker gives a cheap quote but demands extra money later?',
      a: 'HunarHub records both the original quotation and the final paid amount. If a worker inflates their bill without verified justification, their Price Honesty score drops sharply and their profile immediately displays an upfront warning badge (e.g., Raju Prasad\'s profile warns: "In 5 of 6 past jobs, the final amount was 30–45% above the quote").',
    },
    {
      q: 'How does simulated platform escrow work?',
      a: 'When you accept a bid, the agreed funds are marked as held safely in simulated escrow. The worker arrives, completes the physical repair, and an after-work photograph plus feedback are submitted. Once our AI vision tool checks the work against trade quality standards, the simulated escrow funds are released to the worker.',
    },
    {
      q: 'How are new workers given a fair chance without star history?',
      a: 'Workers with fewer than 3 completed jobs receive a baseline Hunar Score of 60 within the "New" price band. Their novice status and ITI diplomas/certificates are clearly disclosed to customers seeking cost-effective work, ensuring skilled newcomers get fair opportunities without fake review penalties.',
    },
    {
      q: 'Can I type or speak my problem in Hindi or Hinglish?',
      a: 'Yes! You can type natural everyday sentences like "MCB baar baar gir raha hai, aaj hi chahiye" or "Bathroom pipe me se paani tapak raha hai". Our AI automatically parses your trade, task, urgency, and area without forcing you to navigate complex dropdown menus.',
    },
  ];

  return (
    <section id="faqs" className="py-14 sm:py-20 bg-[#fafaf9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#134e3a]/10 text-[#134e3a] text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1f1d] tracking-tight">
            Transparent Answers About Evidence-Based Hiring
          </h2>
          <p className="text-sm text-[#717974] max-w-xl mx-auto">
            Everything you need to know about the Hunar Score, zero-star philosophy, and simulated escrow safety.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1c1f1d] hover:text-[#134e3a] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#717974] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#134e3a]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#3f4541] leading-relaxed border-t border-[#f3f4f0] animate-in fade-in duration-150">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
