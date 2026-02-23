"use client";

import { AboutHeroSection } from "@/components/sections/about/AboutHeroSection";
import { AboutContentSection } from "@/components/sections/about/AboutContentSection";
import { AboutFeaturesSection } from "@/components/sections/about/AboutFeaturesSection";

export function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <AboutContentSection />
      <AboutFeaturesSection />
    </>
  );
}
