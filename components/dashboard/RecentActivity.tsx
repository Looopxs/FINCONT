"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  CreditCard,
  BookOpen,
  UserPlus,
  Receipt,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useOperationsStore } from "@/lib/data/operations-store";

export const RecentActivity: React.FC = () => {
  const { operations } = useOperationsStore();

  const activities = operations.slice(0, 5).map((op, idx) => {
    const isSale = op.type === "VENTA";
    const isPurchase = op.type === "COMPRA";

    if (isSale) {
      return {
        id: `act-${op.id}`,
        title: "Factura emitida",
        description: `${op.relatedInvoiceId || "F001"} · ${op.entityName}`,
        time: idx === 0 ? "Justo ahora" : `Fecha: ${op.date}`,
        amount: `S/ ${op.amount.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
        icon: FileText,
        iconColor: "text-emerald-600 bg-emerald-50",
      };
    } else if (isPurchase) {
      return {
        id: `act-${op.id}`,
        title: "Compra registrada",
        description: `${op.relatedInvoiceId || "C001"} · ${op.entityName}`,
        time: idx === 0 ? "Justo ahora" : `Fecha: ${op.date}`,
        amount: `S/ ${op.amount.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
        icon: CreditCard,
        iconColor: "text-amber-600 bg-amber-50",
      };
    } else {
      return {
        id: `act-${op.id}`,
        title: "Movimiento financiero",
        description: `${op.concept} · ${op.destinationAccount === "1041" ? "BBVA" : "Caja"}`,
        time: idx === 0 ? "Justo ahora" : `Fecha: ${op.date}`,
        amount: `S/ ${op.amount.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
        icon: BookOpen,
        iconColor: "text-blue-600 bg-blue-50",
      };
    }
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.04)] p-5 select-none">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900">Actividad reciente</h3>
        <Link
          href="/dashboard/auditoria"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>Ver todo</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-3.5">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${act.iconColor}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800 leading-tight truncate">
                    {act.title}
                  </p>
                  {act.amount && (
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      {act.amount}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {act.description}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{act.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
