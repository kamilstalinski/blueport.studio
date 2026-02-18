import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ProblemRozwiazanie } from "@/components/sections/ProblemRozwiazanie";
import { DlaczegoMy } from "@/components/sections/DlaczegoMy";
import { OfertaPakiety } from "@/components/sections/OfertaPakiety";
import { KalkulatorSection } from "@/components/sections/KalkulatorSection";
import { ProcesHome } from "@/components/sections/ProcesHome";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTA } from "@/components/sections/CTA";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ProblemRozwiazanie />
      <DlaczegoMy />
      <OfertaPakiety topGradient={false} />
      <KalkulatorSection />
      <ProcesHome />
      <FAQSection />
      <CTA />
    </>
  );
}
