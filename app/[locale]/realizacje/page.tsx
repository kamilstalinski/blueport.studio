import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import SpotlightCard from "@/components/SpotlightCard";
import { DlaczegoMy } from "@/components/sections/DlaczegoMy";
import { KalkulatorSection } from "@/components/sections/KalkulatorSection";
import { CTA } from "@/components/sections/CTA";

const caseStudies = [
  { slug: "strona-firmowa-b2b", name: "Strona firmowa B2B", description: "Nowy stack, SEO on-page, Core Web Vitals. Wzrost ruchu organicznego o 40%." },
  { slug: "sklep-ecommerce", name: "Sklep branżowy", description: "Headless e-commerce, optymalizacja ścieżki zakupowej. Konwersja +25%." },
  { slug: "landing-kampania", name: "Landing kampanii", description: "Landing z jednym CTA, integracja z ads i CRM. Wdrożenie w 2 tygodnie." },
];

type Props = { params: Promise<{ locale: string }> };

export default async function RealizacjePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero contentKey="realizacje.hero" />
      <Section id="realizacje-grid" topGradient>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <li key={study.slug}>
              <SpotlightCard
                className="custom-spotlight-card rounded-2xl overflow-hidden h-full transition-all duration-300 hover:scale-[1.02]"
                spotlightColor="rgba(0, 229, 160, 0.2)"
              >
                <Link href={`/realizacje/${study.slug}`} className="group block h-full">
                  <div className="glass-card rounded-2xl overflow-hidden p-0">
                    <div className="aspect-video w-full bg-white/15" aria-hidden />
                    <div className="p-6">
                      <h2 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">
                        {study.name}
                      </h2>
                      <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{study.description}</p>
                      <span className="mt-4 inline-block rounded-xl border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-400 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                        Zobacz więcej
                      </span>
                    </div>
                  </div>
                </Link>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </Section>
      <DlaczegoMy contentKey="realizacjeEfekty" itemKeys={["fast", "leads", "seo", "conversion"]} />
      <KalkulatorSection />
      <CTA />
    </>
  );
}
