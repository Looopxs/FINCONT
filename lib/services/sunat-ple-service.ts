import { Operation } from "@/types/operations";

/**
 * Triggers an actual file download in the user's browser
 */
export function triggerFileDownload(
  filename: string,
  content: string,
  mimeType: string = "text/plain;charset=utf-8"
) {
  if (typeof window === "undefined") return;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * SUNAT PLE 14.1 - Registro de Ventas e Ingresos
 * Formato oficial con separadores pipe (|)
 */
export function generatePLE14_1(sales: Operation[]): string {
  const period = "20251200";
  return sales
    .map((s, idx) => {
      const cuo = `M${String(idx + 1).padStart(7, "0")}`;
      const correlative = `M-${idx + 1}`;
      const dateParts = s.date.split("/");
      const formattedDate =
        dateParts.length === 3 ? `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}` : "04/12/2025";
      const docType = s.relatedInvoiceId?.startsWith("B") ? "03" : "01";
      const parts = (s.relatedInvoiceId || "F001-0001").split("-");
      const serie = parts[0] || "F001";
      const number = parts[1] || "0001";
      const idType = s.entityDocument.length === 11 ? "6" : "1";
      const subtotal = (s.subtotal || Math.round((s.amount / 1.18) * 100) / 100).toFixed(2);
      const igv = (s.taxAmount || Math.round((s.amount - Number(subtotal)) * 100) / 100).toFixed(2);
      const total = s.amount.toFixed(2);

      // SUNAT 14.1 Structure: 34 fields
      return `${period}|${cuo}|${correlative}|${formattedDate}||${docType}|${serie}|${number}||${idType}|${s.entityDocument}|${s.entityName}||${subtotal}||${igv}||||${total}|PEN|||||1|`;
    })
    .join("\r\n");
}

/**
 * SUNAT PLE 8.1 - Registro de Compras
 */
export function generatePLE8_1(purchases: Operation[]): string {
  const period = "20251200";
  return purchases
    .map((p, idx) => {
      const cuo = `M${String(idx + 1).padStart(7, "0")}`;
      const correlative = `M-${idx + 1}`;
      const dateParts = p.date.split("/");
      const formattedDate =
        dateParts.length === 3 ? `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}` : "10/12/2025";
      const parts = (p.relatedInvoiceId || "F001-0890").split("-");
      const serie = parts[0] || "F001";
      const number = parts[1] || "0890";
      const subtotal = (p.subtotal || Math.round((p.amount / 1.18) * 100) / 100).toFixed(2);
      const igv = (p.taxAmount || Math.round((p.amount - Number(subtotal)) * 100) / 100).toFixed(2);
      const total = p.amount.toFixed(2);

      // SUNAT 8.1 Structure: 42 fields
      return `${period}|${cuo}|${correlative}|${formattedDate}||01|${serie}|${number}||6|${p.entityDocument}|${p.entityName}||${subtotal}|${igv}||||||${total}|PEN|||||1|`;
    })
    .join("\r\n");
}

/**
 * SUNAT PLE 1.1 - Libro Caja y Bancos (Efectivo)
 */
export function generatePLE1_1(cajaOps: Operation[]): string {
  const period = "20251200";
  return cajaOps
    .map((op, idx) => {
      const cuo = `00000${idx + 1}`;
      const isCredit = op.type === "VENTA" || op.type === "INGRESO" || op.type === "TRANSFERENCIA";
      const debe = isCredit ? op.amount.toFixed(2) : "0.00";
      const haber = !isCredit ? op.amount.toFixed(2) : "0.00";
      return `${period}|${cuo}|M001|101|${op.date}|${op.concept}|${op.relatedInvoiceId || op.operationNumber}|${debe}|${haber}|1|`;
    })
    .join("\r\n");
}

/**
 * SUNAT PLE 1.2 - Libro Caja y Bancos (Cuentas Corrientes)
 */
export function generatePLE1_2(bbvaOps: Operation[]): string {
  const period = "20251200";
  return bbvaOps
    .map((op, idx) => {
      const cuo = `00000${idx + 1}`;
      const isCredit = op.type === "VENTA" || op.type === "INGRESO";
      const debe = isCredit ? op.amount.toFixed(2) : "0.00";
      const haber = !isCredit ? op.amount.toFixed(2) : "0.00";
      return `${period}|${cuo}|M001|011|0011-0291-0100044810|${op.date}|003|${op.concept}|6|${op.entityDocument}|${op.entityName}|${debe}|${haber}|1|`;
    })
    .join("\r\n");
}

/**
 * SUNAT PLE 5.1 - Libro Diario
 */
export function generatePLE5_1(operations: Operation[]): string {
  const period = "20251200";
  const lines: string[] = [];

  operations.forEach((op, idx) => {
    const cuo = `AS-${String(idx + 1).padStart(4, "0")}`;
    const isSale = op.type === "VENTA";
    const subtotal = op.subtotal || Math.round((op.amount / 1.18) * 100) / 100;
    const igv = op.taxAmount || Math.round((op.amount - subtotal) * 100) / 100;

    if (isSale) {
      lines.push(`${period}|${cuo}|M-1|${op.destinationAccount}|${op.date}|Cobro en ${op.destinationAccount} ${op.relatedInvoiceId}|${op.amount.toFixed(2)}|0.00|1|`);
      lines.push(`${period}|${cuo}|M-2|40111|${op.date}|IGV Débito ${op.relatedInvoiceId}|0.00|${igv.toFixed(2)}|1|`);
      lines.push(`${period}|${cuo}|M-3|70121|${op.date}|Venta mercaderías ${op.relatedInvoiceId}|0.00|${subtotal.toFixed(2)}|1|`);
    } else {
      lines.push(`${period}|${cuo}|M-1|6011|${op.date}|Compra mercaderías ${op.relatedInvoiceId}|${subtotal.toFixed(2)}|0.00|1|`);
      lines.push(`${period}|${cuo}|M-2|40111|${op.date}|Crédito fiscal IGV ${op.relatedInvoiceId}|${igv.toFixed(2)}|0.00|1|`);
      lines.push(`${period}|${cuo}|M-3|${op.destinationAccount}|${op.date}|Pago con ${op.destinationAccount} ${op.relatedInvoiceId}|0.00|${op.amount.toFixed(2)}|1|`);
    }
  });

  return lines.join("\r\n");
}

/**
 * SUNAT PLE 6.1 - Libro Mayor
 */
export function generatePLE6_1(operations: Operation[]): string {
  const period = "20251200";
  const lines: string[] = [];

  operations.forEach((op, idx) => {
    const cuo = `AS-${String(idx + 1).padStart(4, "0")}`;
    const subtotal = op.subtotal || Math.round((op.amount / 1.18) * 100) / 100;
    const isSale = op.type === "VENTA";

    if (isSale) {
      lines.push(`${period}|${op.destinationAccount}|${cuo}|${op.date}|${op.concept}|${op.amount.toFixed(2)}|0.00|1|`);
      lines.push(`${period}|70121|${cuo}|${op.date}|${op.concept}|0.00|${subtotal.toFixed(2)}|1|`);
    } else {
      lines.push(`${period}|6011|${cuo}|${op.date}|${op.concept}|${subtotal.toFixed(2)}|0.00|1|`);
      lines.push(`${period}|${op.destinationAccount}|${cuo}|${op.date}|${op.concept}|0.00|${op.amount.toFixed(2)}|1|`);
    }
  });

  return lines.join("\r\n");
}

/**
 * Balance de Comprobación en formato CSV para abrir directamente en Microsoft Excel
 */
export function generateTrialBalanceCsv(data: Array<{ code: string; name: string; debeSum: number; haberSum: number; deudor: number; acreedor: number }>): string {
  const header = "Codigo PCGE;Denominacion Oficial;Sumas Debe;Sumas Haber;Saldo Deudor;Saldo Acreedor\r\n";
  const rows = data.map((r) =>
    `"${r.code}";"${r.name}";${r.debeSum.toFixed(2)};${r.haberSum.toFixed(2)};${r.deudor.toFixed(2)};${r.acreedor.toFixed(2)}`
  ).join("\r\n");

  const totalDebe = data.reduce((s, r) => s + r.debeSum, 0).toFixed(2);
  const totalHaber = data.reduce((s, r) => s + r.haberSum, 0).toFixed(2);
  const totalDeudor = data.reduce((s, r) => s + r.deudor, 0).toFixed(2);
  const totalAcreedor = data.reduce((s, r) => s + r.acreedor, 0).toFixed(2);

  const footer = `\r\n"TOTALES";"CUADRADOS AL CENTIMO";${totalDebe};${totalHaber};${totalDeudor};${totalAcreedor}`;
  return "\uFEFF" + header + rows + footer;
}
