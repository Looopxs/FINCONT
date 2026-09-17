"use client";

import React, { useState } from "react";
import {
  Receipt,
  Download,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  DollarSign,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useOperationsStore } from "@/lib/data/operations-store";
import { Operation } from "@/types/operations";
import { InvoiceModal } from "@/components/sales/InvoiceModal";
import { NewSaleModal } from "@/components/sales/NewSaleModal";
import { OperationDetailModal } from "@/components/operations/OperationDetailModal";
import { triggerFileDownload, generatePLE14_1 } from "@/lib/services/sunat-ple-service";

export default function VentasPage() {
  const { sales, addOperation } = useOperationsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedInvoiceOp, setSelectedInvoiceOp] = useState<Operation | null>(null);
  const [selectedTraceOp, setSelectedTraceOp] = useState<Operation | null>(null);
  const [newSaleModalOpen, setNewSaleModalOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  // Calculations
  const totalInvoiced = sales.reduce((sum, s) => sum + s.amount, 0);
  const totalSubtotal = sales.reduce((sum, s) => sum + (s.subtotal || s.amount / 1.18), 0);
  const totalIgv = sales.reduce((sum, s) => sum + (s.taxAmount || s.amount - (s.subtotal || s.amount / 1.18)), 0);
  const totalCollected = sales.filter((s) => s.status === "COMPLETADA").reduce((sum, s) => sum + s.amount, 0);

  const filteredSales = sales.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      s.entityName.toLowerCase().includes(q) ||
      (s.relatedInvoiceId && s.relatedInvoiceId.toLowerCase().includes(q)) ||
      s.concept.toLowerCase().includes(q) ||
      s.entityDocument.includes(q);

    return matchesQuery;
  });

  const handleCreateSale = (saleData: {
    clientName: string;
    clientDoc: string;
    concept: string;
    amount: number;
    destinationAccount: "101" | "1041";
    documentType: string;
  }) => {
    addOperation({
      type: "VENTA",
      entityName: saleData.clientName,
      entityDocument: saleData.clientDoc,
      concept: saleData.concept,
      amount: saleData.amount,
      destinationAccount: saleData.destinationAccount,
    });
  };

  const handleExportSunat = () => {
    const content = generatePLE14_1(sales);
    triggerFileDownload("LE2030405060120251200140100001111.TXT", content, "text/plain;charset=utf-8");
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Export notification */}
      {exportNotice && (
        <div className="p-3.5 bg-emerald-500 text-white rounded-2xl flex items-center justify-between text-xs font-semibold shadow-md animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              Registro de Ventas Electrónico PLE 14.1 SUNAT exportado con éxito (Estructura RUC 20304050601).
            </span>
          </div>
          <span className="text-[10px] bg-emerald-600 px-2 py-0.5 rounded-md font-mono">
            LE2030405060120251200140100001111.TXT
          </span>
        </div>
      )}

      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Registro de Ventas e Ingresos</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-blue-50 text-blue-700">
              SUNAT R.S. 112-2021
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Facturas, Boletas y Notas de Crédito con cálculo automático de IGV (18%)
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={handleExportSunat}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Exportar PLE SUNAT</span>
            <span className="sm:hidden">PLE</span>
          </button>
          <button
            onClick={() => setNewSaleModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/25 transition-all hover:shadow-md active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Venta</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metrics (2x2 grid on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5 sm:space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate block">Total Facturado Bruto</span>
          <p className="text-lg sm:text-2xl font-extrabold text-slate-900 font-mono">
            S/ {totalInvoiced.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 flex items-center gap-1 truncate">
            <TrendingUp className="w-3 h-3 shrink-0" /> +14.2% vs. mes ant.
          </span>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5 sm:space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate block">Base Neta (70121)</span>
          <p className="text-lg sm:text-2xl font-extrabold text-slate-900 font-mono">
            S/ {totalSubtotal.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 truncate block">Sin impuesto</span>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5 sm:space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate block">IGV Débito (40111)</span>
          <p className="text-lg sm:text-2xl font-extrabold text-blue-600 font-mono">
            S/ {totalIgv.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600 truncate block">Impuesto 18%</span>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5 sm:space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate block">Cobrado en Bancos</span>
          <p className="text-lg sm:text-2xl font-extrabold text-emerald-600 font-mono">
            S/ {totalCollected.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 truncate block">Liquidez disponible</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por comprobante, cliente o RUC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === "ALL"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Todas ({sales.length})
          </button>
          <button
            onClick={() => setStatusFilter("COBRADA")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === "COBRADA"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Cobradas
          </button>
        </div>
      </div>

      {/* Sales Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
              <th className="pb-3 px-3">Comprobante</th>
              <th className="pb-3 px-3">Fecha</th>
              <th className="pb-3 px-3">Cliente / Receptor</th>
              <th className="pb-3 px-3">RUC / DNI</th>
              <th className="pb-3 px-3 text-right">Base Imponible</th>
              <th className="pb-3 px-3 text-right">IGV (18%)</th>
              <th className="pb-3 px-3 text-right">Total (S/)</th>
              <th className="pb-3 px-3 text-center">Medio Pago</th>
              <th className="pb-3 px-3 text-center">Estado</th>
              <th className="pb-3 px-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredSales.map((s) => {
              const sub = s.subtotal || Math.round((s.amount / 1.18) * 100) / 100;
              const tax = s.taxAmount || Math.round((s.amount - sub) * 100) / 100;

              return (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-bold text-blue-600 font-mono">
                    {s.relatedInvoiceId || "F001-0014"}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">{s.date}</td>
                  <td className="py-3 px-3 text-slate-900 font-semibold max-w-[180px] truncate">
                    {s.entityName}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                    {s.entityDocument}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600 font-mono">
                    S/ {sub.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-right text-blue-600 font-mono font-semibold">
                    S/ {tax.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900 font-mono">
                    S/ {s.amount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 text-slate-700">
                      {s.destinationAccount === "1041" ? "BBVA (1041)" : "Caja (101)"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Cobrado
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-1">
                    <button
                      onClick={() => setSelectedInvoiceOp(s)}
                      title="Ver Factura Electrónica SUNAT"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors inline-flex"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedTraceOp(s)}
                      title="Ver Trazabilidad 360° y Asiento PCGE"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors inline-flex"
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

      {/* Invoice Modal */}
      <InvoiceModal
        operation={selectedInvoiceOp}
        onClose={() => setSelectedInvoiceOp(null)}
      />

      {/* Traceability 360 Modal */}
      <OperationDetailModal
        operation={selectedTraceOp}
        onClose={() => setSelectedTraceOp(null)}
      />

      {/* New Sale Modal */}
      <NewSaleModal
        isOpen={newSaleModalOpen}
        onClose={() => setNewSaleModalOpen(false)}
        onSubmit={handleCreateSale}
      />
    </div>
  );
}
