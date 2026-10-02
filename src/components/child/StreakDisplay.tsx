import React from 'react';
import { Flame, Trophy, Sparkles } from 'lucide-react';
import { useStreak } from '../../hooks/useStreak';
import { useLanguage } from '../../hooks/useLanguage';

export const StreakDisplay: React.FC = () => {
  const { currentStreak, bestStreak } = useStreak();
  const { t } = useLanguage();

  return (
    <div className="bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
      <div className="absolute right-0 bottom-0 opacity-15 translate-x-4 translate-y-4">
        <Flame className="w-36 h-36" />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
            <Flame className="w-8 h-8 fill-amber-200 text-amber-100 animate-bounce" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black tracking-tight">{currentStreak}</span>
              <span className="text-sm font-bold uppercase tracking-wider text-amber-100">
                {t.common.days} {t.common.streak}
              </span>
            </div>
            <p className="text-xs text-white/90 font-medium">{t.streak.flameMessage}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/25">
          <Trophy className="w-4 h-4 text-amber-200" />
          <span className="text-xs font-semibold text-white/90">
            {t.streak.best}: <strong className="text-white font-bold">{bestStreak} {t.common.days}</strong>
          </span>
          {currentStreak >= 3 && (
            <span className="ml-1 inline-flex items-center text-[10px] bg-amber-300 text-amber-950 font-black px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 mr-0.5" /> ON FIRE!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
