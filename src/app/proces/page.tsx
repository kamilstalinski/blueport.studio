import { Hero } from "@/components/sections/Hero";
import { ProcesIntro } from "@/components/sections/ProcesIntro";
import { ProcesVerticalTimeline } from "@/components/sections/ProcesVerticalTimeline";
import { CTA } from "@/components/sections/CTA";

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
