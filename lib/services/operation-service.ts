import { Operation, OperationType, OperationStatus } from "@/types/operations";
import { JournalEntry, JournalEntryLine } from "@/types/accounting";
import { lookupPCGE } from "@/lib/pcge-service";

export interface AutomatedProcessResult {
  operation: Operation;
  invoice: {
    number: string;
    type: "Factura" | "Boleta";
    issueDate: string;
    subtotal: number;
    igv: number;
    total: number;
  };
  financialMovement: {
    accountCode: "101" | "1041";
    accountName: string;
    type: "INGRESO" | "EGRESO";
    amount: number;
    resultingBalance: number;
  };
  journalEntry: JournalEntry;
  auditHash: string;
}

// Initial operations based on the Excel file (Libertad S.A.)
export const INITIAL_OPERATIONS: Operation[] = [
  {
    id: "op-101",
    operationNumber: "OP-2024-001",
    type: "VENTA",
    date: "04/12/2025",
    entityName: "Fernández E.I.R.L.",
    entityDocument: "10405567812",
    concept: "Venta de mercaderías al contado según Factura F001-0014",
    amount: 52864.0,
    subtotal: 44800.0,
    taxAmount: 8064.0,
    paymentMethod: "003",
    destinationAccount: "1041",
    status: "COMPLETADA",
    isAutomated: true,
    relatedInvoiceId: "F001-0014",
    relatedJournalEntryId: "AS-0001",
    relatedMovementId: "MOV-001",
    createdAt: "2025-12-04T10:15:00Z",
  },
  {
    id: "op-102",
    operationNumber: "OP-2024-002",
    type: "VENTA",
    date: "08/12/2025",
    entityName: "Comercial Andina S.R.L.",
    entityDocument: "20450123991",
    concept: "Venta de mercaderías con abono BBVA Factura F001-0013",
    amount: 29500.0,
    subtotal: 25000.0,
    taxAmount: 4500.0,
    paymentMethod: "003",
    destinationAccount: "1041",
    status: "COMPLETADA",
    isAutomated: true,
    relatedInvoiceId: "F001-0013",
    relatedJournalEntryId: "AS-0002",
    relatedMovementId: "MOV-002",
    createdAt: "2025-12-08T11:30:00Z",
  },
  {
    id: "op-103",
    operationNumber: "OP-2024-003",
    type: "COMPRA",
    date: "10/12/2025",
    entityName: "Aceros Arequipa S.A.",
    entityDocument: "20100132592",
    concept: "Compra de suministros e insumos según Factura F001-0890",
    amount: 17700.0,
    subtotal: 15000.0,
    taxAmount: 2700.0,
    paymentMethod: "003",
    destinationAccount: "1041",
    status: "COMPLETADA",
    isAutomated: true,
    relatedInvoiceId: "F001-0890",
    relatedJournalEntryId: "AS-0003",
    relatedMovementId: "MOV-003",
    createdAt: "2025-12-10T14:20:00Z",
  },
  {
    id: "op-104",
    operationNumber: "OP-2024-004",
    type: "COMPRA",
    date: "14/12/2025",
    entityName: "Tech Supplies Perú SAC",
    entityDocument: "20601234567",
    concept: "Compra de repuestos y equipos según Factura F002-3411",
    amount: 9676.0,
    subtotal: 8200.0,
    taxAmount: 1476.0,
    paymentMethod: "003",
    destinationAccount: "1041",
    status: "COMPLETADA",
    isAutomated: true,
    relatedInvoiceId: "F002-3411",
    relatedJournalEntryId: "AS-0004",
    relatedMovementId: "MOV-004",
    createdAt: "2025-12-14T09:45:00Z",
  },
  {
    id: "op-105",
    operationNumber: "OP-2024-005",
    type: "TRANSFERENCIA",
    date: "16/12/2025",
    entityName: "Caja Chica Libertad S.A.",
    entityDocument: "20304050601",
    concept: "Retiro para fondo de Caja Chica desde cuenta corriente BBVA",
    amount: 5000.0,
    subtotal: 5000.0,
    taxAmount: 0.0,
    paymentMethod: "008",
    destinationAccount: "101",
    status: "COMPLETADA",
    isAutomated: true,
    relatedInvoiceId: "REC-0012",
    relatedJournalEntryId: "AS-0005",
    relatedMovementId: "MOV-005",
    createdAt: "2025-12-16T16:00:00Z",
  },
  {
    id: "op-106",
    operationNumber: "OP-2024-006",
    type: "VENTA",
    date: "18/12/2025",
    entityName: "Distribuidora Lima S.A.C.",
    entityDocument: "20100070970",
    concept: "Venta de mercaderías según Factura F001-0012",
    amount: 11800.0,
    subtotal: 10000.0,
    taxAmount: 1800.0,
    paymentMethod: "003",
    destinationAccount: "1041",
    status: "COMPLETADA",
    isAutomated: true,
    relatedInvoiceId: "F001-0012",
    relatedJournalEntryId: "AS-0006",
    relatedMovementId: "MOV-006",
    createdAt: "2025-12-18T10:00:00Z",
  },
];

