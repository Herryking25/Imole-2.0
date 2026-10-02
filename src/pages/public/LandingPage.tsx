import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Shield, User, Users, Settings, Flame } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../../components/common/Button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isOnboarded } = useApp();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center gap-8 py-4">
      {/* Hero Banner */}
      <div className="max-w-2xl flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-bold mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Gamified Daily Life Skills for Nigerian Kids (Ages 8–16)</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none mb-4">
          One daily challenge.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500">
            Skills for a lifetime.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mb-6">
          {t.common.tagline}
        </p>

        {/* Big Action Button */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/child/splash')}
            icon={<Flame className="w-5 h-5 text-amber-300 fill-amber-300" />}
            className="text-lg py-4 shadow-md hover:shadow-lg"
          >
            {isOnboarded ? 'Open Today’s Challenge' : 'Start Learning (No Sign-Up)'}
          </Button>
        </div>
      </div>

      {/* 3 User Flows Cards */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        {/* Child Flow */}
        <div
          onClick={() => navigate('/child/splash')}
          className="p-5 rounded-3xl bg-white border-2 border-emerald-200/80 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 mb-1">{t.roles.child}</h3>
            <p className="text-xs text-slate-500">{t.roles.childDesc}</p>
          </div>
          <span className="text-xs font-bold text-emerald-600 mt-4 block">
            Enter Student Zone →
          </span>
        </div>

        {/* Parent Flow */}
        <div
          onClick={() => navigate('/parent')}
          className="p-5 rounded-3xl bg-white border-2 border-blue-200/80 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 mb-1">{t.roles.parent}</h3>
            <p className="text-xs text-slate-500">{t.roles.parentDesc}</p>
          </div>
          <span className="text-xs font-bold text-blue-600 mt-4 block">
            View Parent Portal →
          </span>
        </div>

        {/* Admin Flow */}
        <div
          onClick={() => navigate('/admin')}
          className="p-5 rounded-3xl bg-white border-2 border-purple-200/80 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 mb-1">{t.roles.admin}</h3>
            <p className="text-xs text-slate-500">{t.roles.adminDesc}</p>
          </div>
          <span className="text-xs font-bold text-purple-600 mt-4 block">
            Admin & Analytics →
          </span>
        </div>
      </div>

      {/* Trust & Features Footer */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-4">
        <span className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-600" />
          No account or password needed
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Offline browser storage
        </span>
        <span className="flex items-center gap-1.5">
          🇳🇬 English • Yorùbá • Naija Pidgin
        </span>
      </div>
    </div>
  );
};
