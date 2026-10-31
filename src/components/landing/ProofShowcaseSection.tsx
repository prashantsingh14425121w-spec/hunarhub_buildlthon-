/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Camera,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

export function ProofShowcaseSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'gold' | 'flagged'>('all');

  const proofCards = [
    {
      id: 'proof-ramesh',
      workerName: 'Ramesh Sharma',
      workerId: 'W001',
      trade: 'Electrician',
      band: 'Gold',
      score: 92,
      category: 'gold',
      location: 'Danapur Cantt',
      task: 'Distribution Board Overhaul & MCB Phase Balance',
      quotedVsPaid: 'Quote ₹480 → Paid ₹480 (0% Extra)',
      photoUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      evidenceLabel: 'Verified High Quality (Good)',
      evidencePoints: [
        'Right-angle wire routing with nylon ducting',
        'Insulated copper ferrule crimps on all 16A breaker inputs',
        'Zero exposed copper strands at neutral busbar',
      ],
      quote: 'time pe aaye, achhe se samjhaya, saaf-safai karke gaye.',
      warning: null,
    },
    {
      id: 'proof-raju',
      workerName: 'Raju Prasad',
      workerId: 'W004',
      trade: 'Electrician',
      band: 'Standard',
      score: 55,
      category: 'flagged',
      location: 'Vijay Nagar, Danapur',
      task: 'Emergency Breaker Tripping Bypass',
      quotedVsPaid: 'Quote ₹370 → Paid ₹520 (+40.5% Extra Charge)',
      photoUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      evidenceLabel: 'Flagged Substandard (Poor)',
      evidencePoints: [
        'Criss-cross wire bundle blocking breaker ventilation',
        'Bare copper strands exposed at terminal lugs',
        'Unjustified add-on charges billed post-service',
      ],
      quote: 'Quote se 40% zyada maangte hain hamesha extra problem bata ke.',
      warning: 'In 5 of 6 past jobs, the final amount was 30–45% above the quote.',
    },
    {
      id: 'proof-mukesh',
      workerName: 'Mukesh Yadav',
      workerId: 'W007',
      trade: 'Mason',
      band: 'Silver',
      score: 72,
      category: 'gold',
      location: 'Phulwari Sharif',
      task: 'Vitrified Living Room Floor & Skirting Tiles',
      quotedVsPaid: 'Quote ₹2,400 → Paid ₹2,400 (0% Extra)',
      photoUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      evidenceLabel: 'High Craftsmanship / Low Punctuality',
      evidencePoints: [
        'Laser-level 2mm spacers used throughout',
        'Zero lippage across 600x600mm tile joints',
        'Arrived 5 hours late; completed in 5 days instead of 2',
      ],
      quote: 'Tile ekdum laser level jaisi lagayi hai, craftsmanship bohot shaandar hai par time ki value nahi.',
      warning: 'Punctuality Advisory: 52/100 punctuality rating; preserved in Silver band.',
    },
    {
      id: 'proof-suresh',
      workerName: 'Suresh Mistri',
      workerId: 'W005',
      trade: 'Plumber',
      band: 'Gold',
      score: 90,
      category: 'gold',
      location: 'Kankarbagh Colony',
      task: 'Concealed CPVC Pipe Leak Detection',
      quotedVsPaid: 'Quote ₹750 → Paid ₹750 (0% Extra)',
      photoUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      evidenceLabel: 'Master Plumbing Quality',
      evidencePoints: [
        'Acoustic leak pinpointing without breaking master tiles',
        'Squarely chamfered CPVC joints with clean solvent rings',
        'Pressure-tested to 6 bar prior to sealing wall',
      ],
      quote: 'Bina tile tode concealed pipe ka leak pakad liya. Kaam bohot safayi se kiya.',
      warning: null,
    },
  ];

  const filteredCards = proofCards.filter((card) => {
    if (activeFilter === 'all') return true;
    return card.category === activeFilter;
  });

  return (
    <section id="proof-showcase" className="py-14 sm:py-20 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              <Camera className="w-3.5 h-3.5" />
              <span>Real Work Evidence Gallery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1f1d] tracking-tight">
              See the Actual Proof That Generates the Hunar Score
            </h2>
            <p className="text-sm sm:text-base text-[#3f4541]">
              Every badge and score is anchored to high-resolution work inspection images, honest final billing audits, and verifiable customer feedback.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-[#e5e7eb] shadow-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#134e3a] text-white shadow-xs'
                  : 'text-[#3f4541] hover:bg-[#f5f5f3]'
              }`}
            >
              All Evidence (4)
            </button>
            <button
              onClick={() => setActiveFilter('gold')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === 'gold'
                  ? 'bg-[#134e3a] text-white shadow-xs'
                  : 'text-[#3f4541] hover:bg-[#f5f5f3]'
              }`}
            >
              Master Craftsmanship
            </button>
            <button
              onClick={() => setActiveFilter('flagged')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === 'flagged'
                  ? 'bg-[#134e3a] text-white shadow-xs'
                  : 'text-[#3f4541] hover:bg-[#f5f5f3]'
              }`}
            >
              Flagged Warnings
            </button>
          </div>
        </div>

        {/* 4 Proof Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col ${
                card.warning ? 'border-amber-300' : 'border-[#e5e7eb]'
              }`}
            >
              {/* Image with 4:3 Ratio & Evidence Overlay */}
              <div className="relative h-56 sm:h-64 w-full bg-stone-900 overflow-hidden">
                <ImageWithFallback
                  src={card.photoUrl}
                  alt={card.task}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs ${
                      card.warning
                        ? 'bg-amber-400 text-amber-950'
                        : 'bg-emerald-500 text-white'
                    }`}
                  >
                    {card.evidenceLabel}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-medium backdrop-blur-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {card.location}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-semibold text-emerald-200">{card.trade} Task</div>
                  <div className="text-sm sm:text-base font-bold truncate">{card.task}</div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Worker & Score Bar */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-[#1c1f1d]">{card.workerName}</h3>
                        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-[#717974]">
                          {card.workerId}
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-[#3f4541]">
                        {card.band} Band
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-extrabold text-[#134e3a] tabular-nums">
                        {card.score}<span className="text-xs font-medium text-[#717974]">/100</span>
                      </div>
                      <div className="text-[10px] text-[#717974] font-medium">Hunar Score</div>
                    </div>
                  </div>

                  {/* Quoted vs Paid Audit */}
                  <div className="p-2.5 rounded-lg bg-[#fafaf9] border border-[#e5e7eb] text-xs flex items-center justify-between">
                    <span className="text-[#717974] font-medium">Price Honesty:</span>
                    <span className="font-bold text-[#1c1f1d] tabular-nums">{card.quotedVsPaid}</span>
                  </div>

                  {/* Warning if present */}
                  {card.warning && (
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 font-medium">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{card.warning}</span>
                    </div>
                  )}

                  {/* Evidence Checklist */}
                  <div className="space-y-1.5 text-xs text-[#3f4541]">
                    <div className="text-[11px] font-bold text-[#717974] uppercase tracking-wider">
                      Visible Craftsmanship Audit:
                    </div>
                    {card.evidencePoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            card.warning ? 'text-amber-600' : 'text-[#059669]'
                          }`}
                        />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hinglish Quote */}
                <div className="pt-3 border-t border-[#f3f4f0] text-xs text-[#1c1f1d] italic bg-[#fafaf9] p-3 rounded-lg">
                  "{card.quote}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
