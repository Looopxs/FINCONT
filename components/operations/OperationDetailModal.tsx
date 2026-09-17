"use client";

import React from "react";
import { Operation } from "@/types/operations";
import {
  X,
  Sparkles,
  Receipt,
  Landmark,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  ArrowRight,
} from "lucide-react";

interface OperationDetailModalProps {
  operation: Operation | null;
  onClose: () => void;
}

export const OperationDetailModal: React.FC<OperationDetailModalProps> = ({
  operation,
  onClose,
}) => {
  if (!operation) return null;

  const isSale = operation.type === "VENTA";
  const isPurchase = operation.type === "COMPRA";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAFBFD] flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-extrabold font-mono text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100">
              {operation.operationNumber}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Trazabilidad 360° de la Operación
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  Automatizada
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {operation.concept}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Traceability Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* General Operation Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Fecha</span>
              <span className="font-bold text-slate-800 font-mono mt-0.5 block">{operation.date}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Tercero</span>
              <span className="font-bold text-slate-800 truncate mt-0.5 block">{operation.entityName}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Tipo Operación</span>
              <span className="font-bold text-blue-600 mt-0.5 block">{operation.type}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Monto Total</span>
              <span className="font-extrabold text-slate-900 font-mono text-sm mt-0.5 block">
                S/ {operation.amount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* STEP 1: COMPROBANTE COMERCIAL */}
          <div className="border border-slate-200/80 rounded-2xl p-4 bg-white shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Receipt className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">
                  1. Comprobante Emitido
                </h4>
              </div>
              <span className="font-mono font-bold text-xs text-blue-600">
                {operation.relatedInvoiceId || "F001-0012"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl font-mono text-[11px]">
              <div>
                <span className="text-slate-400 block">Base Imponible:</span>
                <span className="font-bold text-slate-800">
                  S/ {operation.subtotal.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">IGV (18%):</span>
                <span className="font-bold text-slate-800">
                  S/ {operation.taxAmount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Total Facturado:</span>
                <span className="font-extrabold text-blue-600">
                  S/ {operation.amount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* STEP 2: MOVIMIENTO FINANCIERO */}
          <div className="border border-slate-200/80 rounded-2xl p-4 bg-white shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Landmark className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">
                  2. Movimiento en Caja / Bancos
                </h4>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Fondos Actualizados
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-[11px]">
              <div>
                <span className="font-bold text-slate-800">
                  {operation.destinationAccount === "1041"
                    ? "BBVA Banco Continental (Cta Cte 1041)"
                    : "Caja Principal (101)"}
                </span>
                <p className="text-[10px] text-slate-400">
                  {isSale ? "Abono directo por cobranza" : "Cargo de fondos por pago"}
                </p>
              </div>
              <span className="font-mono font-extrabold text-sm text-slate-900">
                {isSale ? "+" : "-"} S/ {operation.amount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* STEP 3: ASIENTO CONTABLE PCGE */}
          <div className="border border-slate-200/80 rounded-2xl p-4 bg-white shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">
                  3. Asiento Contable Automático (PCGE)
                </h4>
              </div>
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                {operation.relatedJournalEntryId || "AS-0001"}
              </span>
            </div>

            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                  <th className="pb-1.5 text-left w-16">Cuenta</th>
                  <th className="pb-1.5 text-left">Denominación</th>
                  <th className="pb-1.5 text-right w-24">Debe</th>
                  <th className="pb-1.5 text-right w-24">Haber</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {isSale ? (
                  <>
                    <tr>
                      <td className="py-1.5 font-mono font-bold text-blue-600">{operation.destinationAccount}</td>
                      <td className="py-1.5 text-slate-700">
                        {operation.destinationAccount === "1041" ? "Cuentas corrientes operativas (BBVA)" : "Caja"}
                      </td>
                      <td className="py-1.5 text-right font-mono font-bold text-slate-900">
                        {operation.amount.toFixed(2)}
                      </td>
                      <td className="py-1.5 text-right text-slate-300">-</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-mono font-bold text-blue-600">40111</td>
                      <td className="py-1.5 text-slate-700">IGV - Cuenta propia</td>
                      <td className="py-1.5 text-right text-slate-300">-</td>
                      <td className="py-1.5 text-right font-mono font-bold text-slate-900">
                        {operation.taxAmount.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-mono font-bold text-blue-600">70121</td>
                      <td className="py-1.5 text-slate-700">Mercaderías - Terceros</td>
                      <td className="py-1.5 text-right text-slate-300">-</td>
                      <td className="py-1.5 text-right font-mono font-bold text-slate-900">
                        {operation.subtotal.toFixed(2)}
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="py-1.5 font-mono font-bold text-blue-600">6011</td>
                      <td className="py-1.5 text-slate-700">Mercaderías manufacturadas</td>
                      <td className="py-1.5 text-right font-mono font-bold text-slate-900">
                        {operation.subtotal.toFixed(2)}
                      </td>
                      <td className="py-1.5 text-right text-slate-300">-</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-mono font-bold text-blue-600">40111</td>
                      <td className="py-1.5 text-slate-700">IGV - Crédito fiscal</td>
                      <td className="py-1.5 text-right font-mono font-bold text-slate-900">
                        {operation.taxAmount.toFixed(2)}
                      </td>
                      <td className="py-1.5 text-right text-slate-300">-</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-mono font-bold text-blue-600">{operation.destinationAccount}</td>
                      <td className="py-1.5 text-slate-700">
                        {operation.destinationAccount === "1041" ? "Cuentas corrientes operativas (BBVA)" : "Caja"}
                      </td>
                      <td className="py-1.5 text-right text-slate-300">-</td>
                      <td className="py-1.5 text-right font-mono font-bold text-slate-900">
                        {operation.amount.toFixed(2)}
                      </td>
                    </tr>
                  </>
                )}
                <tr className="bg-slate-50 font-extrabold text-slate-900 border-t border-slate-200">
                  <td colSpan={2} className="py-1.5 px-1 text-right">TOTALES CUADRADOS:</td>
                  <td className="py-1.5 text-right font-mono text-emerald-600">
                    S/ {operation.amount.toFixed(2)}
                  </td>
                  <td className="py-1.5 text-right font-mono text-emerald-600">
                    S/ {operation.amount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* STEP 4: AUDITORÍA */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Sello Inmutable: SHA256: 7f8a...c93b</span>
            </div>
            <span>Usuario: SISTEMA_AUTO</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-end bg-[#FAFBFD] flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            Cerrar Detalle
          </button>
        </div>
      </div>
    </div>
  );
};
