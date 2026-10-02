import { useMemo } from 'react';
import { AnalyticsService } from '../services/analyticsService';
import type { PlatformMetrics, UserReportRow, ChallengeReportRow } from '../types/analytics';
import { useApp } from './useApp';

export function useAnalytics() {
  const { progress } = useApp();

  const metrics = useMemo<PlatformMetrics>(
    () => AnalyticsService.getPlatformMetrics(progress),
    [progress]
  );
  const userReports = useMemo<UserReportRow[]>(
    () => AnalyticsService.getUserReportData(progress),
    [progress]
  );
  const challengeReports = useMemo<ChallengeReportRow[]>(
    () => AnalyticsService.getChallengeReportData(progress),
    [progress]
  );

  return {
    metrics,
    userReports,
    challengeReports,
    exportUserReportCSV: AnalyticsService.exportUserReportCSV.bind(AnalyticsService),
    exportChallengeReportCSV: AnalyticsService.exportChallengeReportCSV.bind(AnalyticsService),
  };
}

