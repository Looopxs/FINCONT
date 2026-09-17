"use client";

import { useState, useEffect } from "react";
import { Operation } from "@/types/operations";
import { INITIAL_OPERATIONS, OperationService, AutomatedProcessResult } from "@/lib/services/operation-service";

const STORAGE_KEY = "fincont_operations";

export function getStoredOperations(): Operation[] {
  if (typeof window === "undefined") return INITIAL_OPERATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_OPERATIONS));
      return INITIAL_OPERATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_OPERATIONS;
  }
}

export function saveStoredOperations(ops: Operation[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ops));
    window.dispatchEvent(new Event("fincont_operations_updated"));
  } catch (e) {
    console.error("Failed saving operations:", e);
  }
}

export function useOperationsStore() {
  const [operations, setOperations] = useState<Operation[]>(INITIAL_OPERATIONS);
  const [loaded, setLoaded] = useState(false);

  const refresh = () => {
    setOperations(getStoredOperations());
  };

  useEffect(() => {
    refresh();
    setLoaded(true);

    const handleUpdate = () => {
      refresh();
    };

    window.addEventListener("fincont_operations_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("fincont_operations_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const addOperation = (params: {
    type: "VENTA" | "COMPRA" | "TRANSFERENCIA";
    entityName: string;
    entityDocument: string;
    concept: string;
    amount: number;
    destinationAccount: "101" | "1041";
    customPCGECode?: string;
  }): AutomatedProcessResult => {
    const result = OperationService.processOperation(params);
    const current = getStoredOperations();
    const updated = [result.operation, ...current];
    saveStoredOperations(updated);
    setOperations(updated);
    return result;
  };

  const sales = operations.filter((o) => o.type === "VENTA");
  const purchases = operations.filter((o) => o.type === "COMPRA");
  const bbvaMovements = operations.filter((o) => o.destinationAccount === "1041");
  const cajaMovements = operations.filter((o) => o.destinationAccount === "101");

  return {
    operations,
    sales,
    purchases,
    bbvaMovements,
    cajaMovements,
    addOperation,
    loaded,
  };
}
