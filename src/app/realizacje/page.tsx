import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/SpotlightCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { DlaczegoMy } from "@/components/sections/DlaczegoMy";
import { KalkulatorSection } from "@/components/sections/KalkulatorSection";
import { CTA } from "@/components/sections/CTA";

const caseStudies = [
  {
    slug: "dowytrenowania",
    name: "Dowytrenowania - Wytrenuj Wymasuj",
    description:
      "Strona dla magistra fizjoterapii i trenerki medycznej. Budowanie autorytetu, SEO lokalne, formularz rezerwacji.",
    image: "/dowytrenowania.png",
    domain: "dowytrenowania.pl",
  },
  {
    slug: "abcmosty",
    name: "ABC Mosty",
    description:
      "Wizytówka rodzinnej szkółki drzew i krzewów ozdobnych z 30-letnim doświadczeniem. Nowa obecność online, wzrost zapytań B2B.",
    image: "/abc_mosty.png",
    domain: "abcmosty.pl",
  },
  {
    slug: "afterthesin",
    name: "After the Sin",
    description:
      "Strona dla poznańskiego zespołu dark wave. Klimatyczny design, kalendarz koncertów, integracja z teledyskami.",
    image: "/after_the_sin.png",
    domain: "afterthesin.com",
  },
  {
    slug: "vilmart",
    name: "Vilmart Water Service",
    description:
      "Strona dla specjalisty od uzdatniania wody. Formularz doboru urządzenia jako główne narzędzie leadowe.",
    image: "/vilmart.png",
    domain: "vilmart.pl",
  },
  {
    slug: "dobreprecle",
    name: "Dobre Precle",
    description:
      "Strona dla sieci punktów z tradycyjnymi preclami. Menu, lokalizacje, integracja z social media.",
    image: "/dobre_precle.png",
    domain: "dobreprecle.pl",
  },
  {
    slug: "spavalnia",
    name: "SPAVALNIA",
    description:
      "Strona dla producenta konstrukcji stalowych z Lublina. Sklep online + formularz zapytań dla projektów niestandardowych.",
    image: "/spavalnia.png",
    domain: "spavalnia.pl",
  },
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
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {caseStudies.map((study) => (
            <li key={study.slug} className="flex min-h-0">
              <SpotlightCard className="custom-spotlight-card rounded-2xl h-full transition-all duration-300 flex flex-col min-w-0">
                <Link href={`/realizacje/${study.slug}`} className="group flex flex-col h-full min-h-0">
                  <GlassCard className="glass-card card-subpage rounded-2xl overflow-hidden p-0 flex flex-col h-full min-h-0">
                    <div className="portfolio-img shrink-0" aria-hidden>
                      {study.image ? (
                        <Image
                          src={study.image}
                          alt={study.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      ) : (
                        <span className="img-placeholder">Podgląd wkrótce</span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1 min-h-0">
                      <h2 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-white/90">
                        {study.name}
                      </h2>
                      <p className="mt-2 text-sm text-foreground/70 leading-relaxed flex-1 min-h-0">
                        {study.description}
                      </p>
                      <span className="realizacje-card-btn mt-4 inline-block shrink-0 self-start">Zobacz więcej</span>
                    </div>
                  </GlassCard>
                </Link>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </Section>
      <DlaczegoMy
        contentKey="realizacjeEfekty"
        itemKeys={["fast", "leads", "seo", "conversion"]}
        cardVariant="subpage"
      />
      <KalkulatorSection />
      <CTA />
    </>
  );
}
