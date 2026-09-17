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

export const RecentOperationsTable: React.FC = () => {
  const operations = [
    {
      id: "op-1",
      date: "15 Mar 2024",
      type: "Factura",
      typeColor: "text-emerald-600 bg-emerald-50",
      typeIcon: FileText,
      thirdParty: "Cliente Andina S.A.",
      description: "Venta de servicios",
      amount: "S/ 12,500.00",
      status: "Emitida",
      statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "op-2",
      date: "14 Mar 2024",
      type: "Pago",
      typeColor: "text-blue-600 bg-blue-50",
      typeIcon: ArrowDownLeft,
      thirdParty: "Comercial Delta",
      description: "Pago de factura FAC-0012",
      amount: "S/ 8,320.00",
      status: "Registrado",
      statusStyle: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: "op-3",
      date: "13 Mar 2024",
      type: "Compra",
      typeColor: "text-amber-600 bg-amber-50",
      typeIcon: ShoppingCart,
      thirdParty: "TechNova S.A.",
      description: "Compra de equipos",
      amount: "S/ 4,850.00",
      status: "Registrado",
      statusStyle: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: "op-4",
      date: "12 Mar 2024",
      type: "Nota crédito",
      typeColor: "text-rose-600 bg-rose-50",
      typeIcon: Receipt,
      thirdParty: "Cliente Global",
      description: "Ajuste de facturación",
      amount: "S/ 2,180.00",
      status: "Aplicada",
      statusStyle: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: "op-5",
      date: "11 Mar 2024",
      type: "Transferencia",
      typeColor: "text-indigo-600 bg-indigo-50",
      typeIcon: ArrowLeftRight,
      thirdParty: "Banco Nacional",
      description: "Transferencia entre cuentas",
      amount: "S/ 15,000.00",
      status: "Completada",
      statusStyle: "bg-teal-50 text-teal-700 border-teal-200",
    },
    {
      id: "op-6",
      date: "04 Dic 2025",
      type: "Factura",
      typeColor: "text-emerald-600 bg-emerald-50",
      typeIcon: FileText,
      thirdParty: "Fernández E.I.R.L.",
      description: "Venta de mercaderías (Excel Cta 70121)",
      amount: "S/ 52,864.00",
      status: "Emitida",
      statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

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
            {operations.map((op) => {
              const Icon = op.typeIcon;
              return (
                <tr key={op.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{op.date}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${op.typeColor}`}>
                        <Icon className="w-3 h-3" />
                      </div>
                      <span className="font-semibold text-slate-700">{op.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">
                    {op.thirdParty}
                  </td>
                  <td className="py-3 px-3 text-slate-500">{op.description}</td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900 font-mono whitespace-nowrap">
                    {op.amount}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${op.statusStyle}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {op.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      aria-label="Acciones"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
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
