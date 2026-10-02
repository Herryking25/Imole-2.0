import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete } from 'lucide-react';
import { ParentProfileService } from '../../services/parentProfileService';

interface ParentUnlockPageProps {
  onUnlockSuccess?: () => void;
}

export const ParentUnlockPage: React.FC<ParentUnlockPageProps> = ({ onUnlockSuccess }) => {
  const navigate = useNavigate();
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const handleKeyPress = (digit: string) => {
    setError('');
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);

      if (nextPin.length === 4) {
        // Validate PIN
        const isValid = ParentProfileService.verifyPin(nextPin);
        if (isValid) {
          ParentProfileService.unlockSession();
          if (onUnlockSuccess) {
            onUnlockSuccess();
          } else {
            navigate('/parent');
          }
        } else {
          // Trigger shake and reset
          setIsShaking(true);
          setError('Incorrect passcode. Please try again.');
          setTimeout(() => {
            setPin('');
            setIsShaking(false);
          }, 600);
        }
      }
    }
  };

  const handleDelete = () => {
    setError('');
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const handleForgotPasscode = () => {
    // Navigate to forgot pin / reset passcode flow
    navigate('/parent/forgot-pin');
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col justify-between py-10 px-4 sm:px-6 select-none font-sans">
      <div className="max-w-md w-full mx-auto flex flex-col justify-between min-h-[85vh]">

        {/* ── Top Header ── */}
        <div>
          {/* Family Avatar Icon */}
          <div className="flex flex-col items-center text-center mt-6">
            <div className="text-5xl mb-3 filter drop-shadow-xs select-none">
              👨‍👩‍👧
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-[26px] font-extrabold text-[#292524] tracking-tight">
              Parent Dashboard
            </h1>

            {/* Subtitle */}
            <p className="text-sm font-medium text-slate-500 mt-1">
              Enter your 4-digit passcode
            </p>
          </div>

          {/* ── 4 PIN Indicator Dots ── */}
          <div
            className={`flex items-center justify-center gap-4 mt-8 mb-6 ${isShaking ? 'animate-shake' : ''
              }`}
          >
            {[0, 1, 2, 3].map((index) => {
              const isFilled = index < pin.length;
              return (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${isFilled
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

            {/* Bottom row */}
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

        {/* ── Forgot Passcode Link ── */}
        <div className="pt-6 pb-4 text-center">
          <button
            type="button"
            onClick={handleForgotPasscode}
            className="text-sm font-bold text-[#b83808] hover:underline transition-all cursor-pointer py-2"
          >
            Forgot passcode?
          </button>
        </div>

      </div>
    </div>
  );
};

export default ParentUnlockPage;
