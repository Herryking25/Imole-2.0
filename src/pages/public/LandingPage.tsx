import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpenCheck,
  Flame,
  ShieldCheck,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../../components/common/Button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isOnboarded } = useApp();
  const { t } = useLanguage();

  return (
    <div className="w-full space-y-12 py-4 sm:space-y-16">
      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-left">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-emerald-800">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span>For curious minds, ages 8–16</span>
          </div>

          <h1 className="mb-5 max-w-xl text-5xl font-black leading-[0.98] text-[#183b2a] sm:text-6xl">
            Ready for{' '}
            <span className="relative inline-block text-[#b54b19]">
              real life?
              <span className="absolute -bottom-1 left-0 -z-10 h-3 w-full -rotate-2 bg-amber-300/80" />
            </span>
          </h1>

          <p className="mb-7 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
            {t.common.tagline} Build confidence one fun, everyday challenge at a time.
          </p>

          <div className="flex flex-col items-start gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/child/splash')}
              icon={<ArrowRight className="h-5 w-5" />}
              className="text-base shadow-md hover:shadow-lg sm:text-lg"
            >
              {isOnboarded ? 'Open today’s challenge' : 'Start your first challenge'}
            </Button>
            <span className="text-xs font-semibold text-slate-500">
              Free to start <span className="px-1.5 text-amber-600">•</span> No sign-up needed
            </span>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className="h-px w-8 bg-amber-500" />
            English <span className="text-slate-300">/</span> Yorùbá{' '}
            <span className="text-slate-300">/</span> Naija Pidgin
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-105 px-3 py-5 sm:px-5">
          <div className="absolute inset-x-8 inset-y-3 rotate-3 rounded-4xl bg-[#eab94b]" />
          <div className="absolute -bottom-1 left-0 h-20 w-20 -rotate-6 border-10 border-[#b9d8bf]" />
          <div className="relative rounded-3xl border border-[#d8e4d8] bg-white p-5 shadow-[0_22px_55px_-30px_rgba(24,59,42,0.4)] sm:p-7">
            <div className="mb-7 flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-emerald-800">
                <Flame className="h-4 w-4 fill-amber-400 text-amber-600" />
                A taste of today’s challenge
              </span>
              <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-900">
                +50 pts
              </span>
            </div>

            <span className="text-xs font-bold text-slate-400">MONEY SMARTS</span>
            <h2 className="mt-1 text-2xl font-black leading-tight text-[#183b2a] sm:text-3xl">
              Market day maths
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              You buy 3 exercise books at ₦350 each and pay with ₦2,000. How much change should you get?
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-dashed border-slate-200 pt-4">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <BookOpenCheck className="h-4 w-4 text-emerald-700" />
                Real-world skills
              </span>
              <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Trophy className="h-4 w-4 text-amber-600" />
                Earn badges
              </span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="How Imole helps" className="grid gap-6 border-y border-[#d8e4d8] py-6 sm:grid-cols-3 sm:gap-8">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-emerald-100 text-emerald-800">
            <Flame className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-black text-[#183b2a]">A new challenge daily</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">Small steps that make learning a habit.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-amber-100 text-amber-800">
            <BookOpenCheck className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-black text-[#183b2a]">Skills for the real world</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">Practice money smarts, decision-making and more.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-rose-100 text-rose-800">
            <Trophy className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-black text-[#183b2a]">Progress worth celebrating</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">Collect points, streaks and badges as you grow.</p>
          </div>
        </div>
      </section>

      <p className="flex items-center justify-center gap-2 text-center text-xs leading-relaxed text-slate-500">
        <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" />
        <span>Parents can sign in through their child’s account.</span>
      </p>
    </div>
  );
};
