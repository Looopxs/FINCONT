"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LaptopMockup } from "./LaptopMockup";
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Users,
  Star,
  Headphones,
  ShieldCheck,
  Building2,
  TrendingUp,
} from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] lg:min-h-[96vh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 overflow-hidden"
    >
      {/* 2 & 4. REALISTIC OFFICE & DESK BACKGROUND ENVIRONMENT (Model 3) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Photorealistic office desk & plants environment */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-office-bg.jpg"
            alt="Office environment"
            fill
            priority
            className="object-cover object-[70%_center] lg:object-[80%_center] opacity-80 lg:opacity-90"
          />
          {/* Subtle gradient to keep left text 100% readable while showing desk & plants on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7F9FC] via-[#F7F9FC]/90 to-transparent w-full lg:w-[48%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F9FC] via-transparent to-transparent h-28 bottom-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7F9FC] via-transparent to-transparent h-20 top-0" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* LEFT COLUMN: Clean, punchy copy and hierarchy */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 text-center lg:text-left pt-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-600 text-xs sm:text-sm font-semibold shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span>Contabilidad inteligente para empresas modernas</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Una operación.
              <br />
              Toda tu contabilidad{" "}
              <span className="text-blue-600 inline-block drop-shadow-xs">
                en movimiento.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Factura, caja, bancos, saldos y asientos contables, automatizados desde un solo registro.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <Link
                href="/dashboard"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-[0_4px_16px_rgba(37,99,235,0.28)] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(37,99,235,0.36)] hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
              >
                <span>Solicitar una demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                href="#como-funciona"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-white/95 hover:bg-slate-50 border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-slate-300 transition-all duration-200 text-sm sm:text-base backdrop-blur-sm"
              >
                <span>Conocer más</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Trust Checklist */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm font-medium text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Implementación rápida</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Sin permanencia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Soporte en español</span>
              </div>
            </div>

            {/* REALISTIC NOTEBOOK ON DESK (Model 3) */}
            <div className="pt-2 hidden sm:block">
              <div className="relative inline-block bg-white/95 rounded-2xl p-3.5 px-4 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.1)] border border-slate-200/90 max-w-xs text-left backdrop-blur-md">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
                      Notas de empresa
                    </span>
                    <p className="text-xs font-extrabold text-slate-800">
                      Empresas más fuertes con menos trabajo
                    </p>
                  </div>
                  {/* Bookmark ribbon */}
                  <span className="w-1.5 h-8 bg-blue-600 rounded-full flex-shrink-0" />
                </div>
                {/* Sleek black pen resting on notebook */}
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-16 h-1.5 bg-slate-800 rounded-full shadow-md transform rotate-12 flex items-center justify-end pr-0.5">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Realistic Office Scene with 3D Laptop, Desk & Plants */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <LaptopMockup />
          </div>
        </div>

        {/* BOTTOM METRICS & CLIENT STRIP (Matching Model 3) */}
        <div className="mt-8 sm:mt-10 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-[0_6px_30px_-6px_rgba(15,23,42,0.05)] p-4 sm:p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* 3 Metric Pills */}
            <div className="md:col-span-7 grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-slate-100">
              {/* Metric 1 */}
              <div className="flex items-center gap-3 px-1 sm:px-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">+1,200</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">empresas</p>
                  <span className="hidden sm:block text-[10px] text-slate-400">Confían en FINCONT</span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-3 px-2 sm:px-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">99%</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">satisfacción</p>
                  <span className="hidden sm:block text-[10px] text-slate-400">De nuestros clientes</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-3 px-2 sm:px-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">24/7</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">soporte</p>
                  <span className="hidden sm:block text-[10px] text-slate-400">Siempre a tu lado</span>
                </div>
              </div>
            </div>

            {/* Client Logos Strip */}
            <div className="md:col-span-5 md:border-l md:border-slate-100 md:pl-6">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
                EMPRESAS QUE YA CONFÍAN EN FINCONT
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 text-slate-500">
                <span className="font-semibold text-xs tracking-tight flex items-center gap-1 hover:text-slate-900 transition-colors">
                  <Building2 className="w-3.5 h-3.5 text-blue-500" /> TechNova
                </span>
                <span className="font-semibold text-xs tracking-tight flex items-center gap-1 hover:text-slate-900 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-500" /> Grupo Delta
                </span>
                <span className="font-semibold text-xs tracking-tight flex items-center gap-1 hover:text-slate-900 transition-colors">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-500" /> Sierra Capital
                </span>
                <span className="font-semibold text-xs tracking-tight hover:text-slate-900 transition-colors">
                  Lúmina
                </span>
                <span className="font-semibold text-xs tracking-tight hover:text-slate-900 transition-colors">
                  Orbis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
