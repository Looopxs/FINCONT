"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-8 sm:p-14 lg:p-16 text-white overflow-hidden shadow-2xl">
          {/* Decorative background glow & shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Cursive handwritten accent on the right */}
          <div className="absolute top-6 right-6 sm:right-12 pointer-events-none hidden md:block">
            <span
              className="text-slate-400/80 font-serif italic text-xl sm:text-2xl tracking-wide"
              style={{ fontFamily: "'Caveat', 'Dancing Script', 'Segoe Script', cursive" }}
            >
              Tu crecimiento también cuenta.
            </span>
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>CONTABILIDAD INTELIGENTE, RESULTADOS REALES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
              Menos tareas repetitivas.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-teal-300">
                Más control financiero.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Únete a más de 1,200 empresas que ya transformaron su contabilidad con FINCONT y ahorran hasta 15 horas a la semana.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 text-base"
              >
                Crear cuenta gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#contacto"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all text-base backdrop-blur-sm"
              >
                Solicitar asesoría
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
