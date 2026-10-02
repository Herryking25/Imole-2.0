import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, Pencil } from 'lucide-react';
import { ParentProfileService } from '../../services/parentProfileService';

export const ParentVerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const passedEmail =
    (location.state as { email?: string })?.email ||
    ParentProfileService.getProfile()?.email ||
    'folake.adeyemi@gmail.com';

  const [email] = useState<string>(passedEmail);
  const [digits, setDigits] = useState<string[]>(['5', '8', '2', '9', '', '']);
  const [timer, setTimer] = useState<number>(48);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle single digit input
  const handleChange = (index: number, value: string) => {
    setError('');
    const char = value.slice(-1); // Take the latest character typed

    if (char && !/^\d$/.test(char)) return; // Only allow digits

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    // Auto-focus next input
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle paste full code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      const newDigits = [...digits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || '';
      }
      setDigits(newDigits);
      const nextIndex = Math.min(pasted.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(48);
    setCanResend(false);
    setError('');
  };

  const isResetFlow = Boolean((location.state as { isResetFlow?: boolean })?.isResetFlow);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join('');

    if (code.length < 6) {
      setError('Please enter all 6 digits of the confirmation code.');
      return;
    }

    // Mark email verified and navigate to PIN setup
    ParentProfileService.setEmailVerified(true);
    navigate('/parent/set-pin', { state: { isResetFlow: true } });
  };

  // Format timer as 00:XX
  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col justify-between py-6 px-4 sm:px-6 select-none font-sans">
      <div className="max-w-md w-full mx-auto flex flex-col justify-between min-h-[88vh]">

        {/* ── Top Bar ── */}
        <div>
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => navigate(isResetFlow ? '/parent/forgot-pin' : '/parent/register')}
              className="w-11 h-11 rounded-full bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Step Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff4ed] border border-[#fbcbb7] text-[#b83808] text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#b83808]" />
              <span>{isResetFlow ? 'Security Verification' : 'Step 1 of 2 · Parent Profile'}</span>
            </div>

            {/* Balancing placeholder */}
            <div className="w-11" />
          </div>

          {/* ── Center Header Icon ── */}
          <div className="flex flex-col items-center text-center mt-6">
            <div className="w-16 h-16 rounded-[22px] bg-gradient-to-b from-[#fde6d8] via-[#ffdcd0] to-[#fbcbb7] flex items-center justify-center shadow-xs mb-3">
              <Mail className="w-8 h-8 text-[#8a2908] stroke-[2]" />
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-[26px] font-extrabold text-[#292524] tracking-tight">
              Verify Your Email
            </h1>

            {/* Subtitle with email chip */}
            <p className="text-xs sm:text-[13px] text-slate-500 max-w-sm mt-2 font-medium">
              We sent a 6-digit confirmation code to
            </p>

            <button
              type="button"
              onClick={() => navigate('/parent/register')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mt-2 rounded-full bg-[#fff4ed] border border-[#fed7aa] text-xs font-bold text-slate-800 hover:bg-[#ffedd5] transition-colors cursor-pointer"
            >
              <span>{email}</span>
              <Pencil className="w-3.5 h-3.5 text-[#b83808] stroke-[2.2]" />
            </button>
          </div>

          {/* ── Passcode Card ── */}
          <form onSubmit={handleVerify} className="mt-6 flex flex-col gap-4">
            <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col items-center gap-4 text-center">
              
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                Enter 6–Digit Passcode
              </label>

              {/* 6 Digit Input Boxes */}
              <div className="flex items-center justify-center gap-2 sm:gap-2.5 w-full my-1">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-11 h-13 sm:w-12 sm:h-14 rounded-2xl text-center text-xl sm:text-2xl font-black transition-all outline-none ${
                      digit
                        ? 'bg-[#fffbf8] border border-slate-200 text-slate-900'
                        : 'bg-[#fffbf8] border border-slate-200 text-slate-400'
                    } focus:border-2 focus:border-[#b83808] focus:bg-white focus:shadow-xs`}
                  />
                ))}
              </div>

              {/* Resend row */}
              <div className="flex items-center justify-center gap-2 pt-2 text-xs font-medium text-slate-500">
                <span>Didn&apos;t receive code?</span>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="font-bold text-[#b83808] hover:underline cursor-pointer"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span className="flex items-center gap-1">
                    <span>Resend in</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#fff4ed] text-[#b83808] font-bold">
                      {formattedTimer}
                    </span>
                  </span>
                )}
              </div>

              {error && (
                <p className="text-xs font-bold text-rose-600 mt-1">{error}</p>
              )}
            </div>

            {/* ── Primary CTA Button ── */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#a73605] hover:bg-[#8e2e04] active:scale-[0.99] text-white font-extrabold text-base shadow-lg shadow-[#a73605]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Verify &amp; Continue to PIN Setup</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </form>

          {/* ── Footer Links ── */}
          <div className="flex flex-col items-center text-center gap-1 mt-5 text-xs text-slate-500">
            <p>
              Wrong email address?{' '}
              <button
                type="button"
                onClick={() => navigate('/parent/register')}
                className="font-bold text-[#b83808] hover:underline cursor-pointer"
              >
                Change Email
              </button>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Need help? Contact{' '}
              <Link to="/child/settings" className="underline hover:text-slate-600">
                IMOLE Parent Support
              </Link>
            </p>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
};

export default ParentVerifyEmailPage;
