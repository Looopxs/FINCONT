"use client";

import React, { useState } from "react";
import { X, Sparkles, ShoppingCart, CheckCircle2, Building2 } from "lucide-react";
import { INITIAL_SUPPLIERS } from "@/lib/data/directory-store";

interface NewPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (purchaseData: {
    supplierName: string;
    supplierRuc: string;
    concept: string;
    amount: number;
    destinationAccount: "101" | "1041";
    pcgeCode: string;
    voucherNumber: string;
  }) => void;
}

export const NewPurchaseModal: React.FC<NewPurchaseModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [supplierIndex, setSupplierIndex] = useState(0);
  const [concept, setConcept] = useState("Compra de mercaderías e insumos operativos");
  const [voucherNumber, setVoucherNumber] = useState("F001-0890");
  const [totalAmount, setTotalAmount] = useState("17700");
  const [destinationAccount, setDestinationAccount] = useState<"101" | "1041">("1041");
  const [pcgeCode, setPcgeCode] = useState("6011");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalNum = parseFloat(totalAmount) || 0;
  const subtotal = Math.round((totalNum / 1.18) * 100) / 100;
  const igv = Math.round((totalNum - subtotal) * 100) / 100;

  const selectedSupplier = INITIAL_SUPPLIERS[supplierIndex] || INITIAL_SUPPLIERS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalNum <= 0) return;

    setSubmitting(true);
    setTimeout(() => {
      onSubmit({
        supplierName: selectedSupplier.name,
        supplierRuc: selectedSupplier.ruc,
        concept: `${concept} (${voucherNumber})`,
        amount: totalNum,
        destinationAccount,
        pcgeCode,
        voucherNumber,
      });
      setSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-amber-50/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Registrar Nueva Compra / Gasto</h3>
              <p className="text-[11px] text-slate-500">
                Crédito fiscal IGV (18%), egreso de fondos y asiento PCGE automático
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
          {/* Supplier select */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Proveedor</label>
            <select
              value={supplierIndex}
              onChange={(e) => setSupplierIndex(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-hidden focus:border-amber-500"
            >
              {INITIAL_SUPPLIERS.map((s, idx) => (
                <option key={s.id} value={idx}>
                  {s.name} (RUC: {s.ruc})
                </option>
              ))}
            </select>
          </div>

          {/* Doc Number & PCGE Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">N° Factura Proveedor</label>
              <input
                type="text"
                value={voucherNumber}
                onChange={(e) => setVoucherNumber(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-mono text-slate-800 focus:outline-hidden focus:border-amber-500"
                placeholder="F001-0890"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Cuenta de Gasto PCGE</label>
              <select
                value={pcgeCode}
                onChange={(e) => setPcgeCode(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-mono text-slate-800 focus:outline-hidden focus:border-amber-500"
              >
                <option value="6011">6011 - Mercaderías manufacturadas</option>
                <option value="6311">6311 - Transporte y fletes</option>
                <option value="6321">6321 - Asesoría contable / legal</option>
                <option value="656">656 - Suministros diversos</option>
                <option value="3351">3351 - Muebles y enseres (Activo)</option>
              </select>
            </div>
          </div>

          {/* Account to pay */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Medio de Pago / Cuenta</label>
            <select
              value={destinationAccount}
              onChange={(e) => setDestinationAccount(e.target.value as "101" | "1041")}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-hidden focus:border-amber-500"
            >
              <option value="1041">BBVA Banco Continental (1041) - Transferencia</option>
              <option value="101">Caja Principal Efectivo (101)</option>
            </select>
          </div>

          {/* Concept */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Concepto / Glosa</label>
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:border-amber-500"
              placeholder="Compra de suministros e insumos"
            />
          </div>

          {/* Amount */}
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
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-mono font-bold text-slate-900 focus:outline-hidden focus:border-amber-500 text-sm"
              />
            </div>
          </div>

          {/* PCGE Breakdown */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Base Gasto / Compra ({pcgeCode}) [Debe]:</span>
              <span className="font-mono font-bold text-slate-800">
                S/ {subtotal.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Crédito Fiscal IGV 18% (40111) [Debe]:</span>
              <span className="font-mono font-bold text-amber-600">
                S/ {igv.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-slate-200">
              <span className="text-slate-800">Salida de Fondos ({destinationAccount}) [Haber]:</span>
              <span className="font-mono text-rose-600">
                S/ {totalNum.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Automation indicator */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 text-amber-900 text-[11px]">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>FINCONT Cascada:</strong> Afectará el saldo de {destinationAccount === "1041" ? "BBVA" : "Caja"} y cuadrará la partida doble automáticamente.
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
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-sm shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              {submitting ? "Registrando..." : "Registrar Compra"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
