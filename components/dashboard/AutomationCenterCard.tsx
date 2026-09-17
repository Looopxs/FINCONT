"use client";

import React, { useState } from "react";
import {
  FilePlus,
  Receipt,
  Landmark,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Play,
  RotateCcw,
} from "lucide-react";

export const AutomationCenterCard: React.FC<{ onTriggerSim?: () => void }> = ({ onTriggerSim }) => {
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(5);

  const steps = [
    {
      id: 1,
      title: "Operación registrada",
      time: "Hace 2 min",
      icon: FilePlus,
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: 2,
      title: "Comprobante generado",
      time: "Hace 2 min",
      icon: Receipt,
      color: "text-teal-600 bg-teal-50",
    },
    {
      id: 3,
      title: "Movimiento en banco",
      time: "Hace 1 min",
      icon: Landmark,
      color: "text-sky-600 bg-sky-50",
    },
    {
      id: 4,
      title: "Saldos actualizados",
      time: "Hace 1 min",
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      id: 5,
      title: "Asiento contable creado",
      time: "Hace 1 min",
      icon: BookOpen,
      color: "text-indigo-600 bg-indigo-50",
    },
  ];

  const handleRunSim = () => {
    setSimulating(true);
    setSimStep(1);
    const timer1 = setTimeout(() => setSimStep(2), 700);
    const timer2 = setTimeout(() => setSimStep(3), 1400);
    const timer3 = setTimeout(() => setSimStep(4), 2100);
    const timer4 = setTimeout(() => {
      setSimStep(5);
      setSimulating(false);
      if (onTriggerSim) onTriggerSim();
    }, 2800);
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.04)] select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Centro de automatización</h3>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Motor Activo
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Tu contabilidad, en piloto automático.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Todo funcionando correctamente</span>
          </div>

          <button
            onClick={handleRunSim}
            disabled={simulating}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs disabled:opacity-50"
          >
            {simulating ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulando flujo...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Simular operación</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5-Step Process Horizontal Bar (Matching Image 3) */}
      <div className="flex sm:grid sm:grid-cols-5 overflow-x-auto gap-2.5 sm:gap-4 pb-2 sm:pb-0 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = step.id <= simStep;
          const isCurrent = step.id === simStep;

          return (
            <div
              key={step.id}
              className={`flex flex-col items-center text-center p-2.5 sm:p-3 rounded-xl border transition-all shrink-0 w-[135px] sm:w-auto sm:flex-1 ${
                isCurrent
                  ? "bg-blue-50/60 border-blue-400 shadow-xs scale-102"
                  : isDone
                  ? "bg-[#FAFBFD] border-slate-200"
                  : "bg-slate-50 border-slate-200/60 opacity-60"
              }`}
            >
              <div
                className={`relative w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 shadow-xs transition-all ${
                  isCurrent
                    ? "bg-blue-600 text-white shadow-blue-500/25 scale-105"
                    : isDone
                    ? `${step.color} border border-slate-200/60`
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                <Icon className="w-5 h-5" />
                {isDone && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-slate-800 leading-tight mb-1">
                {step.title}
              </h4>
              <span className="text-[10px] text-slate-400 font-medium">
                {step.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
