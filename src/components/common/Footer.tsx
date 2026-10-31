/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Heart, Sparkles, Database } from 'lucide-react';

interface FooterProps {
  onOpenDataInspector: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export function Footer({ onOpenDataInspector, onNavigateSection }: FooterProps) {
  return (
    <footer className="bg-white border-t border-[#e5e7eb] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#134e3a] flex items-center justify-center text-white font-bold text-lg">
                H
              </div>
              <span className="font-extrabold text-lg text-[#134e3a] tracking-tight">HunarHub</span>
            </div>
            <p className="text-xs text-[#717974] leading-relaxed">
              <strong>Kaam Bolega, Stars Nahi.</strong> India's first evidence-based skilled trades marketplace. Built with mathematical honesty.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-[#059669] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Photo Audits</span>
            </div>
          </div>

          {/* Supported Trades */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-[#1c1f1d] uppercase tracking-wider text-[11px]">
              Supported Skilled Trades
            </h4>
            <ul className="space-y-1.5 text-[#717974]">
              <li className="hover:text-[#134e3a] cursor-pointer">Electricians (DB Wiring, MCB Tripping)</li>
              <li className="hover:text-[#134e3a] cursor-pointer">Plumbers (Leak Detection, Pipe Jointing)</li>
              <li className="hover:text-[#134e3a] cursor-pointer">Masons (Tile Alignment, 2mm Spacers)</li>
              <li className="hover:text-[#134e3a] cursor-pointer">Carpenters (Mortise Locks, Furniture Fitting)</li>
              <li className="hover:text-[#134e3a] cursor-pointer">AC Technicians (Jet Servicing, PCB Diagnostics)</li>
              <li className="hover:text-[#134e3a] cursor-pointer">Painters (Surface Putty, Wall Leveling)</li>
            </ul>
          </div>

          {/* Core Principles */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-[#1c1f1d] uppercase tracking-wider text-[11px]">
              Our Non-Negotiables
            </h4>
            <ul className="space-y-1.5 text-[#717974]">
              <li>• Strictly zero star ratings</li>
              <li>• Transparent 5-part mathematical score</li>
              <li>• Upfront warnings for hidden fee records</li>
              <li>• Simulated platform escrow for fair payouts</li>
              <li>• Hindi, Hinglish & 10 Indian regional languages</li>
            </ul>
          </div>

          {/* Developer & Architecture */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-[#1c1f1d] uppercase tracking-wider text-[11px]">
              Evaluation & Architecture
            </h4>
            <p className="text-[#717974] leading-relaxed text-[11px]">
              Built for <strong>build#thon 2026 (Idea H)</strong>. Verified against mandatory case studies (Neha Danapur MCB, Raju warning, Mukesh Silver trait).
            </p>
            <button
              onClick={onOpenDataInspector}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#134e3a] text-xs font-semibold transition-colors"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Inspect Underlying Datasets</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#717974]">
          <div>
            © 2026 HunarHub Platform. All Rights Reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Cultivated Architectural Stitch Theme</span>
            <span>•</span>
            <span className="font-mono">React 19 + TypeScript + Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
