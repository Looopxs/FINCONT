"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChevronDown, MoreHorizontal } from "lucide-react";

export const FinancialCharts: React.FC = () => {
  const [periodFilter, setPeriodFilter] = useState("Mensual");

  const barData = [
    { month: "Ene", ingresos: 45000, gastos: 24000 },
    { month: "Feb", ingresos: 62000, gastos: 31000 },
    { month: "Mar", ingresos: 68230, gastos: 32120 },
    { month: "Abr", ingresos: 72000, gastos: 38000 },
    { month: "May", ingresos: 89000, gastos: 41000 },
    { month: "Jun", ingresos: 94000, gastos: 44000 },
    { month: "Jul", ingresos: 85000, gastos: 39000 },
    { month: "Ago", ingresos: 78000, gastos: 35000 },
    { month: "Sep", ingresos: 92000, gastos: 46000 },
    { month: "Oct", ingresos: 104000, gastos: 49000 },
    { month: "Nov", ingresos: 115000, gastos: 52000 },
    { month: "Dic", ingresos: 152800, gastos: 48230 },
  ];

  const donutData = [
    { name: "Operación", value: 42, amount: "S/ 20,256", color: "#2563EB" },
    { name: "Personal", value: 28, amount: "S/ 13,504", color: "#14B8A6" },
    { name: "Administración", value: 18, amount: "S/ 8,681", color: "#3B82F6" },
    { name: "Impuestos", value: 8, amount: "S/ 3,858", color: "#10B981" },
    { name: "Otros", value: 4, amount: "S/ 1,929", color: "#94A3B8" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
      {/* 1. Bar Chart: Ingresos vs egresos (Span 8) */}
      <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.04)] flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Ingresos vs egresos</h3>
            <p className="text-xs text-slate-400">Evolución mensual de flujo de caja</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Legend */}
            <div className="flex items-center gap-3 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Ingresos</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span>Gastos</span>
              </div>
            </div>

            {/* Selector */}
            <div className="flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 cursor-pointer">
              <span>{periodFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barGap={4}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                tickFormatter={(v) => `${v / 1000}K`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl border border-slate-800">
                        <p className="font-bold mb-1">{label} 2024</p>
                        <p className="text-blue-400 font-semibold">
                          Ingresos: S/ {payload[0].value?.toLocaleString()}
                        </p>
                        <p className="text-sky-300 font-semibold">
                          Gastos: S/ {payload[1].value?.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="ingresos" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={18} />
              <Bar dataKey="gastos" fill="#60A5FA" radius={[4, 4, 0, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Donut Chart: Distribución de gastos (Span 4) */}
      <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.04)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Distribución de gastos</h3>
            <p className="text-xs text-slate-400">Categorización según plan contable</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Center Donut Graphic */}
        <div className="relative h-44 sm:h-48 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val, name) => [`${val}%`, name]}
                contentStyle={{ borderRadius: "12px", fontSize: "11px" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-slate-400 font-medium">Total gastos</span>
            <span className="text-base font-extrabold text-slate-900">S/ 48,230</span>
          </div>
        </div>

        {/* Categories Legend */}
        <div className="mt-4 space-y-2 text-xs">
          {donutData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-mono">{item.amount}</span>
                <span className="font-bold text-slate-800 w-8 text-right">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
