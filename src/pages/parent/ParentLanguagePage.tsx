import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import type { SupportedLanguage } from '../../types/i18n';

interface LanguageOptionItem {
  id: SupportedLanguage;
  label: string;
}

const LANGUAGE_OPTIONS: LanguageOptionItem[] = [
  { id: 'pcm', label: 'Pidgin' },
  { id: 'en', label: 'English' },
  { id: 'yo', label: 'Yoruba' },
];

export const ParentLanguagePage: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(language || 'en');

  const handleContinue = () => {
    setLanguage(selectedLanguage);
    navigate('/parent/register', { state: { preferredLanguage: selectedLanguage } });
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col justify-between py-6 px-4 sm:px-6 select-none font-sans">
      <div className="max-w-md w-full mx-auto flex flex-col justify-between min-h-[88vh]">

        {/* ── Top Bar ── */}
        <div>
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => navigate('/child/settings')}
              className="w-11 h-11 rounded-full bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
              aria-label="Go back to child flow"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Step Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff4ed] border border-[#fbcbb7] text-[#b83808] text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#b83808]" />
              <span>Step 1 of 2 · Parent Profile</span>
            </div>

            {/* Placeholder to balance the flex layout */}
            <div className="w-11" />
          </div>

          {/* ── Center Header Icon ── */}
          <div className="flex flex-col items-center text-center mt-8">
            <div className="w-16 h-16 rounded-[22px] bg-gradient-to-b from-[#fde6d8] via-[#ffdcd0] to-[#fbcbb7] flex items-center justify-center shadow-xs mb-4">
              <Users className="w-8 h-8 text-[#8a2908] stroke-[2.2]" />
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-[26px] font-extrabold text-[#292524] tracking-tight">
              Select preferred language
            </h1>
          </div>

          {/* ── Language Option Buttons ── */}
          <div className="flex flex-col gap-3.5 mt-8">
            {LANGUAGE_OPTIONS.map((item) => {
              const isSelected = selectedLanguage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedLanguage(item.id)}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-lg transition-all cursor-pointer text-center select-none ${
                    isSelected
                      ? 'bg-[#fef0c7] border-2 border-[#a73605] text-[#292524] shadow-xs scale-[1.01]'
                      : 'bg-[#fef3c7]/80 hover:bg-[#fef0c7] border border-[#fde68a] text-slate-800 hover:border-amber-400 active:scale-[0.99]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Bottom Action ── */}
        <div className="pt-6 pb-2">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 rounded-2xl bg-[#a73605] hover:bg-[#8e2e04] active:scale-[0.99] text-white font-extrabold text-base shadow-lg shadow-[#a73605]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ParentLanguagePage;
