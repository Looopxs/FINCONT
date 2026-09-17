"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { NewOperationModal } from "@/components/dashboard/NewOperationModal";
import { AuthProvider } from "@/lib/auth/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex">
        {/* Sidebar Navigation */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />

        {/* Main Content Area: ml-0 on mobile, md:ml-64 or md:ml-20 on desktop */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ml-0 ${
            collapsed ? "md:ml-20" : "md:ml-64"
          }`}
        >
          <Topbar
            onNewOperationClick={() => setModalOpen(true)}
            onToggleMobileMenu={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />
          <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>

        {/* Global New Operation Modal */}
        <NewOperationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}

