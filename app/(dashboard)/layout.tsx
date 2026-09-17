"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { NewOperationModal } from "@/components/dashboard/NewOperationModal";
import { AuthProvider } from "@/lib/auth/auth-context";
import {
  LayoutDashboard,
  Layers,
  Receipt,
  ShoppingCart,
  Menu,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const bottomNavItems = [
    { label: "Inicio", href: "/dashboard", icon: LayoutDashboard },
    { label: "Operaciones", href: "/dashboard/operaciones", icon: Layers },
    { label: "Ventas", href: "/dashboard/ventas", icon: Receipt },
    { label: "Compras", href: "/dashboard/compras", icon: ShoppingCart },
  ];

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
          <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-8">
            {children}
          </main>
        </div>

        {/* Global New Operation Modal */}
        <NewOperationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        {/* Native Mobile Bottom Navigation Bar (Visible only on mobile screens < md) */}
        <nav
          aria-label="Navegación móvil inferior"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
        >
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                  isActive
                    ? "text-blue-600 font-bold"
                    : "text-slate-400 hover:text-slate-600 font-medium"
                }`}
              >
                <div
                  className={`p-1 rounded-lg transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </Link>
            );
          })}

          {/* Hamburger trigger for full menu */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-slate-600 font-medium transition-all"
          >
            <div className="p-1 rounded-lg">
              <Menu className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5">Más</span>
          </button>
        </nav>
      </div>
    </AuthProvider>
  );
}


