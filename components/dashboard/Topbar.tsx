"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  Plus,
  Bell,
  ChevronDown,
  Command,
  User,
  LogOut,
  Building2,
} from "lucide-react";

interface TopbarProps {
  onNewOperationClick?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onNewOperationClick }) => {
  const [period, setPeriod] = useState("Enero 2024 - Marzo 2024");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="h-18 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Search Input with Keyboard shortcut */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar operaciones, clientes, reportes..."
            className="w-full pl-10 pr-12 py-2 rounded-xl border border-slate-200 bg-[#F8FAFC] text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 bg-white rounded-md border border-slate-200 text-[10px] text-slate-400 font-mono">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4 pl-4">
        {/* Date Period Selector */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100/70 transition-colors cursor-pointer">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{period}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Global Action: + Nueva operación */}
        <button
          onClick={onNewOperationClick}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/25 transition-all hover:shadow-md hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva operación</span>
        </button>

        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2.5 p-1 sm:pl-2 rounded-xl hover:bg-slate-50 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              JM
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-bold text-slate-900 leading-tight">Juan Martínez</p>
              <p className="text-[10px] text-slate-400 font-medium">Empresa Demo S.A.</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* User Dropdown Menu */}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
              <div className="p-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">Juan Martínez</p>
                <p className="text-[11px] text-slate-400">Administrador General</p>
                <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  <Building2 className="w-3 h-3" /> Libertad S.A.
                </span>
              </div>
              <Link
                href="/dashboard/configuracion"
                onClick={() => setUserDropdownOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Perfil y Empresa</span>
              </Link>
              <Link
                href="/login"
                onClick={() => setUserDropdownOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar sesión</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
