import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Share2,
  ArrowLeft,
  UserCheck,
  BookOpen,
  ChevronDown,
  Plus,
  LogOut,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useParent } from '../../hooks/useParent';
import { LinkChildModal } from '../parent/LinkChildModal';

export const ParentNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const {
    parent,
    children,
    selectedChild,
    setSelectedChildId,
    logout,
  } = useParent();

  const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const childDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const parentName = parent?.name || 'Parent';

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        childDropdownRef.current &&
        !childDropdownRef.current.contains(e.target as Node)
      ) {
        setIsChildDropdownOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/parent/login');
  };

  const links = [
    { to: '/parent', label: 'Progress Overview', icon: <ShieldCheck className="w-4 h-4" /> },
    { to: '/parent/skills', label: 'Skill Breakdown', icon: <BookOpen className="w-4 h-4" /> },
    { to: '/parent/share', label: 'Share Progress', icon: <Share2 className="w-4 h-4" /> },
    { to: '/parent/certificates', label: 'Certificates', icon: <Award className="w-4 h-4" /> },
  ];

  const langLabelMap: Record<string, string> = {
    en: 'English',
    pcm: 'Pidgin',
    yo: 'Yorùbá',
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Left: Brand & Return */}
          <div className="flex items-center gap-3">
            <Link
              to="/child/settings"
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              title="Back to Child Portal"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <Link to="/parent" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#a73605] flex items-center justify-center text-white font-black text-base shadow-xs">
                P
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-slate-900 leading-none block">
                  IMOLE
                </span>
                <span className="text-[10px] font-bold text-[#a73605] uppercase tracking-wider">
                  Parent Hub
                </span>
              </div>
            </Link>

            {/* Child Selector Dropdown */}
            <div className="relative" ref={childDropdownRef}>
              <button
                type="button"
                onClick={() => setIsChildDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff7ed] border border-[#fed7aa] text-xs font-bold text-[#a73605] hover:bg-[#ffedd5] active:scale-95 transition-all cursor-pointer"
                title="Select active child"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="max-w-[110px] truncate">
                  {selectedChild ? selectedChild.name : 'No Child Linked'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* Dropdown Menu */}
              {isChildDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Linked Children ({children.length})
                  </div>

                  <div className="max-h-48 overflow-y-auto py-1">
                    {children.length === 0 ? (
                      <div className="px-3 py-3 text-center text-xs text-slate-500">
                        No children linked yet
                      </div>
                    ) : (
                      children.map((c) => (
                        <button
                          key={c._id}
                          type="button"
                          onClick={() => {
                            setSelectedChildId(c._id);
                            setIsChildDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer ${
                            selectedChild?._id === c._id
                              ? 'bg-[#fff7ed] text-[#a73605] font-extrabold'
                              : 'text-slate-700 font-semibold'
                          }`}
                        >
                          <div className="truncate">
                            <p className="truncate">{c.name}</p>
                            <p className="text-[10px] text-slate-400">
                              @{c.anonymousUsername} · {c.age} yrs
                            </p>
                          </div>
                          {selectedChild?._id === c._id && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a73605]" />
                          )}
                        </button>
                      ))
                    )}
                  </div>

                  <div className="p-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsChildDropdownOpen(false);
                        setIsLinkModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#a73605] hover:bg-[#fff7ed] transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Link Another Child</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/parent'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#fff5eb] text-[#a73605] border border-[#fed7aa] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right: Language & Parent User Menu */}
          <div className="flex items-center gap-2">
            <Link
              to="/parent/language"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fef0c7] border border-[#fde68a] text-[11px] font-bold text-[#8a2908] hover:bg-[#fee39b] transition-colors"
              title="Change Language"
            >
              🌐 {langLabelMap[language] || 'English'}
            </Link>

            {/* Parent User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#a73605]" />
                <span className="max-w-[100px] truncate">{parentName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-extrabold text-slate-900 truncate">
                      {parentName}
                    </p>
                    {parent?.email && (
                      <p className="text-[10px] text-slate-400 truncate">{parent.email}</p>
                    )}
                    {parent?.phone && (
                      <p className="text-[10px] text-slate-400 truncate">{parent.phone}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsLinkModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#a73605]" />
                    <span>Link Child Device</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile secondary tab bar */}
        <div className="lg:hidden flex items-center justify-around border-t border-slate-100 bg-[#fffdfa] px-2 py-1.5 overflow-x-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/parent'}
              className={({ isActive }) =>
                `flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold shrink-0 transition-all ${
                  isActive
                    ? 'text-[#a73605] bg-[#fff5eb]'
                    : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </header>

      {/* Link Child Modal */}
      <LinkChildModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
      />
    </>
  );
};

export default ParentNavbar;
