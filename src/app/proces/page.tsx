import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProcesIntro } from "@/components/sections/ProcesIntro";
import { ProcesVerticalTimeline } from "@/components/sections/ProcesVerticalTimeline";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Proces współpracy — Jak działamy",
  description:
    "Poznaj nasz proces tworzenia stron: od briefu przez projekt, wdrożenie aż po wsparcie po starcie. Transparentnie i bez niespodzianek.",
  alternates: { canonical: "https://blueport.studio/proces" },
  openGraph: { url: "https://blueport.studio/proces" },
};

export default function ProcesPage() {
  return (
    <>
      <Hero contentKey="proces.hero" />
      <ProcesIntro />
      <ProcesVerticalTimeline cardVariant="subpage" />
      <CTA />
    </>
  );
}
