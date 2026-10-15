import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, Phone, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { ImoleLogo } from '../../components/common/ImoleLogo';
import { ChildSidebar } from '../../components/navigation/ChildSidebar';
import { useParent } from '../../hooks/useParent';
import { ParentProfileService } from '../../services/parentProfileService';

export const ParentLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useParent();

  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('parent@example.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError(loginMethod === 'email' ? 'Please enter your email address' : 'Please enter your phone number');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = loginMethod === 'email'
        ? { email: identifier.trim().toLowerCase(), password }
        : { phone: identifier.trim(), password };

      const res = await login(payload);

      if (res.success && res.parent) {
        // Keep local profile service in sync
        ParentProfileService.saveProfile({
          parentName: res.parent.name,
          email: res.parent.email || (loginMethod === 'email' ? identifier.trim() : undefined),
          phone: res.parent.phone || (loginMethod === 'phone' ? identifier.trim() : undefined),
          preferredLanguage: 'en',
          isEmailVerified: true,
        });

        ParentProfileService.unlockSession();
        navigate('/parent');
      } else {
        setError(res.message || 'Invalid credentials. Please check your login details and try again.');
      }
    } catch (err: unknown) {
      setError((err as Error)?.message || 'An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]/60 md:bg-white flex flex-col md:flex-row font-sans select-none">
      {/* Desktop Left Sidebar */}
      <ChildSidebar className="hidden md:flex" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#faf8f5]/60 md:bg-white">
        <main className="flex-1 w-full max-w-md mx-auto p-4 sm:p-6 pb-16 flex flex-col justify-between min-h-[85vh]">
          <div>
            {/* Top Bar with Back */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => navigate('/parent/auth')}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>

              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Parent Portal
              </span>

              <div className="w-10" />
            </div>

            {/* Header branding */}
            <div className="flex flex-col items-center text-center mt-6">
              <div className="transform hover:scale-105 transition-transform duration-300 mb-3">
                <ImoleLogo size={76} withGlow={true} />
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome Back!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xs mt-1">
                Log in to monitor your child&apos;s daily learning progress and achievements.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4 text-left">
              {/* Method Switcher: Email or Phone */}
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('email');
                    setError(null);
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    loginMethod === 'email'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Address</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('phone');
                    setError(null);
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    loginMethod === 'phone'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone Number</span>
                </button>
              </div>

              {/* Identifier Input */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col gap-1 focus-within:border-[#a73605] focus-within:ring-2 focus-within:ring-[#a73605]/15 transition-all">
                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                  {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
                </label>
                <div className="flex items-center gap-3">
                  {loginMethod === 'email' ? (
                    <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <input
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setError(null);
                    }}
                    placeholder={loginMethod === 'email' ? 'parent@example.com' : '08012345678'}
                    autoComplete={loginMethod === 'email' ? 'email' : 'tel'}
                    className="w-full text-sm font-semibold text-slate-900 bg-transparent outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col gap-1 focus-within:border-[#a73605] focus-within:ring-2 focus-within:ring-[#a73605]/15 transition-all">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                    Password
                  </label>
                  <Link
                    to="/parent/forgot-pin"
                    className="text-[11px] font-bold text-[#a73605] hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full text-sm font-semibold text-slate-900 bg-transparent outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[2]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[2]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error banner */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-[#a73605] hover:bg-[#8e2e04] active:scale-[0.99] disabled:opacity-60 text-white font-extrabold text-base shadow-lg shadow-[#a73605]/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Log In</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.4]" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center text-center gap-2 pt-8 pb-4 text-xs text-slate-500">
            <p>
              Don&apos;t have a parent account yet?{' '}
              <Link
                to="/parent/register"
                className="font-bold text-[#a73605] hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentLoginPage;
