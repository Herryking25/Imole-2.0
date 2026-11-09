import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ParentProfileService } from '../../services/parentProfileService';
import { useProfile } from '../../hooks/useProfile';

const GoogleLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

export const ParentAuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile: childProfile } = useProfile();

  const handleGoogleAuth = () => {
    ParentProfileService.saveProfile({
      parentName: 'Folake Adeyemi',
      email: 'folake.adeyemi@gmail.com',
      preferredLanguage: 'en',
      childName: childProfile?.name || 'Your Child',
      childAge: childProfile?.age || 10,
      relationship: 'Guardian',
      receiveUpdates: true,
      isEmailVerified: true,
    });

    if (!ParentProfileService.hasPin()) {
      navigate('/parent/set-pin');
    } else {
      navigate('/parent');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col font-sans select-none">
      <div className="flex-1 flex flex-col max-w-sm w-full mx-auto px-5 py-6">

        {/* Back arrow */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer self-start"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2 -mt-10">
          {/* Sun emoji */}
          <div className="text-6xl mb-4 leading-none select-none">☀️</div>

          {/* IMÖLE */}
          <h2 className="text-2xl font-black tracking-widest text-[#B83806] uppercase mb-1">
            IMÖLE
          </h2>

          {/* Join the Light! */}
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
            Join the Light!
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-slate-500 font-medium max-w-xs leading-relaxed mb-10">
            Start your journey and be the brightest among your peers.
          </p>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full py-4 px-5 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold text-sm flex items-center justify-center gap-3 shadow-sm hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99] transition-all cursor-pointer mb-3"
          >
            <GoogleLogo />
            <span>Sign up / Sign in with Google</span>
          </button>

          {/* Email button */}
          <button
            type="button"
            onClick={() => navigate('/parent/language')}
            className="w-full py-4 px-5 rounded-full bg-[#FFF1ED] hover:bg-[#FFE4D9] active:scale-[0.99] text-[#B83806] font-semibold text-sm flex items-center justify-center transition-all cursor-pointer mb-6"
          >
            Sign up with Email
          </button>

          {/* Log in link */}
          <p className="text-sm text-slate-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/parent/login')}
              className="font-bold text-[#B83806] hover:underline cursor-pointer"
            >
              Log in
            </button>
          </p>
        </div>

        {/* Footer terms */}
        <p className="text-center text-[11px] text-slate-400 leading-tight pb-2">
          By signing up, you agree to our{' '}
          <Link to="/child/settings" className="underline hover:text-slate-600">Terms</Link>
          {' '}and{' '}
          <Link to="/child/settings" className="underline hover:text-slate-600">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default ParentAuthPage;
