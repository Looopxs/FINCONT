export type AccountType =
  | "ACTIVO"
  | "PASIVO"
  | "PATRIMONIO"
  | "GASTO"
  | "INGRESO";

export type AccountNature = "DEUDORA" | "ACREEDORA";

export interface PCGEAccount {
  code: string;
  name: string;
  type: AccountType;
  nature: AccountNature;
  level: number;
  parentCode?: string;
}

export interface JournalEntryLine {
  id: string;
  accountCode: string;
  accountName: string;
  description: string;
  debit: number;
  credit: number;
}

export interface JournalEntry {
  id: string;
  entryNumber: string;
  date: string;
  gloss: string;
  origin: "VENTA" | "COMPRA" | "COBRO" | "PAGO" | "PLANILLA" | "TRANSFERENCIA" | "AJUSTE" | "INGRESO" | "EGRESO";
  relatedOperationId?: string;
  status: "BORRADOR" | "PUBLICADO" | "REVERTIDO";
  totalDebit: number;
  totalCredit: number;
  isBalanced: boolean;
  lines: JournalEntryLine[];
  createdAt: string;
  createdBy: string;
}
