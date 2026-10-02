import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { ParentNavbar } from '../components/navigation/ParentNavbar';
import { ChildSidebar } from '../components/navigation/ChildSidebar';
import { ParentProfileService } from '../services/parentProfileService';
import { ParentUnlockPage } from '../pages/parent/ParentUnlockPage';

export const ParentLayout: React.FC = () => {
  const isComplete = ParentProfileService.isProfileComplete();
  const hasPin = ParentProfileService.hasPin();
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return !hasPin || ParentProfileService.isSessionUnlocked();
  });

  if (!isComplete) {
    return <Navigate to="/parent/language" replace />;
  }

  // If a PIN is configured and session is locked, show the unlock passcode screen
  if (hasPin && !isUnlocked) {
    return <ParentUnlockPage onUnlockSuccess={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]/60 md:bg-white flex flex-col md:flex-row font-sans">
      {/* Desktop Left Sidebar */}
      <ChildSidebar className="hidden md:flex" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#faf8f5]/60 md:bg-white">
        {/* Mobile Navbar */}
        <div className="md:hidden">
          <ParentNavbar />
        </div>

        <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 pb-16 flex flex-col items-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;


