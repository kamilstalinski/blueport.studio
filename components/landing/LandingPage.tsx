"use client";

import { LandingHero } from "./LandingHero";
import { LandingProblems } from "./LandingProblems";
import { LandingServices } from "./LandingServices";
import { LandingProcess } from "./LandingProcess";
import { LandingCalculatorCTA } from "./LandingCalculatorCTA";
import { LandingFAQ } from "./LandingFAQ";

export function LandingPage() {
  return (
    <main className="min-h-full">
      <LandingHero />
      <LandingProblems />
      <LandingServices />
      <LandingProcess />
      <LandingCalculatorCTA />
      <LandingFAQ />
    </main>
  );
}
