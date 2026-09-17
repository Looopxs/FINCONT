"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Download,
  Plus,
  Search,
  CheckCircle2,
  Eye,
  TrendingDown,
  Building2,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { useOperationsStore } from "@/lib/data/operations-store";
import { Operation } from "@/types/operations";
import { NewPurchaseModal } from "@/components/purchases/NewPurchaseModal";
import { OperationDetailModal } from "@/components/operations/OperationDetailModal";
import { triggerFileDownload, generatePLE8_1 } from "@/lib/services/sunat-ple-service";

export default function ComprasPage() {
  const { purchases, addOperation } = useOperationsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedTraceOp, setSelectedTraceOp] = useState<Operation | null>(null);
  const [newPurchaseModalOpen, setNewPurchaseModalOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  // Calculations
  const totalPurchases = purchases.reduce((sum, p) => sum + p.amount, 0);
  const totalSubtotal = purchases.reduce((sum, p) => sum + (p.subtotal || p.amount / 1.18), 0);
  const totalCreditIgv = purchases.reduce((sum, p) => sum + (p.taxAmount || p.amount - (p.subtotal || p.amount / 1.18)), 0);
  const totalPaid = purchases.filter((p) => p.status === "COMPLETADA").reduce((sum, p) => sum + p.amount, 0);

  const filteredPurchases = purchases.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      p.entityName.toLowerCase().includes(q) ||
      (p.relatedInvoiceId && p.relatedInvoiceId.toLowerCase().includes(q)) ||
      p.concept.toLowerCase().includes(q) ||
      p.entityDocument.includes(q);

    return matchesQuery;
  });

  const handleCreatePurchase = (purchaseData: {
    supplierName: string;
    supplierRuc: string;
    concept: string;
    amount: number;
    destinationAccount: "101" | "1041";
    pcgeCode: string;
    voucherNumber: string;
  }) => {
    addOperation({
      type: "COMPRA",
      entityName: purchaseData.supplierName,
      entityDocument: purchaseData.supplierRuc,
      concept: purchaseData.concept,
      amount: purchaseData.amount,
      destinationAccount: purchaseData.destinationAccount,
      customPCGECode: purchaseData.pcgeCode,
    });
  };

  const handleExportSunat = () => {
    const content = generatePLE8_1(purchases);
    triggerFileDownload("LE2030405060120251200080100001111.TXT", content, "text/plain;charset=utf-8");
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Export notification */}
      {exportNotice && (
        <div className="p-3.5 bg-amber-600 text-white rounded-2xl flex items-center justify-between text-xs font-semibold shadow-md animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              Registro de Compras Electrónico PLE 8.1 SUNAT exportado con éxito (Estructura RUC 20304050601).
            </span>
          </div>
          <span className="text-[10px] bg-amber-700 px-2 py-0.5 rounded-md font-mono">
            LE2030405060120251200080100001111.TXT
          </span>
        </div>
      )}

      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Registro de Compras y Gastos</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
              Crédito Fiscal SUNAT
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Control de cuentas por pagar a proveedores y crédito fiscal IGV (6011 - 40111 - 4212 / 1041)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportSunat}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Exportar PLE SUNAT</span>
          </button>
          <button
            onClick={() => setNewPurchaseModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm shadow-amber-500/25 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Compra</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">Total Compras del Mes</span>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">
            S/ {totalPurchases.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] font-semibold text-slate-500">Total egresos devengados</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">Base Imponible Gastos (60/63/65)</span>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">
            S/ {totalSubtotal.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] font-semibold text-slate-500">Costo neto de adquisición</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">Crédito Fiscal IGV (40111)</span>
          <p className="text-2xl font-extrabold text-amber-600 font-mono">
            S/ {totalCreditIgv.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] font-semibold text-amber-600">Deducción de IGV a favor</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">Desembolsado en Bancos/Caja</span>
          <p className="text-2xl font-extrabold text-rose-600 font-mono">
            S/ {totalPaid.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] font-semibold text-emerald-600">Proveedores al día</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por comprobante, proveedor o RUC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === "ALL"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Todas ({purchases.length})
          </button>
          <button
            onClick={() => setStatusFilter("PAGADA")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === "PAGADA"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Pagadas
          </button>
        </div>
      </div>

      {/* Purchases Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
              <th className="pb-3 px-3">Comprobante</th>
              <th className="pb-3 px-3">Fecha</th>
              <th className="pb-3 px-3">Proveedor</th>
              <th className="pb-3 px-3">RUC</th>
              <th className="pb-3 px-3">Concepto</th>
              <th className="pb-3 px-3 text-right">Base Imponible</th>
              <th className="pb-3 px-3 text-right">Crédito Fiscal</th>
              <th className="pb-3 px-3 text-right">Total (S/)</th>
              <th className="pb-3 px-3 text-center">Medio Pago</th>
              <th className="pb-3 px-3 text-center">Estado</th>
              <th className="pb-3 px-3 text-right">Trazabilidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredPurchases.map((p) => {
              const sub = p.subtotal || Math.round((p.amount / 1.18) * 100) / 100;
              const tax = p.taxAmount || Math.round((p.amount - sub) * 100) / 100;

              return (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-bold text-amber-600 font-mono">
                    {p.relatedInvoiceId || "F001-0890"}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">{p.date}</td>
                  <td className="py-3 px-3 text-slate-900 font-semibold max-w-[180px] truncate">
                    {p.entityName}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                    {p.entityDocument}
                  </td>
                  <td className="py-3 px-3 text-slate-600 max-w-[200px] truncate text-[11px]">
                    {p.concept}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600 font-mono">
                    S/ {sub.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-right text-amber-600 font-mono font-semibold">
                    S/ {tax.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900 font-mono">
                    S/ {p.amount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 text-slate-700">
                      {p.destinationAccount === "1041" ? "BBVA (1041)" : "Caja (101)"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Pagado
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedTraceOp(p)}
                      title="Ver Trazabilidad 360° y Asiento PCGE"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors inline-flex"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Traceability 360 Modal */}
      <OperationDetailModal
        operation={selectedTraceOp}
        onClose={() => setSelectedTraceOp(null)}
      />

      {/* New Purchase Modal */}
      <NewPurchaseModal
        isOpen={newPurchaseModalOpen}
        onClose={() => setNewPurchaseModalOpen(false)}
        onSubmit={handleCreatePurchase}
      />
    </div>
  );
}
