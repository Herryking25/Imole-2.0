import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Crown } from 'lucide-react';

interface LocationState {
  plan?: 'yearly' | 'monthly';
}

export const ParentPremiumSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan = 'yearly' } = (location.state as LocationState) ?? {};

  const isYearly = plan === 'yearly';

  // Compute renews-on date (1 year or 1 month from today)
  const renewsOn = new Date();
  if (isYearly) renewsOn.setFullYear(renewsOn.getFullYear() + 1);
  else renewsOn.setMonth(renewsOn.getMonth() + 1);
  const renewsLabel = renewsOn.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleGoToDashboard = () => {
    localStorage.setItem('imole_v1_parent_premium', 'true');
    navigate('/parent', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col font-sans select-none">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full mx-auto px-5 py-10">

        {/* Success icon */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          {/* Crown badge */}
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shadow-md">
            <Crown className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-extrabold text-slate-900 mb-3 text-center">
          Welcome to Premium!
        </h1>
        <p className="text-sm text-slate-500 font-medium text-center max-w-xs mb-10 leading-relaxed">
          Your subscription is active. All features are now unlocked for Tobi.
        </p>

        {/* Plan summary card */}
        <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-sm p-5 mb-10">
          <div className="flex items-center justify-between py-2.5 border-b border-slate-50">
            <span className="text-sm text-slate-500 font-medium">Plan</span>
            <span className="text-sm font-bold text-slate-900">
              {isYearly ? 'Premium Yearly' : 'Premium Monthly'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-slate-50">
            <span className="text-sm text-slate-500 font-medium">Amount</span>
            <span className="text-sm font-bold text-slate-900">
              {isYearly ? '₦25,000' : '₦2,500'}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2.5">
            <span className="text-sm text-slate-500 font-medium">Renews on</span>
            <span className="text-sm font-bold text-slate-900">{renewsLabel}</span>
          </div>
        </div>

        {/* Go to dashboard */}
        <button
          type="button"
          onClick={handleGoToDashboard}
          className="w-full py-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900 font-extrabold text-base hover:bg-slate-50 active:scale-[0.99] transition-all cursor-pointer"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ParentPremiumSuccessPage;

