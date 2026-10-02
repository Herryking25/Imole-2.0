import React from 'react';
import { X, Globe, Shield, Volume2 } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useApp } from '../../hooks/useApp';
import { getAvatarEmoji } from '../../utils/avatarUtils';
import type { SupportedLanguage } from '../../types';

interface ChildSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChildSettingsModal: React.FC<ChildSettingsModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useLanguage();
  const { profile } = useApp();

  if (!isOpen) return null;

  const languages: { code: SupportedLanguage; label: string; flag: string; nativeName: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' },
    { code: 'yo', label: 'Yorùbá', flag: '🇳🇬', nativeName: 'Èdè Yorùbá' },
    { code: 'pcm', label: 'Nigerian Pidgin', flag: '🇳🇬', nativeName: 'Naija Pidgin' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Settings"
    >
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative transform transition-all animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#a73605] flex items-center justify-center font-bold">
              ⚙️
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Child Settings</h2>
              <p className="text-xs text-slate-500">Personalize your learning experience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-5">
          {/* Profile Card */}
          {profile && (
            <div className="flex items-center justify-between p-3.5 bg-orange-50/60 rounded-2xl border border-orange-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getAvatarEmoji(profile.avatarId)}</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{profile.name}</h3>
                  <p className="text-xs text-slate-500">Age {profile.age} • Level 1 Champ</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#a73605] bg-white px-2.5 py-1 rounded-full border border-orange-200 shadow-2xs">
                Active
              </span>
            </div>
          )}

          {/* Language Selector */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
              <Globe className="w-4 h-4 text-[#a73605]" />
              <span>{t.common.language}</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    language === lang.code
                      ? 'border-[#a73605] bg-orange-50/70 text-[#a73605] shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </span>
                  {language === lang.code && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#a73605]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sound & Encouragement */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-slate-600" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Sound & Celebrations</span>
                <span className="text-[11px] text-slate-500">Fun audio feedback upon completing challenges</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Enabled
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Private & Safe for Kids</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#a73605] hover:bg-[#8e2e04] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
