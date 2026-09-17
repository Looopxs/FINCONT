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

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ¡Hola, Juan! Bienvenido a FINCONT
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              tu cuenta al día
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mt-1">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Building2 className="w-4 h-4 text-blue-600" />
              Libertad S.A. (RUC 20304050601)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Plan Contable PCGE Sincronizado
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs self-start sm:self-auto">
          <span>Última sincronización:</span>
          <span className="font-bold text-slate-700">{lastSyncTime}</span>
        </div>
      </div>

      {/* 6 Top KPI Metrics */}
      <KpiCards />

      {/* Main Grid: 8 Cols (Charts, Flow, Table) + 4 Cols (Activity, Dues) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Financial Charts: Bar + Donut */}
          <FinancialCharts />

          {/* Real-time Automation Flow Stepper */}
          <AutomationCenterCard
            onTriggerSim={() => setLastSyncTime("Hace unos segundos")}
          />

          {/* Recent Operations Table */}
          <RecentOperationsTable />
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Activity Timeline */}
          <RecentActivity />

          {/* Upcoming Due Dates & Taxes */}
          <UpcomingDue />
        </div>
      </div>
    </div>
  );
}
