# FINCONT - Sistema de Automatización Contable ("tu cuenta al día")

## 🚀 Fase 4: Dashboard Principal
- **Topbar**: Buscador global con atajo `Ctrl+K`, selector de periodo, campana de notificaciones y perfil activo de Libertad S.A.
- **KPI Cards**: 6 métricas financieras clave con variaciones porcentuales (Ingresos, Gastos, Bancos BBVA, Cuentas por Cobrar, Cuentas por Pagar, Utilidad).
- **Gráficos Recharts**: Comparativa mensual de barras (Ingresos vs Gastos) y distribución porcentual de gastos (gráfico de dona).
- **Centro de Automatización**: Flujo visual de 5 pasos en tiempo real con simulación interactiva.
- **Últimas Operaciones**: Tabla con datos reales del Excel contable.
- **Widgets Laterales**: Actividad reciente minuto a minuto y próximos vencimientos de facturas e impuestos.

## 🎯 Fase 6: Motor de Autorrellenado PCGE (Plan Contable)
- **1,782 Cuentas Sincronizadas**: Extraídas de la hoja `PCGE` de `LIBRO CAJA - SISTEMAS Y CONTA.xlsx`.
- **Detección en tiempo real**: Colocando el código (`101`, `1041`, `1212`, `40111`, `6011`, `70121`), el sistema autorrellena de inmediato:
  - Denominación oficial
  - Tipo de cuenta (Activo, Pasivo, Gasto, Ingreso)
  - Naturaleza contable (Deudora, Acreedora)
  - Nivel (Subcuenta, Divisionaria, Subdivisionaria)
- **Simulador de Asientos**: Filas interactivas con autorrellenado automático por código.
- **Sin catálogo visible**: Interfaz limpia enfocada en el buscador y el autorrellenado.

