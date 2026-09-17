"use client";

import React, { useState } from "react";
import {
  Settings,
  Building2,
  User,
  Key,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Landmark,
  FileCheck,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useOperationsStore } from "@/lib/data/operations-store";
import { triggerFileDownload } from "@/lib/services/sunat-ple-service";

export default function ConfiguracionPage() {
  const { company } = useAuth();
  const { operations } = useOperationsStore();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [backupSuccess, setBackupSuccess] = useState(false);

  // Form states
  const [legalName, setLegalName] = useState("LIBERTAD S.A.");
  const [commercialName, setCommercialName] = useState("FINCONT Demo S.A.C.");
  const [ruc, setRuc] = useState("20304050601");
  const [address, setAddress] = useState("Calle Industrial 2429 - Trujillo, Perú");
  const [phone, setPhone] = useState("+51 (044) 284-920");
  const [email, setEmail] = useState("contacto@libertad.pe");

  // Rules states
  const [autoJournal, setAutoJournal] = useState(true);
  const [autoCashBank, setAutoCashBank] = useState(true);
  const [autoIgv, setAutoIgv] = useState(true);

  // Tax parameters
  const [igvRate, setIgvRate] = useState("18.00");
  const [detractionRate, setDetractionRate] = useState("10.00");
  const [taxRegime, setTaxRegime] = useState("Régimen General MYPE");

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportBackup = () => {
    const backupData = {
      system: "FINCONT",
      version: "2.4.0",
      exportDate: new Date().toISOString(),
      company: {
        legalName,
        commercialName,
        ruc,
        address,
        phone,
        email,
      },
      operations,
    };

    const jsonStr = JSON.stringify(backupData, null, 2);
    triggerFileDownload("FINCONT_Backup_Libertad_SA_2025.json", jsonStr, "application/json;charset=utf-8");
    setBackupSuccess(true);
    setTimeout(() => setBackupSuccess(false), 3500);
  };

  const handleResetDemoData = () => {
    if (confirm("¿Estás seguro de restablecer los datos al Excel contable original?")) {
      localStorage.removeItem("fincont_operations");
      localStorage.removeItem("fincont_clients");
      localStorage.removeItem("fincont_suppliers");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Toast alert */}
      {savedSuccess && (
        <div className="p-3.5 bg-emerald-600 text-white rounded-2xl flex items-center justify-between text-xs font-semibold shadow-md animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Configuración de FINCONT actualizada y guardada con éxito.</span>
          </div>
        </div>
      )}

      {backupSuccess && (
        <div className="p-3.5 bg-blue-600 text-white rounded-2xl flex items-center justify-between text-xs font-semibold shadow-md animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Respaldo completo de base de datos descargado en tu equipo (.JSON).</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Configuración del Sistema</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
              FINCONT v2.4
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Parámetros de empresa, reglas de automatización en cascada, impuestos y copias de seguridad
          </p>
        </div>

        <button
          onClick={handleExportBackup}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all hover:shadow-md self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Respaldo (.JSON)</span>
        </button>
      </div>

      <form onSubmit={handleSaveConfig} className="space-y-6">
        {/* 1. Datos de Empresa */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Perfil y Datos de la Empresa
            </h3>
            <span className="text-[11px] text-slate-400">Datos vinculados a comprobantes SUNAT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Razón Social</label>
              <input
                type="text"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nombre Comercial</label>
              <input
                type="text"
                value={commercialName}
                onChange={(e) => setCommercialName(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">RUC (Registro Único de Contribuyente)</label>
              <input
                type="text"
                value={ruc}
                onChange={(e) => setRuc(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl font-mono text-slate-800 font-bold focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Régimen Tributario</label>
              <select
                value={taxRegime}
                onChange={(e) => setTaxRegime(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-hidden focus:border-blue-500"
              >
                <option value="Régimen General MYPE">Régimen General MYPE Tributario</option>
                <option value="Régimen General">Régimen General (29.5% Anual)</option>
                <option value="Régimen Especial (RER)">Régimen Especial de Renta (RER 1.5%)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Domicilio Fiscal</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Teléfono Central</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Correo Electrónico de Facturación</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Reglas de Automatización Contable en Cascada */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              Motor de Cascada & Automatización FINCONT
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Activo
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
              <input
                type="checkbox"
                checked={autoJournal}
                onChange={(e) => setAutoJournal(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-bold text-slate-900 block">
                  Generación automática de asientos contables PCGE (Partida Doble)
                </span>
                <span className="text-slate-500 text-[11px]">
                  Cada factura de venta o compra registrada crea su asiento balanceado (Debe = Haber) al instante sin intervención manual.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
              <input
                type="checkbox"
                checked={autoCashBank}
                onChange={(e) => setAutoCashBank(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-bold text-slate-900 block">
                  Afectación en tiempo real de saldos de Caja (101) y BBVA (1041)
                </span>
                <span className="text-slate-500 text-[11px]">
                  Actualiza el saldo progresivo en los libros auxiliares inmediatamente tras cualquier cobro, pago o transferencia.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
              <input
                type="checkbox"
                checked={autoIgv}
                onChange={(e) => setAutoIgv(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-bold text-slate-900 block">
                  Cálculo automático de Débito y Crédito Fiscal IGV (18%)
                </span>
                <span className="text-slate-500 text-[11px]">
                  Aplica la alícuota del 18% para liquidación tributaria mensual en la cuenta 40111.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* 3. Parámetros Tributarios y Bancarios */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-blue-600" />
              Parámetros de Impuestos y Cuentas Predeterminadas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Tasa de IGV General (%)</label>
              <input
                type="number"
                step="0.01"
                value={igvRate}
                onChange={(e) => setIgvRate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl font-mono text-slate-800 font-bold focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Tasa Detracciones Serv. (%)</label>
              <input
                type="number"
                step="0.01"
                value={detractionRate}
                onChange={(e) => setDetractionRate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl font-mono text-slate-800 font-bold focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Banco Principal</label>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold truncate">
                BBVA Continental (1041)
              </div>
            </div>
          </div>
        </div>

        {/* Save button and danger zone */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleResetDemoData}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Datos al Excel Original</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-blue-500/25 transition-all hover:shadow-md hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Configuración</span>
          </button>
        </div>
      </form>
    </div>
  );
}
