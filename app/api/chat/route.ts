import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres FINCONT Copilot, el asistente contable y financiero inteligente del sistema FINCONT (tu cuenta al día) en Perú.
Tu especialidad es:
1. Plan Contable General Empresarial (PCGE): Dinámica de cuentas (Elemento 1 activo, Elemento 4 pasivo, Elemento 6 gastos por naturaleza, Elemento 7 ingresos).
2. Normativa Tributaria SUNAT: IGV (18%), Régimen MYPE Tributario, Régimen General, Detracciones SPOT (Banco de la Nación), Retenciones y Percepciones.
3. Operaciones en FINCONT: Explicar cómo una sola operación (Venta, Compra, Movimiento de Caja/Bancos) automatiza comprobantes, saldos bancarios y asientos de partida doble en el sistema.
4. Libros Electrónicos PLE: Libro Diario (5.1), Libro Mayor (6.1), Registro de Ventas (14.1) y Compras (8.1).

Responde siempre de manera concisa, clara, profesional y en español peruano formal con formato Markdown (negritas, viñetas y cuentas contables destacadas).`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No se proporcionaron mensajes para el chat." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY || "";
    const lastUserMsg = messages[messages.length - 1]?.content || "";

    // Attempt live OpenAI call
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.slice(-8), // Keep context of last 8 messages
          ],
          temperature: 0.4,
          max_tokens: 600,
        }),
      });

      const data = await response.json();

      if (response.ok && data?.choices?.[0]?.message?.content) {
        return NextResponse.json({
          role: "assistant",
          content: data.choices[0].message.content,
          source: "openai",
        });
      }

      // If OpenAI reports insufficient quota / credit balance exhausted
      if (data?.error?.code === "credit_balance_exhausted" || data?.error?.type === "insufficient_quota") {
        const smartFallback = getAccountingKnowledgeResponse(lastUserMsg, true);
        return NextResponse.json({
          role: "assistant",
          content: smartFallback,
          source: "fincont_expert_engine",
        });
      }
    } catch (apiErr) {
      console.warn("OpenAI API call failed, using built-in expert engine:", apiErr);
    }

    // Fallback response generator
    const fallbackResponse = getAccountingKnowledgeResponse(lastUserMsg, false);
    return NextResponse.json({
      role: "assistant",
      content: fallbackResponse,
      source: "fincont_expert_engine",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu consulta." },
      { status: 500 }
    );
  }
}

// Built-in intelligent accounting response engine
function getAccountingKnowledgeResponse(query: string, quotaNote: boolean): string {
  const q = query.toLowerCase();

  let body = "";

  if (q.includes("detrac") || q.includes("spot") || q.includes("banco de la nacion")) {
    body = `### 🏛️ Régimen de Detracciones SUNAT (Sistema SPOT)

En el sistema tributario peruano y en **FINCONT**, las detracciones operan de la siguiente manera:

1. **Definición**: Es un descuento obligatorio que el adquiriente efectúa del precio de venta y deposita en la cuenta del **Banco de la Nación** del proveedor para el pago de sus deudas tributarias.
2. **Tasas más comunes**:
   - **12%**: Servicios en general (asesorías, consultorías, auditorías).
   - **10%**: Alquiler de bienes muebles e inmuebles, mantenimiento y reparación.
   - **4%**: Transporte de bienes por vía terrestre (cuando el flete supera S/ 400).