## 👥 Fase 5: Directorio Comercial (Clientes y Proveedores)
- **Clientes ([/dashboard/clientes](http://localhost:3000/dashboard/clientes))**:
  - Métricas de cartera: Total clientes, facturación acumulada, saldos pendientes de cobro (Cta 1212) y clientes al día.
  - Buscador en tiempo real por RUC, razón social o contacto.
  - Modal para Crear y Editar Cliente con validación de RUC (11 dígitos) y DNI (8 dígitos).
- **Proveedores ([/dashboard/proveedores](http://localhost:3000/dashboard/proveedores))**:
  - Métricas de compras: Total proveedores, compras acumuladas, cuentas por pagar (Cta 4212) y proveedores al día.
  - Cuentas bancarias de abono (Banco BBVA, BCP, Interbank, Cta Cte y CCI).
  - Modal para Crear y Editar Proveedor con validación de RUC.

## ⚡ Fases 7 y 8: Módulo de Operaciones & Motor de Automatización en Cascada
- **Módulo de Operaciones ([/dashboard/operaciones](http://localhost:3000/dashboard/operaciones))**:
  - 4 métricas transaccionales: Total operaciones, volumen procesado, ventas y compras.
  - Filtros por tipo (Todas, Ventas, Compras, Transferencias).
  - Badge de estado *"Automatizada"* con tooltip explicativo de proceso en cascada (Requisito 90).
- **Trazabilidad 360° (Requisito 89)**:
  - Modal de detalle que muestra la cadena completa originada por la operación:
    1. Comprobante emitido (Base imponible + 18% IGV).
    2. Movimiento financiero (Afectación a BBVA 1041 o Caja 101 y saldo resultante).
    3. Asiento contable de partida doble generado automáticamente con las cuentas PCGE (Debe = Haber).
    4. Firma criptográfica de auditoría inmutable.
- **Servicio `OperationService` (Requisito 77 & 78)**:
  - Ejecución atómica del flujo: Operación $\rightarrow$ Comprobante $\rightarrow$ Fondos $\rightarrow$ Saldos $\rightarrow$ Asiento PCGE $\rightarrow$ Auditoría.

## 📊 Fase 9: Módulos Detallados de Ventas y Compras
- **Ventas ([/dashboard/ventas](http://localhost:3000/dashboard/ventas))**:
  - Métricas: Total facturado, Base imponible (70121), IGV Débito fiscal (40111) y Cobranzas reales.
  - **Modal de Emisión de Venta**: Selección de cliente, cálculo automático de IGV 18%, asignación a BBVA/Caja y generación de asiento PCGE (1212/1041 - 40111 - 70121).
  - **Comprobante Electrónico SUNAT**: Visualización oficial de Factura Electrónica (F001) con código QR, desglose de impuestos y constancia CDR aceptada.
  - Exportación de Registro de Ventas PLE 14.1 oficial SUNAT.
- **Compras ([/dashboard/compras](http://localhost:3000/dashboard/compras))**:
  - Métricas: Total compras, Base imponible gastos (6011/63/65), Crédito fiscal IGV a favor y Cuentas por pagar.
  - **Modal de Registro de Compra**: Selección de proveedor con RUC, clasificación de gasto PCGE, cálculo dinámico de IGV y egreso de fondos.
  - Exportación de Registro de Compras PLE 8.1 oficial SUNAT.

## 🏦 Fase 10: Libro Caja y Bancos & Conciliación Bancaria
- **Caja y Bancos ([/dashboard/caja-bancos](http://localhost:3000/dashboard/caja-bancos))**:
  - Cuentas principales: BBVA Banco Continental (Cta 1041 - Saldo inicial S/ 218,390) y Caja Principal (Cta 101 - Saldo inicial S/ 43,600).
  - **Libro Auxiliar de Bancos BBVA**: Movimientos con depósitos, giros y **saldo progresivo acumulado** en tiempo real.
  - **Libro Auxiliar de Caja Chica**: Registro cronológico de ingresos y egresos de efectivo.
  - **Módulo Oficial de Conciliación Bancaria Mensual**:
    - Cruce automático entre el Extracto Bancario BBVA del mes y los Asientos Contables FINCONT.
    - Cuadre certificado: **Diferencia de Conciliación: S/ 0.00 (100% Conciliado)**.
    - Descarga simulada de Acta Oficial de Conciliación Bancaria PDF.
  - **Transferencias entre Cuentas**: Modal interactivo para traspaso de fondos BBVA $\leftrightarrow$ Caja Chica con actualización inmediata de saldos.

## 📈 Fases 11 y 12: Estados Financieros y Reportes SUNAT
- **Reportes ([/dashboard/reportes](http://localhost:3000/dashboard/reportes))**:
  - **Balance de Comprobación**: Hoja de trabajo oficial con Sumas del Mayor (Debe/Haber) y Saldos (Deudor/Acreedor) perfectamente cuadrados al céntimo.
  - **Estado de Situación Financiera (Balance General)**: Activo Corriente y No Corriente (S/ 612,032.76) = Pasivo + Patrimonio Neto (S/ 612,032.76).
  - **Estado de Resultados Integrales (P&G)**: Ventas Netas, Costo de Ventas, Utilidad Bruta, Gastos Operativos, Impuesto a la Renta (29.5%) y Utilidad Neta del Ejercicio.
  - **Libros Electrónicos PLE SUNAT**: Descarga de archivos validados para PLE 14.1, 8.1, 1.1, 1.2, 5.1 y 6.1 con motor nativo de descarga en cliente.

## 🛡️ Fase 13: Pista de Auditoría, Trazabilidad Forense & Criptografía SHA-256
- **Auditoría ([/dashboard/auditoria](http://localhost:3000/dashboard/auditoria))**:
  - Enlace de bloques criptográficos SHA-256 (Block Height, Prev Hash, Current Hash).
  - Trazabilidad de cada venta, compra, conciliación y asiento contable con sello de tiempo inmutable.
  - **Verificador de Integridad de la Cadena**: Botón de comprobación en tiempo real (100% Válido, cero manipulaciones).
  - **Descarga de Certificado Oficial de Inmutabilidad**: Documento formal para inspecciones tributarias SUNAT y auditorías externas.

## ⚙️ Fase 14: Configuración Avanzada, Parámetros Tributarios y Respaldos
- **Configuración ([/dashboard/configuracion](http://localhost:3000/dashboard/configuracion))**:
  - Parámetros de Libertad S.A.: Razón Social, RUC, Régimen MYPE / General, Dirección Fiscal y Contactos.
  - Parámetros tributarios: Alícuota IGV (18%), Detracciones SPOT (10%/12%) y cuentas bancarias preferidas.
  - **Reglas del Motor de Automatización en Cascada**: Activar/desactivar generación de asientos PCGE, afectación de saldos de caja/bancos y cálculo de crédito/débito fiscal.
  - **Gestión de Respaldos (Backup & Restore)**: Exportación completa de la base de datos contable a formato JSON descargable en un clic y botón de restablecimiento a los datos originales del Excel.

