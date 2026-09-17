"use client";

import React, { useState } from "react";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { FinancialCharts } from "@/components/dashboard/FinancialCharts";
import { AutomationCenterCard } from "@/components/dashboard/AutomationCenterCard";
import { RecentOperationsTable } from "@/components/dashboard/RecentOperationsTable";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingDue } from "@/components/dashboard/UpcomingDue";
import { Sparkles, Building2, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  const [lastSyncTime, setLastSyncTime] = useState("Justo ahora");
  const [mobileTab, setMobileTab] = useState<"todo" | "graficos" | "operaciones" | "alertas">("todo");

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              ¡Hola, Juan! Bienvenido a FINCONT
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              tu cuenta al día
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-500">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
              Libertad S.A. (RUC 20304050601)
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              Plan Contable PCGE Sincronizado
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs self-start sm:self-auto shrink-0">
          <span className="text-slate-400">Última sincronización:</span>
          <span className="font-bold text-slate-700">{lastSyncTime}</span>
        </div>
      </div>

      {/* 6 Top KPI Metrics (2-cols on mobile for side-by-side comparison) */}
      <KpiCards />

      {/* Mobile Section Tabs (Only visible on mobile/tablet to eliminate infinite scrolling) */}
      <div className="lg:hidden flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200/80 overflow-x-auto no-scrollbar gap-1 text-xs font-semibold text-slate-600 select-none">
        <button
          onClick={() => setMobileTab("todo")}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
            mobileTab === "todo"
              ? "bg-white text-blue-600 shadow-xs font-bold"
              : "hover:text-slate-900"
          }`}
        >
          Vista completa
        </button>
        <button
          onClick={() => setMobileTab("graficos")}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
            mobileTab === "graficos"
              ? "bg-white text-blue-600 shadow-xs font-bold"
              : "hover:text-slate-900"
          }`}
        >
          📊 Gráficos y Flujo
        </button>
        <button
          onClick={() => setMobileTab("operaciones")}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
            mobileTab === "operaciones"
              ? "bg-white text-blue-600 shadow-xs font-bold"
              : "hover:text-slate-900"
          }`}
        >
          📋 Operaciones
        </button>
        <button
          onClick={() => setMobileTab("alertas")}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
            mobileTab === "alertas"
              ? "bg-white text-blue-600 shadow-xs font-bold"
              : "hover:text-slate-900"
          }`}
        >
          ⏰ Vencimientos
        </button>
      </div>

      {/* Main Grid: 8 Cols (Charts, Flow, Table) + 4 Cols (Activity, Dues) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center Column (8 cols) */}
        <div
          className={`lg:col-span-8 space-y-6 ${
            mobileTab === "alertas" ? "hidden lg:block" : ""
          }`}
        >
          {/* Financial Charts: Bar + Donut */}
          <div
            className={
              mobileTab === "operaciones" ? "hidden lg:block" : ""
            }
          >
            <FinancialCharts />
          </div>

          {/* Real-time Automation Flow Stepper */}
          <div
            className={
              mobileTab === "operaciones" ? "hidden lg:block" : ""
            }
          >
            <AutomationCenterCard
              onTriggerSim={() => setLastSyncTime("Hace unos segundos")}
            />
          </div>

          {/* Recent Operations Table */}
          <div
            className={
              mobileTab === "graficos" ? "hidden lg:block" : ""
            }
          >
            <RecentOperationsTable />
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div
          className={`lg:col-span-4 space-y-6 ${
            mobileTab === "graficos" || mobileTab === "operaciones"
              ? "hidden lg:block"
              : ""
          }`}
        >
          {/* Live Activity Timeline */}
          <RecentActivity />

          {/* Upcoming Due Dates & Taxes */}
          <UpcomingDue />
        </div>
      </div>
    </div>
  );
}
