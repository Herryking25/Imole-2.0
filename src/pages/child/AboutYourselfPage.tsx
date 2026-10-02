import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { useLanguage } from '../../hooks/useLanguage';
import type { SupportedLanguage } from '../../types/i18n';
import type { AgeGroup } from '../../types/profile';

export const AboutYourselfPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, createProfile } = useProfile();
  const { language, setLanguage } = useLanguage();

  const [name, setName] = useState(
    profile?.name || profile?.firstName ? `${profile.firstName} ${profile.lastName || ''}`.trim() : 'Tolu Olawale'
  );
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>(
    profile?.ageGroup === '6 - 9' ? '8 - 10' : profile?.ageGroup === '14 - 17' ? '14 - 16' : '8 - 10'
  );
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(
    (profile?.preferredLanguage as SupportedLanguage) || language || 'pcm'
  );
  const [error, setError] = useState('');

  const ageGroups = ['8 - 10', '11 - 13', '14 - 16'];

  const languages: { id: SupportedLanguage; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'pcm', label: 'Pidgin' },
    { id: 'yo', label: 'Yoruba' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = name.trim();
    if (!cleanName) {
      setError('Please enter your name!');
      return;
    }

    const parts = cleanName.split(' ');
    const firstName = parts[0] || 'Champ';
    const lastName = parts.slice(1).join(' ') || '';

    // Map age group to typical age
    const ageMap: Record<string, { age: number; grp: AgeGroup }> = {
      '8 - 10': { age: 9, grp: '6 - 9' },
      '11 - 13': { age: 12, grp: '10 - 13' },
      '14 - 16': { age: 15, grp: '14 - 17' },
    };

    const mapped = ageMap[selectedAgeGroup] || { age: 12, grp: '10 - 13' };

    createProfile({
      name: cleanName,
      firstName,
      lastName,
      username: cleanName,
      age: mapped.age,
      ageGroup: mapped.grp,
      preferredLanguage: selectedLanguage,
      avatarId: profile?.avatarId || 'avatar-eagle',
    });

    setLanguage(selectedLanguage);
    navigate('/child/settings');
  };

  return (
    <div className="flex-1 min-h-screen bg-[#faf8f5]/50 md:bg-white flex flex-col py-4 px-4 sm:px-8 pb-28 sm:pb-8 animate-in fade-in duration-300">
      <div className="max-w-md w-full mx-auto flex flex-col text-left">

        {/* ── Top Bar with Back Button and Label ── */}
        <div className="flex items-center gap-2 pt-1 select-none">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <span className="text-base font-bold text-slate-800 ml-1">
            Back
          </span>
        </div>

        {/* ── Title & Subtitle ── */}
        <div className="mt-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            About yourself
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
            we will personalise your daily challenges
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* ── Your Name Field ── */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="e.g. Tolu Olawale"
              className="w-full p-3.5 px-4 rounded-xl bg-[#fef9c3] border border-amber-300/80 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#a73605]/30 placeholder:text-slate-400 transition-all"
            />
          </div>

          {/* ── Your Age Group ── */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Your Age group
            </label>
            <div className="flex gap-2.5">
              {ageGroups.map((grp) => {
                const isSelected = selectedAgeGroup === grp;
                return (
                  <button
                    key={grp}
                    type="button"
                    onClick={() => setSelectedAgeGroup(grp)}
                    className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#fef9c3] border-2 border-[#a73605] text-slate-900 shadow-xs'
                        : 'bg-[#fef9c3] border border-amber-300/80 text-slate-800 hover:border-amber-400'
                    }`}
                  >
                    {grp}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Preferred Language ── */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Preferred language
            </label>
            <div className="flex gap-2.5">
              {languages.map((lang) => {
                const isSelected = selectedLanguage === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#fef9c3] border-2 border-[#a73605] text-slate-900 shadow-xs'
                        : 'bg-[#fef9c3] border border-amber-300/80 text-slate-800 hover:border-amber-400'
                    }`}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-xs font-bold text-rose-600 animate-shake">
              {error}
            </p>
          )}

          {/* ── Update Info CTA Button ── */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-full bg-[#a73605] hover:bg-[#8e2e04] active:scale-[0.98] text-white font-bold text-base shadow-lg shadow-[#a73605]/25 mt-6 transition-all cursor-pointer text-center"
          >
            Update Info
          </button>

        </form>

      </div>
    </div>
  );
};

export default AboutYourselfPage;
