import type { Metadata } from "next";
import { DemoBanner } from "@/components/shared/DemoBanner";
import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { PartnersSection } from "@/components/landing/PartnersSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const metadata: Metadata = {
  title: "JCS AI Sales CRM — AI-Powered Sales Automation for Enterprise",
  description: "Generate leads, automate follow-ups, and close more deals with JCS AI Sales CRM — the world-class enterprise platform trusted by top sales teams.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-navy-950 text-white overflow-x-hidden">
      <DemoBanner />
      <LandingNav />
      <HeroSection />
      <StatsSection />
      <PartnersSection />
      <FeaturesSection />
      <WhyChooseUs />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <LandingFooter />
    </main>
  );
}
