import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Pencil } from 'lucide-react';
import { ParentProfileService } from '../../services/parentProfileService';

export const ParentVerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const passedEmail =
    (location.state as { email?: string })?.email ||
    ParentProfileService.getProfile()?.email ||
    'folake.adeyemi@gmail.com';

  const [email] = useState<string>(passedEmail);
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(48);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isResetFlow = Boolean((location.state as { isResetFlow?: boolean })?.isResetFlow);

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

  const handleChange = (index: number, value: string) => {
    setError('');
    const char = value.slice(-1);
    if (char && !/^\d$/.test(char)) return;

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

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

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join('');

    if (code.length < 6) {
      setError('Please enter all 6 digits of the confirmation code.');
      return;
    }

    ParentProfileService.setEmailVerified(true);
    navigate('/parent/set-pin', { state: { isResetFlow } });
  };

  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col font-sans select-none">
      <div className="flex-1 flex flex-col max-w-sm w-full mx-auto px-5 py-6">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate(isResetFlow ? '/parent/forgot-pin' : '/parent/register')}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Step Pill */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF1ED] border border-[#FBCBB7] text-[#B83806] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#B83806]" />
            <span>{isResetFlow ? 'Security Verification' : 'Step 1 of 2'}</span>
          </div>

          <div className="w-10" />
        </div>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-[20px] bg-[#FFF1ED] flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-[#B83806] stroke-[1.8]" />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
            Verify Your Email
          </h1>

          <p className="text-sm text-slate-500 font-medium mb-3">
            We sent a 6-digit confirmation code to
          </p>

          {/* Email chip with edit icon */}
          <button
            type="button"
            onClick={() => navigate('/parent/register')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFF1ED] border border-[#FBCBB7] text-sm font-semibold text-slate-800 hover:bg-[#FFE4D9] transition-colors cursor-pointer"
          >
            <span>{email}</span>
            <Pencil className="w-3.5 h-3.5 text-[#B83806] stroke-[2]" />
          </button>
        </div>

        {/* Passcode Card */}
        <form onSubmit={handleVerify} className="flex flex-col gap-4 flex-1">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col items-center gap-4 text-center">

            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">
              Enter 6-Digit Passcode
            </label>

            {/* 6 input boxes */}
            <div className="flex items-center justify-center gap-2 w-full">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-11 h-13 rounded-2xl text-center text-xl font-black transition-all outline-none border ${
                    digit
                      ? 'bg-[#FFFBF8] border-slate-200 text-slate-900'
                      : 'bg-[#FFFBF8] border-slate-200 text-slate-400'
                  } focus:border-2 focus:border-[#B83806] focus:bg-white`}
                />
              ))}
            </div>

            {/* Resend row */}
            <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500">
              <span>Didn&apos;t receive code?</span>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="font-bold text-[#B83806] hover:underline cursor-pointer"
                >
                  Resend Code
                </button>
              ) : (
                <span>
                  Resend in{' '}
                  <span className="font-bold text-[#B83806]">{formattedTimer}</span>
                </span>
              )}
            </div>

            {error && (
              <p className="text-xs font-bold text-rose-600">{error}</p>
            )}
          </div>

          {/* CTA Button */}
          <div className="pt-2 pb-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#B83806] hover:bg-[#9A2F05] active:scale-[0.99] text-white font-extrabold text-base shadow-lg shadow-[#B83806]/20 flex items-center justify-center transition-all cursor-pointer"
            >
              Verify &amp; Continue
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ParentVerifyEmailPage;
