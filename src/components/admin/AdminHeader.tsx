import React, { useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

interface AdminHeaderProps {
  onSearchChange?: (val: string) => void;
  onLogout?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onSearchChange, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange?.(e.target.value);
  };

  return (
    <header className="h-20 w-full px-6 sm:px-8 flex items-center justify-between border-b border-[#F2ECE3] bg-white/80 backdrop-blur-md shrink-0">
      {/* Search Bar */}
      <div className="relative w-80 lg:w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 stroke-[1.8]" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, ID, or parent name..."
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white/80 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#B83806] focus:ring-2 focus:ring-[#B83806]/10 transition-all font-medium"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-5">
        {/* Time range dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700 cursor-pointer shadow-2xs"
          >
            <span>{timeRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 stroke-[2.2]" />
          </button>

          {showTimeDropdown && (
            <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl border border-slate-100 shadow-lg py-1.5 z-40 text-xs font-medium text-slate-700">
              {['Last 7 days', 'Last 30 days', 'Last 90 days', 'All time'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setTimeRange(item);
                    setShowTimeDropdown(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 hover:bg-slate-50 cursor-pointer ${
                    timeRange === item ? 'font-bold text-[#B83806] bg-orange-50/60' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4.5 h-4.5 stroke-[1.8]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        {/* Admin profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-[#E06D53] text-white font-bold flex items-center justify-center text-xs shadow-2xs group-hover:opacity-90">
              A
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-slate-900">Admin</span>
              <span className="text-[10px] text-slate-400 font-medium">Raheemah</span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-900">Admin Raheemah</p>
                <p className="text-[10px] text-slate-400">admin@imole.ng</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(false);
                  if (onLogout) {
                    onLogout();
                  } else {
                    sessionStorage.removeItem('imole_admin_authed');
                    window.location.reload();
                  }
                }}
                className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-bold cursor-pointer transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
