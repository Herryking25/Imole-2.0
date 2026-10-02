import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShieldCheck, Award, Share2, ArrowLeft, UserCheck } from 'lucide-react';
import { ParentProfileService } from '../../services/parentProfileService';
import { useLanguage } from '../../hooks/useLanguage';

export const ParentNavbar: React.FC = () => {
  const { language } = useLanguage();
  const parentProfile = ParentProfileService.getProfile();
  const parentName = parentProfile?.parentName || 'Parent';

  const links = [
    { to: '/parent', label: 'Progress Overview', icon: <ShieldCheck className="w-4 h-4" /> },
    { to: '/parent/share', label: 'Share Progress', icon: <Share2 className="w-4 h-4" /> },
    { to: '/parent/certificates', label: 'Certificates', icon: <Award className="w-4 h-4" /> },
  ];

  const langLabelMap: Record<string, string> = {
    en: 'English',
    pcm: 'Pidgin',
    yo: 'Yorùbá',
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/child/settings" className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors" title="Back to Child Portal">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link to="/parent" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#a73605] flex items-center justify-center text-white font-black text-base shadow-xs">
              P
            </div>
            <div>
              <span className="font-extrabold text-slate-900 leading-none block">IMOLE</span>
              <span className="text-[10px] font-bold text-[#a73605] uppercase tracking-wider">Parent Hub</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/parent'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#fff5eb] text-[#a73605] border border-[#fed7aa] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Parent info badge */}
        <div className="flex items-center gap-2">
          <Link
            to="/parent/language"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fef0c7] border border-[#fde68a] text-[11px] font-bold text-[#8a2908] hover:bg-[#fee39b] transition-colors"
            title="Change Language"
          >
            🌐 {langLabelMap[language] || 'English'}
          </Link>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
            <UserCheck className="w-3.5 h-3.5 text-[#a73605]" />
            <span className="max-w-[120px] truncate">{parentName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ParentNavbar;
