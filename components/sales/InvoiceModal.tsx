"use client";

import React from "react";
import { Operation } from "@/types/operations";
import { X, Printer, Download, CheckCircle2, ShieldCheck, FileText, QrCode } from "lucide-react";

interface InvoiceModalProps {
  operation: Operation | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ operation, onClose }) => {
  if (!operation) return null;

  const docNumber = operation.relatedInvoiceId || "F001-0014";
  const subtotal = operation.subtotal || Math.round((operation.amount / 1.18) * 100) / 100;
  const igv = operation.taxAmount || Math.round((operation.amount - subtotal) * 100) / 100;
  const total = operation.amount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700">Comprobante Electrónico SUNAT</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              CDR: Aceptada
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable View */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 text-xs font-sans">
          {/* Company & Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                  FC
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900 leading-none">LIBERTAD S.A.</h2>
                  <span className="text-[11px] text-slate-500 font-medium">FINCONT - tu cuenta al día</span>
                </div>
              </div>
              <div className="mt-3 text-slate-500 space-y-0.5 text-[11px]">
                <p>Calle Industrial 2429 - Zona Industrial, Trujillo</p>
                <p>Teléfono: +51 (044) 284-920 • Email: facturacion@libertad.pe</p>
                <p>Actividad: Comercialización y Distribución Mayorista</p>
              </div>
            </div>

            {/* Official Tax Box */}
            <div className="border-2 border-blue-600 rounded-2xl p-4 text-center min-w-[210px] bg-blue-50/20">
              <span className="font-mono font-bold text-xs text-slate-700 block">RUC: 20304050601</span>
              <span className="font-extrabold text-sm text-blue-900 block my-1">
                FACTURA ELECTRÓNICA
              </span>
              <span className="font-mono font-black text-base text-blue-600 block">
                N° {docNumber}
              </span>
            </div>
          </div>

          {/* Client & Date Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Cliente / Receptor</span>
              <p className="font-bold text-slate-900 text-sm">{operation.entityName}</p>
              <p className="font-mono text-slate-600">RUC: {operation.entityDocument}</p>
              <p className="text-slate-500">Dirección: Av. Principal 1024, Trujillo, Perú</p>
            </div>
            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Datos de Emisión</span>
              <p className="text-slate-700"><span className="font-semibold">Fecha Emisión:</span> {operation.date}</p>
              <p className="text-slate-700"><span className="font-semibold">Moneda:</span> SOLES (S/)</p>
              <p className="text-slate-700"><span className="font-semibold">Forma de Pago:</span> Contado / Depósito en Cuenta</p>
              <p className="text-slate-700 font-mono text-[11px]"><span className="font-semibold">Banco:</span> BBVA Cta Cte M.N. 1041</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-600 font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 w-12 text-center">Cant.</th>
                  <th className="py-2.5 px-3">Descripción</th>
                  <th className="py-2.5 px-3 text-right w-24">V. Unitario</th>
                  <th className="py-2.5 px-3 text-right w-28">Importe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="py-3 px-3 text-center text-slate-600">1.00</td>
                  <td className="py-3 px-3 text-slate-900 font-medium">
                    {operation.concept}
                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      Catálogo SUNAT: 43231500 - Servicios y Productos Contables Empresariales
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700">
                    S/ {subtotal.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    S/ {subtotal.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals and QR Section */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 pt-2">
            <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <div className="w-16 h-16 bg-white p-1 rounded-xl border border-slate-200 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded flex items-center justify-center text-white">
                  <span className="text-[9px] font-black text-center font-mono">QR<br/>SUNAT</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 space-y-0.5 max-w-[240px]">
                <p className="font-bold text-slate-700">Representación Impresa de Factura Electrónica</p>
                <p>Consulte su validez en www.sunat.gob.pe</p>
                <p className="font-mono text-[9px] text-slate-400 truncate">Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4</p>
              </div>
            </div>

            {/* Total Summary */}
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Operaciones Gravadas:</span>
                <span className="font-mono font-semibold">S/ {subtotal.toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>I.G.V. (18.00%):</span>
                <span className="font-mono font-semibold">S/ {igv.toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-blue-600 pt-2 border-t border-slate-200">
                <span>Importe Total:</span>
                <span className="font-mono">S/ {total.toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
