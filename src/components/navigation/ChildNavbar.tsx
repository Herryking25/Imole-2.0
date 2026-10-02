import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Star } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ImoleLogo } from '../common/ImoleLogo';
import { getAvatarEmoji } from '../../utils/avatarUtils';

export const ChildNavbar: React.FC = () => {
  const { profile, streak, progress } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <Link to="/child/challenge" className="flex items-center gap-2.5 group">
          <div className="group-hover:scale-105 transition-transform">
            <ImoleLogo size={36} withGlow={false} />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-black text-lg text-[#a73605] leading-none tracking-tight">IMOLE</span>
            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Daily Skills</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Indicator */}
          <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200/70 rounded-full text-amber-700">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span className="text-xs font-black">{streak.currentStreak}</span>
          </div>

          {/* Points */}
          <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200/70 rounded-full text-emerald-800">
            <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
            <span className="text-xs font-black">{progress.totalPoints}</span>
          </div>

          {/* Child Avatar / Nickname */}
          {profile && (
            <Link
              to="/child/progress"
              className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              title={profile.name}
            >
              <span className="text-xl leading-none">{getAvatarEmoji(profile.avatarId)}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChildNavbar;
