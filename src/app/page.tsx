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
const QuotesSection = dynamic(
  () => import("@/components/sections/home/QuotesSection").then((m) => m.QuotesSection),
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
const CtaBand = dynamic(
  () => import("@/components/sections/home/CtaBand").then((m) => m.CtaBand),
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
      <QuotesSection />
      <KalkulatorSection />
      <ProcessSection />
      <FAQSection />
      <CtaBand />
    </>
  );
}
