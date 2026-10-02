import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Languages, Download, ArrowLeft } from 'lucide-react';

export const AdminNavbar: React.FC = () => {
  const links = [
    { to: '/admin', label: 'Platform KPIs', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/admin/challenges', label: 'Challenge Library', icon: <BookOpen className="w-4 h-4" /> },
    { to: '/admin/languages', label: 'Languages', icon: <Languages className="w-4 h-4" /> },
    { to: '/admin/analytics', label: 'Export Analytics', icon: <Download className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#a73605] text-white border-b border-[#8e2e04] shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-1.5 text-[#fed7aa] hover:text-white rounded-lg hover:bg-[#8e2e04]/60 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white font-black text-lg">
              A
            </div>
            <div>
              <span className="font-extrabold text-white leading-none block tracking-tight">IMOLE</span>
              <span className="text-[10px] font-bold text-[#fed7aa] uppercase tracking-wider">Admin Console</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1.5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#fff1ea] text-[#a73605] shadow-sm'
                    : 'text-[#fed7aa] hover:text-white hover:bg-[#8e2e04]/60'
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default AdminNavbar;
