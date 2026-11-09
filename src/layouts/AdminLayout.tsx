import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';

export const AdminLayout: React.FC = () => {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    return sessionStorage.getItem('imole_admin_authed') === 'true' ||
           localStorage.getItem('imole_admin_remember') === 'true';
  });

  const handleLogout = () => {
    sessionStorage.removeItem('imole_admin_authed');
    localStorage.removeItem('imole_admin_remember');
    setIsAuthed(false);
  };

  if (!isAuthed) {
    return <AdminLoginPage onLoginSuccess={() => setIsAuthed(true)} />;
  }

  return (
    <div className="h-screen w-full bg-[#FAF8F5] flex flex-row text-slate-800 antialiased font-sans overflow-hidden">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Fixed Header */}
        <div className="shrink-0 z-20">
          <AdminHeader onLogout={handleLogout} />
        </div>

        {/* Scrollable Main Section */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-10 pb-24 w-full">
          <div className="w-full mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
