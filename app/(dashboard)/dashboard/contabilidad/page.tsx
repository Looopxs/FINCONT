"use client";

import React, { useState } from "react";
import { PlanContableAutoFill } from "@/components/accounting/PlanContableAutoFill";
import { BookOpen, CheckCircle2, Sparkles, FileSpreadsheet } from "lucide-react";

export default function ContabilidadPage() {
  const [activeTab, setActiveTab] = useState<"pcge" | "asientos">("pcge");

  const entries = [
    {
      num: "AS-0001",
      date: "01/12/2025",
      glosa: "Por la venta de mercaderías según Factura F001-0012",
      lines: [
        { code: "1212", desc: "Emitidas en cartera", debe: "11,800.00", haber: "-" },
        { code: "40111", desc: "IGV - Cuenta propia", debe: "-", haber: "1,800.00" },
        { code: "70121", desc: "Mercaderías - Terceros", debe: "-", haber: "10,000.00" },
      ],
      totalDebe: "11,800.00",
      totalHaber: "11,800.00",
    },
    {
      num: "AS-0002",
      date: "01/12/2025",
      glosa: "Por el cobro en cuenta corriente BBVA de Factura F001-0012",
      lines: [
        { code: "1041", desc: "Cuentas corrientes operativas (BBVA)", debe: "11,800.00", haber: "-" },
        { code: "1212", desc: "Emitidas en cartera", debe: "-", haber: "11,800.00" },
      ],
      totalDebe: "11,800.00",
      totalHaber: "11,800.00",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Módulo Contable PCGE</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Detección Automática Activa
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Coloca el código contable y obtén el autorrellenado automático de denominación y clasificación
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-2xl shadow-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("pcge")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "pcge"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autorrellenado por Código</span>
          </button>
          <button
            onClick={() => setActiveTab("asientos")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "asientos"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Libro Diario / Asientos</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "pcge" ? (
        <PlanContableAutoFill />
      ) : (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Partida Doble Cuadrada (Debe = Haber)
            </span>
          </div>

          {entries.map((entry) => (
            <div
              key={entry.num}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">
                    {entry.num}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{entry.glosa}</span>
                </div>
                <span className="text-xs text-slate-400">{entry.date}</span>
              </div>

              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 font-semibold text-[11px] border-b border-slate-100">
                    <th className="py-2 text-left w-20">Cuenta</th>
                    <th className="py-2 text-left">Denominación PCGE</th>
                    <th className="py-2 text-right w-28">Debe (S/)</th>
                    <th className="py-2 text-right w-28">Haber (S/)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium">
                  {entry.lines.map((line, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2 font-mono font-bold text-blue-600">{line.code}</td>
                      <td className="py-2 text-slate-700">{line.desc}</td>
                      <td className="py-2 text-right font-mono text-slate-900">{line.debe}</td>
                      <td className="py-2 text-right font-mono text-slate-900">{line.haber}</td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-slate-50/80 text-slate-900 border-t border-slate-200">
                    <td colSpan={2} className="py-2 px-2 text-right">
                      TOTALES CUADRADOS:
                    </td>
                    <td className="py-2 text-right font-mono text-emerald-700">
                      S/ {entry.totalDebe}
                    </td>
                    <td className="py-2 text-right font-mono text-emerald-700">
                      S/ {entry.totalHaber}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