export class OperationService {
  /**
   * Process a new operation through the 5-step automation engine:
   * 1. Register Operation
   * 2. Generate Invoice
   * 3. Register Cash/Bank Movement
   * 4. Recalculate Balance
   * 5. Generate Double-entry PCGE Journal Entry (Debe = Haber)
   */
  public static processOperation(params: {
    type: OperationType;
    entityName: string;
    entityDocument: string;
    concept: string;
    amount: number;
    destinationAccount: "101" | "1041";
    customPCGECode?: string;
  }): AutomatedProcessResult {
    const total = params.amount;
    const subtotal = Math.round((total / 1.18) * 100) / 100;
    const igv = Math.round((total - subtotal) * 100) / 100;

    const opId = `op-${Date.now()}`;
    const opNumber = `OP-2024-${Math.floor(100 + Math.random() * 900)}`;
    const invoiceNumber = params.type === "VENTA" ? `F001-${Math.floor(1000 + Math.random() * 9000)}` : `F002-${Math.floor(1000 + Math.random() * 9000)}`;
    const asNum = `AS-${Math.floor(1000 + Math.random() * 9000)}`;

    // Build operation entity
    const operation: Operation = {
      id: opId,
      operationNumber: opNumber,
      type: params.type,
      date: new Date().toLocaleDateString("es-PE"),
      entityName: params.entityName,
      entityDocument: params.entityDocument,
      concept: params.concept,
      amount: total,
      subtotal,
      taxAmount: igv,
      paymentMethod: params.destinationAccount === "1041" ? "003" : "008",
      destinationAccount: params.destinationAccount,
      status: "COMPLETADA",
      isAutomated: true,
      relatedInvoiceId: invoiceNumber,
      relatedJournalEntryId: asNum,
      createdAt: new Date().toISOString(),
    };

    // Financial movement
    const financialMovement = {
      accountCode: params.destinationAccount,
      accountName: params.destinationAccount === "1041" ? "BBVA Cta Cte M.N. (1041)" : "Caja Principal (101)",
      type: (params.type === "VENTA" || params.type === "INGRESO" ? "INGRESO" : "EGRESO") as "INGRESO" | "EGRESO",
      amount: total,
      resultingBalance: params.destinationAccount === "1041" ? 413482.76 + (params.type === "VENTA" ? total : -total) : 47250.0 + (params.type === "VENTA" ? total : -total),
    };

    // Generate balanced double-entry PCGE lines
    const lines: JournalEntryLine[] = [];

    if (params.type === "VENTA") {
      // 1. Debe: Caja o Banco por el total
      lines.push({
        id: `line-${opId}-1`,
        accountCode: params.destinationAccount,
        accountName: params.destinationAccount === "1041" ? "Cuentas corrientes operativas" : "Caja",
        description: `Cobro en ${params.destinationAccount === "1041" ? "BBVA" : "Caja"} ${invoiceNumber}`,
        debit: total,
        credit: 0,
      });
      // 2. Haber: IGV 18%
      lines.push({
        id: `line-${opId}-2`,
        accountCode: "40111",
        accountName: "IGV - Cuenta propia",
        description: `IGV 18% de ${invoiceNumber}`,
        debit: 0,
        credit: igv,
      });
      // 3. Haber: Venta mercaderías base
      const saleCode = params.customPCGECode || "70121";
      const saleAcc = lookupPCGE(saleCode);
      lines.push({
        id: `line-${opId}-3`,
        accountCode: saleCode,
        accountName: saleAcc ? saleAcc.name : "Mercaderías - Terceros",
        description: `Venta neta ${invoiceNumber}`,
        debit: 0,
        credit: subtotal,
      });
    } else if (params.type === "COMPRA") {
      // 1. Debe: Compra mercaderías base
      const purchaseCode = params.customPCGECode || "6011";
      const purchaseAcc = lookupPCGE(purchaseCode);
      lines.push({
        id: `line-${opId}-1`,
        accountCode: purchaseCode,
        accountName: purchaseAcc ? purchaseAcc.name : "Mercaderías manufacturadas",
        description: `Compra neta ${invoiceNumber}`,
        debit: subtotal,
        credit: 0,
      });
      // 2. Debe: Crédito Fiscal IGV
      lines.push({
        id: `line-${opId}-2`,
        accountCode: "40111",
        accountName: "IGV - Cuenta propia",
        description: `Crédito fiscal IGV ${invoiceNumber}`,
        debit: igv,
        credit: 0,
      });
      // 3. Haber: Pago de fondos
      lines.push({
        id: `line-${opId}-3`,
        accountCode: params.destinationAccount,
        accountName: params.destinationAccount === "1041" ? "Cuentas corrientes operativas" : "Caja",
        description: `Abono de fondos ${invoiceNumber}`,
        debit: 0,
        credit: total,
      });
    } else {
      // TRANSFERENCIA
      lines.push({
        id: `line-${opId}-1`,
        accountCode: params.destinationAccount === "1041" ? "1041" : "101",
        accountName: params.destinationAccount === "1041" ? "Cuentas corrientes operativas" : "Caja",
        description: "Ingreso de transferencia entre cuentas",
        debit: total,
        credit: 0,
      });
      lines.push({
        id: `line-${opId}-2`,
        accountCode: params.destinationAccount === "1041" ? "101" : "1041",
        accountName: params.destinationAccount === "1041" ? "Caja" : "Cuentas corrientes operativas",
        description: "Salida de transferencia entre cuentas",
        debit: 0,
        credit: total,
      });
    }

    const totalDebit = lines.reduce((acc, l) => acc + l.debit, 0);
    const totalCredit = lines.reduce((acc, l) => acc + l.credit, 0);

    const journalEntry: JournalEntry = {
      id: asNum,
      entryNumber: asNum,
      date: operation.date,
      gloss: `Por ${params.concept} (${invoiceNumber})`,
      origin: params.type,
      relatedOperationId: opId,
      status: "PUBLICADO",
      totalDebit: Math.round(totalDebit * 100) / 100,
      totalCredit: Math.round(totalCredit * 100) / 100,
      isBalanced: Math.abs(totalDebit - totalCredit) < 0.01,
      lines,
      createdAt: new Date().toISOString(),
      createdBy: "SISTEMA_AUTO",
    };

    return {
      operation,
      invoice: {
        number: invoiceNumber,
        type: "Factura",
        issueDate: operation.date,
        subtotal,
        igv,
        total,
      },
      financialMovement,
      journalEntry,
      auditHash: `SHA256-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
    };
  }
}
