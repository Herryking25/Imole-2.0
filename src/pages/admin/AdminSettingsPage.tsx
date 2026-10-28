import React, { useState } from 'react';
import { BookOpen, Languages, Download, BarChart3, Settings, ShieldCheck } from 'lucide-react';
import { ChallengeLibraryPage } from './ChallengeLibraryPage';
import { LanguageManagementPage } from './LanguageManagementPage';
import { AnalyticsExportPage } from './AnalyticsExportPage';
import { PlatformMetricsPage } from './PlatformMetricsPage';

export const AdminSettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'challenges' | 'languages' | 'analytics' | 'metrics'>('challenges');

  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Admin Settings &amp; Configuration
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage daily challenge library, localized Yoruba/Hausa/Igbo content, and export platform telemetry.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-6 px-1 overflow-x-auto">
        <button
          onClick={() => setActiveSection('challenges')}
          className={`pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeSection === 'challenges'
              ? 'text-[#9E3508] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Challenge Library</span>
          {activeSection === 'challenges' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E3508] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveSection('languages')}
          className={`pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeSection === 'languages'
              ? 'text-[#9E3508] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>Language Management</span>
          {activeSection === 'languages' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E3508] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveSection('analytics')}
          className={`pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeSection === 'analytics'
              ? 'text-[#9E3508] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics</span>
          {activeSection === 'analytics' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E3508] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveSection('metrics')}
          className={`pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeSection === 'metrics'
              ? 'text-[#9E3508] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Platform Metrics</span>
          {activeSection === 'metrics' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E3508] rounded-full" />
          )}
        </button>
      </div>

      {/* Render Active Tool */}
      <div className="mt-2">
        {activeSection === 'challenges' && <ChallengeLibraryPage />}
        {activeSection === 'languages' && <LanguageManagementPage />}
        {activeSection === 'analytics' && <AnalyticsExportPage />}
        {activeSection === 'metrics' && <PlatformMetricsPage />}
      </div>
    </div>
  );
};
