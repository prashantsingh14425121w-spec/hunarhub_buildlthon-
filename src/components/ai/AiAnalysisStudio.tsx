/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Camera,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  RefreshCw,
  Upload,
  ArrowRight,
  ShieldCheck,
  Scale,
} from 'lucide-react';
import { loadAnswerKeys, loadWorkQualityGuidelines } from '../../data/dataLoader';
import { JobPhotoAnswerKeyRecord } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface PhotoAnalysisResult {
  quality: 'Good' | 'Average' | 'Poor';
  explanation: string;
  visibleEvidence: string;
  tradeAssessment: string;
  confidence: number;
  answerKeyMatch?: boolean;
  source: string;
}

interface FeedbackAnalysisResult {
  punctuality: { sentiment: string; score: number | null; quote: string };
  behaviour: { sentiment: string; score: number | null; quote: string };
  cleanliness: { sentiment: string; score: number | null; quote: string };
  communication: { sentiment: string; score: number | null; quote: string };
  priceHonesty: { sentiment: string; score: number | null; quote: string };
  extraChargeJustified: boolean;
  summaryExplanation: string;
  source: string;
}

export function AiAnalysisStudio() {
  const answerKeys = loadAnswerKeys();
  const guidelines = loadWorkQualityGuidelines();

  // Vision Analysis State
  const [photoResults, setPhotoResults] = useState<Record<string, PhotoAnalysisResult>>({});
  const [loadingPhotos, setLoadingPhotos] = useState<Record<string, boolean>>({});
  const [analyzingAll, setAnalyzingAll] = useState(false);

  // Custom Image Upload State
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);
  const [customTrade, setCustomTrade] = useState('Electrician');
  const [customResult, setCustomResult] = useState<PhotoAnalysisResult | null>(null);
  const [customError, setCustomError] = useState<string | null>(null);
  const [customLoading, setCustomLoading] = useState(false);

  // Feedback Analysis State
  const [feedbackInput, setFeedbackInput] = useState(
    'time pe aaye, achhe se samjhaya, saaf-safai karke gaye.'
  );
  const [feedbackTrade, setFeedbackTrade] = useState('Electrician');
  const [feedbackQuoted, setFeedbackQuoted] = useState(480);
  const [feedbackPaid, setFeedbackPaid] = useState(480);
  const [extraReason, setExtraReason] = useState('');
  const [feedbackResult, setFeedbackResult] = useState<FeedbackAnalysisResult | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  // Map photo IDs to representative display images
  const photoImageUrls: Record<string, string> = {
    photo_01_ramesh_panel: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    photo_02_raju_mcb_quickfix: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    photo_03_mukesh_masonry_tiles: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    photo_04_plumbing_joint_leak: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    photo_05_switchboard_flush: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    photo_06_wall_patch_ridge: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80',
  };

  const handleAnalyzePhoto = async (photo: JobPhotoAnswerKeyRecord) => {
    setLoadingPhotos((prev) => ({ ...prev, [photo.photoId]: true }));
    try {
      const res = await fetch('/api/analyze-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photoId: photo.photoId,
          trade: photo.trade,
          taskDescription: photo.caseStudyNote || photo.filename,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setPhotoResults((prev) => ({
          ...prev,
          [photo.photoId]: json.data,
        }));
      }
    } catch (err) {
      console.error('Error analyzing photo:', err);
    } finally {
      setLoadingPhotos((prev) => ({ ...prev, [photo.photoId]: false }));
    }
  };

  const handleAnalyzeAllPhotos = async () => {
    setAnalyzingAll(true);
    for (const photo of answerKeys) {
      await handleAnalyzePhoto(photo);
    }
    setAnalyzingAll(false);
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImageBase64(reader.result as string);
        setCustomResult(null);
        setCustomError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeCustomPhoto = async () => {
    if (!customImageBase64) return;
    setCustomLoading(true);
    setCustomError(null);
    try {
      const res = await fetch('/api/analyze-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: customImageBase64,
          trade: customTrade,
          taskDescription: 'Custom uploaded completed work inspection',
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setCustomResult(json.data);
      } else {
        const errJson = await res.json().catch(() => ({}));
        setCustomError(errJson.error || 'AI Vision Verification Unavailable. Workmanship could not be verified automatically.');
        setCustomResult(null);
      }
    } catch (err: any) {
      console.error('Custom photo analysis error:', err);
      setCustomError('Verification unavailable due to connection failure. Please retry.');
      setCustomResult(null);
    } finally {
      setCustomLoading(false);
    }
  };

  const handleAnalyzeFeedback = async (
    text = feedbackInput,
    quoted = feedbackQuoted,
    paid = feedbackPaid,
    extra = extraReason
  ) => {
    setFeedbackLoading(true);
    try {
      const res = await fetch('/api/analyze-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedbackText: text,
          trade: feedbackTrade,
          quotedAmount: quoted,
          paidAmount: paid,
          extraChargeReason: extra,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setFeedbackResult(json.data);
      }
    } catch (err) {
      console.error('Feedback analysis error:', err);
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#134e3a] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Vision & Feedback Analysis Studio</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1f1d]">
              Ground Truth Verification & Hinglish Sentiment Engine
            </h2>
            <p className="text-xs sm:text-sm text-[#717974]">
              Validates all 6 evaluation job photographs against <code>job_photos_ANSWER_KEY.csv</code> and extracts multi-dimensional feedback evidence without star ratings.
            </p>
          </div>

          <button
            onClick={handleAnalyzeAllPhotos}
            disabled={analyzingAll}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#134e3a] text-white hover:bg-[#0f3f2e] transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${analyzingAll ? 'animate-spin' : ''}`} />
            <span>{analyzingAll ? 'Analyzing All 6 Photos...' : 'Run All 6 Vision Tests'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: THE 6 BENCHMARK EVALUATION PHOTOGRAPHS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#1c1f1d] flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#134e3a]" />
              <span>Benchmark Expected Answer Keys (6 Cases)</span>
            </h3>
            <p className="text-xs text-[#717974]">
              <strong>Benchmark Mode:</strong> Uses the verified ground-truth dataset from <code>job_photos_ANSWER_KEY.csv</code> to inspect expected answers for evaluation.
            </p>
          </div>
          <span className="text-xs font-bold text-[#059669]">
            {Object.keys(photoResults).length} of 6 Loaded
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {answerKeys.map((photo) => {
            const result = photoResults[photo.photoId];
            const isLoading = loadingPhotos[photo.photoId];
            const imgUrl = photoImageUrls[photo.photoId] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';

            return (
              <div
                key={photo.photoId}
                className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Photo Preview */}
                  <div className="relative h-44 w-full bg-stone-900">
                    <ImageWithFallback
                      src={imgUrl}
                      alt={photo.filename}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                      {photo.photoId}
                    </span>
                    <span
                      className={`absolute top-2 right-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        photo.expectedQuality === 'Good'
                          ? 'bg-emerald-500 text-white'
                          : photo.expectedQuality === 'Average'
                          ? 'bg-amber-400 text-amber-950'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      Benchmark: {photo.expectedQuality}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-3 text-xs">
                    <div>
                      <div className="font-bold text-[#1c1f1d]">{photo.trade} • {photo.filename}</div>
                      <p className="text-[11px] text-[#717974] mt-0.5">{photo.caseStudyNote}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#fafaf9] border border-[#e5e7eb] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#717974] block">
                        Expected Ground Truth Evidence:
                      </span>
                      <p className="text-[#3f4541] text-[11px] leading-relaxed">
                        {photo.expectedEvidence}
                      </p>
                    </div>

                    {/* Benchmark Result Display */}
                    {result ? (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-950 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Expected Quality: {result.quality}</span>
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                            Ground Truth Key
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-900 leading-relaxed">
                          <strong>Benchmark Evidence:</strong> {result.visibleEvidence}
                        </p>
                        <div className="text-[10px] text-emerald-700 flex justify-between pt-1 border-t border-emerald-200">
                          <span>Ground Truth Confidence: {(result.confidence * 100).toFixed(0)}%</span>
                          <span>Source: CSV Key</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-stone-50 border border-dashed border-stone-200 text-center text-[#717974] text-[11px]">
                        Click below to load benchmark expected answer
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleAnalyzePhoto(photo)}
                    disabled={isLoading}
                    className="w-full py-2 rounded-xl text-xs font-bold border border-[#134e3a] text-[#134e3a] hover:bg-[#134e3a] hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>{isLoading ? 'Loading Benchmark...' : 'Load Benchmark Expected Answer'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: LIVE AI VISION ANALYSIS (REAL GEMINI VISION) */}
      <section className="bg-white rounded-2xl border border-[#e5e7eb] p-6 space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[11px] font-bold">
            <Sparkles className="w-3 h-3 text-blue-700" />
            <span>Live Analysis Mode</span>
          </div>
          <h3 className="text-base font-bold text-[#1c1f1d] flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#134e3a]" />
            <span>Real-Time Gemini 3.8 Flash Vision Inspection</span>
          </h3>
          <p className="text-xs text-[#717974]">
            Upload any photograph of physical trade work. Real Gemini vision evaluates craftsmanship against trade guidelines in real time. If the image cannot be verified or the API is unavailable, failure states are handled safely without fake fallbacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <label className="block w-full border-2 border-dashed border-[#e5e7eb] rounded-xl p-6 text-center hover:border-[#134e3a] cursor-pointer bg-[#fafaf9] transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomFileUpload}
                className="hidden"
              />
              <Upload className="w-8 h-8 text-[#717974] mx-auto mb-2" />
              <span className="text-xs font-bold text-[#134e3a] block">
                Click to browse photograph
              </span>
              <span className="text-[11px] text-[#717974]">PNG, JPG, WebP supported</span>
            </label>

            {customImageBase64 && (
              <div className="relative h-48 w-full rounded-xl overflow-hidden border border-[#e5e7eb]">
                <img
                  src={customImageBase64}
                  alt="Custom preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex gap-2">
              <select
                value={customTrade}
                onChange={(e) => setCustomTrade(e.target.value)}
                className="flex-1 p-2 rounded-xl text-xs font-semibold bg-[#fafaf9] border border-[#e5e7eb]"
              >
                {['Electrician', 'Plumber', 'Mason', 'Carpenter', 'Painter', 'AC Technician'].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAnalyzeCustomPhoto}
                disabled={!customImageBase64 || customLoading}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#134e3a] text-white hover:bg-[#0f3f2e] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{customLoading ? 'Analyzing Image...' : 'Audit with Gemini Vision'}</span>
              </button>
            </div>
          </div>

          <div>
            {customError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-red-900">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Verification Unavailable</span>
                </div>
                <p className="text-red-800 text-[11px] leading-relaxed">
                  {customError}
                </p>
                <p className="text-red-700 text-[10px]">
                  Unverified images are not given artificial pass scores. Please check camera focus or retry.
                </p>
              </div>
            )}

            {customResult && !customError && (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-emerald-950">
                    Live Audit Result: {customResult.quality} Quality
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                    Confidence: {(customResult.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-[#3f4541] leading-relaxed">
                  <strong>Explanation:</strong> {customResult.explanation}
                </p>
                <p className="text-[#3f4541] leading-relaxed">
                  <strong>Visible Evidence:</strong> {customResult.visibleEvidence}
                </p>
                <p className="text-[#3f4541] leading-relaxed">
                  <strong>Trade Assessment:</strong> {customResult.tradeAssessment}
                </p>
                <div className="text-[10px] text-[#717974] pt-2 border-t border-emerald-200 flex justify-between">
                  <span>Engine: {customResult.source}</span>
                  <span>Live Gemini 3.8 Flash</span>
                </div>
              </div>
            )}

            {!customResult && !customError && (
              <div className="p-8 rounded-xl bg-[#fafaf9] border border-stone-200 text-center text-xs text-[#717974]">
                Upload an image and click "Audit with Gemini Vision" to inspect live vision analysis.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: HINGLISH CUSTOMER FEEDBACK & HONESTY ANALYZER */}
      <section className="bg-white rounded-2xl border border-[#e5e7eb] p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-[#1c1f1d] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#134e3a]" />
            <span>AI Customer Feedback & Extra-Charge Justification Analyzer</span>
          </h3>
          <p className="text-xs text-[#717974]">
            Evaluates customer reviews in Hindi, Hinglish, or English across 5 dimensions and detects billing honesty without stars.
          </p>
        </div>

        {/* Preset Hinglish Review Buttons */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-[#717974]">Sample Benchmark Reviews:</span>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => {
                const text = 'time pe aaye, achhe se samjhaya, saaf-safai karke gaye.';
                setFeedbackInput(text);
                setFeedbackQuoted(480);
                setFeedbackPaid(480);
                setExtraReason('');
                handleAnalyzeFeedback(text, 480, 480, '');
              }}
              className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-medium text-left"
            >
              ✅ Case Study 2: Neha on Ramesh ("time pe aaye, achhe se samjhaya...")
            </button>
            <button
              onClick={() => {
                const text = 'Pehle ₹300 bola, fir kaam kholne ke baad bola wire jal gaya hai ₹550 bina bill ke liya.';
                setFeedbackInput(text);
                setFeedbackQuoted(300);
                setFeedbackPaid(550);
                setExtraReason('Wire melted inside wall claim');
                handleAnalyzeFeedback(text, 300, 550, 'Wire melted inside wall claim');
              }}
              className="px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-medium text-left"
            >
              ⚠️ Raju Deceptive Markup ("Pehle ₹300 bola, fir ₹550 bina bill ke...")
            </button>
            <button
              onClick={() => {
                const text = 'Tile ekdum laser level jaisi lagayi hai, craftsmanship bohot shaandar hai par 2 din ka kaam 5 din me khatam kiya.';
                setFeedbackInput(text);
                setFeedbackQuoted(2400);
                setFeedbackPaid(2400);
                setExtraReason('');
                handleAnalyzeFeedback(text, 2400, 2400, '');
              }}
              className="px-3 py-1.5 rounded-lg border border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-900 font-medium text-left"
            >
              🧱 Case Study 3: Mukesh on Tile Quality vs Delay
            </button>
          </div>
        </div>

        {/* Interactive Input Form */}
        <div className="space-y-4">
          <textarea
            rows={3}
            value={feedbackInput}
            onChange={(e) => setFeedbackInput(e.target.value)}
            className="w-full p-4 rounded-xl border border-[#e5e7eb] bg-[#fafaf9] text-sm text-[#1c1f1d] focus:ring-2 focus:ring-[#134e3a]/20"
            placeholder="Type review in Hindi/Hinglish (e.g. time pe aaye, achhe se samjhaya)..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold text-[#717974] uppercase block mb-1">
                Quoted Amount (₹)
              </label>
              <input
                type="number"
                value={feedbackQuoted}
                onChange={(e) => setFeedbackQuoted(Number(e.target.value))}
                className="w-full p-2 text-xs font-bold rounded-lg border border-[#e5e7eb] bg-[#fafaf9]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#717974] uppercase block mb-1">
                Final Paid Amount (₹)
              </label>
              <input
                type="number"
                value={feedbackPaid}
                onChange={(e) => setFeedbackPaid(Number(e.target.value))}
                className="w-full p-2 text-xs font-bold rounded-lg border border-[#e5e7eb] bg-[#fafaf9]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#717974] uppercase block mb-1">
                Extra Charge Reason Claimed
              </label>
              <input
                type="text"
                value={extraReason}
                onChange={(e) => setExtraReason(e.target.value)}
                placeholder="e.g. Extra wire needed"
                className="w-full p-2 text-xs rounded-lg border border-[#e5e7eb] bg-[#fafaf9]"
              />
            </div>
          </div>

          <button
            onClick={() => handleAnalyzeFeedback()}
            disabled={feedbackLoading || !feedbackInput.trim()}
            className="bg-[#134e3a] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#0f3f2e] transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{feedbackLoading ? 'Analyzing Sentiment...' : 'Analyze Feedback & Price Honesty'}</span>
          </button>
        </div>

        {/* Results Display */}
        {feedbackResult && (
          <div className="p-6 rounded-2xl bg-[#fafaf9] border border-[#e5e7eb] space-y-4 text-xs animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-[#1c1f1d]">
                Multi-Dimensional Evidence Extraction Results
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-stone-200 text-[#717974] font-mono">
                Source: {feedbackResult.source}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                <span className="text-[10px] text-[#717974] font-semibold block">Punctuality</span>
                <div className="text-sm font-bold text-[#134e3a]">
                  {feedbackResult.punctuality.sentiment}
                </div>
                {feedbackResult.punctuality.score !== null && (
                  <div className="text-xs font-extrabold tabular-nums">
                    Score: {feedbackResult.punctuality.score}/100
                  </div>
                )}
                {feedbackResult.punctuality.quote && (
                  <div className="text-[10px] text-[#717974] italic">
                    "{feedbackResult.punctuality.quote}"
                  </div>
                )}
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                <span className="text-[10px] text-[#717974] font-semibold block">Cleanliness</span>
                <div className="text-sm font-bold text-[#134e3a]">
                  {feedbackResult.cleanliness.sentiment}
                </div>
                {feedbackResult.cleanliness.score !== null && (
                  <div className="text-xs font-extrabold tabular-nums">
                    Score: {feedbackResult.cleanliness.score}/100
                  </div>
                )}
                {feedbackResult.cleanliness.quote && (
                  <div className="text-[10px] text-[#717974] italic">
                    "{feedbackResult.cleanliness.quote}"
                  </div>
                )}
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                <span className="text-[10px] text-[#717974] font-semibold block">Behaviour</span>
                <div className="text-sm font-bold text-[#134e3a]">
                  {feedbackResult.behaviour.sentiment}
                </div>
                {feedbackResult.behaviour.score !== null && (
                  <div className="text-xs font-extrabold tabular-nums">
                    Score: {feedbackResult.behaviour.score}/100
                  </div>
                )}
                {feedbackResult.behaviour.quote && (
                  <div className="text-[10px] text-[#717974] italic">
                    "{feedbackResult.behaviour.quote}"
                  </div>
                )}
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                <span className="text-[10px] text-[#717974] font-semibold block">Communication</span>
                <div className="text-sm font-bold text-[#134e3a]">
                  {feedbackResult.communication.sentiment}
                </div>
                {feedbackResult.communication.score !== null && (
                  <div className="text-xs font-extrabold tabular-nums">
                    Score: {feedbackResult.communication.score}/100
                  </div>
                )}
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#e5e7eb] space-y-1">
                <span className="text-[10px] text-[#717974] font-semibold block">Price Honesty</span>
                <div
                  className={`text-sm font-bold ${
                    feedbackResult.priceHonesty.sentiment === 'Negative'
                      ? 'text-red-700'
                      : 'text-[#059669]'
                  }`}
                >
                  {feedbackResult.priceHonesty.sentiment}
                </div>
                {feedbackResult.priceHonesty.score !== null && (
                  <div className="text-xs font-extrabold tabular-nums">
                    Score: {feedbackResult.priceHonesty.score}/100
                  </div>
                )}
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-[#e5e7eb] flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-[#134e3a] shrink-0 mt-0.5" />
              <div>
                <strong>Honesty & Billing Audit: </strong>
                <span>
                  {feedbackResult.extraChargeJustified
                    ? 'Quoted price honored or additional scope was legitimate.'
                    : 'UNJUSTIFIED EXTRA CHARGE DETECTED: Upfront price was artificially low.'}
                </span>
                <p className="mt-1 text-[#717974]">{feedbackResult.summaryExplanation}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
