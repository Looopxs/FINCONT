"use client";

import React, { useState } from "react";
import { X, Sparkles, Receipt, CheckCircle2, Building2, CreditCard } from "lucide-react";
import { INITIAL_CLIENTS } from "@/lib/data/directory-store";

interface NewSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (saleData: {
    clientName: string;
    clientDoc: string;
    concept: string;
    amount: number;
    destinationAccount: "101" | "1041";
    documentType: string;
  }) => void;
}

export const NewSaleModal: React.FC<NewSaleModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [clientIndex, setClientIndex] = useState(0);
  const [concept, setConcept] = useState("Venta de mercaderías según Factura Electrónica");
  const [totalAmount, setTotalAmount] = useState("11800");
  const [destinationAccount, setDestinationAccount] = useState<"101" | "1041">("1041");
  const [docType, setDocType] = useState("Factura F001");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalNum = parseFloat(totalAmount) || 0;
  const subtotal = Math.round((totalNum / 1.18) * 100) / 100;
  const igv = Math.round((totalNum - subtotal) * 100) / 100;

  const selectedClient = INITIAL_CLIENTS[clientIndex] || INITIAL_CLIENTS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalNum <= 0) return;

    setSubmitting(true);
    setTimeout(() => {
      onSubmit({
        clientName: selectedClient.name,
        clientDoc: selectedClient.docNumber,
        concept,
        amount: totalNum,
        destinationAccount,
        documentType: docType,
      });
      setSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-blue-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Emitir Nueva Venta</h3>
              <p className="text-[11px] text-slate-500">
                Calcula IGV (18%), afecta Bancos/Caja y genera asiento PCGE
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Client select */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Cliente Receptor</label>
            <select
              value={clientIndex}
              onChange={(e) => setClientIndex(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-hidden focus:border-blue-500"
            >
              {INITIAL_CLIENTS.map((c, idx) => (
                <option key={c.id} value={idx}>
                  {c.name} ({c.docType}: {c.docNumber})
                </option>
              ))}
            </select>
          </div>

          {/* Doc Type & Payment Destination */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tipo Comprobante</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-hidden focus:border-blue-500"
              >
                <option value="Factura F001">Factura Electrónica (F001)</option>
                <option value="Boleta B001">Boleta de Venta (B001)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Cuenta de Abono</label>
              <select
                value={destinationAccount}
                onChange={(e) => setDestinationAccount(e.target.value as "101" | "1041")}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-hidden focus:border-blue-500"
              >
                <option value="1041">BBVA Continental (1041)</option>
                <option value="101">Caja Principal Efectivo (101)</option>
              </select>
            </div>
          </div>

          {/* Concept */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Concepto / Glosa</label>
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:border-blue-500"
              placeholder="Ej. Venta de mercaderías al contado"
            />
          </div>

          {/* Amount input */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Importe Total con IGV (S/)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 font-bold text-slate-400">S/</span>
              <input
                type="number"
                step="0.01"
                min="1"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-mono font-bold text-slate-900 focus:outline-hidden focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Dynamic Automatic Breakdown & PCGE Preview */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Base Imponible (70121):</span>
              <span className="font-mono font-bold text-slate-800">
                S/ {subtotal.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">IGV 18% Débito Fiscal (40111):</span>
              <span className="font-mono font-bold text-blue-600">
                S/ {igv.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-slate-200">
              <span className="text-slate-800">Total Ingreso ({destinationAccount}):</span>
              <span className="font-mono text-emerald-600">
                S/ {totalNum.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Automation indicator */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 text-blue-800 text-[11px]">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>FINCONT Cascada:</strong> Afectará la cuenta {destinationAccount === "1041" ? "BBVA" : "Caja"}, generará asiento doble partida (1041 Debe = 40111/70121 Haber).
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm shadow-blue-500/20 transition-all disabled:opacity-50"
            >
              {submitting ? "Emitiendo..." : "Emitir Comprobante"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
