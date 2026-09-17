"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NexoraLogo } from "@/components/common/NexoraLogo";
import {
  User,
  Mail,
  Lock,
  Building,
  FileBadge,
  MapPin,
  Phone,
  Coins,
  Calendar,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Loader2,
  CreditCard,
} from "lucide-react";
import { lookupDocument } from "@/lib/services/reniec-sunat-service";
import { useAuth } from "@/lib/auth/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUserAndCompany } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  // User details
  const [userForm, setUserForm] = useState({
    dni: "",
    name: "Cristhian",
    lastName: "Puescas",
    email: "cristhianpuescas@gmail.com",
    password: "",
    confirmPassword: "",
  });

  // Company details
  const [companyForm, setCompanyForm] = useState({
    legalName: "LIBERTAD S.A.",
    commercialName: "FINCONT Demo S.A.C.",
    taxId: "20304050601",
    address: "Calle Industrial 2429 - Trujillo, Perú",
    phone: "+51 (044) 284-920",
    email: "contacto@libertad.pe",
    currency: "PEN",
    accountingPeriod: "2025 - Diciembre",
  });

  const [error, setError] = useState("");
  const [lookingUpDni, setLookingUpDni] = useState(false);
  const [dniStatus, setDniStatus] = useState<string | null>(null);
  const [lookingUpRuc, setLookingUpRuc] = useState(false);
  const [rucStatus, setRucStatus] = useState<string | null>(null);

  const handleDniChange = async (val: string) => {
    const clean = val.replace(/\D/g, "");
    setUserForm((prev) => ({ ...prev, dni: clean }));
    setDniStatus(null);

    if (clean.length === 8) {
      setLookingUpDni(true);
      const res = await lookupDocument("DNI", clean);
      setLookingUpDni(false);
      if (res.success) {
        setUserForm((prev) => ({
          ...prev,
          name: res.nombres || prev.name,
          lastName: `${res.apellidoPaterno || ""} ${res.apellidoMaterno || ""}`.trim() || prev.lastName,
        }));
        setDniStatus("✓ RENIEC verificado");
      }
    }
  };

  const handleRucChange = async (val: string) => {
    const clean = val.replace(/\D/g, "");
    setCompanyForm((prev) => ({ ...prev, taxId: clean }));
    setRucStatus(null);

    if (clean.length === 11) {
      setLookingUpRuc(true);
      const res = await lookupDocument("RUC", clean);
      setLookingUpRuc(false);
      if (res.success && res.name) {
        setCompanyForm((prev) => ({
          ...prev,
          legalName: res.name,
          address: res.address || prev.address,
        }));
        setRucStatus("✓ SUNAT Activo y Habido");
      }
    }
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.lastName || !userForm.email || !userForm.password) {
      setError("Por favor completa todos los campos del usuario.");
      return;
    }
    if (userForm.password !== userForm.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyForm.legalName || !companyForm.taxId) {
      setError("Por favor completa los datos obligatorios de la empresa.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      registerUserAndCompany(
        {
          name: userForm.name.trim() || "Usuario",
          lastName: userForm.lastName.trim() || "",
          email: userForm.email.trim(),
          role: "ADMINISTRADOR",
        },
        {
          legalName: companyForm.legalName.trim(),
          commercialName: companyForm.commercialName?.trim() || companyForm.legalName.trim(),
          taxId: companyForm.taxId.trim(),
          address: companyForm.address.trim(),
          phone: companyForm.phone.trim(),
          email: companyForm.email.trim(),
          currency: (companyForm.currency as "PEN" | "USD") || "PEN",
          currencySymbol: companyForm.currency === "USD" ? "$" : "S/",
          accountingPeriod: companyForm.accountingPeriod.trim() || "2025 - Diciembre",
        },
        userForm.password
      );
    } catch (err) {
      console.error("Error registering account:", err);
    }

    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* 50% LEFT: Branding & Stepper Progress */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white p-12 flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand */}
        <div className="relative z-10">
          <NexoraLogo size="md" href="/" />
        </div>

        {/* Step Visualizer */}
        <div className="relative z-10 my-auto space-y-8 max-w-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Onboarding Empresarial
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Comienza a operar con FINCONT en 2 minutos.
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Configura tu cuenta de usuario y tu primera empresa contable para iniciar el registro inteligente.
            </p>
          </div>

          {/* Stepper indicators */}
          <div className="space-y-4">
            <div
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                step === 1
                  ? "bg-blue-600/20 border-blue-500 shadow-md shadow-blue-500/10"
                  : "bg-slate-800/60 border-slate-700/70 opacity-70"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                  step === 1 ? "bg-blue-600 text-white" : "bg-emerald-500 text-white"
                }`}
              >
                {step === 2 ? "✓" : "1"}
              </div>
              <div>
                <p className="text-sm font-bold text-white">1. Datos del usuario</p>
                <p className="text-xs text-slate-400">Nombre, correo y credenciales de acceso</p>
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                step === 2
                  ? "bg-blue-600/20 border-blue-500 shadow-md shadow-blue-500/10"
                  : "bg-slate-800/60 border-slate-700/70 opacity-70"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                  step === 2 ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
                }`}
              >
                2
              </div>
              <div>
                <p className="text-sm font-bold text-white">2. Configuración de empresa</p>
                <p className="text-xs text-slate-400">Razón social, RUC, moneda y periodo contable</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="relative z-10 pt-4 text-xs text-slate-400 border-t border-slate-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Plan Contable General Empresarial (PCGE) preinstalado</span>
        </div>
      </div>

      {/* 50% RIGHT: Form Wizard */}
      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-12 lg:p-14 bg-[#FAFBFD] overflow-y-auto">
        <div className="flex lg:hidden items-center justify-between pb-6">
          <NexoraLogo href="/" size="sm" />
          <span className="text-xs font-bold text-blue-600">Paso {step} de 2</span>
        </div>

        <div className="my-auto max-w-xl w-full mx-auto space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
              {error}
            </div>
          )}

          {/* STEP 1: USUARIO */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-4 animate-in fade-in duration-300">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  Paso 1 de 2
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                  Crea tu cuenta personal
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Ingresa tus datos personales para crear tu acceso como Administrador.
                </p>
              </div>

              {/* DNI with RENIEC Auto-fill */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">DNI (Autocompletar con RENIEC)</label>
                  {lookingUpDni && (
                    <span className="text-[10px] text-blue-600 flex items-center gap-1 font-semibold animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Consultando RENIEC...
                    </span>
                  )}
                  {dniStatus && !lookingUpDni && (
                    <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      {dniStatus}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    maxLength={8}
                    value={userForm.dni}
                    onChange={(e) => handleDniChange(e.target.value)}
                    placeholder="Ingresa tu DNI (8 dígitos) para autocompletar tus nombres"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Nombres *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={userForm.name}
                      onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                      placeholder="Juan"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Apellidos *</label>
                  <input
                    type="text"
                    required
                    value={userForm.lastName}
                    onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                    placeholder="Martínez"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Correo electrónico *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    placeholder="juan.martinez@empresa.pe"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Contraseña *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      value={userForm.password}
                      onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Confirmar contraseña *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      value={userForm.confirmPassword}
                      onChange={(e) => setUserForm({ ...userForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <span>Continuar a datos de empresa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: EMPRESA */}
          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Paso 2 de 2
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                    Configuración de tu empresa
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Ingresa los datos fiscales y la moneda principal de trabajo.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Atrás</span>
                </button>
              </div>

              {/* RUC Input with SUNAT auto-complete */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    RUC / Identificación fiscal * (Autocompletar con SUNAT)
                  </label>
                  {lookingUpRuc && (
                    <span className="text-[10px] text-blue-600 flex items-center gap-1 font-semibold animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Consultando SUNAT...
                    </span>
                  )}
                  {rucStatus && !lookingUpRuc && (
                    <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      {rucStatus}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <FileBadge className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    maxLength={11}
                    value={companyForm.taxId}
                    onChange={(e) => handleRucChange(e.target.value)}
                    placeholder="Ingresa tu RUC (11 dígitos) para autocompletar razón social"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Razón social *</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={companyForm.legalName}
                      onChange={(e) => setCompanyForm({ ...companyForm, legalName: e.target.value })}
                      placeholder="LIBERTAD S.A."
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Nombre comercial</label>
                  <input
                    type="text"
                    value={companyForm.commercialName}
                    onChange={(e) => setCompanyForm({ ...companyForm, commercialName: e.target.value })}
                    placeholder="FINCONT Demo S.A.C."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Dirección fiscal</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={companyForm.address}
                      onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                      placeholder="Calle Industrial 2429 - Trujillo, Perú"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Teléfono</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={companyForm.phone}
                      onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                      placeholder="+51 (044) 284-920"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Moneda base</label>
                  <div className="relative">
                    <Coins className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={companyForm.currency}
                      onChange={(e) => setCompanyForm({ ...companyForm, currency: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                    >
                      <option value="PEN">PEN - Soles (S/)</option>
                      <option value="USD">USD - Dólares ($)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Periodo contable</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={companyForm.accountingPeriod}
                      onChange={(e) => setCompanyForm({ ...companyForm, accountingPeriod: e.target.value })}
                      placeholder="2025 - Diciembre"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] shadow-md shadow-blue-500/20 transition-all text-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Inicializando plan contable...</span>
                    </div>
                  ) : (
                    <>
                      <span>Finalizar y abrir Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Link to Login */}
          <div className="text-center pt-3 text-xs text-slate-500">
            ¿Ya tienes una cuenta registrada?{" "}
            <Link
              href="/login"
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>

        <div className="pt-6 text-center text-xs text-slate-400">
          © 2026 FINCONT · tu cuenta al día. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
}
