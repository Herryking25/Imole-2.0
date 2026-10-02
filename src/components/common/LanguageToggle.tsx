import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { SUPPORTED_LANGUAGES } from '../../types/i18n';
import type { SupportedLanguage } from '../../types/i18n';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  compact?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ compact = false }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
      {!compact && <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 shrink-0" />}
      <div className="flex items-center gap-1">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code as SupportedLanguage)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-emerald-800 shadow-xs scale-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span className="mr-1">{lang.flag}</span>
              <span>{compact ? lang.code.toUpperCase() : lang.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
