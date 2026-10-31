/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  Sparkles,
  Award,
  DollarSign,
  TrendingDown,
  Info,
} from 'lucide-react';
import { CustomerRequirement, WorkerRecord } from '../../types';
import { EvaluatedBid } from '../../data/bidEngine';
import { ListenButton } from '../common/ListenButton';

interface CompareWorkerBidsProps {
  requirement: CustomerRequirement;
  bids: EvaluatedBid[];
  onSelectWorkerForBooking: (bid: EvaluatedBid) => void;
  onViewWorkerProfile: (worker: WorkerRecord) => void;
  onBackToRequirement: () => void;
}

export function CompareWorkerBids({
  requirement,
  bids,
  onSelectWorkerForBooking,
  onViewWorkerProfile,
  onBackToRequirement,
}: CompareWorkerBidsProps) {
  const [selectedBidId, setSelectedBidId] = useState<string>(bids[0]?.id || '');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner explaining Value-Based Ranking vs Cheapest */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#134e3a] text-xs font-bold">
              <Scale className="w-3.5 h-3.5 text-[#059669]" />
              <span>Value-Based Bid Ranking Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1f1d]">
              Live Worker Bids for: {requirement.task}
            </h2>
            <p className="text-xs sm:text-sm text-[#717974]">
              Location: <strong>{requirement.area}</strong> • Urgency: <strong>{requirement.urgency}</strong> • {bids.length} Local Craftsmen Evaluated
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToRequirement}
              className="px-3.5 py-2 rounded-xl border border-[#e5e7eb] text-xs font-semibold text-[#3f4541] hover:bg-stone-100 transition-colors"
            >
              ← Edit Requirement
            </button>
          </div>
        </div>

        {/* Why Ramesh Ranks Above Cheaper Raju Explanation */}
        <div className="p-4 rounded-xl bg-[#134e3a]/5 border border-[#134e3a]/15 text-xs text-[#1c1f1d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-[#134e3a] block">
                Evidence-Based Protection: Why Ramesh (₹480) Ranks Above Raju (₹370)
              </strong>
              <p className="text-[#3f4541] leading-relaxed">
                Platforms that sort by cheapest quote reward deceptive contractors. Raju bids ₹370 but has a verified 30–45% final bill inflation track record. Ramesh has 28 verified jobs with 100% price honesty.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <ListenButton
              id="bid-ranking-rationale"
              text="Evidence-Based Protection: Why Ramesh ranks above Raju. Platforms that sort by cheapest quote reward deceptive contractors. Raju bids ₹370 but has a verified 30 to 45% final bill inflation track record. Ramesh has 28 verified jobs with 100% price honesty."
              label="Listen"
              variant="compact"
            />
            <span className="px-2.5 py-1 rounded-full bg-[#134e3a] text-white text-[11px] font-bold">
              Zero Hidden Fees Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Bids List Cards */}
      <div className="space-y-4">
        {bids.map((bid) => {
          const isSelected = selectedBidId === bid.id;
          return (
            <div
              key={bid.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all duration-200 hover:shadow-md ${
                bid.isRecommended
                  ? 'border-emerald-600 ring-2 ring-emerald-500/10 shadow-sm'
                  : bid.extraChargeWarning
                  ? 'border-amber-300'
                  : 'border-[#e5e7eb]'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                {/* Left: Rank & Worker Bio */}
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shadow-2xs ${
                        bid.valueRank === 1
                          ? 'bg-[#134e3a] text-white ring-2 ring-emerald-400'
                          : 'bg-stone-100 text-[#3f4541]'
                      }`}
                    >
                      #{bid.valueRank}
                    </span>
                    <span className="text-[10px] text-[#717974] font-medium mt-1">Rank</span>
                  </div>

                  <img
                    src={bid.worker.profilePhoto}
                    alt={bid.worker.name}
                    className="w-14 h-14 rounded-full object-cover border border-[#e5e7eb]"
                  />

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-base text-[#1c1f1d]">{bid.worker.name}</h3>
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-[#717974]">
                        {bid.worker.id}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          bid.pricingBand === 'Gold'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : bid.pricingBand === 'Silver'
                            ? 'bg-slate-100 text-slate-800 border border-slate-300'
                            : bid.pricingBand === 'New'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {bid.pricingBand} Band
                      </span>

                      {bid.isRecommended && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold tracking-wide uppercase flex items-center gap-1 shadow-2xs">
                          <CheckCircle2 className="w-3 h-3" />
                          Recommended Top Value
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#717974]">
                      {bid.worker.trade} • {bid.worker.experienceYears} Years Exp • {bid.worker.completedJobsCount} Verified Jobs
                    </p>

                    <div className="flex items-center gap-3 text-xs text-[#3f4541] pt-0.5">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#134e3a]" />
                        {bid.estimatedArrival}
                      </span>
                      <span>•</span>
                      <span>Est: {bid.estimatedCompletion}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Price Quotation, Hunar Score & Booking Action */}
                <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#f3f4f0]">
                  <div className="text-left lg:text-right">
                    <div className="text-xs text-[#717974]">Quoted Amount</div>
                    <div className="text-2xl font-extrabold text-[#134e3a] tabular-nums">
                      ₹{bid.quotedPrice}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      Fixed Quote • Escrow Protected
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-extrabold text-[#1c1f1d] tabular-nums">
                      {bid.workerScore}<span className="text-xs font-normal text-[#717974]">/100</span>
                    </div>
                    <div className="text-[10px] font-semibold text-[#059669]">Hunar Score</div>
                  </div>

                  <button
                    onClick={() => onSelectWorkerForBooking(bid)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all shadow-xs active:scale-98 ${
                      bid.isRecommended
                        ? 'bg-[#134e3a] text-white hover:bg-[#0f3f2e]'
                        : 'bg-stone-900 text-white hover:bg-black'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Select & Hold in Escrow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Raju's Warning Card if present */}
              {bid.extraChargeWarning && (
                <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2.5 font-medium">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-950 font-bold block mb-0.5">
                      CRITICAL EXTRA-CHARGE WARNING:
                    </strong>
                    <span>{bid.extraChargeWarning}</span>
                  </div>
                </div>
              )}

              {/* Recommendation Note */}
              <div className="mt-3 p-3 rounded-xl bg-[#fafaf9] border border-[#e5e7eb] text-xs text-[#3f4541] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex-1">
                  <strong>Evaluation Note:</strong> {bid.recommendationNote}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <ListenButton
                    id={`bid-eval-${bid.id}`}
                    text={`Evaluation note for ${bid.worker.name}: ${bid.recommendationNote}. ${bid.extraChargeWarning ? 'Warning: ' + bid.extraChargeWarning : ''}`}
                    label="Listen"
                    variant="compact"
                  />
                  <button
                    onClick={() => onViewWorkerProfile(bid.worker)}
                    className="text-xs text-[#134e3a] font-bold hover:underline shrink-0"
                  >
                    View Full Evidence History →
                  </button>
                </div>
              </div>

              {/* 5-Component Score Mini-Metrics */}
              <div className="mt-3 pt-3 border-t border-[#f3f4f0] grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-[#717974]">
                <div>
                  Quality: <strong className="text-[#1c1f1d]">{bid.worker.breakdown.workQuality}/100</strong>
                </div>
                <div>
                  Price Honesty:{' '}
                  <strong className={bid.worker.breakdown.priceHonesty < 60 ? 'text-amber-700' : 'text-[#1c1f1d]'}>
                    {bid.worker.breakdown.priceHonesty}/100
                  </strong>
                </div>
                <div>
                  Punctuality: <strong className="text-[#1c1f1d]">{bid.worker.breakdown.punctuality}/100</strong>
                </div>
                <div>
                  Behaviour: <strong className="text-[#1c1f1d]">{bid.worker.breakdown.professionalBehaviour}/100</strong>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  Reliability: <strong className="text-[#1c1f1d]">{bid.worker.breakdown.reliability}/100</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
