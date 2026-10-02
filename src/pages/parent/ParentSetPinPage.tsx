import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Delete } from 'lucide-react';
import { ParentProfileService } from '../../services/parentProfileService';

export const ParentSetPinPage: React.FC = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState<string>('24'); // default 2 digits prefilled as in screenshot or dynamic
  const [error, setError] = useState<string>('');

  const handleKeyPress = (digit: string) => {
    setError('');
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);

      // Auto-save and continue when 4 digits reached
      if (newPin.length === 4) {
        setTimeout(() => {
          ParentProfileService.setPin(newPin);
          ParentProfileService.unlockSession();
          navigate('/parent');
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setError('');
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const handleSkip = () => {
    ParentProfileService.unlockSession();
    navigate('/parent');
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col justify-between py-6 px-4 sm:px-6 select-none font-sans">
      <div className="max-w-md w-full mx-auto flex flex-col justify-between min-h-[88vh]">

        {/* ── Top Bar ── */}
        <div>
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => navigate('/parent/verify-email')}
              className="w-11 h-11 rounded-full bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
              aria-label="Go back to verify email"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Step Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff4ed] border border-[#fbcbb7] text-[#b83808] text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#b83808]" />
              <span>Step 2 of 2 · Parent Profile</span>
            </div>

            {/* Balancing placeholder */}
            <div className="w-11" />
          </div>

          {/* ── Center Header Icon ── */}
          <div className="flex flex-col items-center text-center mt-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#fee2d5] via-[#ffd6c4] to-[#fbc4af] flex items-center justify-center shadow-xs mb-3 relative">
              <Shield className="w-10 h-10 text-[#8a2908] fill-[#8a2908]/20 stroke-[2]" />
              <Lock className="w-4 h-4 text-white fill-white absolute" />
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-[26px] font-extrabold text-[#292524] tracking-tight">
              Set Your Parent PIN
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-[13px] text-slate-500 max-w-xs mt-2 font-medium leading-relaxed">
              Create a 4-digit passcode to protect the Parent Dashboard and settings.
            </p>
          </div>

          {/* ── 4 PIN Indicator Dots ── */}
          <div className="flex items-center justify-center gap-4 mt-8 mb-6">
            {[0, 1, 2, 3].map((index) => {
              const isFilled = index < pin.length;
              return (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    isFilled
                      ? 'bg-[#b83808] scale-110 shadow-xs'
                      : 'border-2 border-[#fbcbb7] bg-transparent'
                  }`}
                />
              );
            })}
          </div>

          {error && (
            <p className="text-xs font-bold text-rose-600 text-center mb-2">{error}</p>
          )}

          {/* ── Keypad Grid ── */}
          <div className="grid grid-cols-3 gap-y-3 gap-x-6 max-w-[280px] sm:max-w-[300px] mx-auto mt-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleKeyPress(digit)}
                className="w-18 h-18 sm:w-19 sm:h-19 rounded-full bg-white text-slate-900 text-2xl font-bold flex items-center justify-center shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer select-none mx-auto border border-slate-100"
              >
                {digit}
              </button>
            ))}

            {/* Bottom row: Empty space, 0, Backspace */}
            <div className="w-18 h-18 sm:w-19 sm:h-19" />
            
            <button
              type="button"
              onClick={() => handleKeyPress('0')}
              className="w-18 h-18 sm:w-19 sm:h-19 rounded-full bg-white text-slate-900 text-2xl font-bold flex items-center justify-center shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer select-none mx-auto border border-slate-100"
            >
              0
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="w-18 h-18 sm:w-19 sm:h-19 rounded-full bg-transparent text-slate-700 text-2xl font-bold flex items-center justify-center hover:bg-white/60 active:scale-95 transition-all cursor-pointer select-none mx-auto"
              aria-label="Delete last digit"
            >
              <Delete className="w-7 h-7 stroke-[1.8]" />
            </button>
          </div>
        </div>

        {/* ── Bottom Skip Link ── */}
        <div className="pt-6 pb-2 text-center">
          <button
            type="button"
            onClick={handleSkip}
            className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer py-2"
          >
            Skip for now
          </button>
        </div>

      </div>
    </div>
  );
};

export default ParentSetPinPage;
