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

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 ml-64 flex flex-col min-w-0 transition-all duration-300">
          <Topbar onNewOperationClick={() => setModalOpen(true)} />
          <main className="flex-1 p-5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
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

