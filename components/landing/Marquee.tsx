"use client";

import React from "react";
import {
  FileText,
  Landmark,
  BookOpen,
  BarChart3,
  Users2,
  Zap,
} from "lucide-react";

export const Marquee: React.FC = () => {
  const items = [
    { label: "Facturación", icon: FileText, color: "text-blue-600 bg-blue-50/80 border-blue-100" },
    { label: "Caja y Bancos", icon: Landmark, color: "text-emerald-600 bg-emerald-50/80 border-emerald-100" },
    { label: "Contabilidad", icon: BookOpen, color: "text-indigo-600 bg-indigo-50/80 border-indigo-100" },
    { label: "Reportes", icon: BarChart3, color: "text-teal-600 bg-teal-50/80 border-teal-100" },
    { label: "Clientes", icon: Users2, color: "text-sky-600 bg-sky-50/80 border-sky-100" },
    { label: "Automatización", icon: Zap, color: "text-purple-600 bg-purple-50/80 border-purple-100" },
  ];

  // Repeat items for seamless infinite horizontal translation
  const fullList = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full py-5 border-y border-slate-200/60 bg-white/60 backdrop-blur-xs overflow-hidden select-none">
      <div className="marquee-container relative w-full overflow-hidden">
        {/* Soft Lateral Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-28 sm:w-40 bg-gradient-to-r from-[#F7F9FC] via-[#F7F9FC]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 sm:w-40 bg-gradient-to-l from-[#F7F9FC] via-[#F7F9FC]/80 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-5 w-max animate-marquee hover:[animation-play-state:paused] py-1">
          {fullList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.03)] hover:shadow-[0_4px_16px_-4px_rgba(37,99,235,0.1)] hover:border-blue-200/80 transition-all duration-200 cursor-default"
              >
                <div
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 tracking-tight whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
