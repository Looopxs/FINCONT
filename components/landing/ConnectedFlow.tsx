"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FilePlus,
  Receipt,
  Landmark,
  BookOpen,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

export const ConnectedFlow: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "operacion",
      title: "Operación",
      badge: "Paso 1",
      description: "Registras una venta, compra o movimiento una sola vez.",
      metric: "Origen único",
      icon: FilePlus,
      color: "text-blue-600",
      bgLight: "bg-blue-50/80",
      borderActive: "border-blue-500 ring-4 ring-blue-500/15",
    },
    {
      id: "comprobante",
      title: "Comprobante",
      badge: "Paso 2",
      description: "Se genera la factura, boleta o recibo automáticamente.",
      metric: "Formato SUNAT / PDF",
      icon: Receipt,
      color: "text-teal-600",
      bgLight: "bg-teal-50/80",
      borderActive: "border-teal-500 ring-4 ring-teal-500/15",
    },
    {
      id: "caja-bancos",
      title: "Caja / Bancos",
      badge: "Paso 3",
      description: "Se actualizan tus saldos en efectivo y cuentas corrientes.",
      metric: "Formatos 1.1 y 1.2",
      icon: Landmark,
      color: "text-sky-600",
      bgLight: "bg-sky-50/80",
      borderActive: "border-sky-500 ring-4 ring-sky-500/15",
    },
    {
      id: "contabilidad",
      title: "Contabilidad",
      badge: "Paso 4",
      description: "Se crean los asientos contables de partida doble en el Libro Diario.",
      metric: "PCGE balanceado",
      icon: BookOpen,
      color: "text-indigo-600",
      bgLight: "bg-indigo-50/80",
      borderActive: "border-indigo-500 ring-4 ring-indigo-500/15",
    },
    {
      id: "reportes",
      title: "Reportes",
      badge: "Paso 5",
      description: "Tu información financiera consolidada y lista para decidir.",
      metric: "Diario, Mayor y Balance",
      icon: BarChart3,
      color: "text-emerald-600",
      bgLight: "bg-emerald-50/80",
      borderActive: "border-emerald-500 ring-4 ring-emerald-500/15",
    },
  ];

  // Progressive scroll-based / interval illumination when in view
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [isInView, steps.length]);

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] via-white to-[#F7F9FC]"
    >
      {/* Subtle Background Connected Geometry */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-blue-50/50 rounded-full blur-3xl" />
        {/* Fine background node lines */}
        <svg className="absolute w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100/80 text-blue-600 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-blue-500" />
            <span>Automatización en tiempo real</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Una operación. Todo conectado.
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Registra una vez y deja que FINCONT haga el resto.
          </p>
        </div>

        {/* 5-Node Connected Flow (Horizontal on lg/md) */}
        <div className="relative">
          {/* Connecting Track Line */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-slate-200/90 z-0">
            {/* Illuminated fill line with glowing tip */}
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600"
              initial={{ width: "0%" }}
              animate={{
                width: `${(activeStep / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = idx === activeStep;
              const isPassed = idx <= activeStep;

              return (
                <motion.div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  whileHover={{ y: -4 }}
                  className={`cursor-pointer transition-all duration-300 flex flex-col items-center text-center p-5 rounded-3xl bg-white border ${
                    isCurrent
                      ? `${step.borderActive} shadow-[0_12px_32px_-6px_rgba(37,99,235,0.15)]`
                      : isPassed
                      ? "border-slate-200/90 shadow-card"
                      : "border-slate-200/60 opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Icon Circle */}
                  <div
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      isCurrent
                        ? "bg-blue-600 text-white shadow-[0_6px_20px_rgba(37,99,235,0.3)] scale-105"
                        : isPassed
                        ? `${step.bgLight} ${step.color} border border-slate-200/80`
                        : "bg-slate-100 text-slate-400 border border-slate-200/60"
                    }`}
                  >
                    <Icon className="w-7 h-7" />

                    {/* Step Check Status Badge */}
                    {isPassed && (
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Step Badge */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-1">
                    {step.badge}
                  </span>

                  {/* Step Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {step.description}
                  </p>

                  {/* Feature Pill */}
                  <div className="mt-3 pt-3 border-t border-slate-100 w-full flex items-center justify-center gap-1 text-[11px] font-medium text-slate-400">
                    <span>{step.metric}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Live Simulation Banner */}
        <div className="mt-12 bg-white/95 rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                ¿Quieres probar el flujo completo con datos reales del Excel?
              </p>
              <p className="text-xs text-slate-500">
                Registra una venta de S/ 1,180.00 y observa cómo se actualiza automáticamente comprobante, caja, banco y asiento contable.
              </p>
            </div>
          </div>

          <a
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm whitespace-nowrap hover:shadow-md"
          >
            Abrir simulador en vivo
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
