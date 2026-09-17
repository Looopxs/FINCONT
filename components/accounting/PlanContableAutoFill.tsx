"use client";

import React, { useState, useEffect } from "react";
import { lookupPCGE, PCGEEntry } from "@/lib/pcge-service";
import {
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  Check,
  BookOpen,
} from "lucide-react";

interface AsientoLineItem {
  id: string;
  code: string;
  name: string;
  type: string;
  nature: string;
  debit: string;
  credit: string;
}

export const PlanContableAutoFill: React.FC = () => {
  // 1. Single Code Auto-fill Demo state
  const [inputCode, setInputCode] = useState("1041");
  const [matchedAccount, setMatchedAccount] = useState<PCGEEntry | null>(null);

  // 2. Interactive Auto-filling Journal Entry state
  const [entryLines, setEntryLines] = useState<AsientoLineItem[]>([
    {
      id: "line-1",
      code: "1212",
      name: "Emitidas en cartera",
      type: "ACTIVO",
      nature: "DEUDORA",
      debit: "1180.00",
      credit: "0.00",
    },
    {
      id: "line-2",
      code: "40111",
      name: "IGV - Cuenta propia",
      type: "PASIVO",
      nature: "ACREEDORA",
      debit: "0.00",
      credit: "180.00",
    },
    {
      id: "line-3",
      code: "70121",
      name: "Terceros (Venta mercaderías)",
      type: "INGRESO",
      nature: "ACREEDORA",
      debit: "0.00",
      credit: "1000.00",
    },
  ]);

  // Auto-fill logic whenever inputCode changes
  useEffect(() => {
    if (!inputCode.trim()) {
      setMatchedAccount(null);
      return;
    }
    const found = lookupPCGE(inputCode.trim());
    setMatchedAccount(found);
  }, [inputCode]);

  // Handle auto-fill in interactive journal entry lines
  const handleLineCodeChange = (lineId: string, newCode: string) => {
    const found = lookupPCGE(newCode.trim());
    setEntryLines((prev) =>
      prev.map((line) => {
        if (line.id === lineId) {
          return {
            ...line,
            code: newCode,
            name: found ? found.name : line.name,
            type: found ? found.type : line.type,
            nature: found ? found.nature : line.nature,
          };
        }
        return line;
      })
    );
  };

  const handleAddLine = () => {
    setEntryLines((prev) => [
      ...prev,
      {
        id: `line-${Date.now()}`,
        code: "",
        name: "(Escribe un código contable)",
        type: "-",
        nature: "-",
        debit: "0.00",
        credit: "0.00",
      },
    ]);
  };

  const handleRemoveLine = (id: string) => {
    setEntryLines((prev) => prev.filter((l) => l.id !== id));
  };

  // Quick preset pills for user testing
  const presets = [
    { code: "101", label: "101 Caja" },
    { code: "1041", label: "1041 BBVA Cuentas Corrientes" },
    { code: "1212", label: "1212 Facturas por Cobrar" },
    { code: "40111", label: "40111 IGV Cuenta Propia" },
    { code: "4212", label: "4212 Facturas por Pagar" },
    { code: "6011", label: "6011 Compras Mercaderías" },
    { code: "70121", label: "70121 Ventas Mercaderías" },
  ];

  return (
    <div className="space-y-6">
      {/* 1. CLEAN PROMINENT LIVE AUTO-FILL LOOKUP TESTER */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Autorrellenado Automático por Código Contable
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Ingresa cualquier código numérico del Plan Contable y el sistema autorrellenará en tiempo real la denominación oficial, tipo de cuenta y naturaleza.
          </p>
        </div>

        {/* Clean Input Box (No text overlap) */}
        <div className="max-w-2xl space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Ingresa el código de la cuenta:
          </label>

          <div className="flex items-center rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-xs focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
            <div className="bg-slate-50 px-4 py-3 border-r border-slate-200 text-xs font-bold text-slate-600 select-none flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Código PCGE:</span>
            </div>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Ej: 1041, 1212, 40111, 70121..."
              className="flex-1 px-4 py-3 text-slate-900 font-mono font-extrabold text-base focus:outline-none bg-transparent"
              autoFocus
            />
            {matchedAccount && (
              <div className="pr-4 flex items-center gap-1 text-xs font-bold text-emerald-600 select-none">
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Encontrado</span>
              </div>
            )}
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-slate-400 text-[11px] font-medium mr-1">Probar con:</span>
            {presets.map((p) => (
              <button
                key={p.code}
                type="button"
                onClick={() => setInputCode(p.code)}
                className={`px-2.5 py-1 rounded-lg transition-all text-[11px] font-semibold ${
                  inputCode === p.code
                    ? "bg-blue-600 text-white shadow-xs font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Auto-fill Result Card */}
        <div>
          {matchedAccount ? (
            <div className="bg-[#FAFBFD] rounded-2xl p-5 border border-blue-100 shadow-xs animate-in fade-in zoom-in-98 duration-150 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-mono font-extrabold text-lg shadow-xs">
                    {matchedAccount.code}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Denominación Oficial Autorrellenada:
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {matchedAccount.name}
                    </h3>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Cuenta PCGE Válida
                </span>
              </div>

              {/* Auto-filled metadata grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Tipo de Cuenta
                  </span>
                  <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
                    {matchedAccount.type}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Naturaleza Habitual
                  </span>
                  <span
                    className={`font-extrabold text-sm mt-0.5 block ${
                      matchedAccount.nature === "DEUDORA"
                        ? "text-blue-600"
                        : "text-purple-600"
                    }`}
                  >
                    {matchedAccount.nature}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Nivel en Catálogo
                  </span>
                  <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                    {matchedAccount.level}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Elemento PCGE
                  </span>
                  <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                    Elemento {matchedAccount.code.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
              No se encontró ninguna cuenta con el código <span className="font-mono font-bold">"{inputCode}"</span>. Ingresa un código válido como <button type="button" className="underline font-mono font-bold" onClick={() => setInputCode("1041")}>1041</button> o <button type="button" className="underline font-mono font-bold" onClick={() => setInputCode("70121")}>70121</button>.
            </div>
          )}
        </div>
      </div>

      {/* 2. INTERACTIVE JOURNAL ENTRY (ASIENTO) WITH LIVE LINE-BY-LINE AUTO-FILL */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                Simulador de Asiento Contable con Autorrellenado por Fila
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                Partida Doble
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Escribe o cambia cualquier código en la columna "Código PCGE" y la denominación y clasificación se autorrellenarán automáticamente.
            </p>
          </div>

          <button
            onClick={handleAddLine}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors self-start sm:self-auto shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Fila</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                <th className="pb-3 px-3 w-36">Código PCGE</th>
                <th className="pb-3 px-3">Denominación (Autorrellenada)</th>
                <th className="pb-3 px-3 w-28 text-center">Tipo</th>
                <th className="pb-3 px-3 w-28 text-right">Debe (S/)</th>
                <th className="pb-3 px-3 w-28 text-right">Haber (S/)</th>
                <th className="pb-3 px-3 w-12 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {entryLines.map((line) => (
                <tr key={line.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Code Input */}
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={line.code}
                      onChange={(e) => handleLineCodeChange(line.id, e.target.value)}
                      placeholder="Ej: 1041"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-blue-200 font-mono font-bold text-xs text-blue-600 bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </td>

                  {/* Auto-filled Name */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">{line.name}</span>
                      {lookupPCGE(line.code.trim()) && (
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded font-mono">
                          ✓ Auto
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Auto-filled Type */}
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {line.type}
                    </span>
                  </td>

                  {/* Debit */}
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="text"
                      value={line.debit}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEntryLines((prev) =>
                          prev.map((l) => (l.id === line.id ? { ...l, debit: val } : l))
                        );
                      }}
                      className="w-24 text-right px-2 py-1 rounded-lg border border-slate-200 font-mono font-bold text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>

                  {/* Credit */}
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="text"
                      value={line.credit}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEntryLines((prev) =>
                          prev.map((l) => (l.id === line.id ? { ...l, credit: val } : l))
                        );
                      }}
                      className="w-24 text-right px-2 py-1 rounded-lg border border-slate-200 font-mono font-bold text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>

                  {/* Delete line */}
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleRemoveLine(line.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Eliminar fila"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
