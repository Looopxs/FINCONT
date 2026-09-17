export interface DocumentLookupResult {
  success: boolean;
  docType: "DNI" | "RUC";
  docNumber: string;
  name: string;
  address?: string;
  nombres?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  estado?: string;
  condicion?: string;
  fuente?: string;
  online?: boolean;
  error?: string;
}

let activeAbortController: AbortController | null = null;

export async function lookupDocument(
  docType: "DNI" | "RUC",
  docNumber: string
): Promise<DocumentLookupResult> {
  const clean = docNumber.replace(/\D/g, "").trim();

  if (docType === "DNI" && clean.length !== 8) {
    return {
      success: false,
      docType,
      docNumber: clean,
      name: "",
      error: "El DNI debe tener 8 dígitos",
    };
  }

  if (docType === "RUC" && clean.length !== 11) {
    return {
      success: false,
      docType,
      docNumber: clean,
      name: "",
      error: "El RUC debe tener 11 dígitos",
    };
  }

  if (activeAbortController) {
    activeAbortController.abort();
  }
  activeAbortController = new AbortController();

  try {
    const endpoint =
      docType === "DNI"
        ? `/api/reniec?dni=${encodeURIComponent(clean)}`
        : `/api/sunat?ruc=${encodeURIComponent(clean)}`;

    const res = await fetch(endpoint, {
      signal: activeAbortController.signal,
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return {
        success: false,
        docType,
        docNumber: clean,
        name: "",
        error: `Error ${res.status} al consultar ${docType}`,
      };
    }

    const json = await res.json();
    if (!json.success) {
      return {
        success: false,
        docType,
        docNumber: clean,
        name: "",
        error: json.error || `No se encontró información para ${clean}`,
      };
    }

    if (docType === "DNI") {
      return {
        success: true,
        docType: "DNI",
        docNumber: clean,
        name: json.nombreCompleto || `${json.nombres} ${json.apellidoPaterno} ${json.apellidoMaterno}`.trim(),
        nombres: json.nombres,
        apellidoPaterno: json.apellidoPaterno,
        apellidoMaterno: json.apellidoMaterno,
        fuente: json.fuente || "RENIEC Oficial",
        online: json.online,
      };
    } else {
      return {
        success: true,
        docType: "RUC",
        docNumber: clean,
        name: json.razonSocial || "",
        address: json.direccion || "",
        estado: json.estado || "ACTIVO",
        condicion: json.condicion || "HABIDO",
        fuente: json.fuente || "SUNAT Oficial",
        online: json.online,
      };
    }
  } catch (err: any) {
    if (err.name === "AbortError") {
      return {
        success: false,
        docType,
        docNumber: clean,
        name: "",
        error: "Consulta cancelada",
      };
    }
    return {
      success: false,
      docType,
      docNumber: clean,
      name: "",
      error: "Error de conexión al consultar documento",
    };
  }
}
