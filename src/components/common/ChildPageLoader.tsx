import React, { useState, useEffect } from 'react';
import { ImoleLogo } from './ImoleLogo';

interface ChildPageLoaderProps {
  message?: string;
  durationMs?: number;
  onSkip?: () => void;
}

const FUN_TIPS = [
  '🌟 Fun Fact: Practicing for just 5 minutes a day builds lasting mastery!',
  '🧠 Brain Tip: Mental math gets faster the more you play with patterns.',
  '💡 Life Skill: Speaking clearly with confidence inspires people to listen.',
  '💰 Smart Saver: Saving even ₦50 every week adds up to big rewards.',
  '✨ Did you know? Nigerian children are among the brightest minds worldwide!',
];

export const ChildPageLoader: React.FC<ChildPageLoaderProps> = ({
  message = 'Loading your adventure...',
  durationMs = 5000,
  onSkip,
}) => {
  const [tipIndex, setTipIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Cycle tips every 1.8s
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % FUN_TIPS.length);
    }, 1800);

    return () => clearInterval(tipInterval);
  }, []);

  // Smooth progress bar update over durationMs
  useEffect(() => {
    const stepTime = 50;
    const increment = 100 / (durationMs / stepTime);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(100, prev + increment);
      });
    }, stepTime);

    return () => clearInterval(progressInterval);
  }, [durationMs]);

  return (
    <div className="flex-1 min-h-[70vh] flex flex-col items-center justify-center p-6 select-none animate-in fade-in zoom-in-95 duration-300 text-center">
      <div className="max-w-sm w-full flex flex-col items-center">
        {/* Glowing Animated Sun Emblem */}
        <div className="relative mb-5 transform hover:scale-105 transition-transform">
          <ImoleLogo size={90} withGlow={true} />
        </div>

        {/* Brand Name */}
        <h2 className="text-2xl sm:text-3xl font-black tracking-wider text-[#a73605] uppercase font-sans mb-1">
          IMOLE
        </h2>

        {/* Dynamic Contextual Message */}
        <p className="text-sm font-bold text-slate-800 tracking-tight mb-4">
          {message}
        </p>

        {/* 5s Progress Bar */}
        <div className="w-full max-w-xs bg-slate-100 rounded-full h-2.5 overflow-hidden border border-amber-200/60 mb-2 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-[#ea580c] to-[#a73605] rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage / Spinner */}
        <div className="flex items-center gap-2 mb-6">
          <div
            className="w-4 h-4 rounded-full border-2 border-[#fed7aa] border-t-[#a73605] animate-spin"
            style={{ animationDuration: '0.8s' }}
          />
          <span className="text-xs font-bold text-slate-500">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Fun Rotating Tip Box */}
        <div className="w-full bg-[#fef9c3]/70 border border-amber-200/80 rounded-2xl p-3.5 px-4 shadow-2xs min-h-[60px] flex items-center justify-center text-center animate-in fade-in duration-300">
          <p className="text-xs font-semibold text-amber-950/90 leading-snug">
            {FUN_TIPS[tipIndex]}
          </p>
        </div>

        {/* Skip Button */}
        {onSkip && (
          <button
            onClick={onSkip}
            className="mt-6 text-xs font-bold text-slate-400 hover:text-[#a73605] transition-colors cursor-pointer underline underline-offset-4"
          >
            Skip waiting →
          </button>
        )}
      </div>
    </div>
  );
};

export default ChildPageLoader;
