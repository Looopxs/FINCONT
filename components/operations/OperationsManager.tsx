"use client";

import React, { useState } from "react";
import { useOperationsStore } from "@/lib/data/operations-store";
import { Operation, OperationType } from "@/types/operations";
import { OperationDetailModal } from "./OperationDetailModal";
import { NewOperationModal } from "@/components/dashboard/NewOperationModal";
import {
  Layers,
  Search,
  Plus,
  Receipt,
  ShoppingCart,
  ArrowLeftRight,
  Sparkles,
  CheckCircle2,
  Eye,
  Landmark,
  Building2,
  Filter,
} from "lucide-react";

export const OperationsManager: React.FC = () => {
  const { operations, addOperation } = useOperationsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [newOpModalOpen, setNewOpModalOpen] = useState(false);

  // Metrics
  const totalCount = operations.length;
  const totalVolume = operations.reduce((sum, o) => sum + o.amount, 0);
  const salesVolume = operations.filter((o) => o.type === "VENTA").reduce((sum, o) => sum + o.amount, 0);
  const purchaseVolume = operations.filter((o) => o.type === "COMPRA").reduce((sum, o) => sum + o.amount, 0);

  const handleOperationCreated = (newOp: any) => {
    addOperation({
      type: newOp.type === "Factura" || newOp.type === "Boleta" ? "VENTA" : "COMPRA",
      entityName: newOp.thirdParty,
      entityDocument: "20100070970",
      concept: newOp.description,
      amount: parseFloat(newOp.amount.replace("S/ ", "").replace(",", "")),
      destinationAccount: "1041",
    });
  };

  const filteredOperations = operations.filter((o) => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      o.operationNumber.toLowerCase().includes(q) ||
      o.entityName.toLowerCase().includes(q) ||
      o.concept.toLowerCase().includes(q);
    const matchType = typeFilter === "ALL" || o.type === typeFilter;
    return matchQuery && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Operaciones Contables</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-blue-50 text-blue-700">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Motor Activo
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprobante, banco, saldos y asientos en cascada automática
          </p>
        </div>

        <button
          onClick={() => setNewOpModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-blue-500/25 transition-all hover:shadow-md active:scale-95 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Operación</span>
        </button>
      </div>

      {/* 4 Financial Metric Cards (2x2 grid on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5 sm:space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate block">Total Operaciones</span>
          <p className="text-lg sm:text-2xl font-extrabold text-slate-900 font-mono">{totalCount}</p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 truncate block">100% sincronizadas</span>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5 sm:space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate block">Volumen Procesado</span>
          <p className="text-lg sm:text-2xl font-extrabold text-slate-900 font-mono">
            S/ {totalVolume.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600 truncate block">Flujo transaccional</span>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5 sm:space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate block">Ventas Registradas</span>
          <p className="text-lg sm:text-2xl font-extrabold text-emerald-600 font-mono">
            S/ {salesVolume.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 truncate block">Ingresos automáticos</span>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5 sm:space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate block">Compras Registradas</span>
          <p className="text-lg sm:text-2xl font-extrabold text-amber-600 font-mono">
            S/ {purchaseVolume.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-amber-600 truncate block">Egresos automáticos</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por N° Operación, cliente o concepto..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Tipo:</span>
          <div className="flex rounded-xl border border-slate-200 p-0.5 bg-slate-50 text-xs font-semibold whitespace-nowrap">
            {[
              { id: "ALL", label: "Todas" },
              { id: "VENTA", label: "Ventas" },
              { id: "COMPRA", label: "Compras" },
              { id: "TRANSFERENCIA", label: "Transferencias" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setTypeFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  typeFilter === f.id
                    ? "bg-white text-blue-600 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Operations Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px] bg-[#FAFBFD]">
                <th className="py-3 px-4 w-32">N° Operación</th>
                <th className="py-3 px-4 w-24">Fecha</th>
                <th className="py-3 px-4 w-28">Tipo</th>
                <th className="py-3 px-4">Tercero / Concepto</th>
                <th className="py-3 px-4">Cuenta Afectada</th>
                <th className="py-3 px-4 text-right">Monto Total</th>
                <th className="py-3 px-4 text-center">Automatización</th>
                <th className="py-3 px-4 text-center w-28">Trazabilidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredOperations.map((op) => {
                const isSale = op.type === "VENTA";
                const isPurchase = op.type === "COMPRA";

                return (
                  <tr key={op.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Operation Number */}
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600 whitespace-nowrap">
                      {op.operationNumber}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap font-mono">
                      {op.date}
                    </td>

                    {/* Type Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isSale
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : isPurchase
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        }`}
                      >
                        {isSale && <Receipt className="w-3 h-3" />}
                        {isPurchase && <ShoppingCart className="w-3 h-3" />}
                        {!isSale && !isPurchase && <ArrowLeftRight className="w-3 h-3" />}
                        {op.type}
                      </span>
                    </td>

                    {/* Entity & Concept */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{op.entityName}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-sm">{op.concept}</p>
                    </td>

                    {/* Destination Account */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        {op.destinationAccount === "1041" ? (
                          <Landmark className="w-3.5 h-3.5 text-blue-600" />
                        ) : (
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        )}
                        <span className="font-semibold">
                          {op.destinationAccount === "1041" ? "BBVA (1041)" : "Caja (101)"}
                        </span>
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      S/ {op.amount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                    </td>

                    {/* Automation Badge (Requirement 90) */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 shadow-2xs"
                        title="Esta operación generó automáticamente sus registros relacionados (Comprobante, Caja/Banco, Saldos y Asiento PCGE)"
                      >
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span>Automatizada</span>
                      </span>
                    </td>

                    {/* Action: 360 Traceability */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => setSelectedOperation(op)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/70 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detalle 360°</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 360 Traceability Modal */}
      <OperationDetailModal
        operation={selectedOperation}
        onClose={() => setSelectedOperation(null)}
      />

      {/* Global New Operation Modal */}
      <NewOperationModal
        isOpen={newOpModalOpen}
        onClose={() => setNewOpModalOpen(false)}
        onOperationCreated={handleOperationCreated}
      />
    </div>
  );
};
