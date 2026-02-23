"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FindBuddySection } from "@/components/sections/FindBuddySection";
import { EventsSection } from "@/components/sections/EventsSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FindBuddySection />
      <EventsSection />
    </>
  );
}
