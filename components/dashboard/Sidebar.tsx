"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NexoraLogo } from "@/components/common/NexoraLogo";
import {
  LayoutDashboard,
  Layers,
  Receipt,
  ShoppingCart,
  Landmark,
  Users,
  Truck,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Crown,
  HelpCircle,
  ArrowRight,
  FileText,
  X,
} from "lucide-react";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen = false,
  onCloseMobile,
  collapsed: externalCollapsed,
  onToggleCollapse,
}) => {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  const handleToggleCollapse = onToggleCollapse || (() => setInternalCollapsed(!internalCollapsed));

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Operaciones", href: "/dashboard/operaciones", icon: Layers },
    { label: "Ventas", href: "/dashboard/ventas", icon: Receipt },
    { label: "Compras", href: "/dashboard/compras", icon: ShoppingCart },
    { label: "Caja y Bancos", href: "/dashboard/caja-bancos", icon: Landmark },
    { label: "Clientes", href: "/dashboard/clientes", icon: Users },
    { label: "Proveedores", href: "/dashboard/proveedores", icon: Truck },
    { label: "Contabilidad", href: "/dashboard/contabilidad", icon: BookOpen },
    { label: "Reportes", href: "/dashboard/reportes", icon: BarChart3 },
    { label: "Auditoría", href: "/dashboard/auditoria", icon: ShieldCheck },
    { label: "Configuración", href: "/dashboard/configuracion", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity duration-200"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform md:transition-all duration-300 select-none ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        } w-72 max-w-[85vw] ${isCollapsed ? "md:w-20" : "md:w-64"}`}
      >
        {/* Top Brand Header */}
        <div>
          <div className="h-18 px-5 border-b border-slate-100 flex items-center justify-between">
            <NexoraLogo href="/" size={isCollapsed ? "sm" : "md"} showText={!isCollapsed} />
            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
            {/* Desktop Collapse Button */}
            <button
              onClick={handleToggleCollapse}
              className="hidden md:block p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)]">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/dashboard");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all group ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700"
                    }`}
                  />
                  {(!isCollapsed || mobileOpen) && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

      {/* Bottom Promo & Support Cards (Matching Image 3) */}
      {!isCollapsed && (
        <div className="p-4 space-y-3 border-t border-slate-100 bg-[#FAFCFF]">
          {/* Upgrade Promo Card */}
          <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Crown className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-900 leading-none">
                Potencia tu empresa
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight mb-2">
              Más funciones, más automatización contable.
            </p>
            <Link
              href="/dashboard/configuracion"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700"
            >
              <span>Conocer más</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Help & Support Card */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-slate-800 leading-none">¿Necesitas ayuda?</p>
              <p className="text-[10px] text-slate-400 truncate">Soporte disponible 24/7</p>
            </div>
          </div>
        </div>
      )}
    </aside>
    </>
  );
};
