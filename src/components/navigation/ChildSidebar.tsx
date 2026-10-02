import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, TrendingUp, BarChart3, Settings } from 'lucide-react';
import { ImoleLogo } from '../common/ImoleLogo';

interface ChildSidebarProps {
  className?: string;
}

export const ChildSidebar: React.FC<ChildSidebarProps> = ({ className = '' }) => {
  const location = useLocation();
  const isParentFlow = location.pathname.startsWith('/parent');

  // Check active states
  const isHomeActive =
    location.pathname === '/child' ||
    location.pathname === '/child/dashboard' ||
    location.pathname === '/child/welcome' ||
    location.pathname === '/parent' ||
    location.pathname === '/parent/certificates';

  const isProgressActive =
    location.pathname === '/child/progress' ||
    location.pathname === '/parent/share' ||
    location.pathname.startsWith('/parent/skills');

  const isLeaderboardActive = location.pathname === '/child/leaderboard';

  const isSettingsActive =
    location.pathname === '/child/settings' ||
    location.pathname === '/child/about-yourself' ||
    location.pathname === '/parent/language';

  // Dynamic route targets
  const homeTarget = isParentFlow ? '/parent' : '/child/dashboard';
  const progressTarget = isParentFlow ? '/parent/share' : '/child/progress';
  const leaderboardTarget = '/child/leaderboard';
  const settingsTarget = isParentFlow ? '/parent/language' : '/child/settings';

  return (
    <aside
      className={`w-64 lg:w-72 bg-[#fdf5ee] border-r border-[#f5e3d4] flex flex-col justify-between p-6 select-none shrink-0 min-h-screen ${className}`}
      aria-label="Navigation Sidebar"
    >
      <div>
        {/* Top Branding */}
        <div className="flex flex-col items-center text-center pt-2 pb-6">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <ImoleLogo size={94} withGlow={true} />
          </div>

          <h1 className="text-2xl font-black tracking-wider text-[#a73605] mt-4 mb-1 uppercase font-sans">
            IMOLE
          </h1>

          <p className="text-xs font-medium text-slate-700 tracking-tight">
            Be the Light Among Your Peers
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-2 font-medium">
          {/* Home */}
          <NavLink
            to={homeTarget}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              isHomeActive
                ? 'bg-[#a73605] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-[#f6e6d7]/70'
            }`}
          >
            <Home className="w-5 h-5 stroke-[2.2]" />
            <span>Home</span>
          </NavLink>

          {/* Progress */}
          <NavLink
            to={progressTarget}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              isProgressActive
                ? 'bg-[#a73605] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-[#f6e6d7]/70'
            }`}
          >
            <TrendingUp className="w-5 h-5 stroke-[2.2]" />
            <span>Progress</span>
          </NavLink>

          {/* Leaderboard */}
          <NavLink
            to={leaderboardTarget}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              isLeaderboardActive
                ? 'bg-[#a73605] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-[#f6e6d7]/70'
            }`}
          >
            <BarChart3 className="w-5 h-5 stroke-[2.2]" />
            <span>Leaderboard</span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to={settingsTarget}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              isSettingsActive
                ? 'bg-[#a73605] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-[#f6e6d7]/70'
            }`}
          >
            <Settings className="w-5 h-5 stroke-[2.2]" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom switcher */}
      <div className="pt-6 border-t border-[#f4dfcf]/70 text-center">
        {isParentFlow ? (
          <NavLink
            to="/child/dashboard"
            className="text-[11px] font-semibold text-slate-500 hover:text-[#a73605] transition-colors"
          >
            ← Switch to Child Portal
          </NavLink>
        ) : (
          <NavLink
            to="/parent"
            className="text-[11px] font-semibold text-slate-500 hover:text-[#a73605] transition-colors"
          >
            Switch to Parent Portal →
          </NavLink>
        )}
      </div>
    </aside>
  );
};

export default ChildSidebar;
