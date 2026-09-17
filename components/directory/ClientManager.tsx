"use client";

import React, { useState } from "react";
import { INITIAL_CLIENTS, Client } from "@/lib/data/directory-store";
import {
  Users,
  Search,
  Plus,
  Building2,
  Mail,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  Edit2,
  Trash2,
  X,
  FileText,
  Filter,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { lookupDocument } from "@/lib/services/reniec-sunat-service";

export const ClientManager: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // Form state
  const [docType, setDocType] = useState<"RUC" | "DNI">("RUC");
  const [docNumber, setDocNumber] = useState("");
  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState("");
  const [lookingUp, setLookingUp] = useState(false);
  const [lookupStatus, setLookupStatus] = useState<string | null>(null);

  // Metrics
  const totalClients = clients.length;
  const totalInvoiced = clients.reduce((sum, c) => sum + c.totalInvoiced, 0);
  const totalPending = clients.reduce((sum, c) => sum + c.pendingBalance, 0);
  const upToDateCount = clients.filter((c) => c.status === "Al día").length;

  const handleDocNumberChange = async (val: string) => {
    const clean = val.replace(/\D/g, "");
    setDocNumber(clean);
    setLookupStatus(null);

    const targetLength = docType === "RUC" ? 11 : 8;
    if (clean.length === targetLength) {
      setLookingUp(true);
      const res = await lookupDocument(docType, clean);
      setLookingUp(false);
      if (res.success && res.name) {
        setName(res.name);
        if (res.address) setAddress(res.address);
        setLookupStatus(docType === "DNI" ? "✓ RENIEC verificado" : "✓ SUNAT Activo y Habido");
      }
    }
  };

  const handleOpenCreate = () => {
    setEditingClient(null);
    setDocType("RUC");
    setDocNumber("");
    setName("");
    setContactName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setFormError("");
    setLookupStatus(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (c: Client) => {
    setEditingClient(c);
    setDocType(c.docType);
    setDocNumber(c.docNumber);
    setName(c.name);
    setContactName(c.contactName);
    setEmail(c.email);
    setPhone(c.phone);
    setAddress(c.address);
    setFormError("");
    setLookupStatus(null);
    setModalOpen(true);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNumber.trim() || !name.trim()) {
      setFormError("El documento y la razón social son obligatorios");
      return;
    }
    if (docType === "RUC" && docNumber.trim().length !== 11) {
      setFormError("El RUC debe tener exactamente 11 dígitos");
      return;
    }
    if (docType === "DNI" && docNumber.trim().length !== 8) {
      setFormError("El DNI debe tener exactamente 8 dígitos");
      return;
    }

    if (editingClient) {
      setClients((prev) =>
        prev.map((c) =>
          c.id === editingClient.id
            ? {
                ...c,
                docType,
                docNumber: docNumber.trim(),
                name: name.trim(),
                contactName: contactName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                address: address.trim(),
              }
            : c
        )
      );
    } else {
      const newClient: Client = {
        id: `cli-${Date.now()}`,
        docType,
        docNumber: docNumber.trim(),
        name: name.trim(),
        contactName: contactName.trim() || "Representante",
        email: email.trim() || "contacto@empresa.pe",
        phone: phone.trim() || "+51 900 000 000",
        address: address.trim() || "Lima, Perú",
        totalInvoiced: 0.0,
        pendingBalance: 0.0,
        status: "Al día",
        invoicesCount: 0,
      };
      setClients([newClient, ...clients]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este cliente?")) {
      setClients((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Filtered clients
  const filteredClients = clients.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      c.name.toLowerCase().includes(q) ||
      c.docNumber.includes(q) ||
      c.contactName.toLowerCase().includes(q);
    const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Directorio de Clientes</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-blue-50 text-blue-600">
              Cartera Cta 1212
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestión comercial y trazabilidad de cobranzas
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-blue-500/25 transition-all hover:shadow-md active:scale-95 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* 4 Financial Metric Cards (2x2 grid on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5 sm:space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate block">Total Clientes</span>
          <p className="text-lg sm:text-2xl font-extrabold text-slate-900 font-mono">{totalClients}</p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600 truncate block">Registrados</span>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5 sm:space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate block">Total Facturado</span>
          <p className="text-lg sm:text-2xl font-extrabold text-slate-900 font-mono">
            S/ {totalInvoiced.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 truncate block">Ventas acumuladas</span>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5 sm:space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate block">Por Cobrar (1212)</span>
          <p className="text-lg sm:text-2xl font-extrabold text-amber-600 font-mono">
            S/ {totalPending.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-amber-600 truncate block">Saldos pendientes</span>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5 sm:space-y-1">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 truncate block">Clientes al Día</span>
          <p className="text-lg sm:text-2xl font-extrabold text-emerald-600 font-mono">{upToDateCount}</p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 truncate block">0 deuda pendiente</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por RUC, nombre o contacto..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Estado:</span>
          <div className="flex rounded-xl border border-slate-200 p-0.5 bg-slate-50 text-xs font-semibold">
            {[
              { id: "ALL", label: "Todos" },
              { id: "Al día", label: "Al día" },
              { id: "Por Cobrar", label: "Por Cobrar" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === f.id
                    ? "bg-white text-blue-600 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px] bg-[#FAFBFD]">
                <th className="py-3 px-4 w-32">Documento</th>
                <th className="py-3 px-4">Cliente / Razón Social</th>
                <th className="py-3 px-4">Contacto & Correo</th>
                <th className="py-3 px-4 text-right">Total Facturado</th>
                <th className="py-3 px-4 text-right">Saldo en Cartera</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-center w-24">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredClients.length > 0 ? (
                filteredClients.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Document */}
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600 whitespace-nowrap">
                      <span className="text-[10px] text-slate-400 block font-normal">{c.docType}</span>
                      {c.docNumber}
                    </td>

                    {/* Name & Address */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs">{c.address}</p>
                    </td>

                    {/* Contact & Email */}
                    <td className="py-3.5 px-4">
                      <p className="text-slate-800 font-semibold">{c.contactName}</p>
                      <p className="text-[11px] text-slate-400 truncate">{c.email} · {c.phone}</p>
                    </td>

                    {/* Total Invoiced */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      S/ {c.totalInvoiced.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                    </td>

                    {/* Pending Balance */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold whitespace-nowrap">
                      <span
                        className={c.pendingBalance > 0 ? "text-amber-600 font-extrabold" : "text-slate-400"}
                      >
                        S/ {c.pendingBalance.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          c.status === "Al día"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {c.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Editar cliente"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Eliminar cliente"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No se encontraron clientes que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT CLIENT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAFBFD]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingClient ? "Editar Cliente" : "Nuevo Cliente"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="p-6 space-y-4 text-xs">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-semibold">
                  {formError}
                </div>
              )}

              {/* Doc Type & Number */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipo Doc.</label>
                  <select
                    value={docType}
                    onChange={(e) => {
                      setDocType(e.target.value as any);
                      setDocNumber("");
                      setLookupStatus(null);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold"
                  >
                    <option value="RUC">RUC (11)</option>
                    <option value="DNI">DNI (8)</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700 block">Número de Documento</label>
                    {lookingUp && (
                      <span className="text-[10px] text-blue-600 flex items-center gap-1 font-semibold animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Buscando en {docType === "DNI" ? "RENIEC" : "SUNAT"}...
                      </span>
                    )}
                    {lookupStatus && !lookingUp && (
                      <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        {lookupStatus}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={docNumber}
                    onChange={(e) => handleDocNumberChange(e.target.value)}
                    placeholder={docType === "RUC" ? "20100070970 (11 dígitos)" : "40556781 (8 dígitos)"}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={docType === "RUC" ? 11 : 8}
                    required
                  />
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {docType === "DNI" ? "Nombre Completo (Autocompletado RENIEC)" : "Razón Social (Autocompletado SUNAT)"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={docType === "DNI" ? "Ej: JUAN PEREZ LOPEZ" : "Ej: Distribuidora Lima S.A.C."}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Contact Person & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Persona de Contacto</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Ej: Carlos Mendoza"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+51 987 654 321"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Email & Address */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="facturacion@empresa.pe"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Dirección Fiscal</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Av. Nicolás de Piérola 450, Lima"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
                >
                  {editingClient ? "Guardar Cambios" : "Crear Cliente"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
