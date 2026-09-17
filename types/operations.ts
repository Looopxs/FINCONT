export type OperationType =
  | "VENTA"
  | "COMPRA"
  | "INGRESO"
  | "EGRESO"
  | "TRANSFERENCIA"
  | "AJUSTE";

export type OperationStatus =
  | "BORRADOR"
  | "PROCESANDO"
  | "COMPLETADA"
  | "FALLIDA"
  | "ANULADA";

export type PaymentMethod =
  | "001" // Depósito en cuenta
  | "003" // Transferencia de fondos
  | "008" // Efectivo
  | "005" // Tarjeta de débito
  | "006"; // Tarjeta de crédito

export interface OperationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  taxAmount: number;
  total: number;
  accountCode: string;
}

export interface Operation {
  id: string;
  operationNumber: string;
  type: OperationType;
  date: string;
  entityName: string;
  entityDocument: string;
  concept: string;
  amount: number;
  subtotal: number;
  taxAmount: number;
  paymentMethod: PaymentMethod;
  destinationAccount: "101" | "1041"; // 101: Caja, 1041: Banco BBVA
  status: OperationStatus;
  isAutomated: boolean;
  relatedInvoiceId?: string;
  relatedJournalEntryId?: string;
  relatedMovementId?: string;
  items?: OperationItem[];
  notes?: string;
  createdAt: string;
}
