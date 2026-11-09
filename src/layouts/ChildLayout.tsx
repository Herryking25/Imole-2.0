import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ChildNavbar } from '../components/navigation/ChildNavbar';
import { ChildSidebar } from '../components/navigation/ChildSidebar';
import { BottomNav } from '../components/navigation/BottomNav';

export const ChildLayout: React.FC = () => {
  const location = useLocation();

  const isAboutYourself =
    location.pathname.includes('aboutyourself') ||
    location.pathname.includes('about-yourself');

  const isOnboardingPage =
    location.pathname === '/child/welcome' ||
    isAboutYourself ||
    location.pathname === '/child/onboarding';

  // Hide top navbar on dashboard and onboarding pages
  const isDashboardOrOnboarding =
    location.pathname === '/child' ||
    location.pathname === '/child/dashboard' ||
    isOnboardingPage ||
    location.pathname === '/child/settings';

  // Hide bottom nav + sidebar on challenge player & result pages (full-screen experience)
  const isFullScreenPage =
    location.pathname.startsWith('/child/challenge/play') ||
    location.pathname.startsWith('/child/challenge/result');

  return (
    <div className="h-screen w-full bg-[#FFF8F6] md:bg-white flex flex-col md:flex-row relative overflow-hidden">
      {/* Desktop Left Sidebar */}
      {!isOnboardingPage && !isFullScreenPage && (
        <ChildSidebar className="hidden md:flex shrink-0 h-full overflow-y-auto" />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top navbar for streaks/score on non-dashboard pages */}
        {!isDashboardOrOnboarding && !isFullScreenPage && (
          <div className="shrink-0 z-20">
            <ChildNavbar />
          </div>
        )}

        <main className="flex-1 w-full flex flex-col overflow-y-auto pb-16 md:pb-8">
          <Outlet />
        </main>

        {!isOnboardingPage && !isFullScreenPage && (
          <div className="shrink-0 z-20 md:hidden">
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildLayout;
