import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ChevronRight, Lock, RotateCcw, ArrowLeft } from 'lucide-react';
import { ChildSidebar } from '../../components/navigation/ChildSidebar';
import { ParentProfileService } from '../../services/parentProfileService';

export const ParentForgotPinPage: React.FC = () => {
  const navigate = useNavigate();
  const profile = ParentProfileService.getProfile();

  // Mask email e.g. "t***@gmail.com" or "f***@gmail.com"
  const rawEmail = profile?.email || 'folake.adeyemi@gmail.com';
  const maskEmail = (email: string) => {
    const parts = email.split('@');
    if (parts.length < 2) return 't***@gmail.com';
    const name = parts[0];
    const domain = parts[1];
    const firstChar = name.charAt(0) || 't';
    return `${firstChar}***@${domain}`;
  };

  const maskedEmail = maskEmail(rawEmail);

  const handleSendCode = () => {
    // Navigate to email verification screen with masked/actual email
    navigate('/parent/verify-email', {
      state: {
        email: rawEmail,
        isResetFlow: true,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]/60 md:bg-white flex flex-col md:flex-row font-sans select-none">
      {/* ── Desktop Left Sidebar ── */}
      <ChildSidebar className="hidden md:flex" />

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#faf8f5]/60 md:bg-white">
        
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-100 bg-white">
          <button
            onClick={() => navigate('/parent/unlock')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#a73605]"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Back</span>
          </button>
          <span className="text-xs font-bold text-slate-700">Reset Passcode</span>
          <div className="w-8" />
        </div>

        <main className="flex-1 w-full max-w-xl mx-auto p-4 sm:p-6 md:p-8 pb-16 flex flex-col items-center justify-between min-h-[85vh]">
          
          <div className="w-full flex flex-col items-center pt-2 sm:pt-6">
            {/* ── Screen Title ── */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#9c3205] text-center mb-8 tracking-tight">
              Reset Password
            </h1>

            {/* ── Centered Lock & Refresh Illustration Badge ── */}
            <div className="relative mb-6">
              {/* Outer soft circle ring */}
              <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-[#f6eee5] border border-[#ecd9c9] flex items-center justify-center shadow-inner">
                <div className="relative flex items-center justify-center">
                  <RotateCcw className="w-10 h-10 text-[#a33e0e] stroke-[2]" />
                  <Lock className="w-4 h-4 text-[#a33e0e] absolute stroke-[2.5]" />
                </div>
              </div>

              {/* Small Question Badge */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#eab308] text-amber-950 flex items-center justify-center text-xs font-black shadow-xs border-2 border-white">
                ?
              </div>
            </div>

            {/* ── Title & Subtitle ── */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-2 tracking-tight">
              Forgot your PIN?
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 text-center max-w-sm mx-auto mb-8 font-medium leading-relaxed">
              Verify your account to set a new 4-digit passcode securely.
            </p>

            {/* ── Clickable Option Card (Send code to email) ── */}
            <button
              type="button"
              onClick={handleSendCode}
              className="w-full bg-white rounded-2xl border border-slate-100/90 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-[#e8ba9b] hover:shadow-md p-4 sm:p-5 flex items-center justify-between gap-4 transition-all duration-200 active:scale-[0.99] cursor-pointer group text-left"
            >
              {/* Left: Email Icon */}
              <div className="w-11 h-11 rounded-full bg-[#fdeee6] text-[#a33e0e] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#fbd9c4] transition-colors">
                <Mail className="w-5 h-5 stroke-[2.2]" />
              </div>

              {/* Middle: Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                  Send code to email
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5 truncate">
                  {maskedEmail}
                </p>
              </div>

              {/* Right: Arrow Chevron */}
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          </div>

          {/* ── Bottom Link: Sign Up to reset password ── */}
          <div className="pt-10 pb-4 text-center">
            <button
              type="button"
              onClick={() => navigate('/parent/register')}
              className="text-xs sm:text-sm font-medium text-slate-500 hover:text-[#a33e0e] transition-colors cursor-pointer"
            >
              Sign Up to reset password
            </button>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ParentForgotPinPage;
