"use client";

import React, { useState } from "react";
import { INITIAL_SUPPLIERS, Supplier } from "@/lib/data/directory-store";
import {
  Truck,
  Search,
  Plus,
  Building2,
  Mail,
  Phone,
  Landmark,
  ShieldCheck,
  Edit2,
  Trash2,
  X,
  CreditCard,
} from "lucide-react";

export const SupplierManager: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  // Form state
  const [ruc, setRuc] = useState("");
  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bankName, setBankName] = useState("BBVA Continental");
  const [bankAccount, setBankAccount] = useState("");
  const [cci, setCci] = useState("");
  const [formError, setFormError] = useState("");

  // Metrics
  const totalSuppliers = suppliers.length;
  const totalPurchased = suppliers.reduce((sum, s) => sum + s.totalPurchased, 0);
  const totalPending = suppliers.reduce((sum, s) => sum + s.pendingBalance, 0);
  const upToDateCount = suppliers.filter((s) => s.status === "Al día").length;

  const handleOpenCreate = () => {
    setEditingSupplier(null);
    setRuc("");
    setName("");
    setContactName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setBankName("BBVA Continental");
    setBankAccount("");
    setCci("");
    setFormError("");
    setModalOpen(true);
  };

  const handleOpenEdit = (s: Supplier) => {
    setEditingSupplier(s);
    setRuc(s.ruc);
    setName(s.name);
    setContactName(s.contactName);
    setEmail(s.email);
    setPhone(s.phone);
    setAddress(s.address);
    setBankName(s.bankName);
    setBankAccount(s.bankAccount);
    setCci(s.cci);
    setFormError("");
    setModalOpen(true);
  };

  const handleSaveSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruc.trim() || !name.trim()) {
      setFormError("El RUC y la razón social son obligatorios");
      return;
    }
    if (ruc.trim().length !== 11) {
      setFormError("El RUC debe tener exactamente 11 dígitos");
      return;
    }

    if (editingSupplier) {
      setSuppliers((prev) =>
        prev.map((s) =>
          s.id === editingSupplier.id
            ? {
                ...s,
                ruc: ruc.trim(),
                name: name.trim(),
                contactName: contactName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                address: address.trim(),
                bankName: bankName.trim(),
                bankAccount: bankAccount.trim(),
                cci: cci.trim(),
              }
            : s
        )
      );
    } else {
      const newSupplier: Supplier = {
        id: `sup-${Date.now()}`,
        ruc: ruc.trim(),
        name: name.trim(),
        contactName: contactName.trim() || "Contacto Comercial",
        email: email.trim() || "ventas@proveedor.pe",
        phone: phone.trim() || "+51 1 500 0000",
        address: address.trim() || "Lima, Perú",
        bankName: bankName.trim() || "BBVA Continental",
        bankAccount: bankAccount.trim() || "0011-0000-0000000000",
        cci: cci.trim() || "011-000-000000000000-00",
        totalPurchased: 0.0,
        pendingBalance: 0.0,
        status: "Al día",
        purchasesCount: 0,
      };
      setSuppliers([newSupplier, ...suppliers]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este proveedor?")) {
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Filtered suppliers
  const filteredSuppliers = suppliers.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      s.name.toLowerCase().includes(q) ||
      s.ruc.includes(q) ||
      s.contactName.toLowerCase().includes(q);
    const matchStatus = statusFilter === "ALL" || s.status === statusFilter;
    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Directorio de Proveedores</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
              Cuentas por Pagar Cta 4212
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Gestión de acreedores comerciales, cuentas bancarias de abono y pagos programados
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-blue-500/25 transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Proveedor</span>
        </button>
      </div>

      {/* 4 Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">Total Proveedores</span>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">{totalSuppliers}</p>
          <span className="text-[11px] font-semibold text-blue-600">Acreedores activos</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">Compras Acumuladas</span>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">
            S/ {totalPurchased.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] font-semibold text-emerald-600">Gastos e insumos</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">Por Pagar (Cta 4212)</span>
          <p className="text-2xl font-extrabold text-rose-600 font-mono">
            S/ {totalPending.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] font-semibold text-rose-600">Pendiente de abono</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">Proveedores al Día</span>
          <p className="text-2xl font-extrabold text-emerald-600 font-mono">{upToDateCount}</p>
          <span className="text-[11px] font-semibold text-emerald-600">Sin deudas vencidas</span>
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
            placeholder="Buscar por RUC o razón social..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Estado:</span>
          <div className="flex rounded-xl border border-slate-200 p-0.5 bg-slate-50 text-xs font-semibold">
            {[
              { id: "ALL", label: "Todos" },
              { id: "Al día", label: "Al día" },
              { id: "Por Pagar", label: "Por Pagar" },
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

      {/* Suppliers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px] bg-[#FAFBFD]">
                <th className="py-3 px-4 w-32">RUC</th>
                <th className="py-3 px-4">Proveedor / Razón Social</th>
                <th className="py-3 px-4">Cuenta Bancaria para Abonos</th>
                <th className="py-3 px-4 text-right">Total Comprado</th>
                <th className="py-3 px-4 text-right">Saldo Pendiente (4212)</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-center w-24">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* RUC */}
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600 whitespace-nowrap">
                      {s.ruc}
                    </td>

                    {/* Name & Contact */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{s.name}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs">
                        {s.contactName} · {s.email}
                      </p>
                    </td>

                    {/* Bank details */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                        <Landmark className="w-3.5 h-3.5 text-blue-600" />
                        <span>{s.bankName}</span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-400 truncate">
                        Cta: {s.bankAccount}
                      </p>
                    </td>

                    {/* Total Purchased */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      S/ {s.totalPurchased.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                    </td>

                    {/* Pending Balance */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold whitespace-nowrap">
                      <span
                        className={s.pendingBalance > 0 ? "text-rose-600 font-extrabold" : "text-slate-400"}
                      >
                        S/ {s.pendingBalance.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          s.status === "Al día"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {s.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Editar proveedor"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Eliminar proveedor"
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
                    No se encontraron proveedores que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT SUPPLIER MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAFBFD]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingSupplier ? "Editar Proveedor" : "Nuevo Proveedor"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSupplier} className="p-6 space-y-4 text-xs">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-semibold">
                  {formError}
                </div>
              )}

              {/* RUC & Name */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">RUC (11)</label>
                  <input
                    type="text"
                    value={ruc}
                    onChange={(e) => setRuc(e.target.value)}
                    placeholder="20100132592"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={11}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Razón Social</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Aceros Arequipa S.A."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Contact Person & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contacto Comercial</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Ej: Ventas Industriales"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+51 1 517-1800"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Email & Address */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="facturacion@proveedor.pe"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dirección Fiscal</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Av. Enrique Meiggs 297, Callao"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Bank details */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Datos de Pago / Transferencia
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Banco</label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold"
                    >
                      <option>BBVA Continental</option>
                      <option>BCP</option>
                      <option>Interbank</option>
                      <option>Scotiabank</option>
                      <option>Banco de la Nación</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">N° Cuenta</label>
                    <input
                      type="text"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      placeholder="0011-0182-0100034921"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">CCI (Interbancario)</label>
                    <input
                      type="text"
                      value={cci}
                      onChange={(e) => setCci(e.target.value)}
                      placeholder="011-182-000100034921-12"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
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
                  {editingSupplier ? "Guardar Cambios" : "Crear Proveedor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
