"use client";

import React, { useState } from "react";
import {
  X,
  Plus,
  Receipt,
  ShoppingCart,
  ArrowLeftRight,
  Sparkles,
  CheckCircle2,
  FileCheck,
  Building2,
  Landmark,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { lookupPCGE } from "@/lib/pcge-service";

interface NewOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOperationCreated?: (op: any) => void;
}

export const NewOperationModal: React.FC<NewOperationModalProps> = ({
  isOpen,
  onClose,
  onOperationCreated,
}) => {
  const [opType, setOpType] = useState<"VENTA" | "COMPRA" | "TRANSFERENCIA">("VENTA");
  const [party, setParty] = useState("Distribuidora Lima S.A.C.");
  const [docType, setDocType] = useState("Factura");
  const [docNumber, setDocNumber] = useState("F001-0089");
  const [totalAmount, setTotalAmount] = useState("1180.00");
  const [paymentMethod, setPaymentMethod] = useState<"BBVA" | "CAJA" | "CREDITO">("BBVA");
  const [concept, setConcept] = useState("Venta de mercaderías al contado");
  const [pcgeCode, setPcgeCode] = useState("70121");

  // Simulation steps
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const matchedAccount = lookupPCGE(pcgeCode);

  if (!isOpen) return null;

  // Calculate IGV and Subtotal
  const numTotal = parseFloat(totalAmount) || 0;
  const subtotal = (numTotal / 1.18).toFixed(2);
  const igv = (numTotal - parseFloat(subtotal)).toFixed(2);

  const handleProcess = () => {
    setIsProcessing(true);
    setCurrentStep(1); // 1: Registrando operación

    setTimeout(() => setCurrentStep(2), 600); // 2: Comprobante generado
    setTimeout(() => setCurrentStep(3), 1200); // 3: Movimiento en banco
    setTimeout(() => setCurrentStep(4), 1800); // 4: Saldos recalculados
    setTimeout(() => setCurrentStep(5), 2400); // 5: Asiento PCGE creado

    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(0);
      if (onOperationCreated) {
        onOperationCreated({
          id: `op-${Date.now()}`,
          date: "Hoy",
          type: docType,
          thirdParty: party,
          description: concept,
          amount: `S/ ${parseFloat(totalAmount).toLocaleString("es-PE", { minimumFractionDigits: 2 })}`,
          status: "Procesado",
        });
      }
      onClose();
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAFCFF]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Registrar Nueva Operación</h3>
              <p className="text-xs text-slate-400">
                Una sola entrada desencadena todo el ciclo contable
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Processing State Overlay */}
        {isProcessing ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-600 flex items-center justify-center mx-auto text-blue-600 animate-pulse">
              <Sparkles className="w-8 h-8 animate-spin" />
            </div>

            <div>
              <h4 className="text-lg font-extrabold text-slate-900">
                Motor FINCONT Automatizando...
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Generando comprobante, libro caja, saldo bancario y asiento contable PCGE
              </p>
            </div>

            {/* Step list */}
            <div className="space-y-2.5 max-w-md mx-auto text-left">
              {[
                { id: 1, text: "Registrando operación en libro diario" },
                { id: 2, text: `Emisión de ${docType} ${docNumber}` },
                { id: 3, text: `Afectación a fondos (${paymentMethod === "BBVA" ? "Cta 1041 BBVA" : "Caja 101"})` },
                { id: 4, text: "Recálculo de balance y cuentas por cobrar/pagar" },
                { id: 5, text: "Asiento contable de partida doble generado (Debe = Haber)" },
              ].map((s) => (
                <div
                  key={s.id}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    currentStep >= s.id
                      ? "bg-emerald-50/80 border-emerald-200 text-emerald-800"
                      : "bg-slate-50 border-slate-100 text-slate-400"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                      currentStep >= s.id
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {currentStep >= s.id ? "✓" : s.id}
                  </div>
                  <span>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Form Content */
          <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Op Type selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Tipo de Operación
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "VENTA", label: "Venta / Ingreso", icon: Receipt },
                  { id: "COMPRA", label: "Compra / Gasto", icon: ShoppingCart },
                  { id: "TRANSFERENCIA", label: "Transferencia", icon: ArrowLeftRight },
                ].map((type) => {
                  const Icon = type.icon;
                  const isSel = opType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setOpType(type.id as any)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all ${
                        isSel
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Client / Supplier and Doc Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {opType === "VENTA" ? "Cliente" : opType === "COMPRA" ? "Proveedor" : "Origen / Destino"}
                </label>
                <input
                  type="text"
                  value={party}
                  onChange={(e) => setParty(e.target.value)}
                  placeholder="Razón Social o Nombre"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tipo y N° Comprobante
                </label>
                <div className="flex gap-2">
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option>Factura</option>
                    <option>Boleta</option>
                    <option>Recibo</option>
                    <option>Nota Débito</option>
                  </select>
                  <input
                    type="text"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Concept and Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Glosa / Descripción
                </label>
                <input
                  type="text"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  placeholder="Detalle de la operación"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Monto Total (S/)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    S/
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* PCGE ACCOUNT INPUT WITH INSTANT AUTO-FILL */}
            <div className="p-3.5 bg-[#FAFBFD] rounded-2xl border border-slate-200/90 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Código PCGE (Autorrellenado Automático)</span>
                </label>
                <span className="text-[10px] text-slate-400 font-medium">1,782 Cuentas</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={pcgeCode}
                  onChange={(e) => setPcgeCode(e.target.value)}
                  placeholder="Ej: 70121, 6011, 1041"
                  className="w-28 px-3 py-2 rounded-xl border border-blue-200 bg-white font-mono font-bold text-xs text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                  {matchedAccount ? (
                    <>
                      <span className="font-semibold text-slate-800 truncate">
                        {matchedAccount.name}
                      </span>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                          {matchedAccount.type}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                          {matchedAccount.nature}
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-slate-400 italic">Código no encontrado en catálogo</span>
                  )}
                </div>
              </div>
            </div>

            {/* Auto IGV Breakdown Pill */}
            <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 flex items-center justify-between text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-bold">Desglose Fiscal SUNAT:</span>
                <span>Base: S/ {subtotal}</span>
                <span>+</span>
                <span>IGV (18%): S/ {igv}</span>
              </div>
              <span className="font-extrabold text-blue-700 font-mono">Total S/ {numTotal.toFixed(2)}</span>
            </div>

            {/* Destination Account / Payment method */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Medio de Pago / Cuenta Afectada
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "BBVA", label: "BBVA Contes (1041)", icon: Landmark },
                  { id: "CAJA", label: "Caja Chica (101)", icon: Building2 },
                  { id: "CREDITO", label: "A Crédito (Pendiente)", icon: FileCheck },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSel = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        isSel
                          ? "bg-blue-50 text-blue-700 border-blue-400 shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-blue-600" />
                      <span className="truncate">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleProcess}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/35"
              >
                <Sparkles className="w-4 h-4" />
                <span>Registrar y Automatizar Operación</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
