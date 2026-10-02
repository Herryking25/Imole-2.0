import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImoleLogo } from '../../components/common/ImoleLogo';
import { useApp } from '../../hooks/useApp';

interface SplashScreenProps {
  durationMs?: number;
  redirectTo?: string;
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  durationMs = 2400,
  redirectTo,
  onFinish,
}) => {
  const navigate = useNavigate();
  const { isOnboarded } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      } else {
        const destination = redirectTo || '/child/welcome';
        navigate(destination, { replace: true });
      }
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs, isOnboarded, navigate, onFinish, redirectTo]);

  const handleSkip = () => {
    if (onFinish) {
      onFinish();
    } else {
      const destination = redirectTo || '/child/welcome';
      navigate(destination, { replace: true });
    }
  };

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-50 bg-white flex flex-col justify-between items-center px-4 py-12 select-none cursor-pointer transition-opacity duration-500 animate-in fade-in"
      role="button"
      tabIndex={0}
      aria-label="IMOLE Splash Screen. Tap to continue."
    >
      {/* Top Spacer */}
      <div className="w-full h-8" />

      {/* Main Center Branding */}
      <div className="flex flex-col items-center text-center -translate-y-4">
        {/* Glowing Sun Emblem */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
          <ImoleLogo size={130} withGlow={true} />
        </div>

        {/* Brand Name in exact burnt orange from uploaded design */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-[#a73605] mb-2.5 uppercase font-sans">
          IMOLE
        </h1>

        {/* Tagline */}
        <p className="text-sm sm:text-base font-medium text-slate-800 tracking-tight">
          Be the Light Among Your Peers
        </p>
      </div>

      {/* Bottom Loading Spinner & Version */}
      <div className="flex flex-col items-center gap-2.5 pb-2">
        {/* Custom Terracotta/Amber Circular Arc Spinner */}
        <div
          className="w-7 h-7 rounded-full border-[3px] border-[#fbd5b5] border-t-[#a73605] animate-spin"
          style={{ animationDuration: '0.9s' }}
        />

        {/* Version label */}
        <span className="text-xs font-medium text-slate-400 tracking-wider">
          v2.0
        </span>
      </div>
    </div>
  );
};

export default SplashScreen;

