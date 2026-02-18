import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ProcesIntro } from "@/components/sections/ProcesIntro";
import { ProcesVerticalTimeline } from "@/components/sections/ProcesVerticalTimeline";
import { CTA } from "@/components/sections/CTA";

type Props = { params: Promise<{ locale: string }> };

export default async function ProcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero contentKey="proces.hero" />
      <ProcesIntro />
      <ProcesVerticalTimeline />
      <CTA />
    </>
  );
}
