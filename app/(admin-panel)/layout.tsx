"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarWidth = "w-64";

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Fixed Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 ${sidebarWidth}`}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content with left margin */}
      <div className={`flex-1 flex flex-col ml-64 h-screen overflow-hidden`}>
        {/* Topbar with gradient background */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-blue-700/80 via-blue-600/80 to-blue-500/80 dark:from-gray-800/80 dark:via-gray-700/80 dark:to-gray-600/80 backdrop-blur-md border-b border-blue-900/20 dark:border-gray-700 shadow">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* Main content area */}
        <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
