import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Puzzle, TrendingUp, BarChart3 } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const isHomeActive =
    location.pathname === '/child' ||
    location.pathname === '/child/dashboard' ||
    location.pathname === '/child/welcome';

  const isChallengeActive =
    location.pathname === '/child/challenge' ||
    location.pathname === '/child/feedback';

  const isProgressActive = location.pathname === '/child/progress';
  const isLeaderboardActive = location.pathname === '/child/leaderboard';

  const navItems = [
    {
      to: '/child/dashboard',
      icon: Home,
      label: 'Home',
      isActive: isHomeActive,
    },
    {
      to: '/child/challenge',
      icon: Puzzle,
      label: 'Challenges',
      isActive: isChallengeActive,
    },
    {
      to: '/child/progress',
      icon: TrendingUp,
      label: 'Progress',
      isActive: isProgressActive,
    },
    {
      to: '/child/leaderboard',
      icon: BarChart3,
      label: 'Leaderboard',
      isActive: isLeaderboardActive,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] sm:hidden px-3 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className="flex items-center justify-center select-none"
            >
              {item.isActive ? (
                <div className="bg-[#a73605] text-white rounded-full py-1.5 px-5 flex flex-col items-center justify-center shadow-xs transition-all">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                  <span className="text-[10px] font-extrabold tracking-tight mt-0.5">
                    {item.label}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-1 px-3 text-slate-500 hover:text-slate-800 transition-colors">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                  <span className="text-[10px] font-semibold tracking-tight mt-0.5 text-slate-500">
                    {item.label}
                  </span>
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
