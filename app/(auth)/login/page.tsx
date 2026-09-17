"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NexoraLogo } from "@/components/common/NexoraLogo";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    setError("");

    const res = login(email, password);
    if (!res.success) {
      setLoading(false);
      setError(res.error || "Credenciales inválidas.");
      return;
    }

    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 400);
  };

  const handleQuickDemo = () => {
    setEmail("demo@fincont.pe");
    setPassword("admin123");
    setLoading(true);
    login("demo@fincont.pe", "admin123");
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* 50% LEFT: Rich Branding, Value Props & Live Automation Showcase */}
      <div className="hidden lg:flex lg:col-span-6 relative bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white p-12 flex-col justify-between overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-md shadow-blue-500/30">
              FC
            </div>
            <div>
              <span className="font-heading text-2xl font-extrabold text-white tracking-tight block leading-none">
                FINCONT
              </span>
              <span className="text-[10px] text-blue-200 tracking-wide font-medium">
                tu cuenta al día
              </span>
            </div>
          </div>
        </div>

        {/* Center: Hero Product Preview & Concept */}
        <div className="relative z-10 my-auto space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Sistema Contable y Financiero 100% Automatizado</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Una operación.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-teal-300">
              Toda tu contabilidad en movimiento.
            </span>
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Factura, caja, bancos, saldos y asientos contables de partida doble, generados al instante desde un solo registro.
          </p>

          {/* Mini Live Automation Card */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 border-b border-slate-700/60 pb-2">
              <span>Flujo en Tiempo Real</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Activo
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700">
                <span className="text-blue-400 block font-bold">1. Operación</span>
                <span className="text-slate-400">Venta S/ 1,180</span>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700">
                <span className="text-teal-400 block font-bold">2. Comprobante</span>
                <span className="text-slate-400">FAC-00158</span>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700">
                <span className="text-sky-400 block font-bold">3. Banco BBVA</span>
                <span className="text-slate-400">+S/ 1,180</span>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700">
                <span className="text-emerald-400 block font-bold">4. Asiento</span>
                <span className="text-slate-400">12 vs 70/40</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="relative z-10 pt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encriptación bancaria SSL</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span>Plan Contable PCGE 2026</span>
          </div>
        </div>
      </div>

      {/* 50% RIGHT: Clean, Modern Login Form */}
      <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-[#FAFBFD]">
        {/* Mobile Header Brand */}
        <div className="flex lg:hidden items-center justify-between pb-6">
          <NexoraLogo href="/" size="sm" />
          <Link
            href="/"
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>

        {/* Main Form Container */}
        <div className="my-auto max-w-md w-full mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bienvenido a FINCONT
            </h1>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-0.5">
              tu cuenta al día
            </p>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              Ingresa tus credenciales para acceder al sistema contable.
            </p>
          </div>

          {/* One-Click Demo Evaluator Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full inline-block mb-1">
                Acceso Rápido de Evaluación
              </span>
              <p className="text-xs font-semibold text-slate-800">
                Empresa: Libertad S.A. (RUC 20304050601)
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                demo@fincont.pe / admin123
              </p>
            </div>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors whitespace-nowrap"
            >
              Ingresar con 1 clic →
            </button>
          </div>

          {/* Error alert if any */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Correo Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@empresa.pe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Contraseña Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 block">
                  Contraseña
                </label>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Para la demostración puedes usar la clave: admin123");
                  }}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className="text-xs font-medium text-slate-600">
                  Recordarme en este dispositivo
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] shadow-md shadow-blue-500/25 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Ingresando a FINCONT...</span>
                </div>
              ) : (
                <>
                  <span>Ingresar</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Link to Register */}
          <div className="text-center pt-2 text-xs text-slate-500">
            ¿Aún no tienes una cuenta empresarial?{" "}
            <Link
              href="/register"
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Registrar empresa
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 text-center text-xs text-slate-400">
          © 2026 FINCONT · tu cuenta al día. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
}
