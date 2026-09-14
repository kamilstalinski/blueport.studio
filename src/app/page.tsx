import dynamic from "next/dynamic";

import { DomainMarquee } from "@/components/sections/home/DomainMarquee";
import { HeroHome } from "@/components/sections/HeroHome";

const WorkWall = dynamic(
  () => import("@/components/sections/home/WorkWall").then((m) => m.WorkWall),
  { ssr: true }
);
const PlanSection = dynamic(
  () => import("@/components/sections/home/PlanSection").then((m) => m.PlanSection),
  { ssr: true }
);
const DlaczegoMy = dynamic(
  () => import("@/components/sections/DlaczegoMy").then((m) => m.DlaczegoMy),
  { ssr: true }
);
const HomePricing = dynamic(
  () => import("@/components/sections/home/HomePricing").then((m) => m.HomePricing),
  { ssr: true }
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection").then((m) => m.TestimonialsSection),
  { ssr: true }
);
const KalkulatorSection = dynamic(
  () => import("@/components/sections/KalkulatorSection").then((m) => m.KalkulatorSection),
  { ssr: true }
);
const ProcessSection = dynamic(
  () => import("@/components/sections/home/ProcessSection").then((m) => m.ProcessSection),
  { ssr: true }
);
const FAQSection = dynamic(
  () => import("@/components/sections/FAQSection").then((m) => m.FAQSection),
  { ssr: true }
);
const CTA = dynamic(
  () => import("@/components/sections/CTA").then((m) => m.CTA),
  { ssr: true }
);

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <DomainMarquee />
      <hr className="rule" />
      <WorkWall />
      <PlanSection />
      <DlaczegoMy />
      <HomePricing />
      <TestimonialsSection />
      <KalkulatorSection />
      <ProcessSection />
      <FAQSection />
      <CTA />
    </>
  );
}
