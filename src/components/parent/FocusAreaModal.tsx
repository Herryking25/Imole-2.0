import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

export interface FocusSkill {
  name: string;
  emoji: string;
  pct: number;
  badge: string | null;
  barColor: string;
  category: string;
}

export const FOCUS_SKILLS: FocusSkill[] = [
  { name: 'Basic Finance', emoji: '🧮', pct: 40, badge: 'Needs Practice', barColor: 'bg-blue-500', category: 'Finance' },
  { name: 'Speaking & Comms', emoji: '🗣️', pct: 65, badge: null, barColor: 'bg-emerald-500', category: 'Speaking' },
  { name: 'Math & Logic', emoji: '🧠', pct: 80, badge: 'Strong', barColor: 'bg-[#B83806]', category: 'Math' },
];

type Step = 'select' | 'confirm';

interface FocusAreaModalProps {
  childName: string;
  currentFocus: string | null;
  onClose: () => void;
  onConfirm: (skill: FocusSkill) => void;
}

export const FocusAreaModal: React.FC<FocusAreaModalProps> = ({
  childName, currentFocus, onClose, onConfirm,
}) => {
  const defaultSkill = FOCUS_SKILLS.find((s) => s.name === currentFocus) ?? FOCUS_SKILLS[0];
  const [selected, setSelected] = useState<FocusSkill>(defaultSkill);
  const [step, setStep] = useState<Step>('select');

  if (step === 'confirm') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
        <div className="absolute inset-0 bg-black/50" onClick={() => setStep('select')} />
        <div className="relative bg-[#FFF8F6] rounded-3xl p-6 max-w-sm w-full shadow-xl">
          {/* Skill icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-3xl shadow-sm">
              {selected.emoji}
            </div>
          </div>

          <h2 className="text-lg font-extrabold text-slate-900 text-center mb-2">
            Make {selected.name} a focus?
          </h2>
          <p className="text-sm text-slate-500 text-center leading-relaxed mb-5">
            We&apos;ll prioritise {selected.category} challenges in {childName}&apos;s recommendations.
          </p>

          {/* Progress bar */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3.5 mb-5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-slate-700">Current progress</span>
              <span className="text-xs font-black text-blue-500">{selected.pct}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${selected.barColor} rounded-full`}
                style={{ width: `${selected.pct}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => onConfirm(selected)}
            className="w-full py-4 rounded-2xl bg-[#B83806] text-white font-extrabold text-sm hover:bg-[#9A2F05] active:scale-[0.99] transition-all cursor-pointer mb-3"
          >
            Set as Focus Area
          </button>
          <button
            type="button"
            onClick={() => setStep('select')}
            className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // step === 'select' — bottom sheet
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-[#FFF8F6] rounded-t-3xl pt-3 pb-8 max-w-sm w-full mx-auto shadow-2xl">
        {/* Drag handle */}
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-5" />

        {/* Header */}
        <div className="flex items-start justify-between px-5 mb-1">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Select a Focus Area</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Choose a skill you want {childName} to prioritise.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer shrink-0 mt-0.5"
            aria-label="Close"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Skill list */}
        <div className="flex flex-col gap-3 px-5 mt-4 mb-5">
          {FOCUS_SKILLS.map((skill) => {
            const isSelected = selected.name === skill.name;
            return (
              <button
                key={skill.name}
                type="button"
                onClick={() => setSelected(skill)}
                className={`w-full text-left rounded-2xl border-2 p-4 flex items-center gap-4 transition-all cursor-pointer ${isSelected ? 'border-[#B83806] bg-white shadow-sm' : 'border-slate-100 bg-white'
                  }`}
              >
                {/* Emoji icon */}
                <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl shrink-0">
                  {skill.emoji}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900">{skill.name}</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Current: {skill.pct}%{skill.badge ? ` • ${skill.badge}` : ''}
                  </p>
                </div>

                {/* Radio */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? 'border-[#B83806] bg-[#B83806]' : 'border-slate-200'
                  }`}>
                  {isSelected && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="px-5 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setStep('confirm')}
            className="w-full py-4 rounded-2xl bg-[#B83806] text-white font-extrabold text-sm hover:bg-[#9A2F05] active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-[#B83806]/20"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-slate-500 font-semibold text-sm hover:text-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Keep ChevronRight import used elsewhere
export { ChevronRight };

