"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Receipt,
  Truck,
  Coins,
  FileCheck2,
  TrendingUp,
  Users,
  ShieldCheck,
  FileSpreadsheet,
  Download,
  Landmark,
  CheckCircle2,
} from "lucide-react";

export const BentoGrid: React.FC = () => {
  return (
    <section id="funcionalidades" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-3 border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plataforma modular</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Funcionalidades que simplifican tu día
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Herramientas poderosas, en una sola plataforma unificada.
            </p>
          </div>
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 group transition-colors"
            >
              Ver todas las funcionalidades
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* CARD 1: Registro Inteligente (Span 2 cols on tablet & desktop) */}
          <div className="md:col-span-2 lg:col-span-2 bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-card transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5 shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Registro inteligente
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                Automatiza la captura de tus operaciones con reglas personalizadas y el catálogo del PCGE preconfigurado.
              </p>
            </div>

            {/* Interactive Simulated Badges */}
            <div className="mt-8 space-y-2.5">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Factura de venta</p>
                    <p className="text-[11px] text-slate-400">Cliente Andina S.A. - S/ 12,500</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  Procesada automáticamente
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Compra a proveedor</p>
                    <p className="text-[11px] text-slate-400">Guadalupe S.A.C. - S/ 78,540.80</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60">
                  Conciliada con banco
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Movimiento de caja</p>
                    <p className="text-[11px] text-slate-400">Efectivo 101 - Pago suministros</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/60">
                  Asignado y categorizado
                </span>
              </div>
            </div>
          </div>

          {/* CARD 2: Asientos Automáticos */}
          <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-card transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Asientos automáticos
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Genera asientos contables de partida doble sin intervención manual ni riesgos de descuadre.
              </p>
            </div>

            {/* Mini Ledger Preview */}
            <div className="mt-6 bg-white p-3 rounded-2xl border border-slate-200/70 text-[11px] font-mono">
              <div className="flex justify-between font-bold text-slate-700 border-b border-slate-100 pb-1.5 mb-1.5">
                <span>Cuenta</span>
                <span>Debe</span>
                <span>Haber</span>
              </div>
              <div className="flex justify-between text-slate-600 py-0.5">
                <span>1212 Clientes</span>
                <span className="font-semibold text-blue-600">1,180.00</span>
                <span>-</span>
              </div>
              <div className="flex justify-between text-slate-600 py-0.5">
                <span>7011 Ventas</span>
                <span>-</span>
                <span className="font-semibold text-slate-800">1,000.00</span>
              </div>
              <div className="flex justify-between text-slate-600 py-0.5">
                <span>4011 IGV 18%</span>
                <span>-</span>
                <span className="font-semibold text-slate-800">180.00</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-600 border-t border-slate-100 pt-1 mt-1 text-[10px]">
                <span>✓ Cuadrado</span>
                <span>1,180.00</span>
                <span>1,180.00</span>
              </div>
            </div>
          </div>

          {/* CARD 3: Saldos en tiempo real */}
          <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-card transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Saldos en tiempo real
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Consulta tus saldos de bancos, caja y cuentas contables al instante.
              </p>
            </div>

            {/* Total Balance Badge */}
            <div className="mt-6 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs text-center">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-2">
                <Landmark className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-500 font-medium">Saldo total consolidado</p>
              <p className="text-xl font-extrabold text-slate-900 my-0.5">S/ 104,570</p>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +15% vs. mes anterior
              </span>
            </div>
          </div>

          {/* CARD 4: Clientes y proveedores */}
          <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-card transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Clientes y proveedores
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Gestiona tu cartera de clientes y compras con historial completo centralizado.
              </p>
            </div>

            {/* Avatars Preview */}
            <div className="mt-6 bg-white p-3.5 rounded-2xl border border-slate-200/70 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center">
                  FE
                </div>
                <div className="text-[11px]">
                  <p className="font-bold text-slate-800">Fernández E.I.R.L.</p>
                  <p className="text-slate-400">Saldo pendiente: S/ 0.00</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-teal-500 text-white font-bold text-xs flex items-center justify-center">
                  GS
                </div>
                <div className="text-[11px]">
                  <p className="font-bold text-slate-800">Guadalupe S.A.C.</p>
                  <p className="text-slate-400">Compras: S/ 78,540.80</p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 5: Auditoría */}
          <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-card transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Auditoría
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Trazabilidad inmutable de todas las operaciones realizadas en el sistema.
              </p>
            </div>

            <div className="mt-6 bg-white p-3 rounded-2xl border border-slate-200/70 text-[11px] space-y-1.5 text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Usuario:</span>
                <span className="font-semibold text-slate-800">Juan Martínez</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Fecha y hora:</span>
                <span>Hoy, 10:45 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Acción:</span>
                <span className="font-semibold text-emerald-600">Venta Procesada</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Detalle:</span>
                <span>OP-0025 &rarr; FAC-00158</span>
              </div>
            </div>
          </div>

          {/* CARD 6: Reportes exportables (Span 2 cols on lg) */}
          <div className="md:col-span-2 lg:col-span-2 bg-[#F8FAFC] rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-card transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Reportes exportables
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                Genera reportes de Estado de Resultados, Libro Diario y Mayor en PDF y Excel con un solo clic.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-bold text-red-600">
                <Download className="w-3.5 h-3.5" />
                <span>PDF Oficial</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-bold text-emerald-600">
                <Download className="w-3.5 h-3.5" />
                <span>Excel (XLSX)</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-bold text-blue-600">
                <Download className="w-3.5 h-3.5" />
                <span>Gráficos CSV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
