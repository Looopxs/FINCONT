import pcgeData from "./pcge-accounts.json";

export interface PCGEEntry {
  code: string;
  name: string;
  type: "ACTIVO" | "PASIVO" | "PATRIMONIO" | "GASTO" | "INGRESO" | "SALDOS_INTERMEDIARIOS" | "COSTOS_ANALITICA";
  nature: "DEUDORA" | "ACREEDORA";
  level: "Elemento" | "Cuenta" | "Subcuenta" | "Divisionaria" | "Subdivisionaria";
}

const accountsList: PCGEEntry[] = pcgeData as PCGEEntry[];

// Fast O(1) map for exact lookup
const accountsMap = new Map<string, PCGEEntry>();
accountsList.forEach((acc) => {
  accountsMap.set(acc.code, acc);
});

/**
 * Lookup PCGE account by exact code
 * Returns null if not found
 */
export function lookupPCGE(code: string): PCGEEntry | null {
  const clean = code.trim();
  return accountsMap.get(clean) || null;
}

/**
 * Search PCGE accounts by code prefix or name text
 */
export function searchPCGE(query: string, limit = 20): PCGEEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return accountsList.slice(0, limit);

  return accountsList
    .filter((acc) => acc.code.toLowerCase().startsWith(q) || acc.name.toLowerCase().includes(q))
    .slice(0, limit);
}

/**
 * Get all accounts filtered by Elemento (1 to 9)
 */
export function getAccountsByElement(elementDigit: string): PCGEEntry[] {
  return accountsList.filter((acc) => acc.code.startsWith(elementDigit));
}

export const allPCGEAccounts = accountsList;
