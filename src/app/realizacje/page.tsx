import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/SpotlightCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { DlaczegoMy } from "@/components/sections/DlaczegoMy";
import { KalkulatorSection } from "@/components/sections/KalkulatorSection";
import { CTA } from "@/components/sections/CTA";

const caseStudies = [
  { slug: "strona-firmowa-b2b", name: "Strona firmowa B2B", description: "Nowy stack, SEO on-page, Core Web Vitals. Wzrost ruchu organicznego o 40%." },
  { slug: "sklep-ecommerce", name: "Sklep branżowy", description: "Headless e-commerce, optymalizacja ścieżki zakupowej. Konwersja +25%." },
  { slug: "landing-kampania", name: "Landing kampanii", description: "Landing z jednym CTA, integracja z ads i CRM. Wdrożenie w 2 tygodnie." },
];

export default function RealizacjePage() {
  return (
    <>
      <Hero contentKey="realizacje.hero" />
      <div className="container">
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-num">47+</span>
            <span className="stat-label">projektów</span>
          </div>
          <div className="stat-divider" aria-hidden />
          <div className="stat-item">
            <span className="stat-num">100%</span>
            <span className="stat-label">zadowolonych klientów</span>
          </div>
          <div className="stat-divider" aria-hidden />
          <div className="stat-item">
            <span className="stat-num">1-2 tyg.</span>
            <span className="stat-label">średni czas realizacji</span>
          </div>
        </div>
      </div>
      <Section id="realizacje-grid" topGradient>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <li key={study.slug}>
              <SpotlightCard
                className="custom-spotlight-card rounded-2xl h-full transition-all duration-300"
              >
                <Link href={`/realizacje/${study.slug}`} className="group block h-full">
                  <GlassCard className="glass-card card-subpage rounded-2xl p-0">
                    <div className="portfolio-img" aria-hidden>
                      <span className="img-placeholder">Podgląd wkrótce</span>
                    </div>
                    <div className="p-6">
                      <h2 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-white/90">
                        {study.name}
                      </h2>
                      <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{study.description}</p>
                      <span className="realizacje-card-btn mt-4 inline-block">
                        Zobacz więcej
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </Section>
      <DlaczegoMy contentKey="realizacjeEfekty" itemKeys={["fast", "leads", "seo", "conversion"]} cardVariant="subpage" />
      <KalkulatorSection />
      <CTA />
    </>
  );
}
