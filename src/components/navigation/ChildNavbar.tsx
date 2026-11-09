import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { ImoleLogo } from '../common/ImoleLogo';

export const ChildNavbar: React.FC = () => {
  const { profile } = useApp();

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

        {/* Profile name link only */}
        {profile && (
          <Link
            to="/child/settings"
            className="text-sm font-bold text-slate-600 hover:text-[#a73605] transition-colors"
            title={profile.name}
          >
            {profile.firstName || profile.name?.split(' ')[0] || profile.username}
          </Link>
        )}
      </div>
    </header>
  );
};

export default ChildNavbar;
