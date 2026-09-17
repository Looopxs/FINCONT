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
} from "lucide-react";
import { useOperationsStore } from "@/lib/data/operations-store";

export const KpiCards: React.FC = () => {
  const { operations, sales, purchases } = useOperationsStore();

  const initialBbva = 218390.0;
  const initialCaja = 43600.0;

  const totalSales = sales.reduce((sum, s) => sum + s.amount, 0);
  const totalPurchases = purchases.reduce((sum, p) => sum + p.amount, 0);

  const bbvaInflow = operations
    .filter((o) => o.destinationAccount === "1041" && (o.type === "VENTA" || o.type === "INGRESO"))
    .reduce((sum, o) => sum + o.amount, 0);
  const bbvaOutflow = operations
    .filter((o) => o.destinationAccount === "1041" && (o.type === "COMPRA" || o.type === "EGRESO"))
    .reduce((sum, o) => sum + o.amount, 0);
  const currentBbva = initialBbva + bbvaInflow - bbvaOutflow;

  const cajaInflow = operations
    .filter((o) => o.destinationAccount === "101" && (o.type === "VENTA" || o.type === "INGRESO" || o.type === "TRANSFERENCIA"))
    .reduce((sum, o) => sum + o.amount, 0);
  const cajaOutflow = operations
    .filter((o) => o.destinationAccount === "101" && (o.type === "COMPRA" || o.type === "EGRESO"))
    .reduce((sum, o) => sum + o.amount, 0);
  const currentCaja = initialCaja + cajaInflow - cajaOutflow;

  const totalBankBalance = currentBbva + currentCaja;
  const netResult = totalSales - totalPurchases;

  const receivable = sales.filter((s) => s.status !== "COMPLETADA").reduce((sum, s) => sum + s.amount, 0);
  const receivableAmount = receivable > 0 ? receivable : 86400;

  const payable = purchases.filter((p) => p.status !== "COMPLETADA").reduce((sum, p) => sum + p.amount, 0);
  const payableAmount = payable > 0 ? payable : 32200;

  const kpis = [
    {
      label: "Ingresos",
      amount: `S/ ${totalSales.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      change: "+12% vs. mes anterior",
      isPositive: true,
      icon: Receipt,
      iconColor: "text-emerald-600 bg-emerald-50",
      tooltip: "Total de facturación y cobranzas del periodo",
    },
    {
      label: "Gastos",
      amount: `S/ ${totalPurchases.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      change: "-8% vs. mes anterior",
      isPositive: true,
      icon: TrendingDown,
      iconColor: "text-rose-500 bg-rose-50",
      tooltip: "Compras de mercaderías, suministros y servicios",
    },
    {
      label: "Saldo en bancos",
      amount: `S/ ${totalBankBalance.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      change: "+15% vs. mes anterior",
      isPositive: true,
      icon: Landmark,
      iconColor: "text-blue-600 bg-blue-50",
      tooltip: "BBVA (1041) + Caja Efectivo (101)",
    },
    {
      label: "Resultado periodo",
      amount: `S/ ${netResult.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      change: "+18% vs. mes anterior",
      isPositive: netResult >= 0,
      icon: BarChart3,
      iconColor: "text-sky-600 bg-sky-50",
      tooltip: "Utilidad operativa neta del periodo",
    },
    {
      label: "Cuentas por cobrar",
      amount: `S/ ${receivableAmount.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      change: "+15% vs. mes anterior",
      isPositive: true,
      icon: Users2,
      iconColor: "text-indigo-600 bg-indigo-50",
      tooltip: "Facturas emitidas pendientes de cobro (1212)",
    },
    {
      label: "Cuentas por pagar",
      amount: `S/ ${payableAmount.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      change: "-12% vs. mes anterior",
      isPositive: true,
      icon: CreditCard,
      iconColor: "text-amber-600 bg-amber-50",
      tooltip: "Facturas de proveedores pendientes de pago (4212)",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-4">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] hover:shadow-md transition-all group select-none flex flex-col justify-between"
          >
            {/* Top row: Label & Icon */}
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 group-hover:text-slate-700 transition-colors truncate pr-1">
                {kpi.label}
              </span>
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${kpi.iconColor}`}
              >
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>

            {/* Amount */}
            <p className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {kpi.amount}
            </p>

            {/* Variation pill */}
            <div className="flex items-center gap-1 mt-1 sm:mt-1.5">
              <TrendingUp className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 truncate">
                {kpi.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
