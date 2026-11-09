import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess?: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
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

    setTimeout(() => {
      // Mock admin authentication
      sessionStorage.setItem('imole_admin_authed', 'true');
      if (rememberMe) {
        localStorage.setItem('imole_admin_remember', 'true');
      }
      setIsSubmitting(false);

      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate('/admin');
      }
    }, 450);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans select-none bg-white">
      {/* Left Column — Branding & Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#FFF9F6] via-[#FFF3EE] to-[#FFEFEA] flex-col items-center justify-between p-12 lg:p-16 border-r border-[#F4E9E2] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B83806]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo & Title */}
        <div className="flex flex-col items-center text-center relative z-10 pt-4">
          {/* Glowing Sun Badge */}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#EA580C] via-[#F59E0B] to-[#F97316] p-0.5 shadow-lg shadow-orange-500/20 flex items-center justify-center mb-4">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FB923C] via-[#EA580C] to-[#C2410C] flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 48 48" className="w-11 h-11 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="7" fill="white" />
                <line x1="24" y1="6" x2="24" y2="11" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="24" y1="37" x2="24" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="6" y1="24" x2="11" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="37" y1="24" x2="42" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="11.3" y1="11.3" x2="14.8" y2="14.8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="33.2" y1="33.2" x2="36.7" y2="36.7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="11.3" y1="36.7" x2="14.8" y2="33.2" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="33.2" y1="14.8" x2="36.7" y2="11.3" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
            IMOLE
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1.5">
            Be the Light Among Your Peers
          </p>
        </div>

        {/* Center: Hero Illustration */}
        <div className="relative z-10 my-auto py-8 flex flex-col items-center">
          <div className="relative w-72 h-64 max-w-full flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xs rounded-full scale-90 border border-orange-100/60" />

            {/* SVG Illustration of Family/Learning */}
            <svg viewBox="0 0 320 280" className="w-full h-full relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Plant leaves left & right */}
              <path d="M50 200C40 160 55 125 70 110C75 145 70 185 50 200Z" fill="#10B981" fillOpacity="0.85" />
              <path d="M72 195C68 150 82 120 95 105C96 140 90 180 72 195Z" fill="#34D399" fillOpacity="0.75" />
              <path d="M270 200C280 160 265 125 250 110C245 145 250 185 270 200Z" fill="#10B981" fillOpacity="0.85" />
              <path d="M248 195C252 150 238 120 225 105C224 140 230 180 248 195Z" fill="#34D399" fillOpacity="0.75" />

              {/* Mother/Teacher (center) */}
              <circle cx="160" cy="115" r="32" fill="#1E293B" />
              {/* Hair/Headwrap */}
              <ellipse cx="160" cy="110" rx="34" ry="28" fill="#0F172A" />
              <ellipse cx="160" cy="120" rx="22" ry="20" fill="#8D5B4C" />
              {/* Torso */}
              <path d="M120 220C120 170 140 155 160 155C180 155 200 170 200 220H120Z" fill="#F97316" fillOpacity="0.9" />

              {/* Child 1 (left) */}
              <circle cx="105" cy="155" r="20" fill="#8D5B4C" />
              <path d="M88 150C88 135 122 135 122 150C122 155 88 155 88 150Z" fill="#0F172A" />
              <path d="M80 220C80 185 95 180 105 180C115 180 130 185 130 220H80Z" fill="#EA580C" />

              {/* Child 2 (right) */}
              <circle cx="215" cy="155" r="20" fill="#784433" />
              <circle cx="200" cy="138" r="6" fill="#0F172A" />
              <circle cx="230" cy="138" r="6" fill="#0F172A" />
              <path d="M198 150C198 138 232 138 232 150C232 154 198 154 198 150Z" fill="#0F172A" />
              <path d="M190 220C190 185 205 180 215 180C225 180 240 185 240 220H190Z" fill="#EC4899" />

              {/* Laptop on desk */}
              <rect x="135" y="190" width="50" height="30" rx="4" fill="#0284C7" />
              <rect x="140" y="195" width="40" height="20" rx="2" fill="#E0F2FE" />
              <rect x="158" y="202" width="4" height="7" rx="1" fill="#0284C7" />
              <path d="M125 220H195L190 226H130L125 220Z" fill="#0369A1" />

              {/* Checkmark bubble left */}
              <circle cx="85" cy="95" r="13" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
              <path d="M79 95L83 99L91 91" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Star bubble right */}
              <circle cx="235" cy="95" r="13" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
              <path d="M235 88L237 93H242L238 96L239.5 101L235 98L230.5 101L232 96L228 93H233L235 88Z" fill="#F59E0B" />
            </svg>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10 pb-4 text-center">
          <p className="text-[11px] font-black tracking-widest uppercase text-slate-400">
            EMPOWERING NEXT-GEN LEADERS
          </p>
        </div>
      </div>

      {/* Right Column — Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md">

          {/* Mobile-only Top Brand Header */}
          <div className="flex md:hidden flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#EA580C] to-[#F59E0B] p-0.5 shadow-md flex items-center justify-center mb-2">
              <div className="w-full h-full rounded-full bg-[#EA580C] flex items-center justify-center">
                <span className="text-xl">☀️</span>
              </div>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">IMOLE</h1>
            <p className="text-xs text-slate-500">Admin Portal</p>
          </div>

          {/* Heading */}
          <div className="mb-8 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Admin Login
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-normal">
              Welcome back! Please sign in to access the admin dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus-within:border-[#B83806] focus-within:ring-2 focus-within:ring-[#B83806]/10 transition-all shadow-xs">
                <Mail className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  placeholder="Enter your email address"
                  className="w-full text-sm text-slate-900 bg-transparent outline-none placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                Password
              </label>
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus-within:border-[#B83806] focus-within:ring-2 focus-within:ring-[#B83806]/10 transition-all shadow-xs">
                <Lock className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  placeholder="Enter your password"
                  className="w-full text-sm text-slate-900 bg-transparent outline-none placeholder:text-slate-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#B83806] focus:ring-[#B83806] border-slate-300"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Please contact system administrator to reset credentials.')}
                className="font-bold text-[#B83806] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-4 rounded-xl bg-[#B83806] hover:bg-[#9A2F05] active:scale-[0.99] disabled:opacity-60 text-white font-extrabold text-sm shadow-md shadow-[#B83806]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{isSubmitting ? 'Signing in...' : 'Log In'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>

            {/* Security Notice */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium pt-3">
              <ShieldCheck className="w-4 h-4 text-[#B83806]" />
              <span>Secure login • Admin Access Only</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

