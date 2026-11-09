import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Crown } from 'lucide-react';

type Plan = 'yearly' | 'monthly';

const FEATURES = [
  'Detailed skill breakdown',
  'Focus area selection',
  'Progress over time charts',
  'Full challenge corrections',
];

export const ParentPremiumPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('yearly');

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex flex-col font-sans select-none">
      <div className="flex-1 flex flex-col max-w-sm w-full mx-auto px-5 py-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <span className="text-sm font-bold text-[#B83806]">Upgrade</span>
        </div>

        {/* Icon + Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-5">
            <Crown className="w-9 h-9 text-[#B83806]" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Go Premium</h1>
          <p className="text-sm text-slate-500 font-medium">Unlock all features for Tobi</p>
        </div>

        {/* Plan cards */}
        <div className="flex flex-col gap-3 mb-6">

          {/* Yearly */}
          <button
            type="button"
            onClick={() => setSelectedPlan('yearly')}
            className={`relative w-full text-left rounded-3xl border-2 p-5 transition-all cursor-pointer ${
              selectedPlan === 'yearly'
                ? 'border-[#B83806] bg-white shadow-sm'
                : 'border-slate-100 bg-white'
            }`}
          >
            {/* SAVE badge */}
            <span className="absolute -top-3 right-5 bg-amber-400 text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide">
              SAVE 17%
            </span>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1.5">Yearly Plan</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#B83806]">₦25,000</span>
                  <span className="text-xs text-slate-500 font-medium">/year</span>
                </div>
                <p className="text-xs text-slate-400 font-medium mt-1">₦2,083/month • billed annually</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedPlan === 'yearly' ? 'border-[#B83806] bg-[#B83806]' : 'border-slate-200'
              }`}>
                {selectedPlan === 'yearly' && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </button>

          {/* Monthly */}
          <button
            type="button"
            onClick={() => setSelectedPlan('monthly')}
            className={`w-full text-left rounded-3xl border-2 p-5 transition-all cursor-pointer ${
              selectedPlan === 'monthly'
                ? 'border-[#B83806] bg-white shadow-sm'
                : 'border-slate-100 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1.5">Monthly Plan</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">₦2,500</span>
                  <span className="text-xs text-slate-500 font-medium">/month</span>
                </div>
                <p className="text-xs text-slate-400 font-medium mt-1">Billed monthly</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedPlan === 'monthly' ? 'border-[#B83806] bg-[#B83806]' : 'border-slate-200'
              }`}>
                {selectedPlan === 'monthly' && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Features list */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 mb-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            EVERYTHING IN PREMIUM
          </p>
          <div className="flex flex-col gap-3">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 stroke-[1.8]" />
                <span className="text-sm font-medium text-slate-800">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => navigate('/parent/premium/payment', { state: { plan: selectedPlan } })}
          className="w-full py-4 rounded-2xl bg-[#B83806] hover:bg-[#9A2F05] active:scale-[0.99] text-white font-extrabold text-base shadow-lg shadow-[#B83806]/20 transition-all cursor-pointer mb-3"
        >
          Continue to Payment
        </button>
        <p className="text-center text-xs text-slate-400">Cancel anytime.</p>
      </div>
    </div>
  );
};

export default ParentPremiumPage;

