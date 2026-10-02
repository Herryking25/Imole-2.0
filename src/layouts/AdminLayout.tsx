import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminNavbar } from '../components/navigation/AdminNavbar';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <AdminNavbar />
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 pb-12">
        <Outlet />
      </main>
    </div>
  );
};

