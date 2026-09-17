"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Menu,
  Check,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";

interface TopbarProps {
  onNewOperationClick?: () => void;
  onToggleMobileMenu?: () => void;
}

const PRESET_PERIODS = [
  { group: "Periodos Mensuales (2026)", options: ["Marzo 2026 (Actual)", "Febrero 2026", "Enero 2026"] },
  {
    group: "Trimestrales",
    options: [
      "T1 2026 (Ene - Mar)",
      "T4 2025 (Oct - Dic)",
      "T3 2025 (Jul - Set)",
      "T2 2025 (Abr - Jun)",
      "T1 2025 (Ene - Mar)",
    ],
  },
  {
    group: "Ejercicios Anuales",
    options: ["Ejercicio 2026 (En Curso)", "Ejercicio 2025 (Auditado)", "Todo el Historial"],
  },
];

export const Topbar: React.FC<TopbarProps> = ({ onNewOperationClick, onToggleMobileMenu }) => {
  const { user, company, logout } = useAuth();
  const [period, setPeriod] = useState("Marzo 2026 (Actual)");
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [customStart, setCustomStart] = useState("2026-01-01");
  const [customEnd, setCustomEnd] = useState("2026-03-31");
  const [showCustomRange, setShowCustomRange] = useState(false);

  const periodDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fincont_period");
      if (saved) setPeriod(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (periodDropdownRef.current && !periodDropdownRef.current.contains(e.target as Node)) {
        setPeriodDropdownOpen(false);
        setShowCustomRange(false);
      }
    };
    if (periodDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [periodDropdownOpen]);

  const handleSelectPeriod = (newPeriod: string) => {
    setPeriod(newPeriod);
    setPeriodDropdownOpen(false);
    setShowCustomRange(false);
    try {
      localStorage.setItem("fincont_period", newPeriod);
      window.dispatchEvent(new CustomEvent("fincont_period_changed", { detail: newPeriod }));
      window.dispatchEvent(new Event("fincont_operations_updated"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplyCustomRange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customStart || !customEnd) return;
    const formatted = `${customStart} al ${customEnd}`;
    handleSelectPeriod(formatted);
  };

  const displayName = user ? `${user.name} ${user.lastName}`.trim() : "Juan Martínez";
  const displayInitials = user?.avatarInitials || (user ? `${user.name?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "JM");
  const displayCompany = company?.commercialName || company?.legalName || "Empresa Demo S.A.";
  const displayLegalName = company?.legalName || "Libertad S.A.";

  return (
    <header className="h-18 bg-white border-b border-slate-200/80 px-3.5 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Mobile Hamburger & Search Input */}
      <div className="flex items-center gap-2 flex-1 max-w-md">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 -ml-1 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Abrir menú de navegación"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Input with Keyboard shortcut */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar operaciones..."
            className="w-full pl-9 pr-8 sm:pr-12 py-2 rounded-xl border border-slate-200 bg-[#F8FAFC] text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <div className="hidden sm:flex absolute right-2.5 top-1/2 -translate-y-1/2 items-center gap-0.5 px-1.5 py-0.5 bg-white rounded-md border border-slate-200 text-[10px] text-slate-400 font-mono">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4 pl-2 sm:pl-4">
        {/* Interactive Date Period Selector */}
        <div className="relative" ref={periodDropdownRef}>
          <button
            type="button"
            onClick={() => setPeriodDropdownOpen(!periodDropdownOpen)}
            className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              periodDropdownOpen
                ? "bg-blue-50 border-blue-300 text-blue-700 shadow-xs"
                : "bg-[#F8FAFC] border-slate-200 text-slate-700 hover:bg-slate-100/80"
            }`}
            title="Cambiar periodo contable"
          >
            <Calendar className={`w-3.5 h-3.5 ${periodDropdownOpen ? "text-blue-600" : "text-slate-500"}`} />
            <span className="max-w-[150px] lg:max-w-[190px] truncate">{period}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${periodDropdownOpen ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
          </button>

          {/* Period Dropdown Menu */}
          {periodDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <CalendarDays className="w-4 h-4 text-blue-600" />
                  <span>Periodo Contable</span>
                </div>
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  SUNAT / PCGE
                </span>
              </div>

              {/* Presets List */}
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {PRESET_PERIODS.map((grp) => (
                  <div key={grp.group} className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
                      {grp.group}
                    </p>
                    <div className="space-y-0.5">
                      {grp.options.map((opt) => {
                        const isSelected = period === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleSelectPeriod(opt)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                              isSelected
                                ? "bg-blue-600 text-white font-semibold shadow-xs"
                                : "text-slate-700 hover:bg-slate-100/80"
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Date Range Toggle / Form */}
              <div className="pt-2 border-t border-slate-100">
                {!showCustomRange ? (
                  <button
                    type="button"
                    onClick={() => setShowCustomRange(true)}
                    className="w-full py-1.5 px-2 text-center text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>+ Rango personalizado...</span>
                  </button>
                ) : (
                  <form onSubmit={handleApplyCustomRange} className="space-y-2 pt-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Rango de fechas
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">Desde</label>
                        <input
                          type="date"
                          value={customStart}
                          onChange={(e) => setCustomStart(e.target.value)}
                          className="w-full text-xs p-1.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">Hasta</label>
                        <input
                          type="date"
                          value={customEnd}
                          onChange={(e) => setCustomEnd(e.target.value)}
                          className="w-full text-xs p-1.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowCustomRange(false)}
                        className="w-1/2 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="w-1/2 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
                      >
                        Aplicar
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Global Action: + Nueva operación */}
        <button
          onClick={onNewOperationClick}
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/25 transition-all hover:shadow-md hover:shadow-blue-500/35 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Nueva operación</span>
          <span className="sm:hidden">Nuevo</span>
        </button>

        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Notificaciones"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2.5 p-1 sm:pl-2 rounded-xl hover:bg-slate-50 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {displayInitials}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-bold text-slate-900 leading-tight">{displayName}</p>
              <p className="text-[10px] text-slate-400 font-medium truncate max-w-[130px]">{displayCompany}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* User Dropdown Menu */}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
              <div className="p-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{displayName}</p>
                <p className="text-[11px] text-slate-400">{user?.role || "Administrador General"}</p>
                <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full truncate max-w-full">
                  <Building2 className="w-3 h-3 shrink-0" /> {displayLegalName}
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
              <button
                onClick={() => {
                  logout();
                  setUserDropdownOpen(false);
                  window.location.href = "/login";
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
