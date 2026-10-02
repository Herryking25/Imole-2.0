import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Download, Lock, CheckCircle2, Printer, X, Sparkles, Banknote, Calculator, Mic, Lightbulb, ArrowLeft, HeartHandshake } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { CertificateService } from '../../services/certificateService';
import type { Certificate } from '../../types/certificate';
import { ImoleLogo } from '../common/ImoleLogo';

export const CertificateCard: React.FC = () => {
  const navigate = useNavigate();
  const allCerts = CertificateService.getAllCertificates();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const printableCertRef = useRef<HTMLDivElement>(null);

  const earnedCount = allCerts.filter((c) => !c.isLocked).length;
  const totalCount = allCerts.length;
  const progressPercent = Math.round((earnedCount / totalCount) * 100);

  const handleDownloadSingleCert = async (cert: Certificate, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (cert.isLocked) return;

    setSelectedCert(cert);
    // Give state time to open modal, then export
    setTimeout(async () => {
      if (printableCertRef.current) {
        try {
          setIsDownloading(true);
          const dataUrl = await htmlToImage.toPng(printableCertRef.current, {
            quality: 0.95,
            pixelRatio: 2,
            backgroundColor: '#ffffff',
          });
          const link = document.createElement('a');
          link.download = `${cert.childName}-${cert.title.replace(/\s+/g, '-')}-Certificate.png`;
          link.href = dataUrl;
          link.click();
          setDownloadSuccess(`Downloaded ${cert.title} certificate!`);
          setTimeout(() => setDownloadSuccess(null), 3500);
        } catch (err) {
          console.error('Failed to export certificate image:', err);
        } finally {
          setIsDownloading(false);
        }
      }
    }, 300);
  };

  const handlePrintCert = () => {
    window.print();
  };

  const renderIcon = (type?: string, isLocked?: boolean) => {
    switch (type) {
      case 'math':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#feefb3] text-[#9a6208] flex items-center justify-center font-black text-xl shadow-2xs shrink-0">
            <Calculator className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'finance':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#feefb3] text-[#9a6208] flex items-center justify-center shadow-2xs shrink-0">
            <Banknote className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'speaking':
        return (
          <div className={`w-12 h-12 rounded-2xl ${isLocked ? 'bg-[#fce6dd] text-[#8c3c24]' : 'bg-[#feefb3] text-[#9a6208]'} flex items-center justify-center shadow-2xs shrink-0`}>
            <Mic className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'problem-solving':
        return (
          <div className={`w-12 h-12 rounded-2xl ${isLocked ? 'bg-[#fce6dd] text-[#8c3c24]' : 'bg-[#feefb3] text-[#9a6208]'} flex items-center justify-center shadow-2xs shrink-0`}>
            <Lightbulb className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'eq':
        return (
          <div className={`w-12 h-12 rounded-2xl ${isLocked ? 'bg-[#fce6dd] text-[#8c3c24]' : 'bg-[#feefb3] text-[#9a6208]'} flex items-center justify-center shadow-2xs shrink-0`}>
            <HeartHandshake className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#feefb3] text-[#9a6208] flex items-center justify-center shadow-2xs shrink-0">
            <Sparkles className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col font-sans select-none pb-12">
      {/* ── Screen Title ── */}
      <h1 className="text-2xl sm:text-3xl font-bold text-[#9c3205] text-center mb-6 tracking-tight">
        Certificates
      </h1>

      {/* ── Toast Notification for Downloads ── */}
      {downloadSuccess && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#15803d] text-white px-5 py-2.5 rounded-full shadow-lg text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* ── Top Summary Progress Card ── */}
      <div className="w-full bg-white rounded-3xl border border-[#f3e7dc] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center text-center mb-6">
        {/* Award Badge Icon */}
        <div className="w-12 h-12 rounded-full bg-[#fef5d9] text-[#b45309] flex items-center justify-center mb-3 shadow-2xs">
          <Award className="w-6 h-6 stroke-[2.5]" />
        </div>

        {/* Count text */}
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
          {earnedCount} of {totalCount} certificates earned
        </h2>

        {/* Horizontal Progress Bar */}
        <div className="w-full h-2.5 bg-[#e5e7eb] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#f6d062] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ── Certificates List ── */}
      <div className="flex flex-col gap-3.5 w-full">
        {allCerts.map((cert) => (
          <div
            key={cert.id}
            onClick={() => !cert.isLocked && setSelectedCert(cert)}
            className={`w-full bg-white rounded-2xl border border-[#f5e6d8] p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center justify-between gap-4 transition-all duration-200 ${
              cert.isLocked
                ? 'opacity-85 hover:border-[#f5e6d8]'
                : 'hover:border-[#e8ba9b] hover:shadow-sm cursor-pointer active:scale-[0.995]'
            }`}
          >
            {/* Left: Icon & Content */}
            <div className="flex items-center gap-4 min-w-0">
              {renderIcon(cert.iconType, cert.isLocked)}

              <div className="flex flex-col text-left min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate leading-snug">
                  {cert.title}
                </h3>

                {cert.isLocked ? (
                  <p className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400 stroke-[2.2]" />
                    <span>{cert.completedDateFormatted || `Locked (${cert.lockRequirement || 'Requires Level 5'})`}</span>
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                    Completed on {cert.completedDateFormatted || cert.issueDate}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Circular Download Button */}
            {cert.isLocked ? (
              <button
                type="button"
                disabled
                className="w-11 h-11 rounded-full bg-[#fdf0e7] text-[#c49583] opacity-60 flex items-center justify-center shrink-0 cursor-not-allowed"
                aria-label="Certificate locked"
              >
                <Download className="w-5 h-5 stroke-[2.2]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => handleDownloadSingleCert(cert, e)}
                title="Download / View Certificate"
                className="w-11 h-11 rounded-full bg-[#fce3d2] hover:bg-[#f9d2b8] text-[#a33e0e] flex items-center justify-center shrink-0 transition-all duration-200 active:scale-95 cursor-pointer shadow-2xs group"
                aria-label={`Download ${cert.title} Certificate`}
              >
                <Download className="w-5 h-5 stroke-[2.2] group-hover:translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ── Back to Dashboard Bottom Link ── */}
      <div className="pt-8 pb-4 text-center">
        <button
          type="button"
          onClick={() => navigate('/parent')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#a33e0e] hover:text-[#802c06] hover:underline transition-all cursor-pointer py-2"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* ── Interactive Printable & Downloadable Certificate Modal ── */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-amber-200 text-center my-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Certificate Frame (Target for html-to-image capture & printing) */}
            <div
              ref={printableCertRef}
              className="p-6 sm:p-8 border-8 border-double border-amber-300 bg-gradient-to-b from-[#fffbf4] to-[#fdf6ec] rounded-2xl shadow-inner relative overflow-hidden"
            >
              {/* Background watermark seal */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <ImoleLogo size={240} />
              </div>

              {/* Top Header Badge */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#fef5d9] border-2 border-amber-300 text-[#b45309] flex items-center justify-center mb-2 shadow-sm">
                  <Award className="w-8 h-8 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-black tracking-widest text-[#a33e0e] uppercase mb-1">
                  IMOLE Life Skills Academy
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Certificate of Achievement
                </h3>
              </div>

              {/* Recipient */}
              <div className="my-5">
                <p className="text-xs text-slate-500 font-medium italic mb-1">
                  This official credential is proudly awarded to
                </p>
                <h4 className="text-2xl sm:text-3xl font-black text-[#a33e0e] font-serif tracking-wide border-b-2 border-amber-300/80 pb-1.5 inline-block min-w-[200px]">
                  {selectedCert.childName}
                </h4>
              </div>

              {/* Certificate Title & Description */}
              <div className="max-w-md mx-auto my-4">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 font-extrabold text-xs mb-2">
                  {selectedCert.title}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>

              {/* Footer Stamp & Signature */}
              <div className="flex items-center justify-between pt-6 mt-4 border-t border-amber-200/80 text-left text-xs text-slate-600">
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">Issue Date</span>
                  <strong className="text-slate-800 font-bold">{selectedCert.issueDate}</strong>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-800 text-[10px] font-black uppercase">
                    SEAL
                  </div>
                  <span className="text-[9px] font-bold text-amber-800 mt-0.5">Verified</span>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">Director</span>
                  <strong className="text-slate-800 font-serif italic font-bold">IMOLE Academy</strong>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                disabled={isDownloading}
                onClick={(e) => handleDownloadSingleCert(selectedCert, e)}
                className="flex-1 py-3 px-5 rounded-full bg-[#a33e0e] hover:bg-[#802c06] active:scale-98 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{isDownloading ? 'Generating PNG...' : 'Download Image (PNG)'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintCert}
                className="py-3 px-5 rounded-full bg-amber-100 hover:bg-amber-200 active:scale-98 text-amber-950 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 stroke-[2.5]" />
                <span>Print Certificate</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="py-3 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateCard;

