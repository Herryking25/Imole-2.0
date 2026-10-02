import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ImoleLogo } from '../../components/common/ImoleLogo';
import { ChildSidebar } from '../../components/navigation/ChildSidebar';
import { ParentProfileService } from '../../services/parentProfileService';
import { useProfile } from '../../hooks/useProfile';

export const ParentAuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile: childProfile } = useProfile();

  const handleGoogleAuth = () => {
    // Save parent profile with Google default
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

    // Navigate to PIN setup or parent dashboard
    if (!ParentProfileService.hasPin()) {
      navigate('/parent/set-pin');
    } else {
      navigate('/parent');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]/60 md:bg-white flex flex-col md:flex-row font-sans select-none">
      {/* ── Desktop Left Sidebar ── */}
      <ChildSidebar className="hidden md:flex" />

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#faf8f5]/60 md:bg-white">
        <main className="flex-1 w-full max-w-xl mx-auto p-4 sm:p-6 md:p-8 pb-16 flex flex-col items-center justify-between min-h-[85vh]">
          
          <div className="w-full flex flex-col items-center pt-8 sm:pt-16 text-center">
            {/* ── IMOLE Sun Logo ── */}
            <div className="transform hover:scale-105 transition-transform duration-300 mb-4">
              <ImoleLogo size={100} withGlow={true} />
            </div>

            {/* IMOLE text */}
            <h2 className="text-2xl font-black tracking-wider text-[#a73605] uppercase mb-6 font-sans">
              IMOLE
            </h2>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Join the Light!
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xs mx-auto mb-10 leading-relaxed">
              Start your journey and be the brightest among your peers.
            </p>

            {/* ── Sign up / Sign in with Google Button ── */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full max-w-md py-4 px-6 rounded-full bg-white border border-slate-200/90 text-slate-800 font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99] transition-all cursor-pointer"
            >
              {/* Google Colored Logo */}
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
              <span>Sign up/ Sign in with Google</span>
            </button>
          </div>

          {/* ── Footer ── */}
          <div className="flex flex-col items-center text-center gap-2 pt-10 pb-4 text-xs text-slate-500">
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/parent/unlock')}
                className="font-bold text-[#a73605] hover:underline cursor-pointer"
              >
                Log in
              </button>
            </p>

            <p className="text-[11px] text-slate-400 max-w-xs leading-tight">
              By signing up, you agree to our{' '}
              <Link to="/child/settings" className="underline hover:text-slate-600">
                Terms
              </Link>{' '}
              and{' '}
              <Link to="/child/settings" className="underline hover:text-slate-600">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ParentAuthPage;
