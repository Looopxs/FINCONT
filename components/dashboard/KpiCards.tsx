"use client";

import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Landmark,
  Receipt,
  Users2,
  CreditCard,
  BarChart3,
  HelpCircle,
} from "lucide-react";

export const KpiCards: React.FC = () => {
  const kpis = [
    {
      label: "Ingresos",
      amount: "S/ 152,800",
      change: "+12% vs. mes anterior",
      isPositive: true,
      icon: Receipt,
      iconColor: "text-emerald-600 bg-emerald-50",
      tooltip: "Total de facturación y cobranzas del periodo",
    },
    {
      label: "Gastos",
      amount: "S/ 48,230",
      change: "-8% vs. mes anterior",
      isPositive: true, // Decreasing expense is positive
      icon: TrendingDown,
      iconColor: "text-rose-500 bg-rose-50",
      tooltip: "Compras de mercaderías, suministros y servicios",
    },
    {
      label: "Saldo en bancos",
      amount: "S/ 104,570",
      change: "+15% vs. mes anterior",
      isPositive: true,
      icon: Landmark,
      iconColor: "text-blue-600 bg-blue-50",
      tooltip: "Cuenta Corriente Operativa BBVA (1041)",
    },
    {
      label: "Cuentas por cobrar",
      amount: "S/ 86,400",
      change: "+15% vs. mes anterior",
      isPositive: true,
      icon: Users2,
      iconColor: "text-indigo-600 bg-indigo-50",
      tooltip: "Facturas emitidas pendientes de cobro (1212)",
    },
    {
      label: "Cuentas por pagar",
      amount: "S/ 32,200",
      change: "-12% vs. mes anterior",
      isPositive: true,
      icon: CreditCard,
      iconColor: "text-amber-600 bg-amber-50",
      tooltip: "Facturas de proveedores pendientes de pago (4212)",
    },
    {
      label: "Resultado del periodo",
      amount: "S/ 56,320",
      change: "+18% vs. mes anterior",
      isPositive: true,
      icon: BarChart3,
      iconColor: "text-sky-600 bg-sky-50",
      tooltip: "Utilidad operativa neta del trimestre",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] hover:shadow-md transition-all group select-none"
          >
            {/* Top row: Label & Icon */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">
                {kpi.label}
              </span>
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center ${kpi.iconColor}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Amount */}
            <p className="text-xl font-extrabold text-slate-900 tracking-tight">
              {kpi.amount}
            </p>

            {/* Variation pill */}
            <div className="flex items-center gap-1 mt-1.5">
              <TrendingUp className="w-3 h-3 text-emerald-600 flex-shrink-0" />
              <span className="text-[11px] font-semibold text-emerald-600">
                {kpi.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
