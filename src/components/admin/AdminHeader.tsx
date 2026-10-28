import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Bell, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface AdminHeaderProps {
  backTo?: string;
  backLabel?: string;
  subHeader?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  backTo,
  backLabel,
  subHeader,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  // Auto-detect default back navigation based on current URL if not provided
  let defaultBackTo = '/admin';
  let defaultBackLabel = 'Back to Parents';
  let defaultSubHeader = '';

  if (location.pathname.includes('/admin/children/CHD-00123')) {
    defaultBackTo = '/admin/parents/PRT-00123';
    defaultBackLabel = 'Back to Children';
    defaultSubHeader = 'Child Profile (Admin View)';
  } else if (location.pathname.includes('/admin/children/CHD-00124')) {
    defaultBackTo = '/admin/parents/PRT-00123';
    defaultBackLabel = 'Back to Parents';
  } else if (location.pathname.includes('/admin/parents')) {
    defaultBackTo = '/admin';
    defaultBackLabel = 'Back to Parents';
  }

  const finalBackTo = backTo || defaultBackTo;
  const finalBackLabel = backLabel || defaultBackLabel;
  const finalSubHeader = subHeader !== undefined ? subHeader : defaultSubHeader;

  return (
    <header className="h-16 px-6 sm:px-10 flex items-center justify-between border-b border-[#F0EBE1] bg-[#FAF8F5]/80 backdrop-blur-xs sticky top-0 z-30">
      {/* Left: Back Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => navigate(finalBackTo)}
          className="flex items-center gap-2 text-slate-700 hover:text-[#9E3508] font-medium transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>{finalBackLabel}</span>
        </button>

        {finalSubHeader && (
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-slate-300">|</span>
            <span className="font-bold text-slate-800">{finalSubHeader}</span>
          </div>
        )}
      </div>

      {/* Right: Notifications & Admin Profile */}
      <div className="flex items-center gap-5">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {/* Red Alert Dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-sm">Notifications</span>
                <span className="text-[11px] font-semibold text-[#9E3508] bg-orange-50 px-2 py-0.5 rounded-full">
                  2 New
                </span>
              </div>
              <div className="divide-y divide-slate-50 mt-2 space-y-2">
                <div className="pt-2 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Emma completed &ldquo;Leadership Basics&rdquo;
                    </p>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> 2 hours ago
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Liam reached 56% milestone in Freemium
                    </p>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> 5 hours ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Chip */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-[#E06D53] text-white font-bold flex items-center justify-center shadow-xs text-sm">
            A
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-sm font-bold text-slate-900">Admin</span>
            <span className="text-[11px] text-slate-400 font-medium">Raheemah</span>
          </div>
        </div>
      </div>
    </header>
  );
};
