import { FaqTeaser } from "@/components/pages/FaqTeaser";
import { HeroHome } from "@/components/sections/HeroHome";
import { PageGrainient } from "@/components/sections/PageGrainient";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { HomeOffer } from "@/components/sections/home/HomeOffer";
import { HomePricing } from "@/components/sections/home/HomePricing";
import { LiveDomains } from "@/components/sections/home/LiveDomains";
import { PlanSection } from "@/components/sections/home/PlanSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { QuotesSection } from "@/components/sections/home/QuotesSection";
import { WorkWall } from "@/components/sections/home/WorkWall";

export default function HomePage() {
  return (
    <div className="bp-home bp-scope">
      <PageGrainient />
      {/* the construction grid: four ruled columns the full height of the page */}
      <div className="bp-rails" aria-hidden="true">
        <div className="bp-shell">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <HeroHome />
      <LiveDomains />
      <WorkWall />
      <PlanSection />
      <HomeOffer />
      <HomePricing />
      <ProcessSection />
      <QuotesSection />
      <FaqTeaser id="home-faq-h" title="Najczęstsze pytania o stronę dla firmy" keys={["time", "contract", "revisions", "hosting"]} />
      <CtaBand />
    </div>
  );
}
