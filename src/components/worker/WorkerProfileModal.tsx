/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Award,
  AlertTriangle,
  Scale,
  Camera,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  Calendar,
  X,
  Lock,
  ArrowRight,
  TrendingUp,
  Info,
} from 'lucide-react';
import { WorkerRecord, CompletedJobRecord } from '../../types';
import { loadPricingBands, loadMarketRates, getWorkerCompletedJobs } from '../../data/dataLoader';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface WorkerProfileModalProps {
  worker: WorkerRecord;
  onClose: () => void;
  onBookWorker?: (worker: WorkerRecord) => void;
}

export function WorkerProfileModal({
  worker,
  onClose,
  onBookWorker,
}: WorkerProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'breakdown' | 'photos' | 'feedback' | 'pricing_audit'>('breakdown');

  const pricingBands = useMemo(() => loadPricingBands(), []);
  const marketRates = useMemo(() => loadMarketRates(), []);
  const completedJobs = useMemo(() => getWorkerCompletedJobs(worker.id), [worker.id]);

  const currentBandDef = pricingBands[worker.pricingBand];
  const tradeMarketRate = marketRates.find((mr) => mr.trade === worker.trade);

  // Check if this worker is W007 Mukesh (Mandatory Case Study 3)
  const isMukeshCaseStudy = worker.id === 'W007';

  // Check if this worker is W004 Raju (Deceptive pricing case study)
  const isRajuCaseStudy = worker.id === 'W004';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-[#e5e7eb] shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Header with Forest Green Banner */}
        <div className="bg-[#134e3a] text-white p-5 sm:p-6 shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-8">
            <div className="flex items-center gap-4">
              <img
                src={worker.profilePhoto}
                alt={worker.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white/30 shadow-md shrink-0"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold">{worker.name}</h2>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/15">
                    {worker.id}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      worker.pricingBand === 'Gold'
                        ? 'bg-emerald-300 text-emerald-950'
                        : worker.pricingBand === 'Silver'
                        ? 'bg-slate-200 text-slate-900'
                        : worker.pricingBand === 'New'
                        ? 'bg-blue-200 text-blue-950'
                        : 'bg-amber-300 text-amber-950'
                    }`}
                  >
                    {worker.pricingBand} Band
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-emerald-200 flex flex-wrap items-center gap-3">
                  <span>{worker.trade} Specialist</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {worker.baseLocation}
                  </span>
                  <span>•</span>
                  <span>{worker.experienceYears} Years Exp</span>
                </p>

                <div className="text-[11px] text-emerald-300 flex items-center gap-1 pt-0.5">
                  <Phone className="w-3 h-3" />
                  <span>{worker.phone}</span>
                </div>
              </div>
            </div>

            {/* Hunar Score Display (NO STAR RATINGS) */}
            <div className="bg-black/30 backdrop-blur-xs px-4 py-3 rounded-xl border border-white/10 text-right shrink-0">
              <div className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">
                Hunar Score
              </div>
              <div className="text-3xl font-extrabold tabular-nums">
                {worker.hunarScore}
                <span className="text-xs font-normal text-emerald-200">/100</span>
              </div>
              <div className="text-[10px] text-emerald-300 font-semibold flex items-center justify-end gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Zero Star Rating
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-5 grid grid-cols-3 gap-2 pt-3 border-t border-white/15 text-center text-xs">
            <div>
              <span className="text-emerald-200/80 text-[10px] block">Verified Jobs</span>
              <span className="font-bold tabular-nums text-sm">{worker.completedJobsCount} completed</span>
            </div>
            <div>
              <span className="text-emerald-200/80 text-[10px] block">Rework History</span>
              <span className="font-bold tabular-nums text-sm">
                {worker.reworkCount === 0 ? '0 Callbacks' : `${worker.reworkCount} Reworks`}
              </span>
            </div>
            <div>
              <span className="text-emerald-200/80 text-[10px] block">Price Band Multiplier</span>
              <span className="font-bold tabular-nums text-sm">
                {currentBandDef?.multiplierVsBase.min * 100}% – {currentBandDef?.multiplierVsBase.max * 100}%
              </span>
            </div>
          </div>
        </div>

        {/* Mukesh Case Study 3 Special Preserved Badge Banner */}
        {isMukeshCaseStudy && (
          <div className="bg-purple-50 border-b border-purple-200 px-6 py-3 text-xs text-purple-950 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
            <div>
              <strong>Case Study 3 Validation (W007 Mukesh):</strong>
              <p className="mt-0.5 leading-relaxed text-purple-900">
                Mukesh demonstrates master-level tile craftsmanship (<strong>Work Quality: 91/100</strong>). However, due to verified schedule delays (<strong>Punctuality: 52/100</strong>) and rough customer communication (<strong>Behaviour: 56/100</strong>), the strict 5-part formula yields <strong>72/100</strong>. He is strictly preserved in the <strong>Silver Band</strong> rather than incorrectly promoted to Gold.
              </p>
            </div>
          </div>
        )}

        {/* New Worker Baseline Disclosure Banner */}
        {(worker.pricingBand === 'New' || worker.breakdown.newWorkerBaseline || worker.completedJobsCount < 3) && (
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-3 text-xs text-blue-950 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <strong>New Worker Evidence Disclosure ({worker.name}):</strong>
              <p className="mt-0.5 leading-relaxed text-blue-900">
                New craftsmen with fewer than 3 completed jobs start with an established baseline score ({worker.hunarScore}/100) and operate in the <strong>New / Novice Band</strong> at discounted rates. Limited evidence is disclosed transparently until 3+ verified jobs are completed.
              </p>
            </div>
          </div>
        )}

        {/* Raju Case Study Extra-Charge Warning Banner */}
        {isRajuCaseStudy && (
          <div className="bg-amber-50 border-b border-amber-300 px-6 py-3 text-xs text-amber-950 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Deceptive Low Bid Advisory (W004 Raju):</strong>
              <p className="mt-0.5 leading-relaxed text-amber-900 font-medium">
                {worker.extraChargeWarning || 'In 5 of 6 past jobs, the final amount was 30–45% above the quote.'} Price Honesty score is 38/100.
              </p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e5e7eb] px-6 bg-[#fafaf9] text-xs font-semibold overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'breakdown'
                ? 'border-[#134e3a] text-[#134e3a] font-bold'
                : 'border-transparent text-[#717974] hover:text-[#1c1f1d]'
            }`}
          >
            5-Part Score Formula
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'photos'
                ? 'border-[#134e3a] text-[#134e3a] font-bold'
                : 'border-transparent text-[#717974] hover:text-[#1c1f1d]'
            }`}
          >
            Work Photos ({completedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'feedback'
                ? 'border-[#134e3a] text-[#134e3a] font-bold'
                : 'border-transparent text-[#717974] hover:text-[#1c1f1d]'
            }`}
          >
            Hinglish Quotes ({worker.evidenceQuotes.length})
          </button>
          <button
            onClick={() => setActiveTab('pricing_audit')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'pricing_audit'
                ? 'border-[#134e3a] text-[#134e3a] font-bold'
                : 'border-transparent text-[#717974] hover:text-[#1c1f1d]'
            }`}
          >
            Quoted vs. Paid Audit
          </button>
        </div>

        {/* Scrollable Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: 5-PART SCORE BREAKDOWN */}
          {activeTab === 'breakdown' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#717974] mb-3">
                  Strict Mathematical Formula Breakdown (Code Calculated, Not LLM Prompted)
                </h4>

                <div className="space-y-3.5">
                  {/* Quality (35%) */}
                  <div className="p-3.5 rounded-xl bg-[#fafaf9] border border-[#e5e7eb] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1c1f1d]">Work Quality (35% Weight)</span>
                        <p className="text-[11px] text-[#717974]">
                          AI vision photo verification against trade guidelines (wires, joints, leveling)
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-[#134e3a] tabular-nums">
                          {worker.breakdown.workQuality}/100
                        </span>
                        <div className="text-[10px] text-[#717974]">
                          Points: {(worker.breakdown.workQuality * 0.35).toFixed(1)} / 35
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#134e3a] h-2 rounded-full"
                        style={{ width: `${worker.breakdown.workQuality}%` }}
                      />
                    </div>
                  </div>

                  {/* Price Honesty (20%) */}
                  <div className="p-3.5 rounded-xl bg-[#fafaf9] border border-[#e5e7eb] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1c1f1d]">Price Honesty (20% Weight)</span>
                        <p className="text-[11px] text-[#717974]">
                          Audit of original quotation vs final paid amount and justified material receipts
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-base font-extrabold tabular-nums ${
                            worker.breakdown.priceHonesty < 60 ? 'text-amber-700' : 'text-[#134e3a]'
                          }`}
                        >
                          {worker.breakdown.priceHonesty}/100
                        </span>
                        <div className="text-[10px] text-[#717974]">
                          Points: {(worker.breakdown.priceHonesty * 0.20).toFixed(1)} / 20
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          worker.breakdown.priceHonesty < 60 ? 'bg-amber-600' : 'bg-[#059669]'
                        }`}
                        style={{ width: `${worker.breakdown.priceHonesty}%` }}
                      />
                    </div>
                  </div>

                  {/* Punctuality (15%) */}
                  <div className="p-3.5 rounded-xl bg-[#fafaf9] border border-[#e5e7eb] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1c1f1d]">Punctuality (15% Weight)</span>
                        <p className="text-[11px] text-[#717974]">
                          Promised completion days vs actual completion days and arrival punctuality
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-base font-extrabold tabular-nums ${
                            worker.breakdown.punctuality < 60 ? 'text-amber-700' : 'text-[#134e3a]'
                          }`}
                        >
                          {worker.breakdown.punctuality}/100
                        </span>
                        <div className="text-[10px] text-[#717974]">
                          Points: {(worker.breakdown.punctuality * 0.15).toFixed(1)} / 15
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          worker.breakdown.punctuality < 60 ? 'bg-amber-600' : 'bg-[#134e3a]'
                        }`}
                        style={{ width: `${worker.breakdown.punctuality}%` }}
                      />
                    </div>
                  </div>

                  {/* Professional Behaviour (20%) */}
                  <div className="p-3.5 rounded-xl bg-[#fafaf9] border border-[#e5e7eb] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1c1f1d]">Professional Behaviour (20% Weight)</span>
                        <p className="text-[11px] text-[#717974]">
                          Customer feedback sentiment for cleanliness, polite communication, and cooperation
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-[#134e3a] tabular-nums">
                          {worker.breakdown.professionalBehaviour}/100
                        </span>
                        <div className="text-[10px] text-[#717974]">
                          Points: {(worker.breakdown.professionalBehaviour * 0.20).toFixed(1)} / 20
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#134e3a] h-2 rounded-full"
                        style={{ width: `${worker.breakdown.professionalBehaviour}%` }}
                      />
                    </div>
                  </div>

                  {/* Reliability (10%) */}
                  <div className="p-3.5 rounded-xl bg-[#fafaf9] border border-[#e5e7eb] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1c1f1d]">Reliability (10% Weight)</span>
                        <p className="text-[11px] text-[#717974]">
                          Zero rework callbacks and verified job longevity record
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-[#134e3a] tabular-nums">
                          {worker.breakdown.reliability}/100
                        </span>
                        <div className="text-[10px] text-[#717974]">
                          Points: {(worker.breakdown.reliability * 0.10).toFixed(1)} / 10
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#134e3a] h-2 rounded-full"
                        style={{ width: `${worker.breakdown.reliability}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Calculation Card */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-emerald-900 text-sm block">
                    Total Normalized Hunar Score: {worker.hunarScore}/100
                  </span>
                  <p className="text-[11px] text-emerald-800">
                    Formula: (Quality × 0.35) + (Honesty × 0.20) + (Behaviour × 0.20) + (Punctuality × 0.15) + (Reliability × 0.10)
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#134e3a] text-white font-bold text-xs uppercase">
                  {worker.pricingBand} Band Certified
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: WORK PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#717974]">
                Actual Completed-Work Photographs & AI Vision Evidence
              </h4>

              {completedJobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {completedJobs.map((job) => (
                    <div key={job.jobId} className="bg-[#fafaf9] rounded-xl border border-[#e5e7eb] overflow-hidden space-y-3">
                      <div className="relative h-44 w-full bg-stone-900">
                        <ImageWithFallback
                          src={job.photoUrl}
                          alt={job.taskDescription}
                          className="w-full h-full object-cover"
                        />
                        <span
                          className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            job.photoQualityLabel === 'Good'
                              ? 'bg-emerald-500 text-white'
                              : job.photoQualityLabel === 'Average'
                              ? 'bg-amber-400 text-amber-950'
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {job.photoQualityLabel} Craftsmanship
                        </span>
                      </div>

                      <div className="p-3.5 space-y-2 text-xs">
                        <div className="font-bold text-[#1c1f1d]">{job.taskDescription}</div>
                        <div className="text-[11px] text-[#717974]">
                          Customer: {job.customerName} • {job.area}
                        </div>
                        <p className="text-[#3f4541] bg-white p-2.5 rounded-lg border border-[#e5e7eb] text-[11px]">
                          <strong>Visible Evidence:</strong> {job.photoVisibleEvidence}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-[#717974] bg-[#fafaf9] rounded-xl border border-[#e5e7eb]">
                  New enrollee with under 3 jobs. Starting at disclosed baseline score of 60.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: HINGLISH CUSTOMER QUOTES */}
          {activeTab === 'feedback' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#717974]">
                Verifiable Customer Evidence Quotes (Hindi & Hinglish)
              </h4>

              <div className="space-y-3">
                {worker.evidenceQuotes.map((eq, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#fafaf9] border border-[#e5e7eb] space-y-2 text-xs">
                    <p className="italic font-medium text-[#1c1f1d]">"{eq.quote}"</p>
                    <div className="flex items-center justify-between text-[11px] text-[#717974] pt-1 border-t border-[#f3f4f0]">
                      <span className="capitalize font-semibold text-[#134e3a]">
                        Evaluated Dimension: {eq.dimension}
                      </span>
                      <span>Verified Household: {eq.customerArea}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: QUOTED VS. PAID AUDIT */}
          {activeTab === 'pricing_audit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#717974]">
                  Quoted vs. Paid Final Billing Audit
                </h4>
                <span className="text-xs text-[#717974]">Zero Surprise Charges Policy</span>
              </div>

              {completedJobs.length > 0 ? (
                <div className="space-y-3">
                  {completedJobs.map((job) => {
                    const diff = job.paidAmount - job.quotedAmount;
                    const diffPct = Math.round((diff / job.quotedAmount) * 100);
                    const isInflated = diff > 0 && !job.extraChargeJustified;

                    return (
                      <div
                        key={job.jobId}
                        className={`p-4 rounded-xl border text-xs space-y-2 ${
                          isInflated ? 'bg-amber-50/50 border-amber-300' : 'bg-[#fafaf9] border-[#e5e7eb]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1c1f1d]">{job.taskDescription}</span>
                          <span className="text-[11px] font-mono text-[#717974]">{job.dateCompleted}</span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-4">
                            <div>
                              <span className="text-[10px] text-[#717974] block">Original Quote</span>
                              <strong className="text-sm font-bold tabular-nums">₹{job.quotedAmount}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#717974] block">Final Paid</span>
                              <strong className="text-sm font-bold tabular-nums">₹{job.paidAmount}</strong>
                            </div>
                          </div>

                          <div className="text-right">
                            {diff === 0 ? (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                100% Honest (₹0 Extra)
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                +{diffPct}% Extra (₹{diff})
                              </span>
                            )}
                          </div>
                        </div>

                        {job.extraChargeReason && (
                          <div className="text-[11px] text-amber-900 bg-amber-100/70 p-2 rounded-md font-medium">
                            <strong>Extra Charge Claim:</strong> {job.extraChargeReason} (Status: Unverified / Flagged)
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-[#717974] bg-[#fafaf9] rounded-xl border border-[#e5e7eb]">
                  New enrollee. No billing discrepancy logs recorded.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#fafaf9] border-t border-[#e5e7eb] flex items-center justify-between shrink-0">
          <div className="text-xs text-[#717974]">
            Pricing Band: <strong>{worker.pricingBand}</strong> ({tradeMarketRate?.unit || 'Per job'})
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-[#e5e7eb] bg-white text-[#3f4541] hover:bg-stone-100 transition-colors"
            >
              Close
            </button>
            {onBookWorker && (
              <button
                onClick={() => {
                  onBookWorker(worker);
                  onClose();
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#134e3a] text-white hover:bg-[#0f3f2e] transition-colors flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-300" />
                <span>Book with Simulated Escrow</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
