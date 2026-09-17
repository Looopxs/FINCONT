"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  ArrowDownLeft,
  ShoppingCart,
  Receipt,
  ArrowLeftRight,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";
import { useOperationsStore } from "@/lib/data/operations-store";

export const RecentOperationsTable: React.FC = () => {
  const { operations } = useOperationsStore();
  const displayOps = operations.slice(0, 6);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.04)] p-5 sm:p-6 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Últimas operaciones</h3>
          <p className="text-xs text-slate-400">Trazabilidad en tiempo real de los registros</p>
        </div>
        <Link
          href="/dashboard/operaciones"
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          <span>Ver todas</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-5 sm:mx-0">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
              <th className="pb-3 px-3">Fecha</th>
              <th className="pb-3 px-3">Tipo</th>
              <th className="pb-3 px-3">Tercero</th>
              <th className="pb-3 px-3">Descripción</th>
              <th className="pb-3 px-3 text-right">Monto</th>
              <th className="pb-3 px-3 text-center">Estado</th>
              <th className="pb-3 px-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {displayOps.map((op) => {
              const isSale = op.type === "VENTA";
              const isPurchase = op.type === "COMPRA";
              const Icon = isSale ? FileText : isPurchase ? ShoppingCart : ArrowLeftRight;
              const typeColor = isSale
                ? "text-emerald-600 bg-emerald-50"
                : isPurchase
                ? "text-amber-600 bg-amber-50"
                : "text-blue-600 bg-blue-50";
              const typeLabel = isSale ? "Venta" : isPurchase ? "Compra" : "Transferencia";
              const statusStyle = op.status === "COMPLETADA"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-blue-50 text-blue-700 border-blue-200";

              return (
                <tr key={op.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{op.date}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${typeColor}`}>
                        <Icon className="w-3 h-3" />
                      </div>
                      <span className="font-semibold text-slate-700">{typeLabel}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap max-w-[140px] truncate">
                    {op.entityName}
                  </td>
                  <td className="py-3 px-3 text-slate-500 max-w-[200px] truncate">{op.concept}</td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900 font-mono whitespace-nowrap">
                    S/ {op.amount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusStyle}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {op.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <Link
                      href="/dashboard/operaciones"
                      className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 inline-block transition-colors"
                      title="Ver en operaciones"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
