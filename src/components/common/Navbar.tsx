/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  Database,
  Sparkles,
  Home,
  LayoutDashboard,
} from 'lucide-react';
import { SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../utils/translations';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  currentView: 'landing' | 'customer_home' | 'inspector';
  onViewChange: (view: 'landing' | 'customer_home' | 'inspector') => void;
  onPostRequirementClick: () => void;
  onNavigateSection: (sectionId: string) => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export function Navbar({
  currentView,
  onViewChange,
  onPostRequirementClick,
  onNavigateSection,
  currentLanguage,
  onLanguageChange,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const handleNavClick = (sectionId: string) => {
    if (currentView !== 'landing') {
      onViewChange('landing');
      setTimeout(() => onNavigateSection(sectionId), 100);
    } else {
      onNavigateSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#fafaf9]/95 backdrop-blur-md border-b border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Wordmark */}
        <div
          onClick={() => {
            onViewChange('landing');
            handleNavClick('hero');
          }}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#134e3a] flex items-center justify-center text-white shadow-sm font-bold text-xl tracking-tight transition-transform group-hover:scale-105">
            H
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-[#134e3a]">
                HunarHub
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Evidence Only
              </span>
            </div>
            <p className="text-[11px] text-[#717974] font-medium leading-none mt-0.5">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Desktop View Switcher Pills */}
        <div className="hidden md:flex items-center gap-1 bg-[#f5f5f3] p-1 rounded-xl border border-[#e5e7eb]">
          <button
            onClick={() => onViewChange('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentView === 'landing'
                ? 'bg-white text-[#134e3a] shadow-2xs font-bold'
                : 'text-[#3f4541] hover:text-[#134e3a]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </button>
          <button
            onClick={() => onViewChange('customer_home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentView === 'customer_home'
                ? 'bg-white text-[#134e3a] shadow-2xs font-bold'
                : 'text-[#3f4541] hover:text-[#134e3a]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t.customerDashboard}</span>
          </button>
          <button
            onClick={() => onViewChange('inspector')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentView === 'inspector'
                ? 'bg-[#134e3a] text-white shadow-2xs font-bold'
                : 'text-[#3f4541] hover:text-[#134e3a]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{t.dataInspector}</span>
          </button>
        </div>

        {/* Right Actions: Language Selector + Post Requirement CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* Primary Action Button */}
          <button
            onClick={onPostRequirementClick}
            className="flex items-center gap-2 bg-[#134e3a] text-white text-xs font-bold px-3.5 sm:px-4 py-2.5 rounded-lg hover:bg-[#0f3f2e] transition-all shadow-xs cursor-pointer active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden sm:inline">{t.postRequirement}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#3f4541] hover:text-[#134e3a] hover:bg-stone-100 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e5e7eb] px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-1 text-sm font-semibold text-[#3f4541]">
            <button
              onClick={() => {
                onViewChange('landing');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 px-3 rounded-lg flex items-center gap-2 ${
                currentView === 'landing' ? 'bg-emerald-50 text-[#134e3a]' : 'hover:bg-stone-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Landing Page</span>
            </button>
            <button
              onClick={() => {
                onViewChange('customer_home');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 px-3 rounded-lg flex items-center gap-2 ${
                currentView === 'customer_home' ? 'bg-emerald-50 text-[#134e3a]' : 'hover:bg-stone-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t.customerDashboard}</span>
            </button>
            <button
              onClick={() => {
                onViewChange('inspector');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 px-3 rounded-lg flex items-center gap-2 ${
                currentView === 'inspector' ? 'bg-emerald-50 text-[#134e3a]' : 'hover:bg-stone-50'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>{t.dataInspector}</span>
            </button>
          </div>

          <div className="pt-2 border-t border-stone-200">
            <button
              onClick={() => {
                onPostRequirementClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#134e3a] text-white text-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{t.postRequirement}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
