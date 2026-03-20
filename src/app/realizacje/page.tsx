import type { Metadata } from "next";
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
      "Strona WordPress + WooCommerce dla magistra fizjoterapii i trenerki medycznej. Sklep z poradnikami i kursami, budowanie autorytetu, SEO lokalne.",
    image: "/dowytrenowania.png",
    domain: "dowytrenowania.pl",
  },
  {
    slug: "abcmosty",
    name: "ABC Mosty",
    description:
      "Wizytówka WordPress dla rodzinnej szkółki drzew i krzewów ozdobnych. Nowa obecność online, wzrost zapytań B2B.",
    image: "/abc_mosty.png",
    domain: "abcmosty.pl",
  },
  {
    slug: "afterthesin",
    name: "After the Sin",
    description:
      "Strona WordPress dla poznańskiego zespołu dark wave. Klimatyczny design, kalendarz koncertów, integracja z teledyskami.",
    image: "/after_the_sin.png",
    domain: "afterthesin.com",
  },
  {
    slug: "vilmart",
    name: "Vilmart Water Service",
    description:
      "Strona WordPress dla specjalisty od uzdatniania wody. Formularz doboru urządzenia jako główne narzędzie leadowe.",
    image: "/vilmart.png",
    domain: "vilmart.pl",
  },
  {
    slug: "dobreprecle",
    name: "Dobre Precle",
    description:
      "Strona Next.js dla sieci punktów z tradycyjnymi preclami. Menu, lokalizacje, integracja z social media.",
    image: "/dobre_precle.png",
    domain: "dobreprecle.pl",
  },
  {
    slug: "spavalnia",
    name: "SPAVALNIA",
    description:
      "Sklep internetowy dla marki streetwearowej. Ciemny design oddający klimat marki, sprawna ścieżka zakupowa, integracja z WooCommerce.",
    image: "/spavalnia.png",
    domain: "spavalnia.pl",
  },
];

export const metadata: Metadata = {
  title: "Realizacje — Portfolio Blueport Studio",
  description:
    "Zobacz nasze realizacje — strony firmowe, sklepy internetowe i aplikacje webowe. Projekty dla firm z Szczecina i całej Polski.",
  alternates: { canonical: "https://blueport.studio/realizacje" },
  openGraph: { url: "https://blueport.studio/realizacje" },
};

export default function RealizacjePage() {
  return (
    <>
      <Hero contentKey="realizacje.hero" />
      <Section id="realizacje-grid" topGradient>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 items-stretch" style={{ gap: "var(--grid-gap)" }}>
          {caseStudies.map((study) => (
            <li key={study.slug} className="flex min-h-0">
              <SpotlightCard className="custom-spotlight-card rounded-card h-full transition-[var(--transition-card)] flex flex-col min-w-0">
                <Link href={`/realizacje/${study.slug}`} className="group flex flex-col h-full min-h-0">
                  <GlassCard className="glass-card card-subpage rounded-card overflow-hidden p-0 flex flex-col h-full min-h-0">
                    <div className="portfolio-img shrink-0" aria-hidden>
                      {study.image ? (
                        <Image
                          src={study.image}
                          alt={study.name}
                          width={800}
                          height={500}
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          loading="lazy"
                        />
                      ) : (
                        <span className="img-placeholder">Podgląd wkrótce</span>
                      )}
                    </div>
                    <div className="card-padding flex flex-col flex-1 min-h-0">
                      <h2 className="heading-3 text-text-primary group-hover:text-text-primary/90">
                        {study.name}
                      </h2>
                      <p className="mt-2 text-body text-text-secondary leading-relaxed flex-1 min-h-0">
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
