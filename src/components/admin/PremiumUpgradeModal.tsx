import React from 'react';
import { X, Check, Star, Sparkles, Lock, ArrowRight, BarChart3, Lightbulb, Gift, LifeBuoy } from 'lucide-react';

interface PremiumUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade?: () => void;
  childName?: string;
}

export const PremiumUpgradeModal: React.FC<PremiumUpgradeModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  childName = 'Your Child',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100 flex flex-col md:flex-row max-h-[92vh] overflow-y-auto">
        {/* Close Button on Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT PANEL: Peach / Warm Illustration Panel */}
        <div className="md:w-[42%] bg-gradient-to-b from-[#FFF5EC] via-[#FFEEDC] to-[#FFE3CB] p-6 sm:p-8 flex flex-col items-center justify-between text-center relative border-b md:border-b-0 md:border-r border-amber-200/50">
          {/* Top Badge */}
          <div className="flex flex-col items-center gap-1.5 mt-1">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-amber-200/80 shadow-xs text-[#9E3508] font-bold text-xs tracking-wider uppercase">
              <span className="text-amber-500">☀</span>
              <span>IMOLE PREMIUM</span>
            </div>
            <p className="text-[11px] italic text-[#9E3508]/80 font-medium">
              &ldquo;Be the Light Among Your Peers&rdquo;
            </p>
          </div>

          {/* Central Illustration with Golden Crown */}
          <div className="my-6 relative flex flex-col items-center">
            {/* Floating Crown Badge */}
            <div className="w-9 h-9 rounded-xl bg-[#F59E0B] shadow-md flex items-center justify-center -mb-4 z-10 border-2 border-white">
              <span className="text-base leading-none">👑</span>
            </div>

            {/* Circle with golden dashed border */}
            <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-full border-2 border-dashed border-amber-300/90 p-1.5 flex items-center justify-center bg-white/30 backdrop-blur-xs">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFE7D1] to-[#FFD8B5] flex items-center justify-center relative overflow-hidden">
                {/* SVG Illustration of Two Smiling African Children */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full object-cover"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle warm background glow */}
                  <circle cx="100" cy="100" r="95" fill="#FFE2C7" />
                  
                  {/* Sparkles */}
                  <path d="M40 70 L42 63 L49 61 L42 59 L40 52 L38 59 L31 61 L38 63 Z" fill="#F59E0B" opacity="0.8" />
                  <path d="M165 80 L167 74 L173 72 L167 70 L165 64 L163 70 L157 72 L163 74 Z" fill="#F59E0B" opacity="0.9" />

                  {/* Left Child: Older Boy with dark hair and black shirt */}
                  <g id="older-child">
                    {/* Shirt */}
                    <path
                      d="M35 190 C35 150, 50 135, 80 135 C110 135, 125 150, 125 190 Z"
                      fill="#1E232A"
                    />
                    {/* Neck */}
                    <rect x="68" y="120" width="24" height="20" rx="6" fill="#804724" />
                    {/* Head */}
                    <circle cx="80" cy="100" r="28" fill="#8E5029" />
                    {/* Hair */}
                    <path
                      d="M52 100 C52 75, 62 68, 80 68 C98 68, 108 75, 108 100 C108 85, 104 74, 80 74 C56 74, 52 85, 52 100 Z"
                      fill="#12161A"
                    />
                    <ellipse cx="80" cy="74" rx="28" ry="12" fill="#12161A" />
                    {/* Ears */}
                    <circle cx="51" cy="102" r="6" fill="#804724" />
                    <circle cx="109" cy="102" r="6" fill="#804724" />
                    {/* Eyes */}
                    <circle cx="70" cy="98" r="3" fill="#1E1E1E" />
                    <circle cx="90" cy="98" r="3" fill="#1E1E1E" />
                    {/* Smile */}
                    <path d="M72 109 Q80 117 88 109" stroke="#3E1F0C" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Cheeks */}
                    <circle cx="65" cy="105" r="4" fill="#C46B37" opacity="0.4" />
                    <circle cx="95" cy="105" r="4" fill="#C46B37" opacity="0.4" />
                  </g>

                  {/* Right Child: Younger child with brown hair & terracotta shirt */}
                  <g id="younger-child">
                    {/* Shirt */}
                    <path
                      d="M95 195 C95 162, 108 145, 138 145 C168 145, 185 162, 185 195 Z"
                      fill="#A33709"
                    />
                    {/* Neck */}
                    <rect x="126" y="132" width="22" height="18" rx="5" fill="#A8683E" />
                    {/* Head */}
                    <circle cx="137" cy="114" r="24" fill="#BA794C" />
                    {/* Hair - Curly texture */}
                    <path
                      d="M113 114 C113 92, 122 86, 137 86 C152 86, 161 92, 161 114 C161 100, 155 92, 137 92 C119 92, 113 100, 113 114 Z"
                      fill="#2D170D"
                    />
                    <circle cx="120" cy="92" r="9" fill="#2D170D" />
                    <circle cx="137" cy="88" r="10" fill="#2D170D" />
                    <circle cx="152" cy="92" r="9" fill="#2D170D" />
                    {/* Ears */}
                    <circle cx="113" cy="116" r="5" fill="#A8683E" />
                    <circle cx="161" cy="116" r="5" fill="#A8683E" />
                    {/* Eyes */}
                    <circle cx="129" cy="112" r="2.8" fill="#1E1E1E" />
                    <circle cx="145" cy="112" r="2.8" fill="#1E1E1E" />
                    {/* Smile */}
                    <path d="M130 122 Q137 128 144 122" stroke="#4A2612" strokeWidth="2.2" strokeLinecap="round" />
                    {/* Cheeks */}
                    <circle cx="124" cy="118" r="3.5" fill="#E28956" opacity="0.5" />
                    <circle cx="150" cy="118" r="3.5" fill="#E28956" opacity="0.5" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Engagement Pill */}
            <div className="mt-3.5 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-amber-200/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-slate-700">
                96% of parents report higher engagement
              </span>
            </div>
          </div>

          {/* Bottom Tagline */}
          <p className="text-xs text-[#9E3508]/80 font-medium">
            Empower your child&apos;s journey to excellence
          </p>
        </div>

        {/* RIGHT PANEL: Features & Pricing */}
        <div className="md:w-[58%] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Pill Header */}
            <div className="inline-block px-3 py-1 rounded-md bg-[#FFF5EC] border border-[#FED7AA] text-[#C2410C] text-[11px] font-black uppercase tracking-wider mb-2.5">
              UNLOCK POTENTIAL
            </div>

            {/* Title & Description */}
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Unlock More for {childName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Upgrade to Premium and get access to detailed progress tracking, life-skill insights, personalized recommendations, and more.
            </p>

            {/* 4 Feature Items */}
            <div className="mt-6 space-y-4">
              {/* Feature 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FFF5EC] border border-[#FED7AA] flex items-center justify-center shrink-0 text-[#C2410C]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Detailed child progress</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Full milestone trajectories, historical trends, and weekly capability diagnostics.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] border border-[#FDE68A] flex items-center justify-center shrink-0 text-[#D97706]">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Life-skill insights</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Deep breakdowns across communication, confidence, leadership, and emotional IQ.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FFF5EC] border border-[#FED7AA] flex items-center justify-center shrink-0 text-[#EA580C]">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">More challenges & rewards</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Unlimited curated quests, peer competitions, and downloadable certification badges.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] border border-[#FDE68A] flex items-center justify-center shrink-0 text-[#D97706]">
                  <LifeBuoy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Priority support & guidance</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Dedicated pediatric advisor check-ins and live support whenever you need advice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Section */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col gap-3.5">
            {/* Plan pill card */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="text-xs sm:text-sm text-slate-700 font-medium">
                Plan: <span className="font-extrabold text-slate-900">₦12,500/month</span>{' '}
                <span className="text-slate-500 text-xs">(or $9.99/mo)</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                Cancel anytime
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (onUpgrade) onUpgrade();
                  onClose();
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-[#9E3508] hover:bg-[#852C06] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Upgrade to Premium</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm transition-colors"
              >
                Learn More
              </button>
            </div>

            {/* Footer trust badge */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium text-center">
              <Lock className="w-3.5 h-3.5" />
              <span>Encrypted via Paystack • 7-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
