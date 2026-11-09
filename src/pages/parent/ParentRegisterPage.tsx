import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, AlertCircle, UserPlus } from 'lucide-react';
import { ParentProfileService } from '../../services/parentProfileService';
import { useLanguage } from '../../hooks/useLanguage';
import { useProfile } from '../../hooks/useProfile';
import type { SupportedLanguage } from '../../types/i18n';

const GoogleLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

export const ParentRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const { profile: childProfile } = useProfile();

  const passedLang = (location.state as { preferredLanguage?: SupportedLanguage })?.preferredLanguage;
  const preferredLang: SupportedLanguage = passedLang || language || 'en';

  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveAndContinue = (overrides?: { name?: string; email?: string }) => {
    ParentProfileService.saveProfile({
      parentName: (overrides?.name ?? parentName).trim() || 'Parent',
      email: (overrides?.email ?? email).trim().toLowerCase() || 'parent@imole.app',
      password,
      preferredLanguage: preferredLang,
      childName: childProfile?.name || 'Your Child',
      childAge: childProfile?.age || 10,
      relationship: 'Guardian',
      receiveUpdates: true,
      isEmailVerified: false,
    });
    setLanguage(preferredLang);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!parentName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    saveAndContinue();
    navigate('/parent/verify-email', { state: { email: email.trim() } });
  };

  const handleGoogleSignIn = () => {
    saveAndContinue({
      name: parentName.trim() || 'Folake Adeyemi',
      email: email.trim() || 'folake.adeyemi@gmail.com',
    });

    ParentProfileService.setEmailVerified(true);
    if (!ParentProfileService.hasPin()) {
      navigate('/parent/set-pin');
    } else {
      navigate('/parent');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col font-sans select-none">
      <div className="flex-1 flex flex-col max-w-sm w-full mx-auto px-5 py-6 overflow-y-auto">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate('/parent/language')}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF1ED] border border-[#FBCBB7] text-[#B83806] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#B83806]" />
            <span>Step 1 of 2</span>
          </div>

          <div className="w-10" />
        </div>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-[20px] bg-[#FFF1ED] flex items-center justify-center mb-4">
            <UserPlus className="w-8 h-8 text-[#B83806] stroke-[1.8]" />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
            Parent Account Setup
          </h1>

          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Welcome to <span className="font-bold text-[#B83806]">IMÖLE</span> Parent Hub!
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="bg-white rounded-3xl px-5 py-6 border border-slate-100 shadow-sm flex flex-col gap-4 text-left">

            {/* Name */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">
                Parent / Guardian Name
              </label>
              <div className="flex items-center gap-3 bg-[#FFFBF8] border border-[#F3E8DF] rounded-2xl px-4 py-3.5 focus-within:border-[#B83806] focus-within:ring-2 focus-within:ring-[#B83806]/10 transition-all">
                <User className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => { setParentName(e.target.value); setError(null); }}
                  placeholder="Folake Adeyemi"
                  className="w-full text-sm text-slate-800 bg-transparent outline-none placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-3 bg-[#FFFBF8] border border-[#F3E8DF] rounded-2xl px-4 py-3.5 focus-within:border-[#B83806] focus-within:ring-2 focus-within:ring-[#B83806]/10 transition-all">
                <Mail className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  placeholder="folake.adeyemi@gmail.com"
                  className="w-full text-sm text-slate-800 bg-transparent outline-none placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">
                Create Parent Password
              </label>
              <div className="flex items-center gap-3 bg-[#FFFBF8] border border-[#F3E8DF] rounded-2xl px-4 py-3.5 focus-within:border-[#B83806] focus-within:ring-2 focus-within:ring-[#B83806]/10 transition-all">
                <Lock className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  placeholder="••••••••••"
                  className="w-full text-sm text-slate-800 bg-transparent outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 stroke-[1.8]" /> : <Eye className="w-4 h-4 stroke-[1.8]" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* OR QUICK LINK */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">OR QUICK LINK</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-3.5 px-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm flex items-center justify-center gap-3 hover:bg-slate-50 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
          >
            <GoogleLogo />
            <span>Continue with Google</span>
          </button>

          {/* Continue */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#B83806] hover:bg-[#9A2F05] active:scale-[0.99] text-white font-extrabold text-base shadow-lg shadow-[#B83806]/20 flex items-center justify-center transition-all cursor-pointer"
          >
            Continue
          </button>

          <p className="text-center text-[11px] text-slate-400 leading-tight pb-2">
            By continuing, you agree to IMÖLE Parent Terms &amp; Safety Policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ParentRegisterPage;
