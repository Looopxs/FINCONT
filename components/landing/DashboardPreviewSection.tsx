"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  Building,
  Cloud,
  ShieldCheck,
  TrendingUp,
  Landmark,
  FileText,
  DollarSign,
  PieChart,
} from "lucide-react";

export const DashboardPreviewSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"general" | "caja" | "asientos">("general");

  return (
    <section id="soluciones" className="py-20 sm:py-28 bg-[#FAFBFD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Experiencia pensada para ti</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Una plataforma diseñada para ti
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Una experiencia moderna, intuitiva y completa para llevar tu contabilidad al siguiente nivel.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span>Interfaz simple, limpia y sin saturación</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span>Acceso seguro desde cualquier dispositivo (Desktop, Tablet, Mobile)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span>Segura, confiable y respaldada con auditoría transaccional</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30"
              >
                Conocer más sobre la plataforma
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 4 Feature highlight cards on the right */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Dashboard en tiempo real
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Toda tu información clave consolidada en un solo vistazo.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Gestión completa
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Desde la operación inicial hasta los reportes de gerencia.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                <Cloud className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                100% en la nube
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Accede cuando y donde quieras con disponibilidad continua.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Nivel empresarial
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Seguridad de grado bancario con logs inmutables.
              </p>
            </div>
          </div>
        </div>

        {/* Big Interactive Live Preview Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                FC
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Resumen de Demostración Financiera
                </h3>
                <p className="text-xs text-slate-400">
                  Empresa: Libertad S.A. / FINCONT SAC • Moneda: Soles (S/)
                </p>
              </div>
            </div>

            {/* View Selector Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setSelectedTab("general")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedTab === "general"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Indicadores Clave
              </button>
              <button
                onClick={() => setSelectedTab("caja")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedTab === "caja"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Caja y Bancos (Excel)
              </button>
              <button
                onClick={() => setSelectedTab("asientos")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedTab === "asientos"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Asientos PCGE
              </button>
            </div>
          </div>

          {/* Dynamic Content based on Tab */}
          <div className="pt-6">
            {selectedTab === "general" && (
              <div className="space-y-6">
                {/* 6 Mini KPIs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200/70">
                    <span className="text-xs text-slate-500 font-medium">Ingresos</span>
                    <p className="text-base font-bold text-slate-900 mt-1">S/ 506,892.60</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">+12% vs. mes ant.</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200/70">
                    <span className="text-xs text-slate-500 font-medium">Gastos</span>
                    <p className="text-base font-bold text-slate-900 mt-1">S/ 311,799.84</p>
                    <span className="text-[10px] text-red-500 font-semibold">-8% vs. mes ant.</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200/70">
                    <span className="text-xs text-slate-500 font-medium">Saldo en bancos</span>
                    <p className="text-base font-bold text-slate-900 mt-1">S/ 394,533.15</p>
                    <span className="text-[10px] text-blue-600 font-semibold">BBVA Cta. 1041</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200/70">
                    <span className="text-xs text-slate-500 font-medium">Saldo en caja</span>
                    <p className="text-base font-bold text-slate-900 mt-1">S/ 43,755.76</p>
                    <span className="text-[10px] text-teal-600 font-semibold">Caja 101 Efectivo</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200/70">
                    <span className="text-xs text-slate-500 font-medium">Planilla / Tributos</span>
                    <p className="text-base font-bold text-slate-900 mt-1">S/ 18,745.71</p>
                    <span className="text-[10px] text-purple-600 font-semibold">ESSALUD/ONP/AFP</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200/70">
                    <span className="text-xs text-slate-500 font-medium">Resultado neto</span>
                    <p className="text-base font-bold text-emerald-600 mt-1">S/ 176,347.05</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">+18% positivo</span>
                  </div>
                </div>

                {/* Simulated Recent Automation Timeline */}
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/70">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Flujo de Automatización Activo
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                      <p className="text-[11px] font-bold text-slate-800">1. Venta Registrada</p>
                      <p className="text-[10px] text-slate-400">Diana Valera (OP-004)</p>
                      <span className="inline-block mt-1 text-[9px] text-emerald-600 font-semibold">✓ Procesado</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                      <p className="text-[11px] font-bold text-slate-800">2. Boleta Emitida</p>
                      <p className="text-[10px] text-slate-400">Recibo Caja N° 672</p>
                      <span className="inline-block mt-1 text-[9px] text-emerald-600 font-semibold">✓ Emitido</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                      <p className="text-[11px] font-bold text-slate-800">3. Caja 101 Acreditada</p>
                      <p className="text-[10px] text-slate-400">+ S/ 1,770.00 Efectivo</p>
                      <span className="inline-block mt-1 text-[9px] text-emerald-600 font-semibold">✓ Ingresado</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                      <p className="text-[11px] font-bold text-slate-800">4. Asiento Contable</p>
                      <p className="text-[10px] text-slate-400">101 vs 1212 & 70121</p>
                      <span className="inline-block mt-1 text-[9px] text-emerald-600 font-semibold">✓ Balanceado</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                      <p className="text-[11px] font-bold text-slate-800">5. Reporte Mayor</p>
                      <p className="text-[10px] text-slate-400">Actualizado en vivo</p>
                      <span className="inline-block mt-1 text-[9px] text-emerald-600 font-semibold">✓ Consolidado</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === "caja" && (
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/70 text-xs">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-slate-800">
                    Extracto de Caja y Bancos (Libro Oficial SUNAT 1.1 y 1.2)
                  </span>
                  <span className="text-[11px] text-slate-500">Periodo: Diciembre 2025</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-semibold text-[11px]">
                        <th className="pb-2">Fecha</th>
                        <th className="pb-2">Medio</th>
                        <th className="pb-2">Concepto</th>
                        <th className="pb-2">Entidad / Tercero</th>
                        <th className="pb-2 text-right">Ingreso (+)</th>
                        <th className="pb-2 text-right">Egreso (-)</th>
                        <th className="pb-2 text-right">Saldo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                      <tr>
                        <td className="py-2">01/12/2025</td>
                        <td>-</td>
                        <td>Saldo Inicial</td>
                        <td>BBVA Banco Continental</td>
                        <td className="py-2 text-right text-emerald-600 font-bold">218,390.00</td>
                        <td className="py-2 text-right">-</td>
                        <td className="py-2 text-right font-bold">218,390.00</td>
                      </tr>
                      <tr>
                        <td className="py-2">04/12/2025</td>
                        <td>003 Transferencia</td>
                        <td>Venta Fernández E.I.R.L.</td>
                        <td>Banco BBVA</td>
                        <td className="py-2 text-right text-emerald-600">52,864.00</td>
                        <td className="py-2 text-right">-</td>
                        <td className="py-2 text-right font-bold">271,254.00</td>
                      </tr>
                      <tr>
                        <td className="py-2">05/12/2025</td>
                        <td>003 Transferencia</td>
                        <td>Compra Mercaderías Guadalupe</td>
                        <td>Banco BBVA</td>
                        <td className="py-2 text-right">-</td>
                        <td className="py-2 text-right text-red-500">78,540.80</td>
                        <td className="py-2 text-right font-bold">192,713.20</td>
                      </tr>
                      <tr>
                        <td className="py-2">08/12/2025</td>
                        <td>008 Efectivo</td>
                        <td>Suministros Librería Cortéz</td>
                        <td>Caja 101 Efectivo</td>
                        <td className="py-2 text-right">-</td>
                        <td className="py-2 text-right text-red-500">21.24</td>
                        <td className="py-2 text-right font-bold">43,578.76</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === "asientos" && (
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/70 text-xs">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-slate-800">
                    Asiento Diario Generado Automáticamente por el AccountingEngine
                  </span>
                  <span className="text-emerald-600 font-bold">✓ Partida Doble Verificada</span>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-3 font-mono text-[11px]">
                  <div className="flex justify-between font-bold text-slate-800 border-b border-slate-100 pb-2 mb-2">
                    <span>Cuenta Contable</span>
                    <span>Descripción</span>
                    <span>Debe (S/)</span>
                    <span>Haber (S/)</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-700">
                    <span>1212</span>
                    <span>Cuentas por cobrar comerciales - Emitidas</span>
                    <span className="font-bold text-blue-600">52,864.00</span>
                    <span>-</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-700">
                    <span>70121</span>
                    <span>Venta de mercaderías manufacturadas - Terceros</span>
                    <span>-</span>
                    <span className="font-bold text-slate-800">44,800.00</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-700">
                    <span>40111</span>
                    <span>IGV - Cuenta propia (18%)</span>
                    <span>-</span>
                    <span className="font-bold text-slate-800">8,064.00</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 mt-2 font-bold text-emerald-600">
                    <span>TOTALES</span>
                    <span>Balance perfecto</span>
                    <span>52,864.00</span>
                    <span>52,864.00</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
