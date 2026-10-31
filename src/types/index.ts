/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Trade =
  | 'Electrician'
  | 'Plumber'
  | 'Mason'
  | 'Carpenter'
  | 'Painter'
  | 'AC Technician';

export type PricingBand = 'Gold' | 'Silver' | 'Standard' | 'New';

export interface HunarScoreBreakdown {
  workQuality: number;        // 35% weight
  punctuality: number;        // 15% weight
  priceHonesty: number;       // 20% weight
  professionalBehaviour: number; // 20% weight
  reliability: number;        // 10% weight
  overallScore: number;       // 0 - 100
  jobsCount: number;
  newWorkerBaseline?: boolean;
}

export interface WorkerRecord {
  id: string; // e.g., 'W001'
  name: string;
  trade: Trade;
  phone: string;
  experienceYears: number;
  baseLocation: string;
  profilePhoto: string;
  pricingBand: PricingBand;
  hunarScore: number;
  breakdown: HunarScoreBreakdown;
  bio: string;
  completedJobsCount: number;
  reworkCount: number;
  extraChargeWarning?: string;
  badges: string[];
  evidenceQuotes: Array<{
    quote: string;
    dimension: 'quality' | 'punctuality' | 'honesty' | 'behaviour' | 'cleanliness';
    customerArea: string;
  }>;
}

export interface CompletedJobRecord {
  jobId: string;
  workerId: string;
  customerName: string;
  trade: Trade;
  taskDescription: string;
  area: string;
  quotedAmount: number;
  paidAmount: number;
  promisedDays: number;
  actualDays: number;
  extraChargeReason?: string;
  extraChargeJustified?: boolean;
  feedbackText: string;
  feedbackLanguage: string;
  photoUrl: string;
  photoQualityLabel?: 'Good' | 'Average' | 'Poor';
  photoVisibleEvidence?: string;
  reworkReported: boolean;
  dateCompleted: string;
}

export interface PricingBandDefinition {
  band: PricingBand;
  minScore: number;
  maxScore: number;
  description: string;
  multiplierVsBase: { min: number; max: number };
  badgeClass: string;
}

export interface MarketRateRecord {
  trade: Trade;
  task: string;
  unit: string;
  minRate: number;
  maxRate: number;
  typicalRate: number;
}

export interface WorkQualityGuideline {
  trade: Trade;
  component: string;
  goodIndicators: string[];
  poorIndicators: string[];
}

export interface JobPhotoAnswerKeyRecord {
  photoId: string;
  filename: string;
  trade: Trade;
  expectedQuality: 'Good' | 'Average' | 'Poor';
  expectedEvidence: string;
  caseStudyNote?: string;
}

export interface CustomerRequirement {
  id: string;
  rawInput: string;
  detectedLanguage?: string;
  trade: Trade;
  task: string;
  area: string;
  urgency: 'Immediate' | 'Today' | 'Within 2-3 Days' | 'Flexible';
  quantity?: string;
  details?: string;
  createdAt: string;
}

export interface WorkerBid {
  id: string;
  workerId: string;
  requirementId: string;
  quotedPrice: number;
  estimatedCompletion: string;
  pricingBand: PricingBand;
  workerScore: number;
  valueRank: number;
  recommendationNote?: string;
  extraChargeWarning?: string;
  isRecommended?: boolean;
}

export type EscrowStatus =
  | 'bidding'
  | 'booked_held_in_escrow'
  | 'work_in_progress'
  | 'work_submitted_for_verification'
  | 'verified_and_released'
  | 'disputed';

export interface BookingSession {
  bookingId: string;
  requirement: CustomerRequirement;
  selectedWorkerId: string;
  agreedPrice: number;
  status: EscrowStatus;
  escrowSimulatedAmount: number;
  depositTimestamp: string;
  completedAt?: string;
  submittedPhotoUrl?: string;
  submittedFeedback?: string;
  scoreRecalculation?: {
    previousScore: number;
    newScore: number;
    delta: number;
    explanation: string;
    breakdownBefore: HunarScoreBreakdown;
    breakdownAfter: HunarScoreBreakdown;
  };
}

export type SupportedLanguage =
  | 'en' // English
  | 'hi' // Hindi
  | 'bn' // Bengali
  | 'te' // Telugu
  | 'mr' // Marathi
  | 'ta' // Tamil
  | 'gu' // Gujarati
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'pa'; // Punjabi

export type SafetyRiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'unknown';

export interface AiSafetyAdvisory {
  safetyRisk: SafetyRiskLevel;
  isImmediateDanger: boolean;
  detectedHazard: string;
  safetyWarning: string;
  immediateActions: string[];
  recommendedTrade: Trade | string;
  professionalAdvice: string;
}

export interface PhotoAnalysisResult {
  quality: 'Good' | 'Average' | 'Poor';
  explanation: string;
  visibleEvidence: string;
  tradeAssessment: string;
  confidence: number;
  limitations?: string;
  answerKeyMatch?: boolean;
  source: string;
  analyzedAt: string;
  safetyAdvisory?: AiSafetyAdvisory;
}
