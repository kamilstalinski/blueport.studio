import { Hero } from "@/components/sections/Hero";
import { OfertaPakiety } from "@/components/sections/OfertaPakiety";
import { ProcesHome } from "@/components/sections/ProcesHome";
import { FAQSection } from "@/components/sections/FAQSection";
import { KalkulatorSection } from "@/components/sections/KalkulatorSection";
import { CTA } from "@/components/sections/CTA";

export default function UslugiPage() {
  return (
    <>
      <Hero contentKey="uslugi.hero" />
      <OfertaPakiety />
      <ProcesHome />
      <FAQSection contentKey="uslugi.faq" faqKeys={["time", "contract", "hosting", "cms", "support"]} />
      <KalkulatorSection />
      <CTA />
    </>
  );
}
