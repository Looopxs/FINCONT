"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NexoraLogo } from "@/components/common/NexoraLogo";
import { ArrowRight, CheckCircle2, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="contacto" className="bg-white border-t border-slate-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-100">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <NexoraLogo size="md" />
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Contabilidad inteligente para empresas que van más lejos. Factura, caja, bancos y asientos automatizados en un solo lugar.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer text-xs font-bold">
                in
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer text-xs font-bold">
                yt
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer text-xs font-bold">
                x
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer text-xs font-bold">
                ig
              </span>
            </div>
          </div>

          {/* Links 1: Producto */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Producto
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li>
                <a href="#funcionalidades" className="hover:text-blue-600 transition-colors">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-blue-600 transition-colors">
                  Automatización
                </a>
              </li>
              <li>
                <a href="#soluciones" className="hover:text-blue-600 transition-colors">
                  Reportes
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
                  Plan Contable PCGE
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2: Empresa */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Empresa
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li>
                <a href="#inicio" className="hover:text-blue-600 transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-blue-600 transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  Prensa
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  Casos de éxito
                </span>
              </li>
            </ul>
          </div>

          {/* Links 3: Recursos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Recursos
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  Centro de ayuda
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  Documentación API
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  Guías PCGE
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  Webinars
                </span>
              </li>
            </ul>
          </div>

          {/* Links 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Recibe novedades
            </h4>
            <p className="text-xs text-slate-500">
              Actualizaciones contables y mejoras de la plataforma.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>¡Gracias por suscribirte!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                    aria-label="Suscribirse"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <label className="flex items-center gap-2 text-[10px] text-slate-400 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Acepto recibir novedades de FINCONT</span>
                </label>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 FINCONT · tu cuenta al día. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline-block" />
            <span>para empresas que construyen el mañana.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
