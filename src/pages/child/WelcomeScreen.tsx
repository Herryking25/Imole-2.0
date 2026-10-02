import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import { useApp } from '../../hooks/useApp';

export const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { profile, isOnboarded } = useApp();

  const handleStart = () => {
    if (isOnboarded) {
      navigate('/child/dashboard');
    } else {
      navigate('/child/about-yourself');
    }
  };

  const displayName = profile?.name ? profile.name : 'Champ';

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] md:min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8 sm:py-12 select-none animate-in fade-in duration-300">
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        {/* Animated Waving Hand */}
        <div className="text-5xl sm:text-6xl mb-4 transform hover:rotate-12 transition-transform cursor-pointer animate-bounce duration-1000">
          👋
        </div>

        {/* Heading matching design */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Welcome, {displayName}!
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md leading-relaxed mb-8 sm:mb-10">
          You&apos;re about to become smarter, stronger, and brighter. ✨
        </p>

        {/* Did You Know Fact Card */}
        <div className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-amber-200/70 shadow-xs hover:shadow-md transition-shadow mb-6 text-left flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-amber-500 mt-0.5">
            <Lightbulb className="w-5 h-5 fill-amber-400 text-amber-500" />
          </div>

          <div className="flex-1">
            <span className="text-xs font-bold text-slate-500 block mb-0.5">
              Did you know?
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              Nigerian children are some of the smartest in the world!
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 mb-8 text-xs sm:text-sm font-semibold text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a73605] inline-block animate-pulse" />
          <span>Your first challenge awaits...</span>
        </div>

        {/* CTA Let's Go Button */}
        <button
          onClick={handleStart}
          className="py-3.5 px-14 sm:px-16 rounded-full bg-[#a73605] hover:bg-[#8e2e04] active:scale-95 text-white text-base font-black tracking-wide shadow-lg shadow-orange-700/25 hover:shadow-xl hover:shadow-orange-700/35 transition-all duration-200 cursor-pointer"
        >
          Let&apos;s Go! 🚀
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;

