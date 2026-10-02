import React from 'react';
import { Languages, CheckCircle2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../types/i18n';
import { ChallengeService } from '../../services/challengeService';

export const LanguageManager: React.FC = () => {
  const challenges = ChallengeService.getAllChallenges();

  const total = challenges.length;
  const enCount = challenges.filter((c) => Boolean(c.title.en && c.scenario.en)).length;
  const yoCount = challenges.filter((c) => Boolean(c.title.yo && c.scenario.yo)).length;
  const pcmCount = challenges.filter((c) => Boolean(c.title.pcm && c.scenario.pcm)).length;

  const coverage = [
    { lang: 'English (en)', flag: '🇬🇧', count: enCount, total, pct: Math.round((enCount / total) * 100) },
    { lang: 'Yorùbá (yo)', flag: '🇳🇬', count: yoCount, total, pct: Math.round((yoCount / total) * 100) },
    { lang: 'Nigerian Pidgin (pcm)', flag: '🇳🇬', count: pcmCount, total, pct: Math.round((pcmCount / total) * 100) },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs text-left flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Languages className="w-5 h-5 text-[#a73605]" />
          <span>Language & Translation Management</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Audit and manage English, Yorùbá, and Nigerian Pidgin localization across the platform.
        </p>
      </div>

      {/* Language Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {coverage.map((c, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/60 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{c.flag}</span>
              <span className="text-xs font-black text-[#a73605] bg-[#fff1ea] px-2 py-0.5 rounded-full">
                {c.pct}% Covered
              </span>
            </div>
            <h4 className="text-sm font-black text-slate-900 mb-1">{c.lang}</h4>
            <p className="text-xs text-slate-500">
              {c.count} of {c.total} challenges translated
            </p>
          </div>
        ))}
      </div>

      {/* Active Locales Table */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden">
        <div className="bg-slate-50 p-3.5 border-b border-slate-100 text-xs font-bold text-slate-600 flex justify-between">
          <span>Language Name & Code</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-slate-100">
          {SUPPORTED_LANGUAGES.map((l) => (
            <div key={l.code} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{l.flag}</span>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">{l.nativeLabel} ({l.label})</h5>
                  <span className="text-[11px] text-slate-400 font-mono uppercase">Code: {l.code}</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active in MVP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

