import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, Mail, Phone, Lock, Eye, EyeOff, Users, Loader2, AlertCircle } from 'lucide-react';
import { ParentProfileService } from '../../services/parentProfileService';
import { useLanguage } from '../../hooks/useLanguage';
import { useProfile } from '../../hooks/useProfile';
import { useParent } from '../../hooks/useParent';
import type { SupportedLanguage } from '../../types/i18n';

export const ParentRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const { profile: childProfile } = useProfile();
  const { register } = useParent();

  // Read language chosen in step 1 if passed
  const passedLang = (location.state as { preferredLanguage?: SupportedLanguage })?.preferredLanguage;
  const preferredLang: SupportedLanguage = passedLang || language || 'en';

  const [parentName, setParentName] = useState('Mrs Okafor');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!parentName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim() && !phone.trim()) {
      setError('Please provide an email address, a phone number, or both.');
      return;
    }

    if (email.trim() && !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: parentName.trim(),
        email: email.trim() ? email.trim().toLowerCase() : undefined,
        phone: phone.trim() ? phone.trim() : undefined,
        password,
      };

      const res = await register(payload);

      if (res.success && res.parent) {
        // Save local parent profile
        ParentProfileService.saveProfile({
          parentName: res.parent.name,
          email: res.parent.email || email.trim() || undefined,
          phone: res.parent.phone || phone.trim() || undefined,
          password: password,
          preferredLanguage: preferredLang,
          childName: childProfile?.name || 'Your Child',
          childAge: childProfile?.age || 10,
          relationship: 'Guardian',
          receiveUpdates: true,
          isEmailVerified: true,
        });

        ParentProfileService.unlockSession();
        setLanguage(preferredLang);
        navigate('/parent');
      } else {
        setError(res.message || 'Registration failed. Please check your details and try again.');
      }
    } catch (err: unknown) {
      setError((err as Error)?.message || 'Network error occurred. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Quick link with Google fallback
    ParentProfileService.saveProfile({
      parentName: parentName.trim() || 'Folake Adeyemi',
      email: email.trim() || 'folake.adeyemi@gmail.com',
      preferredLanguage: preferredLang,
      childName: childProfile?.name || 'Your Child',
      childAge: childProfile?.age || 10,
      relationship: 'Guardian',
      receiveUpdates: true,
      isEmailVerified: true,
    });

    setLanguage(preferredLang);
    navigate('/parent');
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col justify-between py-6 px-4 sm:px-6 select-none font-sans">
      <div className="max-w-md w-full mx-auto flex flex-col justify-between min-h-[88vh]">
        {/* ── Top Bar ── */}
        <div>
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => navigate('/parent/language')}
              className="w-11 h-11 rounded-full bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
              aria-label="Go back to language selection"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Step Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff4ed] border border-[#fbcbb7] text-[#b83808] text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#b83808]" />
              <span>Step 2 of 2 · Parent Profile</span>
            </div>

            <div className="w-11" />
          </div>

          {/* ── Center Header Icon ── */}
          <div className="flex flex-col items-center text-center mt-6">
            <div className="w-16 h-16 rounded-[22px] bg-gradient-to-b from-[#fde6d8] via-[#ffdcd0] to-[#fbcbb7] flex items-center justify-center shadow-2xs mb-3">
              <Users className="w-8 h-8 text-[#8a2908] stroke-[2.2]" />
            </div>

            <h1 className="text-2xl sm:text-[26px] font-extrabold text-[#292524] tracking-tight">
              Create Parent Account
            </h1>

            <p className="text-xs sm:text-[13px] text-slate-500 max-w-sm mt-1.5 leading-relaxed px-2 font-medium">
              Join <span className="font-bold text-[#b83808]">IMOLE</span> to connect with your child&apos;s device, review progress, and celebrate milestones.
            </p>
          </div>

          {/* ── Form Card ── */}
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3.5">
            <div className="bg-white rounded-[26px] p-5 sm:p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col gap-3.5 text-left">
              
              {/* Field 1: Name */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <div className="flex items-center gap-3 bg-[#fffbf8] border border-[#f3e8df] rounded-2xl px-4 py-3 focus-within:border-[#b83808] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#b83808]/15 transition-all">
                  <User className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => {
                      setParentName(e.target.value);
                      setError(null);
                    }}
                    placeholder="e.g. Mrs Okafor"
                    className="w-full text-sm font-semibold text-slate-800 bg-transparent outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Field 2: Email */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-slate-400 font-normal">(or Phone)</span>
                </label>
                <div className="flex items-center gap-3 bg-[#fffbf8] border border-[#f3e8df] rounded-2xl px-4 py-3 focus-within:border-[#b83808] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#b83808]/15 transition-all">
                  <Mail className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    placeholder="parent@example.com"
                    className="w-full text-sm font-semibold text-slate-800 bg-transparent outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Field 3: Phone */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="flex items-center gap-3 bg-[#fffbf8] border border-[#f3e8df] rounded-2xl px-4 py-3 focus-within:border-[#b83808] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#b83808]/15 transition-all">
                  <Phone className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError(null);
                    }}
                    placeholder="08012345678"
                    className="w-full text-sm font-semibold text-slate-800 bg-transparent outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Field 4: Password */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password *
                </label>
                <div className="flex items-center gap-3 bg-[#fffbf8] border border-[#f3e8df] rounded-2xl px-4 py-3 focus-within:border-[#b83808] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#b83808]/15 transition-all">
                  <Lock className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    placeholder="At least 6 characters"
                    className="w-full text-sm font-semibold text-slate-800 bg-transparent outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[1.8]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[1.8]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-[#a73605] hover:bg-[#8e2e04] active:scale-[0.99] disabled:opacity-60 text-white font-extrabold text-base shadow-lg shadow-[#a73605]/25 flex items-center justify-center gap-2 transition-all cursor-pointer mt-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Register Account</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </>
              )}
            </button>

            {/* Quick divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-[1px] bg-slate-200/90" />
              <span className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase">
                Or
              </span>
              <div className="flex-1 h-[1px] bg-slate-200/90" />
            </div>

            {/* Continue with Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3.5 px-4 rounded-2xl bg-white border border-slate-200/90 text-slate-700 font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-50 active:scale-[0.99] transition-all shadow-2xs cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>

          {/* Already have account */}
          <div className="flex flex-col items-center text-center gap-1.5 pt-6 pb-2 text-xs text-slate-500">
            <p>
              Already registered?{' '}
              <Link to="/parent/login" className="font-bold text-[#a73605] hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
};

export default ParentRegisterPage;
