/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Edit3,
  MapPin,
  Clock,
  Layers,
  FileText,
  ArrowRight,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { CustomerRequirement, Trade } from '../../types';

interface ParsedRequirementConfirmationProps {
  initialData: CustomerRequirement;
  parserSource: string;
  isParsing: boolean;
  onConfirmRequirement: (confirmed: CustomerRequirement) => void;
  onCancel: () => void;
}

export function ParsedRequirementConfirmation({
  initialData,
  parserSource,
  isParsing,
  onConfirmRequirement,
  onCancel,
}: ParsedRequirementConfirmationProps) {
  const [trade, setTrade] = useState<Trade>(initialData.trade);
  const [task, setTask] = useState<string>(initialData.task);
  const [area, setArea] = useState<string>(initialData.area);
  const [urgency, setUrgency] = useState<'Immediate' | 'Today' | 'Within 2-3 Days' | 'Flexible'>(
    initialData.urgency
  );
  const [quantity, setQuantity] = useState<string>(initialData.quantity || '1 panel / circuit');
  const [details, setDetails] = useState<string>(initialData.details || initialData.rawInput);
  const [isEditing, setIsEditing] = useState(false);

  const handleConfirm = () => {
    onConfirmRequirement({
      ...initialData,
      trade,
      task,
      area,
      urgency,
      quantity,
      details,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#f3f4f0] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Parsed Requirement Confirmation</span>
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-100 text-[#717974]">
              Source: {parserSource}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1f1d] mt-1">
            Please Review & Confirm Your Task Details
          </h2>
          <p className="text-xs text-[#717974]">
            HunarHub does not assume missing info. You can edit any field before bids are fetched.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#134e3a] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Close Editing' : 'Edit Fields'}</span>
        </button>
      </div>

      {/* Raw Customer Text Bubble */}
      <div className="p-3.5 rounded-xl bg-[#fafaf9] border border-[#e5e7eb] text-xs">
        <span className="text-[11px] font-bold text-[#717974] uppercase tracking-wider block mb-1">
          Original Customer Input (Hindi/Hinglish):
        </span>
        <p className="text-sm font-medium text-[#1c1f1d] italic">
          "{initialData.rawInput}"
        </p>
      </div>

      {/* Structured Confirmation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Field 1: Trade */}
        <div className="p-4 rounded-xl border border-[#e5e7eb] bg-[#fafaf9] space-y-1.5">
          <label className="text-xs font-bold text-[#717974] uppercase tracking-wider block">
            Extracted Skilled Trade
          </label>
          {isEditing ? (
            <select
              value={trade}
              onChange={(e) => setTrade(e.target.value as Trade)}
              className="w-full p-2 text-xs font-semibold bg-white rounded-lg border border-[#e5e7eb] focus:ring-2 focus:ring-[#134e3a]/20"
            >
              {[
                'Electrician',
                'Plumber',
                'Mason',
                'Carpenter',
                'Painter',
                'AC Technician',
              ].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          ) : (
            <div className="text-base font-bold text-[#134e3a] flex items-center gap-2">
              <span>{trade}</span>
              <CheckCircle2 className="w-4 h-4 text-[#059669]" />
            </div>
          )}
          <span className="text-[10px] text-[#717974]">Identified based on problem keywords</span>
        </div>

        {/* Field 2: Specific Task */}
        <div className="p-4 rounded-xl border border-[#e5e7eb] bg-[#fafaf9] space-y-1.5">
          <label className="text-xs font-bold text-[#717974] uppercase tracking-wider block">
            Diagnosed Task
          </label>
          {isEditing ? (
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full p-2 text-xs font-semibold bg-white rounded-lg border border-[#e5e7eb] focus:ring-2 focus:ring-[#134e3a]/20"
            />
          ) : (
            <div className="text-base font-bold text-[#1c1f1d]">{task}</div>
          )}
          <span className="text-[10px] text-[#717974]">Specific fault diagnosis</span>
        </div>

        {/* Field 3: Urgency */}
        <div className="p-4 rounded-xl border border-[#e5e7eb] bg-[#fafaf9] space-y-1.5">
          <label className="text-xs font-bold text-[#717974] uppercase tracking-wider block">
            Urgency Level
          </label>
          {isEditing ? (
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as any)}
              className="w-full p-2 text-xs font-semibold bg-white rounded-lg border border-[#e5e7eb] focus:ring-2 focus:ring-[#134e3a]/20"
            >
              <option value="Immediate">⚡ Immediate (Today)</option>
              <option value="Today">Today</option>
              <option value="Within 2-3 Days">Within 2-3 Days</option>
              <option value="Flexible">Flexible</option>
            </select>
          ) : (
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                {urgency === 'Immediate' ? '⚡ Immediate (Today)' : urgency}
              </span>
            </div>
          )}
          <span className="text-[10px] text-[#717974]">Extracted from "aaj hi chahiye"</span>
        </div>

        {/* Field 4: Location / Area */}
        <div className="p-4 rounded-xl border border-[#e5e7eb] bg-[#fafaf9] space-y-1.5">
          <label className="text-xs font-bold text-[#717974] uppercase tracking-wider block">
            Work Location
          </label>
          {isEditing ? (
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full p-2 text-xs font-semibold bg-white rounded-lg border border-[#e5e7eb] focus:ring-2 focus:ring-[#134e3a]/20"
            />
          ) : (
            <div className="text-base font-bold text-[#1c1f1d] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#134e3a]" />
              <span>{area}</span>
            </div>
          )}
          <span className="text-[10px] text-[#717974]">Local Danapur coverage confirmed</span>
        </div>

        {/* Field 5: Quantity & Details */}
        <div className="p-4 rounded-xl border border-[#e5e7eb] bg-[#fafaf9] space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-[#717974] uppercase tracking-wider block">
            Quantity & Problem Notes
          </label>
          {isEditing ? (
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 text-xs font-semibold bg-white rounded-lg border border-[#e5e7eb] focus:ring-2 focus:ring-[#134e3a]/20"
            />
          ) : (
            <div className="text-xs text-[#3f4541] font-medium">
              Estimated scope: <strong>{quantity}</strong>. Notes: {details}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Actions */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#f3f4f0]">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-xs font-semibold text-[#3f4541] hover:bg-stone-100 transition-colors"
        >
          ← Edit Original Text
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          className="w-full sm:w-auto bg-[#134e3a] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#0f3f2e] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>Confirm & Compare Worker Bids (Value Ranked)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
