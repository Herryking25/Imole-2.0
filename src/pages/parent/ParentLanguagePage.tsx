import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
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
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col font-sans select-none">
      <div className="flex-1 flex flex-col max-w-sm w-full mx-auto px-5 py-6">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => navigate('/parent/auth')}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Step Pill */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF1ED] border border-[#FBCBB7] text-[#B83806] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#B83806]" />
            <span>Step 1 of 2</span>
          </div>

          <div className="w-10" />
        </div>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 rounded-[20px] bg-[#FFF1ED] flex items-center justify-center mb-5">
            <Users className="w-8 h-8 text-[#B83806] stroke-[1.8]" />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Select preferred language
          </h1>
        </div>

        {/* Language options */}
        <div className="flex flex-col gap-4 flex-1">
          {LANGUAGE_OPTIONS.map((item) => {
            const isSelected = selectedLanguage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedLanguage(item.id)}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-base transition-all cursor-pointer text-center ${
                  isSelected
                    ? 'bg-[#FEF0C7] border-2 border-[#B83806] text-slate-900'
                    : 'bg-[#FEF3C7] border border-[#FDE68A] text-slate-800 hover:bg-[#FEF0C7] active:scale-[0.99]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Continue button — fixed at bottom */}
        <div className="pt-8 pb-2">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-4 rounded-2xl bg-[#B83806] hover:bg-[#9A2F05] active:scale-[0.99] text-white font-extrabold text-base shadow-lg shadow-[#B83806]/20 flex items-center justify-center transition-all cursor-pointer"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
};

export default ParentLanguagePage;
