import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Globe,
  BarChart2,
  ArrowRight,
  Link as LinkIcon,
  Copy,
  Check,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { useLanguage } from '../../hooks/useLanguage';
import { useProfile } from '../../hooks/useProfile';
import { Modal } from '../../components/common/Modal';
import type { SupportedLanguage } from '../../types/i18n';

export const ChildSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, progress } = useApp();
  const { language, setLanguage } = useLanguage();
  const { updateProfile, generateLinkCode } = useProfile();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkCode, setLinkCode] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(600);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isGeneratingCode, setIsGeneratingCode] = useState<boolean>(false);

  const displayName = profile?.name || 'Tolu O.';
  const displayAge = profile?.age || 12;

  // Extract initials
  const initials =
    displayName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'TO';

  const completedLessons = progress.totalCompleted;
  const badgesCount = Math.max(1, Math.floor(progress.totalPoints / 25));

  const languages: { id: SupportedLanguage; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'pcm', label: 'Pidgin' },
    { id: 'yo', label: 'Yoruba' },
  ];

  const currentLangLabel =
    languages.find((l) => l.id === language)?.label || 'English';

  // Handle open Link Code modal
  const handleOpenLinkModal = async () => {
    setIsGeneratingCode(true);
    setIsLinkModalOpen(true);
    setIsCopied(false);
    try {
      const res = await generateLinkCode();
      setLinkCode(res.linkCode);
      setCountdown(res.expiresInSeconds || 600);
    } catch (err) {
      console.warn('[ChildSettingsPage] Failed to generate link code:', err);
    } finally {
      setIsGeneratingCode(false);
    }
  };

  // 10-minute timer for Link Code modal
  useEffect(() => {
    if (!isLinkModalOpen || countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isLinkModalOpen, countdown]);

  const handleCopyCode = () => {
    if (!linkCode) return;
    navigator.clipboard.writeText(linkCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <div className="flex-1 min-h-screen bg-[#faf8f5]/50 md:bg-white flex flex-col py-4 px-4 sm:px-8 pb-28 sm:pb-8 animate-in fade-in duration-300">
      <div className="max-w-md w-full mx-auto flex flex-col gap-4">

        {/* ── Top Bar ── */}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={() => navigate('/child/dashboard')}
            className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all cursor-pointer select-none active:scale-95"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>⚙️</span>
            <span>Settings</span>
          </h1>
        </div>

        {/* ── Profile Summary Card ── */}
        <div className="w-full bg-white rounded-3xl p-5 border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between select-none">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-[#fef9c3] text-amber-900 font-extrabold text-base flex items-center justify-center shrink-0 border border-amber-200/80 shadow-xs">
              {initials}
            </div>
            <div className="text-left">
              <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                {displayName}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                Age: {displayAge} • @{profile?.anonymousNickname || 'Hero'}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/child/about-yourself')}
            className="w-10 h-10 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center hover:bg-rose-100 active:scale-95 transition-all cursor-pointer shadow-2xs"
            aria-label="Edit Profile"
          >
            <Edit2 className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* ── Link With Parent Card (New Backend Feature) ── */}
        <div className="w-full bg-gradient-to-br from-[#fff7ed] to-white rounded-3xl p-5 border border-amber-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-3 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-950">
              <LinkIcon className="w-4 h-4 text-[#a73605]" />
              <span>Link with Parent</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200/60">
              6-char code
            </span>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Generate a secure 6-character code so your parent can connect and view your learning badges on their phone.
          </p>

          <button
            onClick={handleOpenLinkModal}
            className="w-full py-3 px-4 rounded-2xl bg-[#a73605] hover:bg-[#8e2e04] active:scale-[0.98] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Parent Link Code</span>
          </button>
        </div>

        {/* ── Language Card ── */}
        <div className="w-full bg-white rounded-3xl p-5 border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-3 text-left">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Language</span>
          </div>

          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="w-full bg-[#fff7ed] border border-[#fed7aa] rounded-2xl p-3.5 px-4 flex items-center justify-between cursor-pointer transition-all hover:bg-[#ffedd5]/70 text-left select-none"
          >
            <span className="text-sm font-bold text-slate-900">
              {currentLangLabel}
            </span>
            <div className="w-4 h-4 rounded-full border-4 border-[#a73605] bg-white" />
          </button>

          {/* Expanded Language Picker */}
          {isLangDropdownOpen && (
            <div className="grid grid-cols-3 gap-2 pt-1 animate-in fade-in duration-200">
              {languages.map((l) => {
                const isSelected = language === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => {
                      setLanguage(l.id);
                      updateProfile({ preferredLanguage: l.id });
                      setIsLangDropdownOpen(false);
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#a73605] text-white shadow-xs'
                        : 'bg-[#fef9c3] border border-amber-300/80 text-slate-800 hover:bg-[#fef08a]'
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Your Stats Card ── */}
        <div className="w-full bg-white rounded-3xl p-5 border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-3 text-left">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <BarChart2 className="w-4 h-4 text-emerald-600" />
            <span>Your Stats</span>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            {/* Lessons */}
            <div className="bg-[#fee2e2]/60 border border-rose-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-[#991b1b] leading-tight">
                {completedLessons}
              </span>
              <span className="text-xs font-semibold text-slate-600 mt-0.5">
                Challenges Done
              </span>
            </div>

            {/* Badges */}
            <div className="bg-[#fef3c7]/60 border border-amber-200/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-[#92400e] leading-tight">
                {badgesCount}
              </span>
              <span className="text-xs font-semibold text-slate-600 mt-0.5">
                Badges
              </span>
            </div>
          </div>
        </div>

        {/* ── Parent Dashboard Outline Button ── */}
        <button
          onClick={() => navigate('/parent')}
          className="w-full py-3.5 px-6 rounded-full border-2 border-[#a73605] bg-white text-[#a73605] font-bold text-sm flex items-center justify-center gap-2 shadow-xs hover:bg-orange-50 active:scale-[0.99] transition-all cursor-pointer mt-2"
        >
          <span>👨‍👩‍👧</span>
          <span>Parent Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* ── Version Footer ── */}
        <p className="text-xs text-slate-400 text-center mt-1">
          Imole App v2.0 • Connected to Hosted API
        </p>

      </div>

      {/* ── Parent Link Code Modal ── */}
      <Modal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        title="Parent Link Code"
      >
        <div className="flex flex-col items-center text-center gap-4 py-2">
          <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
            Give this code to your parent. They will enter it in their Parent Dashboard to link your profile.
          </p>

          {isGeneratingCode ? (
            <div className="py-8 flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-3 border-amber-300 border-t-[#a73605] rounded-full animate-spin" />
              <span className="text-xs font-bold text-slate-500">Generating code...</span>
            </div>
          ) : (
            <>
              {/* Big Code Pill */}
              <div className="bg-[#fff7ed] border-2 border-dashed border-[#ea580c] py-4 px-8 rounded-2xl flex items-center justify-center gap-3 w-full">
                <span className="text-3xl sm:text-4xl font-black text-[#a73605] tracking-widest font-mono">
                  {linkCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 rounded-xl bg-white border border-amber-200 text-amber-900 hover:bg-amber-50 active:scale-95 transition-all cursor-pointer shadow-xs"
                  title="Copy code"
                >
                  {isCopied ? (
                    <Check className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <Copy className="w-5 h-5 text-[#a73605]" />
                  )}
                </button>
              </div>

              {/* Countdown Bar */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Expires in: {formatCountdown(countdown)}</span>
              </div>
            </>
          )}

          <button
            onClick={() => setIsLinkModalOpen(false)}
            className="w-full py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all mt-2 cursor-pointer"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ChildSettingsPage;
