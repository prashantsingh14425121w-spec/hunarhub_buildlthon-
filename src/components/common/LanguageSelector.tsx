/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SupportedLanguage } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../utils/translations';

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentMeta =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) ||
    SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#e5e7eb] text-[#3f4541] hover:bg-[#f5f5f3] hover:text-[#134e3a] transition-all shadow-2xs"
        aria-expanded={isOpen}
        aria-label="Select interface language"
      >
        <Globe className="w-3.5 h-3.5 text-[#059669]" />
        <span>{currentMeta.nativeName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#717974] transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white border border-[#e5e7eb] shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-72 overflow-y-auto">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#717974] border-b border-[#f3f4f0] mb-1">
            Choose Language (10)
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLanguage;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-emerald-50 text-[#134e3a] font-bold'
                    : 'text-[#3f4541] hover:bg-[#fafaf9]'
                }`}
              >
                <div>
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-[10px] text-[#717974]">{lang.name}</div>
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
