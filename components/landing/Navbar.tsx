"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NexoraLogo } from "@/components/common/NexoraLogo";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Inicio", href: "#inicio", id: "inicio" },
    { label: "Funcionalidades", href: "#funcionalidades", id: "funcionalidades" },
    { label: "Soluciones", href: "#soluciones", id: "soluciones" },
    { label: "Cómo funciona", href: "#como-funciona", id: "como-funciona" },
    { label: "Precios", href: "#precios", id: "precios" },
    { label: "Contacto", href: "#contacto", id: "contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-white/88 backdrop-blur-md border-b border-slate-200/60 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.05)] py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <NexoraLogo href="#inicio" size="md" />

          {/* Desktop Navigation Links with animated active indicator */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/60 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.04)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-600 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right CTAs */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-3">
            <a
              href="#demostracion"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs lg:text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 rounded-xl transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Ver demo visual</span>
            </a>
            <Link
              href="/login"
              className="px-3.5 py-2 text-xs lg:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/70 rounded-xl transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-xl text-xs lg:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-[0_4px_14px_rgba(37,99,235,0.25)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Crear cuenta</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/login"
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Ingresar
            </Link>
            <Link
              href="/register"
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg shadow-xs"
            >
              Registro
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100/80 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 p-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-2xl flex flex-col gap-1.5"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="#demostracion"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-blue-600 bg-blue-50/80 hover:bg-blue-100 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ver demo visual</span>
              </a>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-colors"
              >
                Crear cuenta
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};
