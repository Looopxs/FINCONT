"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

export const UpcomingDue: React.FC = () => {
  const items = [
    {
      id: "due-1",
      name: "TechNova S.A.",
      type: "Factura por pagar",
      date: "En 2 días (18 Mar)",
      amount: "S/ 4,850",
      urgency: "urgent",
      urgencyLabel: "Crítico",
      urgencyStyle: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      id: "due-2",
      name: "Impuesto SUNAT - IGV",
      type: "Declaración mensual",
      date: "En 5 días (21 Mar)",
      amount: "S/ 3,858",
      urgency: "warning",
      urgencyLabel: "Próximo",
      urgencyStyle: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "due-3",
      name: "Nómina colaboradores",
      type: "Planilla quincenal",
      date: "En 8 días (24 Mar)",
      amount: "S/ 9,372",
      urgency: "normal",
      urgencyLabel: "Programado",
      urgencyStyle: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: "due-4",
      name: "Cliente Andina S.A.",
      type: "Cobranza pendiente",
      date: "En 12 días (28 Mar)",
      amount: "S/ 12,500",
      urgency: "normal",
      urgencyLabel: "Por cobrar",
      urgencyStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.04)] p-5 select-none space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">Próximos vencimientos</h3>
        <Link
          href="/dashboard/compras"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>Calendario</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-white transition-all group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                {item.name}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.urgencyStyle}`}
              >
                {item.urgencyLabel}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">{item.type}</p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{item.date}</span>
              </div>
              <span className="text-xs font-extrabold text-slate-900 font-mono">
                {item.amount}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance / Auto-reconciliation Alert */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900 leading-tight">
            Conciliación Bancaria al 100%
          </p>
          <p className="text-[10px] text-slate-600 mt-0.5">
            0 descalces entre Libro Caja y extractos BBVA.
          </p>
        </div>
      </div>
    </div>
  );
};
