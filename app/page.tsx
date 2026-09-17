import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { ConnectedFlow } from "@/components/landing/ConnectedFlow";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { DashboardPreviewSection } from "@/components/landing/DashboardPreviewSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      {/* Sticky Modern Navbar */}
      <Navbar />

      {/* Main Landing Flow */}
      <main className="flex-1">
        {/* Hero with 3D Laptop Preview and Trust Metrics */}
        <Hero />

        {/* Endless Smooth Marquee */}
        <Marquee />

        {/* "Todo conectado" Process Flow */}
        <ConnectedFlow />

        {/* Bento Grid: Modular Features */}
        <BentoGrid />

        {/* Live Dashboard Preview Section */}
        <DashboardPreviewSection />

        {/* Final Call to Action */}
        <CtaSection />
      </main>

      {/* Professional Multi-Column Footer */}
      <Footer />
    </div>
  );
}
