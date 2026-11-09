import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Puzzle, TrendingUp, BarChart3, Users } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const isAboutYourself =
    location.pathname.includes('aboutyourself') ||
    location.pathname.includes('about-yourself');

  const isHiddenOnRoute =
    isAboutYourself ||
    location.pathname === '/child/welcome' ||
    location.pathname === '/child/onboarding' ||
    location.pathname === '/onboarding';

  if (isHiddenOnRoute) return null;

  const isHomeActive =
    location.pathname === '/child' ||
    location.pathname === '/child/dashboard' ||
    location.pathname === '/child/welcome';

  const isChallengeActive =
    location.pathname === '/child/challenge' ||
    location.pathname === '/child/feedback' ||
    location.pathname.startsWith('/child/challenge/');

  const isProgressActive = location.pathname === '/child/progress';
  const isLeaderboardActive = location.pathname === '/child/leaderboard';
  const isParentActive = location.pathname.startsWith('/parent');

  const navItems = [
    { to: '/child/dashboard', icon: Home, label: 'Home', isActive: isHomeActive },
    { to: '/child/challenge', icon: Puzzle, label: 'Challenges', isActive: isChallengeActive },
    { to: '/child/progress', icon: TrendingUp, label: 'Progress', isActive: isProgressActive },
    { to: '/child/leaderboard', icon: BarChart3, label: 'Leaderboard', isActive: isLeaderboardActive },
    { to: '/parent', icon: Users, label: 'Parent', isActive: isParentActive },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] sm:hidden px-2 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
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
                <div className="bg-[#B83806] text-white rounded-full py-1.5 px-4 flex flex-col items-center justify-center shadow-sm transition-all">
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                  <span className="text-[9px] font-extrabold tracking-tight mt-0.5">
                    {item.label}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-1 px-2 text-slate-400 hover:text-slate-700 transition-colors">
                  <Icon className="w-4 h-4 stroke-[1.8]" />
                  <span className="text-[9px] font-semibold tracking-tight mt-0.5">
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
