import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useParent } from '../../hooks/useParent';

interface LinkChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (childName: string) => void;
}

export const LinkChildModal: React.FC<LinkChildModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { linkChild } = useParent();
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successChildName, setSuccessChildName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const cleaned = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    setCode(cleaned);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    setCode(pasted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) {
      setErrorMessage('Please enter the full 6-character link code.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await linkChild(code);
      if (res.success && res.child) {
        setSuccessChildName(res.child.name);
        if (onSuccess) {
          onSuccess(res.child.name);
        }
        setTimeout(() => {
          setCode('');
          setSuccessChildName(null);
          onClose();
        }, 1800);
      } else {
        setErrorMessage(res.message || 'Invalid or expired link code. Please generate a new code on child device.');
      }
    } catch (err: unknown) {
      setErrorMessage((err as Error)?.message || 'Failed to connect. Please check your network and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="link-child-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] px-6 py-5 border-b border-[#fed7aa]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#a73605] text-white flex items-center justify-center shadow-xs">
              <KeyRound className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 id="link-child-title" className="text-base font-extrabold text-slate-900">
                Link Child Account
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                Connect your child&apos;s device in seconds
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {successChildName ? (
            <div className="py-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 animate-bounce">
                <CheckCircle2 className="w-10 h-10 stroke-[2.4]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Linked Successfully!
              </h3>
              <p className="text-sm text-slate-600">
                <span className="font-extrabold text-[#a73605]">{successChildName}</span> is now linked to your parent portal.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Instructions steps */}
              <div className="bg-[#faf8f5] rounded-2xl p-4 border border-[#f3e8df] text-xs text-slate-600 flex flex-col gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#fde6d8] text-[#8a2908] font-black flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </div>
                  <p>
                    Open IMOLE on your child&apos;s device and open <span className="font-bold text-slate-800">Settings</span> ⚙️.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#fde6d8] text-[#8a2908] font-black flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </div>
                  <p>
                    Tap <span className="font-bold text-[#a73605]">Generate Parent Link Code</span> to get a 6-letter code.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#fde6d8] text-[#8a2908] font-black flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </div>
                  <p>Enter that 6-character code below to establish secure connection.</p>
                </div>
              </div>

              {/* Code input */}
              <div>
                <label
                  htmlFor="link-code-input"
                  className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2"
                >
                  Enter 6-Character Link Code
                </label>
                <div className="relative">
                  <input
                    id="link-code-input"
                    type="text"
                    value={code}
                    onChange={handleCodeChange}
                    onPaste={handlePaste}
                    placeholder="e.g. 7K3F9Q"
                    maxLength={6}
                    autoComplete="off"
                    autoFocus
                    className="w-full text-center text-2xl sm:text-3xl font-black tracking-[0.35em] text-[#a73605] uppercase bg-[#fffbf8] border-2 border-[#fed7aa] focus:border-[#a73605] focus:bg-white rounded-2xl py-3.5 px-4 outline-none transition-all placeholder:text-slate-300 placeholder:tracking-normal placeholder:text-base placeholder:font-semibold"
                  />
                </div>
                <p className="text-[11px] text-slate-400 text-center mt-1.5 font-medium">
                  Codes expire in 10 minutes from generation.
                </p>
              </div>

              {/* Error message */}
              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 mt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={code.length < 6 || isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#a73605] hover:bg-[#8e2e04] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm shadow-md shadow-[#a73605]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Linking...</span>
                    </>
                  ) : (
                    <span>Link Child</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkChildModal;