3. **Dinámica Contable (PCGE)**:
   - **Al pagar la factura (Neto 88% o 90%)**:
     - Cargo: \`4212 Facturas emitidas por pagar\`
     - Abono: \`1041 Cuentas corrientes operativas\`
   - **Al depositar la detracción (10% o 12%)**:
     - Cargo: \`4212 Facturas por pagar\`
     - Abono: \`1041 Cuentas corrientes\` (Constancia de depósito BN)
4. **En FINCONT**:
   - Puedes ir al módulo **Configuración** y fijar la tasa de detracción por defecto (ej. 10.00%).
   - En **Nueva Operación**, al marcar detracción, el sistema separa automáticamente la constancia y el saldo neto.`;
  } else if (
    q.includes("asiento") ||
    q.includes("partida doble") ||
    q.includes("cuenta 12") ||
    q.includes("cuenta 70") ||
    q.includes("cuenta 40") ||
    q.includes("cuenta 60")
  ) {
    body = `### ⚖️ Dinámica de Asientos Automáticos en FINCONT (PCGE 2026)

FINCONT genera los asientos contables de partida doble en el instante en que registras cualquier comprobante:

#### 1. Venta Comercial (Comprobante F001 / B001)
- **1212** Cuentas por cobrar comerciales - Terceros (Total facturado al **DEBE**)
- **40111** IGV - Cuenta propia (18% al **HABER**)
- **70121** Venta de mercaderías / servicios (Base imponible al **HABER**)
*Automáticamente concilia el cobro en la cuenta **1041** o **101**.*

#### 2. Compra de Mercadería / Suministros
- **6011** Mercaderías manufacturadas (Base imponible al **DEBE**)
- **40111** IGV - Crédito fiscal (18% al **DEBE**)
- **4212** Cuentas por pagar comerciales (Total al **HABER**)
- **Destino**: \`2011 Mercaderías\` (DEBE) contra \`6111 Variación de inventarios\` (HABER).

En FINCONT puedes auditar cada asiento generado haciendo clic en **Contabilidad** → **Libro Diario**.`;
  } else if (q.includes("ple") || q.includes("libro diario") || q.includes("sunat") || q.includes("exportar")) {
    body = `### 📊 Exportación de Libros Electrónicos PLE SUNAT

En **FINCONT**, la información se estructura conforme a las especificaciones técnicas de la SUNAT:

- **Libro Diario 5.1 / 5.2**: Estructura de código de operación, código PCGE a 5 dígitos, centro de costos y glosa.
- **Libro Caja y Bancos 1.1 y 1.2**: Resumen de cobros, pagos, número de cheque/transacción bancaria.
- **Descarga oficial**:
  1. Dirígete a la barra lateral y selecciona **Reportes**.
  2. Haz clic en **Descargar Libro Diario PLE (.TXT)** o **Descargar Dossier Financiero**.
  3. Los archivos generados tienen la nomenclatura oficial requerida por el validador PLE (ej. \`LE2030405060120251200050100001111.txt\`).`;
  } else if (q.includes("caja") || q.includes("banco") || q.includes("concilia") || q.includes("saldo")) {
    body = `### 💳 Módulo de Caja y Bancos en FINCONT

FINCONT mantiene el flujo de tesorería sincronizado con la contabilidad:

- **Cuenta 101 (Caja Chica)**: Para pagos menores, gastos administrativos y efectivo operativo.
- **Cuenta 1041 (Cuentas Corrientes Bancarias)**: BBVA, BCP, Interbank y Scotiabank.
- **Conciliación en tiempo real**:
  - Al registrar una venta o compra, seleccionas el destino (**Caja 101** o **Banco 1041**).
  - El sistema actualiza el saldo bancario de inmediato y registra el número de operación bancaria para el arqueo.`;
  } else if (q.includes("hola") || q.includes("buenos dias") || q.includes("buenas") || q.includes("ayuda")) {
    body = `¡Hola! Soy **FINCONT Copilot**, tu asistente inteligente de contabilidad, finanzas y normativa SUNAT.

¿En qué puedo orientarte hoy? Puedes consultarme sobre:
- 📌 **Dinámica contable**: Asientos de compras, ventas, nóminas y costo de ventas.
- 🏛️ **Tributación SUNAT**: Detracciones (SPOT), retenciones, percepciones, crédito fiscal de IGV.
- ⚡ **Automatización FINCONT**: Cómo registrar operaciones, generar reportes PLE o conciliar bancos.
- 💼 **Gestión empresarial**: Configuración de tu RUC, periodos fiscales y plan contable PCGE.`;
  } else {
    body = `### 🤖 Asistente Contable FINCONT

He procesado tu consulta: *"${query}"*.

En **FINCONT** (tu cuenta al día), puedes gestionar este flujo contable y tributario de manera automatizada:
1. **Operación Única**: Ingresa los datos desde el botón **"+ Nueva operación"** en la barra superior.
2. **Efecto Inmediato**: Se genera el comprobante digital, se acredita o debita el saldo en **Caja y Bancos**, y se formula el asiento contable balanceado en el **PCGE**.
3. **Auditoría**: Puedes verificar el impacto en el **Dashboard**, en el **Libro Diario** o exportar los archivos para el validador **PLE de SUNAT**.

Si necesitas que analicemos un asiento contable en específico o una regla tributaria (IGV, Renta o Detracción), indícamelo y con gusto te proporciono el desglose paso a paso.`;
  }

  if (quotaNote) {
    body += `\n\n> 💡 **Nota sobre tu API Key de OpenAI**: Tu clave fue validada con éxito ante OpenAI, pero actualmente tu saldo de créditos en OpenAI figura como agotado (\`credit_balance_exhausted\`). Mientras recargas créditos en tu panel de [platform.openai.com/settings/organization/billing](https://platform.openai.com/settings/organization/billing), este asistente te responderá con nuestro motor contable especializado integrado.`;
  }

  return body;
}
