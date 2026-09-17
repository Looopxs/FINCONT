export interface Client {
  id: string;
  docType: "RUC" | "DNI";
  docNumber: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  totalInvoiced: number;
  pendingBalance: number;
  status: "Al día" | "Por Cobrar" | "Moroso";
  invoicesCount: number;
}

export interface Supplier {
  id: string;
  ruc: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  bankName: string;
  bankAccount: string;
  cci: string;
  totalPurchased: number;
  pendingBalance: number;
  status: "Al día" | "Por Pagar" | "Vencido";
  purchasesCount: number;
}

export const INITIAL_CLIENTS: Client[] = [
  {
    id: "cli-1",
    docType: "RUC",
    docNumber: "20100070970",
    name: "Distribuidora Lima S.A.C.",
    contactName: "Carlos Mendoza",
    email: "ventas@distlima.pe",
    phone: "+51 987 654 321",
    address: "Av. Nicolás de Piérola 450, Lima",
    totalInvoiced: 11800.0,
    pendingBalance: 0.0,
    status: "Al día",
    invoicesCount: 1,
  },
  {
    id: "cli-2",
    docType: "RUC",
    docNumber: "20450123991",
    name: "Comercial Andina S.R.L.",
    contactName: "Lucía Paredes",
    email: "contacto@andina.pe",
    phone: "+51 971 234 567",
    address: "Av. Arequipa 2240, Lince",
    totalInvoiced: 29500.0,
    pendingBalance: 0.0,
    status: "Al día",
    invoicesCount: 1,
  },
  {
    id: "cli-3",
    docType: "RUC",
    docNumber: "10405567812",
    name: "Fernández E.I.R.L.",
    contactName: "Jorge Fernández",
    email: "jorge@fernandez.com",
    phone: "+51 955 889 900",
    address: "Jr. Ayacucho 180, Callao",
    totalInvoiced: 52864.0,
    pendingBalance: 0.0,
    status: "Al día",
    invoicesCount: 2,
  },
  {
    id: "cli-4",
    docType: "RUC",
    docNumber: "20556789123",
    name: "TechNova Perú S.A.",
    contactName: "Ana Salazar",
    email: "finanzas@technova.pe",
    phone: "+51 944 321 654",
    address: "Av. Rivera Navarrete 501, San Isidro",
    totalInvoiced: 50260.0,
    pendingBalance: 37760.0,
    status: "Por Cobrar",
    invoicesCount: 2,
  },
  {
    id: "cli-5",
    docType: "RUC",
    docNumber: "20601298451",
    name: "Inversiones del Sur S.A.C.",
    contactName: "Roberto Gómez",
    email: "rgomez@invdelsur.pe",
    phone: "+51 999 112 233",
    address: "Calle Los Pinos 120, Miraflores",
    totalInvoiced: 21830.0,
    pendingBalance: 0.0,
    status: "Al día",
    invoicesCount: 1,
  },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: "sup-1",
    ruc: "20100132592",
    name: "Aceros Arequipa S.A.",
    contactName: "Ventas Industriales",
    email: "ventas@aceros.pe",
    phone: "+51 1 517-1800",
    address: "Av. Enrique Meiggs 297, Callao",
    bankName: "BBVA Continental",
    bankAccount: "0011-0182-0100034921",
    cci: "011-182-000100034921-12",
    totalPurchased: 17700.0,
    pendingBalance: 0.0,
    status: "Al día",
    purchasesCount: 1,
  },
  {
    id: "sup-2",
    ruc: "20601234567",
    name: "Tech Supplies Perú SAC",
    contactName: "Mateo Valdivia",
    email: "pedidos@techsupplies.pe",
    phone: "+51 981 445 566",
    address: "Av. Aviación 3105, San Borja",
    bankName: "BBVA Continental",
    bankAccount: "0011-0291-0100055112",
    cci: "011-291-000100055112-40",
    totalPurchased: 9676.0,
    pendingBalance: 0.0,
    status: "Al día",
    purchasesCount: 1,
  },
  {
    id: "sup-3",
    ruc: "20509876543",
    name: "Logística del Norte S.A.C.",
    contactName: "Paola Quiroz",
    email: "facturacion@logdelnorte.pe",
    phone: "+51 966 778 899",
    address: "Av. Industrial 440, Los Olivos",
    bankName: "Banco de Crédito BCP",
    bankAccount: "191-23849102-0-12",
    cci: "002-191-002384910201-22",
    totalPurchased: 5664.0,
    pendingBalance: 5664.0,
    status: "Por Pagar",
    purchasesCount: 1,
  },
  {
    id: "sup-4",
    ruc: "20445566778",
    name: "Papelera y Útiles Corporativos S.A.",
    contactName: "Felipe Morales",
    email: "contacto@papeleracorp.pe",
    phone: "+51 1 422-5566",
    address: "Jr. Ucayali 320, Lima",
    bankName: "Interbank",
    bankAccount: "200-3001294850",
    cci: "003-200-003001294850-88",
    totalPurchased: 3420.0,
    pendingBalance: 0.0,
    status: "Al día",
    purchasesCount: 1,
  },
];
