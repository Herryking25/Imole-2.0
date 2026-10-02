import React from 'react';
import { Download, FileSpreadsheet, Users, BookOpen } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Button } from '../common/Button';

export const AnalyticsExport: React.FC = () => {
  const { userReports, challengeReports, exportUserReportCSV, exportChallengeReportCSV } = useAnalytics();

  return (
    <div className="bg-white rounded-3xl border border-[#f5e6d8] p-6 shadow-xs text-left flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Download className="w-5 h-5 text-[#a73605]" />
          <span>Export Analytics & Reports</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Generate and download CSV reports for pilot schools, sponsors, and demo presentations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Activity Report */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fff1ea] text-[#a73605] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">User Activity Report</h4>
              <p className="text-xs text-slate-500 mt-1">
                Anonymized child IDs, ages, learning streaks, cumulative points, and active dates.
              </p>
              <span className="text-[11px] font-bold text-slate-400 block mt-2">
                {userReports.length} rows ready
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={exportUserReportCSV}
            icon={<FileSpreadsheet className="w-4 h-4 text-emerald-600" />}
          >
            Download Users CSV
          </Button>
        </div>

        {/* Challenge Performance Report */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fff1ea] text-[#a73605] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Challenge Performance Report</h4>
              <p className="text-xs text-slate-500 mt-1">
                Challenge IDs, skill areas, difficulty tiers, total attempts, and pass rate percentages.
              </p>
              <span className="text-[11px] font-bold text-slate-400 block mt-2">
                {challengeReports.length} rows ready
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={exportChallengeReportCSV}
            icon={<FileSpreadsheet className="w-4 h-4 text-emerald-600" />}
          >
            Download Challenges CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

