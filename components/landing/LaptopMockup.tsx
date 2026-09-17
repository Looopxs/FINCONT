"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Landmark,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  LayoutDashboard,
  Receipt,
  BookOpen,
  BarChart3,
  Percent,
  Settings,
  Search,
  Bell,
  Sparkles,
} from "lucide-react";

export const LaptopMockup: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[700px] mx-auto py-6 sm:py-8 select-none"
    >
      {/* EDITORIAL CURSIVE TEXT (Matching Model 3) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute -top-4 right-2 sm:right-6 z-30 pointer-events-none hidden sm:flex flex-col items-end"
      >
        <span
          className="text-slate-500 font-serif italic text-lg sm:text-xl tracking-wide select-none drop-shadow-xs -rotate-2"
          style={{ fontFamily: "'Caveat', 'Dancing Script', 'Segoe Script', cursive" }}
        >
          Finanzas que impulsan
          <br />
          <span className="mr-4">tu crecimiento</span>
        </span>
      </motion.div>

      {/* FLOATING CARD 1: Factura Generada (Top Left / Center) */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 0.98,
          y: [-4, 5, -4],
          x: [-1, 2, -1],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.2 },
          scale: { duration: 0.5, delay: 0.2 },
          y: { duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.1 },
          x: { duration: 6.0, repeat: Infinity, ease: "easeInOut", delay: 0.1 },
        }}
        className="absolute -top-3 left-4 sm:left-14 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-[0_12px_30px_-4px_rgba(15,23,42,0.12),0_4px_12px_rgba(16,185,129,0.08)] flex items-center gap-3 transition-transform hover:scale-105"
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
          <FileText className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-900">Factura generada</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50" />
          </div>
          <p className="text-[11px] font-mono text-slate-500 font-medium">FAC-2024-00158</p>
          <span className="text-[10px] text-slate-400">Hace 2 min</span>
        </div>
      </motion.div>

      {/* FLOATING CARD 2: Saldo Actualizado (Top Right) */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [5, -5, 5],
          x: [2, -2, 2],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.4 },
          scale: { duration: 0.5, delay: 0.4 },
          y: { duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
          x: { duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
        }}
        className="absolute top-14 -right-2 sm:-right-4 z-30 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-blue-100 shadow-[0_16px_36px_-6px_rgba(37,99,235,0.18),0_4px_12px_rgba(15,23,42,0.06)] flex items-center gap-3.5 transition-transform hover:scale-105"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
          <Landmark className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-900">Saldo actualizado</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50" />
          </div>
          <p className="text-sm font-extrabold text-slate-900 tracking-tight">S/ 104,570</p>
          <span className="text-[10px] text-slate-400">Hace 5 min</span>
        </div>
      </motion.div>

      {/* FLOATING CARD 3: Asiento Creado (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 0.96,
          y: [-4, 4, -4],
          x: [-2, 2, -2],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.6 },
          scale: { duration: 0.5, delay: 0.6 },
          y: { duration: 5.0, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          x: { duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
        }}
        className="absolute -bottom-2 right-6 sm:right-12 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-indigo-100 shadow-[0_12px_28px_-4px_rgba(99,102,241,0.16),0_4px_10px_rgba(15,23,42,0.05)] flex items-center gap-3 transition-transform hover:scale-105"
      >
        <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-900">Asiento creado</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50" />
          </div>
          <p className="text-[11px] font-medium text-slate-600">Asiento #A-7842</p>
          <span className="text-[10px] text-slate-400">Hace 1 min</span>
        </div>
      </motion.div>

      {/* DESK ACCESSORY: Nexora Ceramic Coffee Mug (Matching Model 3) */}
      <div className="absolute -bottom-3 -right-2 sm:-right-8 z-10 pointer-events-none hidden md:flex flex-col items-center">
        <div className="relative w-12 h-15 bg-gradient-to-r from-slate-100 via-white to-slate-200 rounded-b-2xl rounded-t-xs shadow-[0_14px_24px_rgba(0,0,0,0.16)] border-t border-slate-200 flex flex-col items-center justify-center p-1">
          {/* Mug handle */}
          <div className="absolute -right-3 top-2.5 w-3.5 h-8 border-[3px] border-slate-200 rounded-r-lg bg-transparent" />
          {/* FINCONT logo on mug */}
          <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center text-white text-[7px] font-bold mb-0.5 shadow-xs">
            FC
          </div>
          <span className="text-[7px] font-bold tracking-tight text-slate-700">
            FINCONT
          </span>
        </div>
        {/* Mug shadow */}
        <div className="w-11 h-2 bg-slate-900/25 blur-xs rounded-full -mt-1" />
      </div>

      {/* 3D REALISTIC LAPTOP CHASSIS (MacBook Pro Silver aesthetic) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{
          opacity: 1,
          y: 0,
          rotateY: -8 + mousePos.x * 0.3,
          rotateX: 4 - mousePos.y * 0.3,
        }}
        transition={{
          opacity: { duration: 0.7, ease: "easeOut" },
          y: { duration: 0.7, ease: "easeOut" },
          rotateY: { type: "spring", stiffness: 200, damping: 22 },
          rotateX: { type: "spring", stiffness: 200, damping: 22 },
        }}
        style={{
          perspective: 1200,
          transformStyle: "preserve-3d",
        }}
        className="relative mx-auto max-w-[620px]"
      >
        {/* DESK SURFACE CONTACT SHADOW (Soft ambient occlusion on desk) */}
        <div className="absolute -bottom-6 left-[5%] right-[5%] h-10 bg-slate-900/25 blur-xl rounded-full pointer-events-none transform scale-y-50" />
        <div className="absolute -bottom-2 left-[10%] right-[10%] h-4 bg-slate-900/35 blur-md rounded-full pointer-events-none" />

        {/* SCREEN BEZEL (Dark anodized aluminum frame with round corners) */}
        <div className="relative rounded-[22px] bg-slate-900 p-2 sm:p-2.5 shadow-[0_24px_50px_-10px_rgba(15,23,42,0.3)] border border-slate-800">
          {/* Glass glare highlight */}
          <div className="absolute inset-0 rounded-[22px] bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] pointer-events-none z-20" />

          {/* Camera Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 flex items-center justify-center z-30">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800 ring-1 ring-slate-700 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-blue-400" />
            </div>
          </div>

          {/* SCREEN DISPLAY */}
          <div className="relative rounded-[16px] overflow-hidden bg-slate-50 border border-slate-800/60 aspect-[16/10] text-slate-800 text-xs flex">
            {/* MINI DASHBOARD SIDEBAR */}
            <div className="w-12 sm:w-36 bg-slate-900 text-slate-400 p-2 sm:p-3 flex flex-col justify-between border-r border-slate-800 select-none">
              <div>
                {/* Brand in Screen */}
                <div className="flex items-center gap-2 mb-4 px-1">
                  <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-white text-[9px] font-bold shadow-xs">
                    FC
                  </div>
                  <span className="hidden sm:inline font-heading font-bold text-white text-xs">
                    FINCONT
                  </span>
                </div>

                {/* Nav Links */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-blue-600 text-white font-medium text-[11px] shadow-xs">
                    <LayoutDashboard className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:text-white transition-colors text-[11px]">
                    <Receipt className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="hidden sm:inline">Facturación</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:text-white transition-colors text-[11px]">
                    <Landmark className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="hidden sm:inline">Bancos</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:text-white transition-colors text-[11px]">
                    <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="hidden sm:inline">Contabilidad</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:text-white transition-colors text-[11px]">
                    <BarChart3 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="hidden sm:inline">Reportes</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:text-white transition-colors text-[11px]">
                    <Percent className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="hidden sm:inline">Impuestos</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2 px-2 py-1 text-[11px] text-slate-400">
                  <Settings className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Configuración</span>
                </div>
              </div>
            </div>

            {/* MAIN SCREEN BODY */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
              {/* Screen Topbar */}
              <div className="h-10 bg-white border-b border-slate-200/80 px-3 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-md text-[10px] text-slate-400 w-36 sm:w-48">
                  <Search className="w-3 h-3" />
                  <span>Buscar...</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-600 bg-slate-100 px-2 py-1 rounded font-medium">
                    <span>Enero 2024 - Mar 2024</span>
                  </div>
                  <Bell className="w-3.5 h-3.5 text-slate-500" />
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center">
                      JM
                    </div>
                    <div className="hidden sm:block text-left text-[9px] leading-tight">
                      <p className="font-semibold text-slate-800">Juan Martínez</p>
                      <p className="text-slate-400">Empresa Demo S.A.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="flex-1 p-2 sm:p-3 space-y-2 sm:space-y-2.5 overflow-hidden">
                {/* Header inside screen */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Resumen financiero
                    </h3>
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                    <span>En línea</span>
                  </div>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <div className="bg-white p-1.5 sm:p-2 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] text-slate-500 font-medium">Ingresos</span>
                      <div className="w-3.5 h-3.5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <TrendingUp className="w-2.5 h-2.5" />
                      </div>
                    </div>
                    <p className="text-[11px] sm:text-xs font-bold text-slate-900">S/ 152,800</p>
                    <p className="text-[8px] sm:text-[9px] text-emerald-600 font-medium">
                      +12% vs. mes anterior
                    </p>
                  </div>

                  <div className="bg-white p-1.5 sm:p-2 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] text-slate-500 font-medium">Gastos</span>
                      <div className="w-3.5 h-3.5 rounded-md bg-red-50 text-red-500 flex items-center justify-center">
                        <TrendingDown className="w-2.5 h-2.5" />
                      </div>
                    </div>
                    <p className="text-[11px] sm:text-xs font-bold text-slate-900">S/ 48,230</p>
                    <p className="text-[8px] sm:text-[9px] text-red-500 font-medium">
                      -8% vs. mes anterior
                    </p>
                  </div>

                  <div className="bg-white p-1.5 sm:p-2 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] text-slate-500 font-medium">Saldo bancos</span>
                      <div className="w-3.5 h-3.5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Landmark className="w-2.5 h-2.5" />
                      </div>
                    </div>
                    <p className="text-[11px] sm:text-xs font-bold text-slate-900">S/ 104,570</p>
                    <p className="text-[8px] sm:text-[9px] text-emerald-600 font-medium">
                      +15% vs. mes anterior
                    </p>
                  </div>
                </div>

                {/* Charts preview inside screen */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {/* Flujo de efectivo bar chart */}
                  <div className="col-span-3 bg-white p-2 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[9px] font-semibold text-slate-700">
                      <span>Flujo de efectivo</span>
                      <div className="flex items-center gap-1.5 text-[8px] text-slate-400">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span>Ingresos</span>
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>Gastos</span>
                      </div>
                    </div>

                    {/* SVG Bar Chart */}
                    <div className="h-14 sm:h-18 flex items-end justify-between px-2 pt-1">
                      {[
                        { m: "Ene", h1: 45, h2: 25 },
                        { m: "Feb", h1: 60, h2: 35 },
                        { m: "Mar", h1: 85, h2: 40 },
                        { m: "Abr", h1: 70, h2: 30 },
                        { m: "May", h1: 90, h2: 45 },
                        { m: "Jun", h1: 78, h2: 38 },
                      ].map((bar, i) => (
                        <div key={i} className="flex flex-col items-center gap-0.5">
                          <div className="flex items-end gap-0.5 h-12">
                            <div
                              style={{ height: `${bar.h1}%` }}
                              className="w-2 sm:w-2.5 bg-blue-600 rounded-t-xs"
                            />
                            <div
                              style={{ height: `${bar.h2}%` }}
                              className="w-2 sm:w-2.5 bg-cyan-400 rounded-t-xs"
                            />
                          </div>
                          <span className="text-[7px] text-slate-400 font-medium">{bar.m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Donut Chart: Distribución de gastos */}
                  <div className="col-span-2 bg-white p-2 rounded-xl border border-slate-200/80 shadow-xs flex flex-col items-center justify-between">
                    <div className="w-full text-left text-[9px] font-semibold text-slate-700">
                      Distribución
                    </div>
                    {/* SVG Donut */}
                    <div className="relative w-12 h-12 flex items-center justify-center my-0.5">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="transparent"
                          stroke="#F1F5F9"
                          strokeWidth="3.5"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="transparent"
                          stroke="#2563EB"
                          strokeWidth="3.5"
                          strokeDasharray="37 100"
                          strokeDashoffset="0"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="transparent"
                          stroke="#14B8A6"
                          strokeWidth="3.5"
                          strokeDasharray="25 100"
                          strokeDashoffset="-37"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="transparent"
                          stroke="#F59E0B"
                          strokeWidth="3.5"
                          strokeDasharray="16 100"
                          strokeDashoffset="-62"
                        />
                      </svg>
                      <span className="absolute text-[8px] font-bold text-slate-800">
                        S/ 48K
                      </span>
                    </div>

                    <div className="w-full text-[7px] text-slate-500 space-y-0.5">
                      <div className="flex justify-between">
                        <span className="text-blue-600 font-medium">● Operación</span>
                        <span>42%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-teal-600 font-medium">● Personal</span>
                        <span>28%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REALISTIC KEYBOARD DECK BASE (Extending forward on table with trackpad) */}
        <div className="relative -mt-1 h-6 sm:h-8 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 rounded-b-2xl border-t border-slate-300 shadow-[0_12px_24px_rgba(0,0,0,0.15)] flex flex-col items-center justify-between p-1">
          {/* Hinge indentation */}
          <div className="w-20 h-1 bg-slate-400/80 rounded-full" />
          {/* Subtle trackpad notch */}
          <div className="w-24 h-2.5 sm:h-3.5 border border-slate-300/80 rounded-sm bg-slate-100/60 mb-0.5" />
        </div>
      </motion.div>
    </div>
  );
};
