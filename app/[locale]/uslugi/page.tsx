import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { OfertaPakiety } from "@/components/sections/OfertaPakiety";
import { ProcesHome } from "@/components/sections/ProcesHome";
import { FAQSection } from "@/components/sections/FAQSection";
import { KalkulatorSection } from "@/components/sections/KalkulatorSection";
import { CTA } from "@/components/sections/CTA";

type Props = { params: Promise<{ locale: string }> };

export default async function UslugiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
