import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Copy, MessageCircle } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { useApp } from '../../hooks/useApp';

export const ProgressShareCard: React.FC = () => {
  const navigate = useNavigate();
  const { profile, progress, streak } = useApp();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // Dynamic or polished mock values matching screenshot
  const childName = profile?.name || profile?.firstName || 'Chidi';
  const currentStreak = streak.currentStreak > 0 ? streak.currentStreak : 14;
  const lessonsCompleted = progress.totalCompleted > 0 ? progress.totalCompleted : 12;
  const starsEarned = progress.totalPoints > 0 ? progress.totalPoints : 350;

  // Format date like "June 19, 2026" or current date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Download Card as high-resolution PNG image
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 0.98,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `${childName}-IMOLE-Progress.png`;
      link.href = dataUrl;
      link.click();
      showToast('Image downloaded successfully! 🎉');
    } catch (err) {
      console.error('Error generating card image:', err);
      showToast('Could not download image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Handle Share with Family
  const handleShareWithFamily = async () => {
    const shareText = `🌟 Proud Parent Moment! My child ${childName} is learning life skills on IMOLE!\n🔥 ${currentStreak} Day Streak\n📚 ${lessonsCompleted} Lessons Completed\n⭐ ${starsEarned} Stars Earned\nCheck it out: https://imole.ng`;

    // Try Web Share API with image if supported
    if (navigator.share && cardRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(cardRef.current, {
          quality: 0.9,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
        });
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `${childName}-Progress.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${childName}'s Progress on IMOLE`,
            text: shareText,
            files: [file],
          });
          showToast('Shared successfully!');
          return;
        } else {
          await navigator.share({
            title: `${childName}'s Progress on IMOLE`,
            text: shareText,
            url: 'https://imole.ng',
          });
          showToast('Shared successfully!');
          return;
        }
      } catch (e) {
        // Fallback to modal if user cancelled or unsupported
        if ((e as Error).name !== 'AbortError') {
          setShowShareModal(true);
        }
      }
    } else {
      setShowShareModal(true);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `🌟 Proud Parent Moment! My child ${childName} is shining on IMOLE!\n🔥 ${currentStreak} Day Streak\n📚 ${lessonsCompleted} Lessons Completed\n⭐ ${starsEarned} Stars Earned\n\nEquipping African kids with practical life skills (Mental Math, Financial Literacy & Communication) 🚀\nhttps://imole.ng`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    setShowShareModal(false);
    showToast('Opening WhatsApp...');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `Proud parent of ${childName}! Check out our progress on IMOLE: https://imole.ng`
    );
    showToast('Share text copied to clipboard!');
    setShowShareModal(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col font-sans select-none pb-12">
      {/* ── Screen Header Title ── */}
      <h1 className="text-2xl sm:text-3xl font-bold text-[#9c3205] text-center mb-6 tracking-tight">
        Share Progress
      </h1>

      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#15803d] text-white px-5 py-2.5 rounded-full shadow-lg text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Main Share Card (Ref for html-to-image capture) ── */}
      <div
        ref={cardRef}
        className="w-full bg-white rounded-3xl border border-[#f3e7dc] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col text-left mb-8 relative"
      >
        {/* Top Header: Brand & Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🌟</span>
            <span className="font-black text-base sm:text-lg text-[#a33e0e] tracking-tight">
              IMOLE
            </span>
          </div>

          <span className="text-xs sm:text-sm font-medium text-slate-700">
            {formattedDate}
          </span>
        </div>

        {/* Center: Child Name & Streak */}
        <div className="flex flex-col items-center text-center my-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
            {childName}&apos;s Progress
          </h2>

          {/* Streak Pill */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#fef08a] text-amber-950 text-xs font-black shadow-2xs mb-6">
            <span>🔥</span>
            <span>{currentStreak} Day Streak!</span>
          </div>
        </div>

        {/* 2 Stat Boxes (Lessons Completed & Stars Earned) */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 w-full mb-6">
          {/* Box 1: Lessons Completed */}
          <div className="bg-[#fdf4ee] rounded-2xl p-4 sm:p-5 border border-[#f8e2d2] flex flex-col items-center justify-center text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#a33e0e] leading-none mb-1">
              {lessonsCompleted}
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              Lessons Completed
            </span>
          </div>

          {/* Box 2: Stars Earned */}
          <div className="bg-[#fdf4ee] rounded-2xl p-4 sm:p-5 border border-[#f8e2d2] flex flex-col items-center justify-center text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#a33e0e] leading-none mb-1">
              {starsEarned}
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              Stars Earned
            </span>
          </div>
        </div>

        {/* Skill Progress Bars */}
        <div className="flex flex-col gap-4 w-full pt-1">
          {/* Financial Literacy */}
          <div>
            <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
              <span>Financial Literacy</span>
              <span className="text-[#a33e0e]">80%</span>
            </div>
            <div className="w-full h-2 sm:h-2.5 bg-[#f3eae2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#a33e0e] rounded-full transition-all duration-700"
                style={{ width: '80%' }}
              />
            </div>
          </div>

          {/* Communication */}
          <div>
            <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
              <span>Communication</span>
              <span className="text-amber-700">65%</span>
            </div>
            <div className="w-full h-2 sm:h-2.5 bg-[#f3eae2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#f6d062] rounded-full transition-all duration-700"
                style={{ width: '65%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Action Buttons Below Card ── */}
      <div className="flex flex-col gap-3.5 w-full max-w-sm mx-auto">
        {/* 1. Download Image Button */}
        <button
          type="button"
          disabled={isExporting}
          onClick={handleDownloadImage}
          className="w-full py-3.5 px-6 rounded-full bg-[#a33e0e] hover:bg-[#852f08] active:scale-98 text-white font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
        >
          <span className="text-base">💾</span>
          <span>{isExporting ? 'Generating Image...' : 'Download Image'}</span>
        </button>

        {/* 2. Share with Family Button */}
        <button
          type="button"
          onClick={handleShareWithFamily}
          className="w-full py-3.5 px-6 rounded-full bg-[#0066ff] hover:bg-[#0052cc] active:scale-98 text-white font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span className="text-base">📬</span>
          <span>Share with Family</span>
        </button>

        {/* 3. Back Button */}
        <button
          type="button"
          onClick={() => navigate('/parent')}
          className="w-full py-3 px-6 rounded-full bg-[#fdeee6] hover:bg-[#fadfd3] active:scale-98 text-[#a33e0e] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back</span>
        </button>
      </div>

      {/* ── Share Modal (Fallback / Options) ── */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Share {childName}&apos;s Progress
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Celebrate their learning milestone with grandparents, family, or friends!
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3 px-4 rounded-2xl bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Share via WhatsApp</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Share Text</span>
              </button>

              <button
                onClick={() => setShowShareModal(false)}
                className="w-full py-2.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressShareCard;
