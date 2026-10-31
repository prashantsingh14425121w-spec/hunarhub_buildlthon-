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
  FileText,
  Camera,
  Layers,
  CheckCircle2,
  Database,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Info,
  Sparkles,
  Zap,
  Lock,
} from 'lucide-react';

import {
  loadWorkers,
  loadPricingBands,
  loadMarketRates,
  loadAnswerKeys,
  loadWorkQualityGuidelines,
  resetWorkersData,
} from './data/dataLoader';
import { MANDATORY_CASE_STUDY_1, MANDATORY_CASE_STUDY_2 } from './data/starterData';
import { WorkerRecord, SupportedLanguage, Trade, CustomerRequirement } from './types';
import { generateAndRankBids, EvaluatedBid } from './data/bidEngine';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { CustomerHome } from './components/customer/CustomerHome';
import { ParsedRequirementConfirmation } from './components/requirement/ParsedRequirementConfirmation';
import { CompareWorkerBids } from './components/bids/CompareWorkerBids';
import { WorkerProfileModal } from './components/worker/WorkerProfileModal';
import { AiAnalysisStudio } from './components/ai/AiAnalysisStudio';
import { BookingEscrowView } from './components/escrow/BookingEscrowView';
import {
  getActiveBookingSession,
  createBooking,
  saveBookingSession,
  clearBookingSession,
} from './data/escrowStore';
import { BookingSession } from './types';

