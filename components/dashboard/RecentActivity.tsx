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

export const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: "act-1",
      title: "Factura emitida",
      description: "FAC-0023 · Cliente Andina S.A.",
      time: "Hace 12 min",
      amount: "S/ 12,500",
      icon: FileText,
      iconColor: "text-emerald-600 bg-emerald-50",
    },
    {
      id: "act-2",
      title: "Pago recibido",
      description: "Abono en BBVA · Comercial Delta",
      time: "Hace 25 min",
      amount: "S/ 8,320",
      icon: CreditCard,
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      id: "act-3",
      title: "Asiento contable generado",
      description: "Asiento autom. AS-0042 (PCGE 1212/7012)",
      time: "Hace 1 hora",
      amount: null,
      icon: BookOpen,
      iconColor: "text-indigo-600 bg-indigo-50",
    },
    {
      id: "act-4",
      title: "Nuevo cliente registrado",
      description: "Distribuidora Lima S.A.C.",
      time: "Hace 2 horas",
      amount: null,
      icon: UserPlus,
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      id: "act-5",
      title: "Comprobante generado",
      description: "BOL-0089 · Venta mostrador",
      time: "Hace 3 horas",
      amount: "S/ 1,180",
      icon: Receipt,
      iconColor: "text-teal-600 bg-teal-50",
    },
  ];

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
