import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, TrendingUp, BarChart2, Settings, ArrowLeft } from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const navItems = [
    {
      to: '/admin',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      end: true,
    },
    {
      to: '/admin/children/CHD-00123',
      label: 'Progress',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      to: '/admin/leaderboard',
      label: 'Leaderboard',
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      to: '/admin/settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#FAF6F0] border-r border-[#EFEBE1] min-h-screen flex flex-col justify-between p-6">
      <div className="flex flex-col items-center">
        {/* IMOLE Glowing Sun Logo */}
        <Link to="/admin" className="flex flex-col items-center text-center group cursor-pointer mb-10">
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#EA580C] via-[#F59E0B] to-[#F97316] p-0.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
            {/* Inner Sun Graphic */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FB923C] via-[#EA580C] to-[#C2410C] flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 48 48" className="w-12 h-12 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                {/* Center Sun Disc */}
                <circle cx="24" cy="24" r="7" fill="white" />
                {/* 8 Sun Rays */}
                <line x1="24" y1="6" x2="24" y2="11" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="24" y1="37" x2="24" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="6" y1="24" x2="11" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="37" y1="24" x2="42" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="11.3" y1="11.3" x2="14.8" y2="14.8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="33.2" y1="33.2" x2="36.7" y2="36.7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="11.3" y1="36.7" x2="14.8" y2="33.2" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="33.2" y1="14.8" x2="36.7" y2="11.3" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Brand Name */}
          <h1 className="text-2xl font-black text-[#1E293B] tracking-tight mt-4 leading-none">
            IMOLE
          </h1>
          {/* Tagline */}
          <p className="text-xs text-stone-500 font-medium mt-1.5 leading-snug">
            Be the Light Among Your Peers
          </p>
        </Link>

        {/* Navigation Links */}
        <nav className="w-full space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#9E3508] text-white shadow-xs font-bold'
                    : 'text-[#57534E] hover:text-[#1E293B] hover:bg-[#F3ECE4]'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer / Return to Main Portal */}
      <div className="pt-6 border-t border-[#EFEBE1]">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors px-2 py-1.5 rounded-lg hover:bg-[#F3ECE4]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to App Homepage</span>
        </Link>
      </div>
    </aside>
  );
};
