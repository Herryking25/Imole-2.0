import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, TrendingUp, BarChart2, Settings, ArrowLeft } from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const navItems = [
    {
      to: '/admin',
      label: 'Home',
      icon: <Home className="w-4.5 h-4.5 stroke-[1.8]" />,
      end: true,
    },
    {
      to: '/admin/progress',
      label: 'Progress',
      icon: <TrendingUp className="w-4.5 h-4.5 stroke-[1.8]" />,
    },
    {
      to: '/admin/leaderboard',
      label: 'Leaderboard',
      icon: <BarChart2 className="w-4.5 h-4.5 stroke-[1.8]" />,
    },
    {
      to: '/admin/settings',
      label: 'Settings',
      icon: <Settings className="w-4.5 h-4.5 stroke-[1.8]" />,
    },
  ];

  return (
    <aside className="w-60 shrink-0 bg-[#FFF8F6] border-r border-[#F4EBE3] h-full flex flex-col justify-between p-6 select-none overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col items-center shrink-0">
        {/* IMOLE Glowing Sun Logo */}
        <Link to="/admin" className="flex flex-col items-center text-center group cursor-pointer mb-8">
          <div className="relative w-18 h-18 rounded-full bg-gradient-to-tr from-[#EA580C] via-[#F59E0B] to-[#F97316] p-0.5 shadow-md shadow-orange-500/15 flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FB923C] via-[#EA580C] to-[#C2410C] flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 48 48" className="w-10 h-10 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="7" fill="white" />
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

          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-3.5 leading-none">
            IMOLE
          </h1>
          <p className="text-[11px] text-slate-400 font-medium mt-1 leading-snug">
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
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${isActive
                  ? 'bg-[#B83806] text-white shadow-sm shadow-[#B83806]/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer / Exit */}
      <div className="pt-4 border-t border-[#F4EBE3] shrink-0 mt-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors px-2 py-2 rounded-xl hover:bg-white/60"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to App</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
