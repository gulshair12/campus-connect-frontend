"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FindBuddySection } from "@/components/sections/FindBuddySection";
import { EventsSection } from "@/components/sections/EventsSection";

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <FindBuddySection />
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
}
