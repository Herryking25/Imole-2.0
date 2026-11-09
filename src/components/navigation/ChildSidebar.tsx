import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, TrendingUp, BarChart3, Settings, Puzzle, Users } from 'lucide-react';
import { ImoleLogo } from '../common/ImoleLogo';

interface ChildSidebarProps {
  className?: string;
}

export const ChildSidebar: React.FC<ChildSidebarProps> = ({ className = '' }) => {
  const location = useLocation();
  const isParentFlow = location.pathname.startsWith('/parent');

  const isHomeActive =
    location.pathname === '/child' ||
    location.pathname === '/child/dashboard' ||
    location.pathname === '/child/welcome';

  const isChallengeActive =
    location.pathname === '/child/challenge' ||
    location.pathname === '/child/feedback' ||
    location.pathname.startsWith('/child/challenge/');

  const isProgressActive =
    location.pathname === '/child/progress' ||
    location.pathname === '/parent/share' ||
    location.pathname.startsWith('/parent/skills');

  const isLeaderboardActive = location.pathname === '/child/leaderboard';

  const isSettingsActive =
    location.pathname === '/child/settings' ||
    location.pathname === '/child/about-yourself' ||
    location.pathname === '/parent/language';

  const isParentActive = location.pathname.startsWith('/parent');

  // Dynamic route targets
  const homeTarget = isParentFlow ? '/parent' : '/child/dashboard';
  const progressTarget = isParentFlow ? '/parent/share' : '/child/progress';
  const settingsTarget = isParentFlow ? '/parent/language' : '/child/settings';

  const navItems = [
    { to: homeTarget, icon: Home, label: 'Home', isActive: isHomeActive && !isParentFlow },
    { to: '/child/challenge', icon: Puzzle, label: 'Challenges', isActive: isChallengeActive },
    { to: progressTarget, icon: TrendingUp, label: 'Progress', isActive: isProgressActive },
    { to: '/child/leaderboard', icon: BarChart3, label: 'Leaderboard', isActive: isLeaderboardActive },
    { to: '/parent', icon: Users, label: 'Parent Portal', isActive: isParentActive },
    { to: settingsTarget, icon: Settings, label: 'Settings', isActive: isSettingsActive },
  ];

  return (
    <aside
      className={`w-60 lg:w-64 bg-[#FDF5EE] border-r border-[#F5E3D4] flex flex-col justify-between p-5 select-none shrink-0 h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
      aria-label="Navigation Sidebar"
    >
      <div>
        {/* Top Branding */}
        <div className="flex flex-col items-center text-center pt-2 pb-5">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <ImoleLogo size={80} withGlow={true} />
          </div>
          <h1 className="text-xl font-black tracking-wider text-[#B83806] mt-3 mb-0.5 uppercase">
            IMOLE
          </h1>
          <p className="text-[11px] font-medium text-slate-500 tracking-tight">
            Be the Light Among Your Peers
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  item.isActive
                    ? 'bg-[#B83806] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-[#F6E6D7]/70'
                }`}
              >
                <Icon className="w-4 h-4 stroke-[2.2] flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom switcher */}
      <div className="pt-4 border-t border-[#F4DFCF]/70 text-center">
        {isParentFlow ? (
          <NavLink
            to="/child/dashboard"
            className="text-[11px] font-semibold text-slate-500 hover:text-[#B83806] transition-colors"
          >
            ← Switch to Child Portal
          </NavLink>
        ) : (
          <NavLink
            to="/parent"
            className="text-[11px] font-semibold text-slate-500 hover:text-[#B83806] transition-colors"
          >
            Switch to Parent Portal →
          </NavLink>
        )}
      </div>
    </aside>
  );
};

export default ChildSidebar;
