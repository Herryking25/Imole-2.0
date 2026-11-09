import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield } from 'lucide-react';

interface LocationState {
  plan?: 'yearly' | 'monthly';
}

export const ParentPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan = 'yearly' } = (location.state as LocationState) ?? {};

  const isYearly = plan === 'yearly';
  const amount = isYearly ? '₦25,000' : '₦2,500';
  const planLabel = isYearly ? 'Premium — Yearly' : 'Premium — Monthly';

  type PayMethod = 'card' | 'applepay';
  const [method, setMethod] = useState<PayMethod>('card');
  const [isPaying, setIsPaying] = useState(false);

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      navigate('/parent/premium/success', { state: { plan } });
    }, 1200);
  };

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
          <span className="text-sm font-bold text-[#B83806]">Payment</span>
        </div>

        {/* Order Summary */}
        <div className="mb-5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            ORDER SUMMARY
          </p>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-sm text-slate-600 font-medium">{planLabel}</span>
              <span className="text-sm font-bold text-slate-900">{amount}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-sm text-slate-600 font-medium">Tax</span>
              <span className="text-sm font-bold text-slate-900">₦0</span>
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="text-sm font-bold text-slate-900">Total</span>
              <span className="text-base font-black text-[#B83806]">{amount}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            PAYMENT METHOD
          </p>
          <div className="flex flex-col gap-3">

            {/* Card */}
            <button
              type="button"
              onClick={() => setMethod('card')}
              className={`w-full text-left rounded-3xl border-2 p-4 flex items-center gap-4 transition-all cursor-pointer ${method === 'card' ? 'border-[#B83806] bg-white shadow-sm' : 'border-slate-100 bg-white'
                }`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-slate-500 stroke-[1.6]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900">Card ending 4242</p>
                <p className="text-xs text-slate-400 font-medium">Visa • Expires 09/27</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${method === 'card' ? 'border-[#B83806] bg-[#B83806]' : 'border-slate-200'
                }`}>
                {method === 'card' && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>

            {/* Apple Pay */}
            <button
              type="button"
              onClick={() => setMethod('applepay')}
              className={`w-full text-left rounded-3xl border-2 p-4 flex items-center gap-4 transition-all cursor-pointer ${method === 'applepay' ? 'border-[#B83806] bg-white shadow-sm' : 'border-slate-100 bg-white'
                }`}
            >
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900">Apple Pay</p>
                <p className="text-xs text-slate-400 font-medium">Quick checkout</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${method === 'applepay' ? 'border-[#B83806] bg-[#B83806]' : 'border-slate-200'
                }`}>
                {method === 'applepay' && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 mb-auto">
          <Shield className="w-4 h-4 text-[#B83806] stroke-[1.6] shrink-0" />
          <p className="text-xs text-slate-600 font-medium">
            Your payment is secured with 256-bit encryption.
          </p>
        </div>

        {/* Pay button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handlePay}
            disabled={isPaying}
            className="w-full py-4 rounded-2xl bg-[#B83806] hover:bg-[#9A2F05] active:scale-[0.99] disabled:opacity-60 text-white font-extrabold text-base shadow-lg shadow-[#B83806]/20 transition-all cursor-pointer mb-3"
          >
            {isPaying ? 'Processing...' : `Pay ${amount}`}
          </button>
          <p className="text-center text-xs text-slate-400">Cancel anytime from Settings.</p>
        </div>
      </div>
    </div>
  );
};

export default ParentPaymentPage;

