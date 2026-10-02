import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ImoleLogo } from '../components/common/ImoleLogo';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-slate-50 to-amber-50/20 flex flex-col">
      <header className="px-4 py-4 max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <ImoleLogo size={38} withGlow={false} />
          <div className="text-left">
            <span className="font-black text-xl text-[#a73605] tracking-tight block leading-none">IMOLE</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Life Skills</span>
          </div>
        </Link>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col justify-center">
        <Outlet />
      </main>

      <footer className="py-6 text-center text-xs text-slate-400">
        <p>© 2026 IMOLE Platform • Building Essential Life Skills for Nigerian Children</p>
      </footer>
    </div>
  );
};

export default PublicLayout;
