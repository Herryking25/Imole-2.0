import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, ShieldCheck, Delete } from 'lucide-react';
import { ParentProfileService } from '../../services/parentProfileService';

type Phase = 'set' | 'confirm';

const KEYPAD_DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

interface PinDotsProps {
  filled: number;
}

const PinDots: React.FC<PinDotsProps> = ({ filled }) => (
  <div className="flex items-center justify-center gap-5 my-6">
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className={`w-4 h-4 rounded-full transition-all duration-200 ${
          i < filled
            ? 'bg-[#B83806] scale-110'
            : 'border-2 border-[#FBCBB7] bg-transparent'
        }`}
      />
    ))}
  </div>
);

export const ParentSetPinPage: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('set');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  const currentValue = phase === 'set' ? pin : confirmPin;
  const setCurrentValue = phase === 'set' ? setPin : setConfirmPin;

  const handleKeyPress = (digit: string) => {
    setError('');
    if (currentValue.length >= 4) return;

    const newVal = currentValue + digit;
    setCurrentValue(newVal);

    if (newVal.length === 4) {
      if (phase === 'set') {
        // Move to confirm step after short delay
        setTimeout(() => setPhase('confirm'), 300);
      } else {
        // Confirm step complete — check match
        setTimeout(() => {
          if (newVal === pin) {
            ParentProfileService.setPin(pin);
            ParentProfileService.unlockSession();
            navigate('/parent');
          } else {
            setError('PINs do not match. Please try again.');
            setConfirmPin('');
          }
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setError('');
    setCurrentValue(currentValue.slice(0, -1));
  };

  const handleBack = () => {
    if (phase === 'confirm') {
      setPhase('set');
      setPin('');
      setConfirmPin('');
      setError('');
    } else {
      navigate('/parent/verify-email');
    }
  };

  const handleSkip = () => {
    ParentProfileService.unlockSession();
    navigate('/parent');
  };

  const isConfirm = phase === 'confirm';

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col font-sans select-none">
      <div className="flex-1 flex flex-col max-w-sm w-full mx-auto px-5 py-6">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF1ED] border border-[#FBCBB7] text-[#B83806] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#B83806]" />
            <span>Step 2 of 2</span>
          </div>

          <div className="w-10" />
        </div>

        {/* Header Icon + Title */}
        <div className="flex flex-col items-center text-center mb-2">
          <div className="w-16 h-16 rounded-full bg-[#FFF1ED] flex items-center justify-center mb-5">
            {isConfirm ? (
              <ShieldCheck className="w-8 h-8 text-[#B83806] stroke-[1.8]" />
            ) : (
              <Shield className="w-8 h-8 text-[#B83806] stroke-[1.8]" />
            )}
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
            {isConfirm ? 'Confirm Your PIN' : 'Set Your Parent PIN'}
          </h1>

          <p className="text-sm text-slate-500 font-medium">
            {isConfirm
              ? 'Enter the same 4-digit passcode again.'
              : 'Create a 4-digit passcode.'}
          </p>
        </div>

        {/* PIN dots */}
        <PinDots filled={currentValue.length} />

        {/* Error */}
        {error && (
          <p className="text-xs font-bold text-rose-600 text-center mb-3">{error}</p>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-y-4 gap-x-4 max-w-[280px] mx-auto w-full mt-2 flex-1">
          {KEYPAD_DIGITS.map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleKeyPress(digit)}
              className="w-full aspect-square rounded-full bg-white border border-slate-100 shadow-sm text-slate-900 text-2xl font-semibold flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            >
              {digit}
            </button>
          ))}

          {/* Bottom row: empty | 0 | backspace */}
          <div />

          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            className="w-full aspect-square rounded-full bg-white border border-slate-100 shadow-sm text-slate-900 text-2xl font-semibold flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="w-full aspect-square rounded-full bg-transparent text-slate-700 flex items-center justify-center hover:bg-white/60 active:scale-95 transition-all cursor-pointer"
            aria-label="Delete last digit"
          >
            <Delete className="w-6 h-6 stroke-[1.8]" />
          </button>
        </div>

        {/* Skip for now */}
        {!isConfirm && (
          <div className="pt-6 pb-2 text-center">
            <button
              type="button"
              onClick={handleSkip}
              className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer py-2"
            >
              Skip for now
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ParentSetPinPage;
