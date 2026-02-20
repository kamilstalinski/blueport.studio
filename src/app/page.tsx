import { Hero } from "@/components/sections/Hero";
import { ProblemRozwiazanie } from "@/components/sections/ProblemRozwiazanie";
import { DlaczegoMy } from "@/components/sections/DlaczegoMy";
import { OfertaPakiety } from "@/components/sections/OfertaPakiety";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { KalkulatorSection } from "@/components/sections/KalkulatorSection";
import { ProcesHome } from "@/components/sections/ProcesHome";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemRozwiazanie />
      <DlaczegoMy />
      <OfertaPakiety topGradient={false} />
      <TestimonialsSection />
      <KalkulatorSection />
      <ProcesHome />
      <FAQSection />
      <CTA />
    </>
  );
}
