import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { ChildLayout } from '../layouts/ChildLayout';
import { ParentLayout } from '../layouts/ParentLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Child Pages
import { SplashScreen } from '../pages/child/SplashScreen';
import { WelcomeScreen } from '../pages/child/WelcomeScreen';
import { HomeDashboardPage } from '../pages/child/HomeDashboardPage';
import { AboutYourselfPage } from '../pages/child/AboutYourselfPage';
import { OnboardingPage } from '../pages/child/OnboardingPage';
import { DailyChallengePage } from '../pages/child/DailyChallengePage';
import { FeedbackPage } from '../pages/child/FeedbackPage';
import { ProgressDashboardPage } from '../pages/child/ProgressDashboardPage';
import { LeaderboardPage } from '../pages/child/LeaderboardPage';
import { ChildSettingsPage } from '../pages/child/ChildSettingsPage';

// Parent Pages
import { ParentDashboardPage } from '../pages/parent/ParentDashboardPage';
import { ShareProgressPage } from '../pages/parent/ShareProgressPage';
import { CertificatesPage } from '../pages/parent/CertificatesPage';
import { ParentSkillBreakdownPage } from '../pages/parent/ParentSkillBreakdownPage';
import { ParentLanguagePage } from '../pages/parent/ParentLanguagePage';
import { ParentRegisterPage } from '../pages/parent/ParentRegisterPage';
import { ParentVerifyEmailPage } from '../pages/parent/ParentVerifyEmailPage';
import { ParentSetPinPage } from '../pages/parent/ParentSetPinPage';
import { ParentUnlockPage } from '../pages/parent/ParentUnlockPage';
import { ParentForgotPinPage } from '../pages/parent/ParentForgotPinPage';
import { ParentAuthPage } from '../pages/parent/ParentAuthPage';

// Admin Pages
import { PlatformMetricsPage } from '../pages/admin/PlatformMetricsPage';
import { ChallengeLibraryPage } from '../pages/admin/ChallengeLibraryPage';
import { LanguageManagementPage } from '../pages/admin/LanguageManagementPage';
import { AnalyticsExportPage } from '../pages/admin/AnalyticsExportPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Standalone Splash Screens */}
      <Route path="/splash" element={<SplashScreen />} />
      <Route path="/child/splash" element={<SplashScreen />} />

      {/* Standalone Parent Onboarding Flow */}
      <Route path="/parent/language" element={<ParentLanguagePage />} />
      <Route path="/parent/auth" element={<ParentAuthPage />} />
      <Route path="/parent/register" element={<ParentRegisterPage />} />
      <Route path="/parent/verify-email" element={<ParentVerifyEmailPage />} />
      <Route path="/parent/set-pin" element={<ParentSetPinPage />} />
      <Route path="/parent/unlock" element={<ParentUnlockPage />} />
      <Route path="/parent/forgot-pin" element={<ParentForgotPinPage />} />
      <Route path="/parent/reset-password" element={<ParentForgotPinPage />} />
      <Route path="/parent/setup" element={<Navigate to="/parent/language" replace />} />
      <Route path="/parent/onboarding" element={<Navigate to="/parent/language" replace />} />

      {/* Public Flow */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Route>

      {/* Child Flow Shell */}
      <Route path="/child" element={<ChildLayout />}>
        <Route index element={<HomeDashboardPage />} />
        <Route path="dashboard" element={<HomeDashboardPage />} />
        <Route path="welcome" element={<WelcomeScreen />} />
        <Route path="about-yourself" element={<AboutYourselfPage />} />
        <Route path="onboarding" element={<AboutYourselfPage />} />
        <Route path="challenge" element={<DailyChallengePage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="progress" element={<ProgressDashboardPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="settings" element={<ChildSettingsPage />} />
      </Route>

      {/* Parent Flow */}
      <Route path="/parent" element={<ParentLayout />}>
        <Route index element={<ParentDashboardPage />} />
        <Route path="skills" element={<ParentSkillBreakdownPage />} />
        <Route path="skills/:skillId" element={<ParentSkillBreakdownPage />} />
        <Route path="share" element={<ShareProgressPage />} />
        <Route path="certificates" element={<CertificatesPage />} />
      </Route>

      {/* Admin Flow */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<PlatformMetricsPage />} />
        <Route path="challenges" element={<ChallengeLibraryPage />} />
        <Route path="languages" element={<LanguageManagementPage />} />
        <Route path="analytics" element={<AnalyticsExportPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