export default function App() {
  const [workers, setWorkers] = useState<WorkerRecord[]>(() => loadWorkers());
  const [currentView, setCurrentView] = useState<'landing' | 'customer_home' | 'inspector'>('customer_home');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [activeLocation, setActiveLocation] = useState<string>('Danapur, Patna');

  // Requirement & Bids Lifecycle State
  const [activeReqStep, setActiveReqStep] = useState<'idle' | 'confirming' | 'bids' | 'escrow_view'>('idle');
  const [pendingRequirement, setPendingRequirement] = useState<CustomerRequirement | null>(null);
  const [parserSource, setParserSource] = useState<string>('gemini-3.8-flash');
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [evaluatedBids, setEvaluatedBids] = useState<EvaluatedBid[]>([]);
  const [activeBookingSession, setActiveBookingSession] = useState<BookingSession | null>(() => getActiveBookingSession());

  // Inspector specific state
  const [activeTab, setActiveTab] = useState<'workers' | 'case_studies' | 'ai_studio' | 'pricing' | 'photos_key' | 'guidelines'>('workers');
  const [selectedTrade, setSelectedTrade] = useState<string>('All');
  const [selectedWorker, setSelectedWorker] = useState<WorkerRecord | null>(null);

  const pricingBands = useMemo(() => loadPricingBands(), []);
  const marketRates = useMemo(() => loadMarketRates(), []);
  const answerKeys = useMemo(() => loadAnswerKeys(), []);
  const qualityGuidelines = useMemo(() => loadWorkQualityGuidelines(), []);

  const filteredWorkers = useMemo(() => {
    if (selectedTrade === 'All') return workers;
    return workers.filter((w) => w.trade === selectedTrade);
  }, [workers, selectedTrade]);

  const handleResetData = () => {
    clearBookingSession();
    setActiveBookingSession(null);
    const fresh = resetWorkersData();
    setWorkers(fresh);
    setSelectedWorker(null);
  };

  const handlePostRequirementNav = (samplePrompt?: string) => {
    setCurrentView('customer_home');
    setActiveReqStep('idle');
    setTimeout(() => {
      const el = document.getElementById('requirement-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Called when user submits requirement from CustomerHome
  const handleRequirementSubmit = async (data: {
    rawInput: string;
    trade: Trade;
    area: string;
    urgency: 'Immediate' | 'Today' | 'Within 2-3 Days' | 'Flexible';
  }) => {
    setIsParsing(true);
    const tempReq: CustomerRequirement = {
      id: `req-${Date.now()}`,
      rawInput: data.rawInput,
      trade: data.trade,
      task: data.trade === 'Electrician' && data.rawInput.toLowerCase().includes('mcb') ? 'MCB fault / tripping diagnosis' : 'General Skilled Repair',
      area: data.area,
      urgency: data.urgency,
      quantity: '1 panel / circuit',
      details: data.rawInput,
      createdAt: new Date().toISOString(),
    };

    setPendingRequirement(tempReq);
    setActiveReqStep('confirming');

    // Attempt server-side Gemini parsing
    try {
      const res = await fetch('/api/parse-requirement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawInput: data.rawInput, userLocation: data.area }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setParserSource(json.source || 'gemini-3.8-flash');
          setPendingRequirement((prev) =>
            prev
              ? {
                  ...prev,
                  trade: (json.data.trade as Trade) || prev.trade,
                  task: json.data.task || prev.task,
                  area: json.data.area || prev.area,
                  urgency: (json.data.urgency as any) || prev.urgency,
                  quantity: json.data.quantity || prev.quantity,
                  details: json.data.details || prev.details,
                  detectedLanguage: json.data.detectedLanguage,
                }
              : null
          );
        }
      } else {
        setParserSource('local-nlp-engine');
      }
    } catch (err) {
      console.warn('Using client-side fallback parsing:', err);
      setParserSource('local-nlp-engine');
    } finally {
      setIsParsing(false);
    }
  };

  // Called when user confirms parsed fields
  const handleConfirmRequirement = (confirmed: CustomerRequirement) => {
    setPendingRequirement(confirmed);
    const rankedBids = generateAndRankBids(confirmed);
    setEvaluatedBids(rankedBids);
    setActiveReqStep('bids');
  };

  const handleSelectWorkerForBooking = (bid: EvaluatedBid) => {
    if (!pendingRequirement) {
      // Fallback requirement if booking directly
      const fallbackReq: CustomerRequirement = {
        id: `req-${Date.now()}`,
        rawInput: 'MCB baar baar gir raha hai, bijli nahi hai, aaj hi chahiye.',
        trade: bid.worker.trade,
        task: 'MCB fault / tripping diagnosis',
        area: activeLocation,
        urgency: 'Immediate',
        quantity: '1 panel / circuit',
        details: 'MCB breaker tripping diagnostic & panel repair',
        createdAt: new Date().toISOString(),
      };
      const session = createBooking(fallbackReq, bid.worker, bid.quotedPrice);
      setActiveBookingSession(session);
      setActiveReqStep('escrow_view');
      return;
    }
    const session = createBooking(pendingRequirement, bid.worker, bid.quotedPrice);
    setActiveBookingSession(session);
    setActiveReqStep('escrow_view');
  };

  const handleLaunchCaseStudy1 = () => {
    setCurrentView('customer_home');
    setActiveReqStep('idle');
    handleRequirementSubmit({
      rawInput: MANDATORY_CASE_STUDY_1.rawRequirement,
      trade: MANDATORY_CASE_STUDY_1.parsedExpected.trade,
      area: MANDATORY_CASE_STUDY_1.area + ', Patna',
      urgency: MANDATORY_CASE_STUDY_1.parsedExpected.urgency,
    });
  };

  const handleLaunchCaseStudy2 = () => {
    const ramesh = workers.find((w) => w.id === 'W001') || workers[0];
    const caseReq: CustomerRequirement = {
      id: `req-case2-${Date.now()}`,
      rawInput: 'MCB baar baar gir raha hai, bijli nahi hai, aaj hi chahiye.',
      trade: 'Electrician',
      task: 'MCB breaker tripping diagnostic & panel rewiring',
      area: 'Danapur, Patna',
      urgency: 'Immediate',
      quantity: '1 panel / circuit',
      details: 'MCB breaker tripping diagnostic & panel rewiring',
      createdAt: new Date().toISOString(),
    };
    const session = createBooking(caseReq, ramesh, 480);
    // Move to work_in_progress so the user can test the photo + feedback submission directly
    session.status = 'work_in_progress';
    saveBookingSession(session);
    setActiveBookingSession(session);
    setCurrentView('customer_home');
    setActiveReqStep('escrow_view');
  };

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1f1d] flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onViewChange={(v) => {
          setCurrentView(v);
          if (v !== 'customer_home') {
            setActiveReqStep('idle');
          }
        }}
        onPostRequirementClick={() => handlePostRequirementNav()}
        onNavigateSection={scrollToSection}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Tier Status Banner - Tier 9 Complete */}
      <div className="bg-[#134e3a] text-white px-4 sm:px-8 py-2.5 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-300" /> All 9 Tiers Complete
            </span>
            <span className="font-medium">
              <strong>HunarHub Master MVP:</strong> Zero-star evidence engine, value-ranked bids, simulated escrow room, dynamic moving-average recalculator, and 10 Indian languages.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <button
              onClick={handleLaunchCaseStudy1}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-emerald-100 font-semibold cursor-pointer border border-emerald-400/30 flex items-center gap-1 transition"
            >
              <Zap className="w-3 h-3 text-emerald-300" />
              Run Case Study 1 (Neha MCB)
            </button>

            <button
              onClick={handleLaunchCaseStudy2}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-emerald-100 font-semibold cursor-pointer border border-emerald-400/30 flex items-center gap-1 transition"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              Run Case Study 2 (Ramesh Escrow)
            </button>

            <button
              onClick={() => {
                setCurrentView('inspector');
                setActiveTab('case_studies');
              }}
              className="px-2 py-1 rounded hover:bg-white/10 text-emerald-200 hover:text-white font-medium cursor-pointer transition"
            >
              Inspect Benchmarks →
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: LANDING PAGE */}
      {currentView === 'landing' && (
        <main className="flex-1">
          <LandingPage
            onPostRequirement={(prompt) => {
              setCurrentView('customer_home');
              setActiveReqStep('idle');
              setTimeout(() => {
                const el = document.getElementById('requirement-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            onExploreCaseStudy={() => {
              setCurrentView('inspector');
              setActiveTab('case_studies');
            }}
          />
        </main>
      )}

      {/* VIEW 2: CUSTOMER HOME & REQUIREMENT WORKFLOW */}
      {currentView === 'customer_home' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
          {/* STEP 1: Main Customer Home (when no requirement is being confirmed/evaluated) */}
          {activeReqStep === 'idle' && (
            <CustomerHome
              currentLanguage={currentLanguage}
              workers={workers}
              activeLocation={activeLocation}
              onLocationChange={setActiveLocation}
              activeBooking={activeBookingSession}
              onOpenBooking={() => setActiveReqStep('escrow_view')}
              onSubmitRequirement={handleRequirementSubmit}
              onViewWorkerProfile={(worker) => {
                setSelectedWorker(worker);
                setCurrentView('inspector');
                setActiveTab('workers');
              }}
            />
          )}

          {/* STEP 2: Editable Parsed Confirmation Section */}
          {activeReqStep === 'confirming' && pendingRequirement && (
            <ParsedRequirementConfirmation
              initialData={pendingRequirement}
              parserSource={parserSource}
              isParsing={isParsing}
              onConfirmRequirement={handleConfirmRequirement}
              onCancel={() => setActiveReqStep('idle')}
            />
          )}

          {/* STEP 3: Compare Worker Bids (Value Ranked) */}
          {activeReqStep === 'bids' && pendingRequirement && (
            <CompareWorkerBids
              requirement={pendingRequirement}
              bids={evaluatedBids}
              onSelectWorkerForBooking={handleSelectWorkerForBooking}
              onViewWorkerProfile={(worker) => {
                setSelectedWorker(worker);
                setCurrentView('inspector');
                setActiveTab('workers');
              }}
              onBackToRequirement={() => setActiveReqStep('confirming')}
            />
          )}

          {/* STEP 4: Booking & Simulated Escrow Lifecycle */}
          {activeReqStep === 'escrow_view' && activeBookingSession && (
            <BookingEscrowView
              session={activeBookingSession}
              worker={
                workers.find((w) => w.id === activeBookingSession.selectedWorkerId) ||
                workers[0]
              }
              onSessionUpdated={(updated) => {
                setActiveBookingSession(updated);
                setWorkers(loadWorkers());
              }}
              onReturnToDashboard={() => {
                setActiveReqStep('idle');
                setWorkers(loadWorkers());
              }}
              onViewWorkerProfile={(wId) => {
                const w = workers.find((x) => x.id === wId);
                if (w) {
                  setSelectedWorker(w);
                }
              }}
            />
          )}
        </main>
      )}

      {/* VIEW 3: DATA ARCHITECTURE & TEST ENGINE INSPECTOR */}
      {currentView === 'inspector' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#e5e7eb]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                  Data Architecture Mode
                </span>
                <span className="text-xs text-[#717974]">
                  Inspect records, mathematical scores, and case studies
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1f1d] mt-1">
                Underlying Starter Data & Score Engine Inspector
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetData}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#3f4541] bg-white border border-[#e5e7eb] hover:bg-[#f5f5f3]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Starter Data
              </button>
              <button
                onClick={() => {
                  setCurrentView('customer_home');
                  setActiveReqStep('idle');
                }}
                className="px-3.5 py-1.5 rounded-md text-xs font-bold bg-[#134e3a] text-white hover:bg-[#0f3f2e]"
              >
                Return to Customer Dashboard
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#e5e7eb] pb-3">
            <button
              onClick={() => setActiveTab('workers')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'workers'
                  ? 'bg-[#134e3a] text-white shadow-sm'
                  : 'bg-white text-[#3f4541] border border-[#e5e7eb] hover:bg-[#f5f5f3]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Workers & Scores ({workers.length})
            </button>
            <button
              onClick={() => setActiveTab('case_studies')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'case_studies'
                  ? 'bg-[#134e3a] text-white shadow-sm'
                  : 'bg-white text-[#3f4541] border border-[#e5e7eb] hover:bg-[#f5f5f3]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              Mandatory Case Studies
            </button>
            <button
              onClick={() => setActiveTab('ai_studio')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'ai_studio'
                  ? 'bg-[#134e3a] text-white shadow-sm'
                  : 'bg-white text-[#3f4541] border border-[#e5e7eb] hover:bg-[#f5f5f3]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Vision & Feedback Studio (Live Tests)</span>
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'pricing'
                  ? 'bg-[#134e3a] text-white shadow-sm'
                  : 'bg-white text-[#3f4541] border border-[#e5e7eb] hover:bg-[#f5f5f3]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Pricing Bands & Market Rates
            </button>
            <button
              onClick={() => setActiveTab('photos_key')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'photos_key'
                  ? 'bg-[#134e3a] text-white shadow-sm'
                  : 'bg-white text-[#3f4541] border border-[#e5e7eb] hover:bg-[#f5f5f3]'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              Evaluation Photos Answer Key (6)
            </button>
            <button
              onClick={() => setActiveTab('guidelines')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'guidelines'
                  ? 'bg-[#134e3a] text-white shadow-sm'
                  : 'bg-white text-[#3f4541] border border-[#e5e7eb] hover:bg-[#f5f5f3]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Work Quality Guide
            </button>
          </div>

          {/* TAB 1: WORKERS */}
          {activeTab === 'workers' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#e5e7eb]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#717974] mr-1">Filter Trade:</span>
                  {['All', 'Electrician', 'Plumber', 'Mason', 'Carpenter', 'Painter', 'AC Technician'].map((trade) => (
                    <button
                      key={trade}
                      onClick={() => setSelectedTrade(trade)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedTrade === trade
                          ? 'bg-[#134e3a] text-white'
                          : 'bg-[#f5f5f3] text-[#3f4541] hover:bg-[#e7e9e5]'
                      }`}
                    >
                      {trade}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-[#717974]">
                  Showing {filteredWorkers.length} of {workers.length} enrolled workers
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredWorkers.map((worker) => (
                  <div
                    key={worker.id}
                    onClick={() => setSelectedWorker(worker)}
                    className={`bg-white rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedWorker?.id === worker.id
                        ? 'border-[#134e3a] ring-2 ring-[#134e3a]/10 shadow-sm'
                        : 'border-[#e5e7eb] hover:border-[#c0c9c2]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={worker.profilePhoto}
                          alt={worker.name}
                          className="w-12 h-12 rounded-full object-cover border border-[#e5e7eb]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[#1c1f1d] text-base">{worker.name}</h3>
                            <span className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-stone-100 text-[#717974]">
                              {worker.id}
                            </span>
                          </div>
                          <p className="text-xs text-[#717974]">{worker.trade} • {worker.experienceYears} yrs exp</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-baseline justify-end gap-1">
                          <span className="text-2xl font-extrabold text-[#134e3a] tabular-nums">
                            {worker.hunarScore}
                          </span>
                          <span className="text-[11px] text-[#717974] font-medium">/100</span>
                        </div>
                        <span className={`inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${pricingBands[worker.pricingBand]?.badgeClass || 'bg-stone-100'}`}>
                          {worker.pricingBand} Band
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-[#3f4541] line-clamp-2 leading-relaxed">
                      {worker.bio}
                    </p>

                    {worker.extraChargeWarning && (
                      <div className="mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 flex items-start gap-2 text-xs text-amber-900">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{worker.extraChargeWarning}</span>
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-[#f3f4f0] space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#717974]">
                        <span>Quality (35%)</span>
                        <span className="font-semibold text-[#1c1f1d] tabular-nums">{worker.breakdown.workQuality}/100</span>
                      </div>
                      <div className="w-full bg-[#f3f4f0] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#134e3a] h-1.5 rounded-full" style={{ width: `${worker.breakdown.workQuality}%` }} />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#717974]">
                        <span>Price Honesty (20%)</span>
                        <span className={`font-semibold tabular-nums ${worker.breakdown.priceHonesty < 60 ? 'text-amber-700' : 'text-[#1c1f1d]'}`}>
                          {worker.breakdown.priceHonesty}/100
                        </span>
                      </div>
                      <div className="w-full bg-[#f3f4f0] h-1.5 rounded-full overflow-hidden">
                        <div className={`h-1.5 rounded-full ${worker.breakdown.priceHonesty < 60 ? 'bg-amber-600' : 'bg-[#059669]'}`} style={{ width: `${worker.breakdown.priceHonesty}%` }} />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#717974]">
                        <span>Punctuality (15%)</span>
                        <span className="font-semibold text-[#1c1f1d] tabular-nums">{worker.breakdown.punctuality}/100</span>
                      </div>
                    </div>

                    {worker.evidenceQuotes.length > 0 && (
                      <div className="mt-3 pt-2 text-[11px] text-[#717974] italic border-t border-[#f3f4f0]">
                        "{worker.evidenceQuotes[0].quote}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CASE STUDIES */}
          {activeTab === 'case_studies' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Mandatory Case Study 1
                    </span>
                    <h3 className="text-lg font-bold text-[#1c1f1d] mt-1">Customer Neha: MCB Fault at Danapur</h3>
                    <p className="text-xs text-[#717974]">
                      Input: <span className="italic font-medium text-[#1c1f1d]">"{MANDATORY_CASE_STUDY_1.rawRequirement}"</span> • Location: Danapur
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg text-xs text-[#3f4541] border border-stone-200">
                  <strong>Expected Structured Extraction:</strong> Electrician · MCB fault · Urgent / Immediate · Danapur
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MANDATORY_CASE_STUDY_1.expectedBids.map((bid) => (
                    <div
                      key={bid.workerId}
                      className={`p-4 rounded-xl border ${
                        bid.isRecommended
                          ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500'
                          : bid.extraChargeWarning
                          ? 'border-amber-300 bg-amber-50/30'
                          : 'border-[#e5e7eb] bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#134e3a] text-white flex items-center justify-center text-xs font-bold">
                              #{bid.rank}
                            </span>
                            <span className="font-bold text-sm text-[#1c1f1d]">{bid.workerName}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-stone-100 rounded text-[#717974]">
                              {bid.workerId}
                            </span>
                          </div>
                          <span className="text-xs text-[#717974]">{bid.trade} • {bid.pricingBand} Band</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-extrabold text-[#134e3a] tabular-nums">₹{bid.price}</div>
                          <div className="text-[11px] font-semibold text-[#059669]">Score {bid.hunarScore}/100</div>
                        </div>
                      </div>

                      {bid.extraChargeWarning && (
                        <div className="mt-3 p-2 rounded bg-amber-100/70 border border-amber-300 text-[11px] text-amber-900 flex items-start gap-1.5 font-medium">
                          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <span>{bid.extraChargeWarning}</span>
                        </div>
                      )}

                      <div className="mt-3 text-xs text-[#3f4541] bg-white/70 p-2.5 rounded-lg border border-[#e5e7eb]">
                        <strong>Ranking Rationale:</strong> {bid.recommendationReason}
                      </div>

                      {bid.isRecommended && (
                        <div className="mt-2 text-xs font-bold text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Recommended by HunarHub Evidence Engine (ranks above cheaper Raju)
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleLaunchCaseStudy1}
                    className="px-4 py-2 rounded-lg bg-[#134e3a] hover:bg-[#0f3f2f] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-300" />
                    Test Case Study 1 in Live UI
                  </button>
                </div>
              </div>

              {/* MANDATORY CASE STUDY 2 */}
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                      Mandatory Case Study 2
                    </span>
                    <h3 className="text-lg font-bold text-[#1c1f1d] mt-1">
                      {MANDATORY_CASE_STUDY_2.title}
                    </h3>
                    <p className="text-xs text-[#717974]">
                      Worker: <span className="font-semibold text-[#1c1f1d]">{MANDATORY_CASE_STUDY_2.workerName} ({MANDATORY_CASE_STUDY_2.workerId})</span> • Service: {MANDATORY_CASE_STUDY_2.jobExecution.service}
                    </p>
                  </div>

                  <button
                    onClick={handleLaunchCaseStudy2}
                    className="self-start sm:self-auto px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                    Launch Ramesh's Escrow Room
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Step 1: Baseline */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-2">
                    <div className="font-bold text-[#1c1f1d] text-sm flex items-center justify-between">
                      <span>1. Initial Baseline</span>
                      <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800 font-mono text-[10px]">
                        28 Jobs
                      </span>
                    </div>
                    <div className="text-2xl font-extrabold text-[#134e3a] tabular-nums">
                      92 <span className="text-xs font-semibold text-[#717974]">/ 100</span>
                    </div>
                    <div className="space-y-1 text-[11px] text-[#3f4541]">
                      <div>Quality: <strong>94</strong> · Price Honesty: <strong>95</strong></div>
                      <div>Punctuality: <strong>90</strong> · Behaviour: <strong>92</strong></div>
                      <div>Reliability: <strong>89</strong></div>
                    </div>
                  </div>

                  {/* Step 2: Evidence Submission */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-2">
                    <div className="font-bold text-[#1c1f1d] text-sm flex items-center justify-between">
                      <span>2. Submitted Evidence</span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                        AI Verified
                      </span>
                    </div>
                    <div className="text-[11px] text-[#3f4541] space-y-1.5">
                      <div className="bg-white p-2 rounded border border-stone-200">
                        <strong className="text-emerald-700">Photo Proof:</strong> {MANDATORY_CASE_STUDY_2.submittedEvidence.photoId}
                        <p className="text-[10px] text-[#717974] mt-0.5">{MANDATORY_CASE_STUDY_2.submittedEvidence.photoDescription}</p>
                      </div>
                      <div className="bg-white p-2 rounded border border-stone-200">
                        <strong className="text-blue-700">Customer Feedback ({MANDATORY_CASE_STUDY_2.submittedEvidence.customerLanguage}):</strong>
                        <p className="text-[10px] italic text-[#1c1f1d] mt-0.5">"{MANDATORY_CASE_STUDY_2.submittedEvidence.customerFeedback}"</p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Recalculated Outcome */}
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/40 space-y-2">
                    <div className="font-bold text-emerald-900 text-sm flex items-center justify-between">
                      <span>3. Recalculated State</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 text-[10px] font-bold">
                        29 Jobs (+1)
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-[#134e3a] tabular-nums">93</span>
                      <span className="text-xs font-bold text-emerald-700">{MANDATORY_CASE_STUDY_2.recalculatedState.scoreDelta}</span>
                    </div>
                    <div className="text-[11px] text-emerald-900 font-medium">
                      {MANDATORY_CASE_STUDY_2.recalculatedState.escrowOutcome}
                    </div>
                    <p className="text-[10px] text-stone-500 font-mono pt-1 border-t border-emerald-200">
                      {MANDATORY_CASE_STUDY_2.recalculatedState.mathematicalFormula}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: AI VISION & FEEDBACK STUDIO */}
          {activeTab === 'ai_studio' && (
            <AiAnalysisStudio />
          )}

          {/* TAB 3: PRICING */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.values(pricingBands).map((band) => (
                  <div key={band.band} className="bg-white rounded-xl border border-[#e5e7eb] p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${band.badgeClass}`}>
                        {band.band}
                      </span>
                      <span className="text-xs text-[#717974] font-medium">Score {band.minScore}–{band.maxScore}</span>
                    </div>
                    <p className="text-xs text-[#3f4541] leading-relaxed">{band.description}</p>
                    <div className="pt-2 border-t border-[#f3f4f0] text-xs">
                      <span className="text-[#717974]">Allowed Range vs Market Rate:</span>
                      <div className="font-bold text-[#134e3a] tabular-nums mt-0.5">
                        {band.multiplierVsBase.min * 100}% – {band.multiplierVsBase.max * 100}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PHOTOS ANSWER KEY */}
          {activeTab === 'photos_key' && (
            <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
              <h3 className="text-base font-bold text-[#1c1f1d] mb-4">Evaluation Job Photographs Answer Key</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {answerKeys.map((item) => (
                  <div key={item.photoId} className="p-4 rounded-xl border border-[#e5e7eb] bg-[#fafaf9] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-[#717974]">{item.photoId}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                        {item.expectedQuality}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-[#1c1f1d]">{item.trade} • {item.filename}</div>
                    <p className="text-xs text-[#3f4541]">{item.expectedEvidence}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GUIDELINES */}
          {activeTab === 'guidelines' && (
            <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 space-y-6">
              <h3 className="text-base font-bold text-[#1c1f1d]">Work Quality Evaluation Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {qualityGuidelines.map((guide, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[#e5e7eb] bg-[#fafaf9] space-y-3">
                    <span className="font-bold text-sm text-[#134e3a]">{guide.trade}</span>
                    <h4 className="text-xs font-semibold text-[#1c1f1d]">{guide.component}</h4>
                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 block mb-1">Good Quality:</span>
                      <ul className="text-xs text-[#3f4541] space-y-1 list-disc pl-4">
                        {guide.goodIndicators.map((ind, i) => (
                          <li key={i}>{ind}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      )}

      {/* Worker Profile Modal */}
      {selectedWorker && (
        <WorkerProfileModal
          worker={selectedWorker}
          onClose={() => setSelectedWorker(null)}
          onBookWorker={(w) => {
            const req: CustomerRequirement = pendingRequirement || {
              id: `req-${Date.now()}`,
              rawInput: `${w.trade} service in ${activeLocation}`,
              trade: w.trade,
              task: `${w.trade} standard service`,
              area: activeLocation,
              urgency: 'Today',
              quantity: '1 job',
              details: `Direct booking with ${w.name}`,
              createdAt: new Date().toISOString(),
            };
            const session = createBooking(req, w, w.trade === 'Electrician' ? 480 : 500);
            setActiveBookingSession(session);
            setSelectedWorker(null);
            setCurrentView('customer_home');
            setActiveReqStep('escrow_view');
          }}
        />
      )}

      {/* Footer */}
      <Footer
        onOpenDataInspector={() =>
          setCurrentView((prev) => (prev === 'inspector' ? 'customer_home' : 'inspector'))
        }
        onNavigateSection={scrollToSection}
      />
    </div>
  );
}
