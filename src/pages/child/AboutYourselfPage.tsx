import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { useLanguage } from '../../hooks/useLanguage';
import type { SupportedLanguage } from '../../types/i18n';
import type { AgeGroup } from '../../types/profile';
import { generateAnonymousNickname } from '../../utils/avatarUtils';

export const AboutYourselfPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, createProfile, updateProfile } = useProfile();
  const { language, setLanguage } = useLanguage();

  // Initial state derived from existing profile if available
  const [firstName, setFirstName] = useState(
    profile?.firstName || (profile?.name ? profile.name.split(' ')[0] : '')
  );
  const [lastName, setLastName] = useState(
    profile?.lastName || (profile?.name ? profile.name.split(' ').slice(1).join(' ') : '')
  );
  const [username, setUsername] = useState(
    profile?.username || profile?.anonymousNickname || ''
  );
  const [hasCustomUsername, setHasCustomUsername] = useState(
    Boolean(profile?.username || profile?.anonymousNickname)
  );

  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>(
    (profile?.ageGroup as AgeGroup) || '6 - 9'
  );

  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(
    (profile?.preferredLanguage as SupportedLanguage) || language || 'pcm'
  );

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Age group choices matching design exactly: "6 - 9", "10 -13", "14 - 17"
  const ageGroupOptions: { id: AgeGroup; label: string; defaultAge: number }[] = [
    { id: '6 - 9', label: '6 - 9', defaultAge: 8 },
    { id: '10 - 13', label: '10 -13', defaultAge: 11 },
    { id: '14 - 17', label: '14 - 17', defaultAge: 15 },
  ];

  // Preferred language choices in exact order from design: Pidgin, English, Yoruba
  const languageOptions: { id: SupportedLanguage; label: string }[] = [
    { id: 'pcm', label: 'Pidgin' },
    { id: 'en', label: 'English' },
    { id: 'yo', label: 'Yoruba' },
  ];

  // Handle first name change with gentle auto-suggestion for username if untouched
  const handleFirstNameChange = (val: string) => {
    setFirstName(val);
    setError('');

    if (!hasCustomUsername && val.trim().length > 0) {
      const clean = val.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      if (clean) {
        setUsername(`${clean}${Math.floor(10 + Math.random() * 90)}`);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();

    if (!cleanFirst) {
      setError('Please enter your first name!');
      return;
    }

    const cleanFullName = cleanLast ? `${cleanFirst} ${cleanLast}` : cleanFirst;
    const finalUsername =
      username.trim() ||
      `${cleanFirst.toLowerCase().replace(/[^a-z0-9]/g, '')}${Math.floor(10 + Math.random() * 90)}` ||
      generateAnonymousNickname();

    const ageMap: Record<AgeGroup, number> = {
      '6 - 9': 8,
      '10 - 13': 11,
      '14 - 17': 15,
    };

    const targetAge = ageMap[selectedAgeGroup] || 11;

    setIsSubmitting(true);
    try {
      if (profile && profile.id) {
        await updateProfile({
          name: cleanFullName,
          firstName: cleanFirst,
          lastName: cleanLast,
          username: finalUsername,
          anonymousNickname: finalUsername,
          age: targetAge,
          ageGroup: selectedAgeGroup,
          preferredLanguage: selectedLanguage,
        });
      } else {
        await createProfile({
          name: cleanFullName,
          firstName: cleanFirst,
          lastName: cleanLast,
          username: finalUsername,
          age: targetAge,
          ageGroup: selectedAgeGroup,
          preferredLanguage: selectedLanguage,
          avatarId: profile?.avatarId || 'avatar-eagle',
        });
      }

      setLanguage(selectedLanguage);
      navigate('/child/dashboard');
    } catch (err) {
      console.error('[AboutYourselfPage] Profile submission failed:', err);
      // Ensure smooth navigation to dashboard even if network request fails
      navigate('/child/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#FFFDFB] flex flex-col justify-start items-center py-6 px-5 sm:px-8 md:py-12 select-none font-sans animate-in fade-in duration-300">
      <div className="w-full max-w-[440px] md:max-w-[480px] flex flex-col text-left">
        
        {/* ── Top Navigation Bar (Back Arrow) ── */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/90 border border-[#f2e6dc] shadow-2xs flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Desktop Friendly Badge Indicator */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#A73605]" />
            <span>Profile Setup</span>
          </div>
        </div>

        {/* ── Heading matching uploaded design ── */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-[28px] sm:text-3xl md:text-[34px] font-black text-[#1C1917] tracking-tight leading-tight">
            Tell us about yourself
          </h1>
          <p className="text-sm sm:text-base font-normal text-[#8A8379] mt-1.5 leading-snug">
            we will personalise your daily challenges
          </p>
        </div>

        {/* ── Form Fields ── */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
          
          {/* Row 1: First name & Last name side by side (2 columns) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* First name */}
            <div>
              <label className="block text-sm font-bold text-[#1C1917] mb-2">
                First name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => handleFirstNameChange(e.target.value)}
                placeholder="Placeholder name"
                className="w-full h-12 sm:h-13 px-4 rounded-xl sm:rounded-2xl bg-[#FEF6D8] border border-[#F4DD9A] text-[#1C1917] font-medium text-sm sm:text-base placeholder:text-[#A3997A] focus:outline-none focus:border-[#A73605] focus:ring-2 focus:ring-[#A73605]/20 focus:bg-[#FFF9E4] transition-all"
                autoComplete="given-name"
              />
            </div>

            {/* Last name */}
            <div>
              <label className="block text-sm font-bold text-[#1C1917] mb-2">
                Last name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setError('');
                }}
                placeholder="Placeholder name"
                className="w-full h-12 sm:h-13 px-4 rounded-xl sm:rounded-2xl bg-[#FEF6D8] border border-[#F4DD9A] text-[#1C1917] font-medium text-sm sm:text-base placeholder:text-[#A3997A] focus:outline-none focus:border-[#A73605] focus:ring-2 focus:ring-[#A73605]/20 focus:bg-[#FFF9E4] transition-all"
                autoComplete="family-name"
              />
            </div>
          </div>

          {/* Row 2: Username (full width) */}
          <div>
            <label className="block text-sm font-bold text-[#1C1917] mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setHasCustomUsername(true);
                setError('');
              }}
              placeholder="Placeholder name"
              className="w-full h-12 sm:h-13 px-4 rounded-xl sm:rounded-2xl bg-[#FEF6D8] border border-[#F4DD9A] text-[#1C1917] font-medium text-sm sm:text-base placeholder:text-[#A3997A] focus:outline-none focus:border-[#A73605] focus:ring-2 focus:ring-[#A73605]/20 focus:bg-[#FFF9E4] transition-all"
              autoComplete="username"
            />
          </div>

          {/* Row 3: Your Age group */}
          <div>
            <label className="block text-sm font-bold text-[#1C1917] mb-2">
              Your Age group
            </label>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {ageGroupOptions.map((opt) => {
                const isSelected = selectedAgeGroup === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedAgeGroup(opt.id)}
                    className={`h-12 sm:h-13 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-[#FEF6D8] border-2 border-[#A73605] text-[#1C1917] font-bold shadow-xs scale-[1.01]'
                        : 'bg-[#FEF6D8] border border-[#F4DD9A] text-[#1C1917] hover:border-amber-400 active:scale-95'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 4: Preferred language */}
          <div>
            <label className="block text-sm font-bold text-[#1C1917] mb-2">
              Preferred language
            </label>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {languageOptions.map((opt) => {
                const isSelected = selectedLanguage === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedLanguage(opt.id)}
                    className={`h-12 sm:h-13 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-[#FEF6D8] border-2 border-[#A73605] text-[#1C1917] font-bold shadow-xs scale-[1.01]'
                        : 'bg-[#FEF6D8] border border-[#F4DD9A] text-[#1C1917] hover:border-amber-400 active:scale-95'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-shake">
              {error}
            </div>
          )}

          {/* ── Let's Go! 🚀 CTA Button ── */}
          <div className="pt-2 sm:pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 sm:py-4.5 px-6 rounded-full bg-[#A73605] hover:bg-[#8E2E04] active:scale-[0.98] disabled:opacity-60 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-[#A73605]/30 transition-all cursor-pointer text-center flex items-center justify-center gap-2 select-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Personalising your journey...</span>
                </>
              ) : (
                <span>Let&apos;s Go! 🚀</span>
              )}
            </button>
          </div>

        </form>

        {/* Bottom spacer for comfortable scrolling on mobile screens */}
        <div className="h-8 sm:h-12" />

      </div>
    </div>
  );
};

export default AboutYourselfPage;
