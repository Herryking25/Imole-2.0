import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';
import { ParentProfileService } from '../../services/parentProfileService';

export const ParentLoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    // Short artificial delay so the button feels responsive
    setTimeout(() => {
      const stored = ParentProfileService.getProfile();

      if (!stored) {
        // No account — save this as the profile and proceed (demo mode)
        ParentProfileService.saveProfile({
          parentName: 'Parent',
          email: email.trim().toLowerCase(),
          preferredLanguage: 'en',
          isEmailVerified: true,
        });
        ParentProfileService.unlockSession();
        navigate('/parent');
        return;
      }

      // If a profile exists, loosely match email (or accept any for demo)
      const emailMatch =
        !stored.email ||
        stored.email.toLowerCase() === email.trim().toLowerCase();

      if (emailMatch) {
        ParentProfileService.unlockSession();
        navigate('/parent');
      } else {
        setError('Incorrect email or password. Please try again.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col font-sans select-none">
      <div className="flex-1 flex flex-col max-w-sm w-full mx-auto px-5 py-6">

        {/* Back arrow */}
        <button
          type="button"
          onClick={() => navigate('/parent/auth')}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer self-start mb-8"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="text-5xl mb-4">☀️</div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
            Welcome Back!
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-xs leading-relaxed">
            Log in to monitor your child&apos;s daily learning progress.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="bg-white rounded-3xl px-5 py-6 border border-slate-100 shadow-sm flex flex-col gap-4 text-left">

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
                  placeholder="parent@example.com"
                  autoComplete="email"
                  className="w-full text-sm text-slate-800 bg-transparent outline-none placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  to="/parent/auth"
                  className="text-[11px] font-bold text-[#B83806] hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="flex items-center gap-3 bg-[#FFFBF8] border border-[#F3E8DF] rounded-2xl px-4 py-3.5 focus-within:border-[#B83806] focus-within:ring-2 focus-within:ring-[#B83806]/10 transition-all">
                <Lock className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  placeholder="Your password"
                  autoComplete="current-password"
                  className="w-full text-sm text-slate-800 bg-transparent outline-none placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4 stroke-[1.8]" />
                    : <Eye className="w-4 h-4 stroke-[1.8]" />}
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-[#B83806] hover:bg-[#9A2F05] active:scale-[0.99] disabled:opacity-60 text-white font-extrabold text-base shadow-lg shadow-[#B83806]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{isSubmitting ? 'Signing in...' : 'Log In'}</span>
          </button>

          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link to="/parent/auth" className="font-bold text-[#B83806] hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ParentLoginPage;
