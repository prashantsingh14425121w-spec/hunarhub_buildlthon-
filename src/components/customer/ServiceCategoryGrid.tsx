/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Zap,
  Droplets,
  Layers,
  Hammer,
  Paintbrush,
  Wind,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Trade, SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../utils/translations';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ServiceCategoryGridProps {
  currentLanguage: SupportedLanguage;
  onSelectTrade: (trade: Trade, defaultTask?: string) => void;
}

export function ServiceCategoryGrid({
  currentLanguage,
  onSelectTrade,
}: ServiceCategoryGridProps) {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const categories: Array<{
    trade: Trade;
    title: string;
    icon: React.ElementType;
    photoUrl: string;
    rateRange: string;
    typicalTasks: string[];
    benchmarkNote: string;
  }> = [
    {
      trade: 'Electrician',
      title: t.trades.electrician,
      icon: Zap,
      photoUrl:
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
      rateRange: '₹350 – ₹550',
      typicalTasks: [
        'MCB Tripping & Short Circuit',
        'Distribution Board Rewiring',
        'Switchboard & Inverter Setup',
      ],
      benchmarkNote: 'Verified ferrule crimping and DB wire ducting',
    },
    {
      trade: 'Plumber',
      title: t.trades.plumber,
      icon: Droplets,
      photoUrl:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
      rateRange: '₹250 – ₹500',
      typicalTasks: [
        'Concealed Pipeline Leak Detection',
        'Water Tank Float Valve Fitting',
        'Bathroom Shower & Tap Fixtures',
      ],
      benchmarkNote: 'Pressure-tested joints with clean solvent rings',
    },
    {
      trade: 'Mason',
      title: t.trades.mason,
      icon: Layers,
      photoUrl:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      rateRange: '₹1,800 – ₹3,200',
      typicalTasks: [
        'Floor & Wall Tile Laying',
        'Laser-level 2mm Spacer Alignment',
        'Balcony Water Seepage Plaster',
      ],
      benchmarkNote: 'Zero lippage & plumb 90° corner alignment',
    },
    {
      trade: 'Carpenter',
      title: t.trades.carpenter,
      icon: Hammer,
      photoUrl:
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      rateRange: '₹350 – ₹700',
      typicalTasks: [
        'Mortise Door Lock Installation',
        'Hydraulic Bed & Hinge Adjustment',
        'Modular Drawer Channel Repair',
      ],
      benchmarkNote: 'Precision joinery with zero squeak friction',
    },
    {
      trade: 'Painter',
      title: t.trades.painter,
      icon: Paintbrush,
      photoUrl:
        'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80',
      rateRange: '₹800 – ₹1,800',
      typicalTasks: [
        'Wall Putty Leveling & Sanding',
        'Plastic Emulsion Two-Coat Touchup',
        'Damp Proof Water Barrier Coating',
      ],
      benchmarkNote: 'Even surface feathering without sandpaper ridges',
    },
    {
      trade: 'AC Technician',
      title: t.trades.acTechnician,
      icon: Wind,
      photoUrl:
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      rateRange: '₹550 – ₹950',
      typicalTasks: [
        'Jet Bag Foam Deep Cleaning',
        'Digital Manifold Gas Leak Check',
        'Inverter PCB Error Diagnostic',
      ],
      benchmarkNote: 'Digital manifold test & zero gas leak warranty',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1f1d] tracking-tight">
            {t.categoriesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#717974]">{t.categoriesSubtitle}</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#059669] font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Strict Price-Band Protection</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.trade}
              onClick={() => onSelectTrade(cat.trade, cat.typicalTasks[0])}
              className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden hover:border-[#134e3a] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              {/* Image banner */}
              <div className="relative h-40 w-full bg-stone-900 overflow-hidden">
                <ImageWithFallback
                  src={cat.photoUrl}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3">
                  <span className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs text-[#134e3a] flex items-center justify-center shadow-xs">
                    <Icon className="w-4 h-4 text-[#134e3a]" />
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                  <span className="font-bold text-base">{cat.title}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-emerald-300 tabular-nums">
                    {cat.rateRange}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#717974] block mb-1.5">
                    Common Verified Repairs:
                  </span>
                  <ul className="space-y-1 text-xs text-[#3f4541]">
                    {cat.typicalTasks.map((task, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#134e3a]" />
                        <span className="truncate">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#f3f4f0] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#717974] truncate pr-2">
                    {cat.benchmarkNote}
                  </span>
                  <span className="text-[#134e3a] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                    Post <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
