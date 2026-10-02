import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ChildNavbar } from '../components/navigation/ChildNavbar';
import { ChildSidebar } from '../components/navigation/ChildSidebar';
import { BottomNav } from '../components/navigation/BottomNav';
import { ChildPageLoader } from '../components/common/ChildPageLoader';

export const ChildLayout: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const prevPathRef = useRef(location.pathname);

  const isDashboardOrOnboarding =
    location.pathname === '/child' ||
    location.pathname === '/child/dashboard' ||
    location.pathname === '/child/welcome' ||
    location.pathname === '/child/about-yourself' ||
    location.pathname === '/child/settings';

  // Determine contextual loading message based on destination
  const getLoadingMessage = (pathname: string) => {
    if (pathname === '/child' || pathname === '/child/dashboard') {
      return 'Lighting up your daily dashboard... ☀️';
    }
    if (pathname === '/child/challenge') {
      return 'Loading your challenges & skill quests... 🧩';
    }
    if (pathname === '/child/progress') {
      return 'Calculating your skill percentages & stars... 📈';
    }
    if (pathname === '/child/leaderboard') {
      return 'Checking the champion ranks... 🏆';
    }
    if (pathname === '/child/settings') {
      return 'Opening your settings & preferences... ⚙️';
    }
    return 'Loading your adventure... ✨';
  };

  const LOADER_DURATION_MS = 5000; // 5 seconds

  useEffect(() => {
    // Only trigger transition loader if path actually changed
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setIsLoading(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, LOADER_DURATION_MS);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleSkipLoading = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]/60 md:bg-white flex flex-col md:flex-row relative">
      {/* Top Animated Loading Line Indicator */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-[#ea580c] to-[#a73605] z-50 animate-pulse" />
      )}

      {/* Desktop Left Sidebar */}
      <ChildSidebar className="hidden md:flex" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#faf8f5]/60 md:bg-white min-h-screen">
        {/* On non-dashboard pages, show navbar for streaks and score */}
        {!isDashboardOrOnboarding && <ChildNavbar />}

        <main className="flex-1 w-full flex flex-col">
          {isLoading ? (
            <ChildPageLoader
              message={getLoadingMessage(location.pathname)}
              durationMs={LOADER_DURATION_MS}
              onSkip={handleSkipLoading}
            />
          ) : (
            <Outlet />
          )}
        </main>

        <BottomNav />
      </div>
    </div>
  );
};

export default ChildLayout;
