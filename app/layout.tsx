import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import FloatingChatBot from "@/components/common/FloatingChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FINCONT | tu cuenta al día - Sistema de Automatización Contable",
  description:
    "FINCONT: tu cuenta al día. Factura, caja, bancos, saldos y asientos contables, automatizados desde un solo registro.",
  keywords: [
    "contabilidad",
    "automatización contable",
    "facturación electrónica",
    "caja y bancos",
    "asientos automáticos",
    "PCGE",
    "Perú",
    "FINCONT",
    "tu cuenta al día",
  ],
  authors: [{ name: "FINCONT" }],
  icons: {
    icon: "/images/fincont-icon-trans.png",
    apple: "/images/fincont-icon-trans.png",
  },
  openGraph: {
    title: "FINCONT - tu cuenta al día",
    description:
      "Factura, caja, bancos, saldos y asientos contables, automatizados desde un solo registro.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-background text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
        <FloatingChatBot />
      </body>
    </html>
  );
}
