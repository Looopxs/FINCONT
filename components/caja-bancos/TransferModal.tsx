"use client";

import React, { useState } from "react";
import { X, ArrowLeftRight, Landmark, Sparkles, Building2 } from "lucide-react";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    fromAccount: "101" | "1041";
    toAccount: "101" | "1041";
    amount: number;
    concept: string;
  }) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [fromAccount, setFromAccount] = useState<"101" | "1041">("1041");
  const [toAccount, setToAccount] = useState<"101" | "1041">("101");
  const [amount, setAmount] = useState("5000");
  const [concept, setConcept] = useState("Reposición de fondo fijo de Caja Chica desde BBVA");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const numAmount = parseFloat(amount) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount <= 0) return;

    setSubmitting(true);
    setTimeout(() => {
      onSubmit({
        fromAccount,
        toAccount,
        amount: numAmount,
        concept,
      });
      setSubmitting(false);
      onClose();
    }, 400);
  };

  const handleSwitch = () => {
    const prevFrom = fromAccount;
    setFromAccount(toAccount);
    setToAccount(prevFrom);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Transferencia entre Cuentas</h3>
              <p className="text-[11px] text-slate-500">
                Movimiento interno sin efecto en resultados ni IGV
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3 items-center relative">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Cuenta Origen (Sale)</label>
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-slate-800 font-semibold text-center">
                {fromAccount === "1041" ? "BBVA (1041)" : "Caja (101)"}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSwitch}
              title="Invertir dirección"
              className="absolute left-1/2 top-7 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center hover:bg-slate-50 text-slate-600"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Cuenta Destino (Entra)</label>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-slate-800 font-semibold text-center">
                {toAccount === "1041" ? "BBVA (1041)" : "Caja (101)"}
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Concepto / Glosa</label>
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Importe a Transferir (S/)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 font-bold text-slate-400">S/</span>
              <input
                type="number"
                step="0.01"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-mono font-bold text-slate-900 focus:outline-hidden focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1 font-mono">
            <div className="flex justify-between">
              <span>Debe: Cuenta {toAccount}</span>
              <span>+ S/ {numAmount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>Haber: Cuenta {fromAccount}</span>
              <span>- S/ {numAmount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

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
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-sm shadow-indigo-500/20 transition-all disabled:opacity-50"
            >
              {submitting ? "Transferyendo..." : "Ejecutar Transferencia"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
