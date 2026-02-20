import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/SpotlightCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calculator } from "@/components/calculator/Calculator";
import { DlaczegoMy } from "@/components/sections/DlaczegoMy";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTA } from "@/components/sections/CTA";

export default function KalkulatorPage() {
  return (
    <>
      <Hero contentKey="kalkulator.hero" />

      <Section id="kalkulator-form" topGradient>
        <div className="grid gap-10 lg:grid-cols-[65%_1fr] lg:gap-12 lg:items-start">
          <SpotlightCard
            className="custom-spotlight-card min-w-0 rounded-2xl"
          >
            <GlassCard className="glass-card card-subpage calculator-card-inner min-w-0 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 border-b border-white/15 bg-white/15 px-3 py-2.5 rounded-t-2xl">
                <span className="h-2 w-2 rounded-full bg-white/40" />
                <span className="h-2 w-2 rounded-full bg-white/40" />
                <span className="h-2 w-2 rounded-full bg-white/40" />
              </div>
              <Calculator />
            </GlassCard>
          </SpotlightCard>
          <aside className="lg:sticky lg:top-[calc(var(--navbar-height)+1.5rem)] space-y-6 text-foreground/90">
            <p className="text-base leading-relaxed md:text-lg">
              To narzędzie pozwala określić zakres projektu i oszacować budżet.
              Po wypełnieniu otrzymasz orientacyjne widełki cenowe oraz możliwość kontaktu.
            </p>
            <ul className="space-y-3 text-foreground/70">
              <li className="flex items-center gap-3"> <span className="text-white/60" aria-hidden>✓</span> Bez zobowiązań </li>
              <li className="flex items-center gap-3"> <span className="text-white/60" aria-hidden>✓</span> Jasne widełki cenowe </li>
              <li className="flex items-center gap-3"> <span className="text-white/60" aria-hidden>✓</span> Odpowiedź w 24h </li>
            </ul>
          </aside>
        </div>
      </Section>

      <DlaczegoMy contentKey="kalkulator.coDalej" itemKeys={["send", "contact", "quote"]} cardVariant="subpage" />
      <FAQSection />
      <CTA />
    </>
  );
}
