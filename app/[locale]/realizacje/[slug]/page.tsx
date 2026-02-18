import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// Placeholder data — później z CMS lub plików
const CASE_STUDIES: Record<
  string,
  {
    title: string;
    client: string;
    industry: string;
    context: string;
    challenge: string;
    strategy: string;
    implementation: string;
    stack: string;
    results: string;
    lessons: string;
  }
> = {
  "strona-firmowa-b2b": {
    title: "Strona firmowa B2B",
    client: "Firma B2B",
    industry: "Usługi B2B",
    context:
      "Klient potrzebował odświeżenia wizytówki i poprawy widoczności w Google. Stara strona była wolna i nieprzystosowana do mobile.",
    challenge:
      "Wolna, przestarzała strona, słabe pozycjonowanie, brak jasnego CTA pod leady.",
    strategy:
      "Audyt treści, nowa struktura informacji, wydajny stack, SEO on-page i Core Web Vitals jako priorytet.",
    implementation:
      "Next.js, statyczne strony z ISR, optymalizacja obrazów, semantyczny HTML, szybki hosting.",
    stack: "Next.js, TypeScript, Tailwind, Vercel.",
    results:
      "LCP < 2,5 s, wzrost ruchu organicznego o 40% w pół roku, formularz kontaktowy jako główne CTA.",
    lessons:
      "Nawet „prosta” strona firmowa zyskuje na wydajności i jasnej strukturze — użytkownik i Google to doceniają."
  },
  "sklep-ecommerce": {
    title: "Sklep branżowy",
    client: "Sklep branżowy",
    industry: "E-commerce",
    context:
      "Sklep z jednej platformy migrowany na nowy stack. Niska konwersja, wolne ładowanie listingu i koszyka.",
    challenge:
      "Niska konwersja, problemy z wydajnością koszyka i listingu, słabe Core Web Vitals.",
    strategy:
      "Headless e-commerce, optymalizacja ścieżki zakupowej, wydajność listingu i strony produktu.",
    implementation:
      "Next.js, headless CMS dla treści, integracja z systemem płatności i dostaw, optymalizacja obrazów i cache.",
    stack: "Next.js, headless CMS, integracje API.",
    results:
      "Konwersja +25%, Core Web Vitals w zieleni, krótszy czas do pierwszego interaktywnego (TTI).",
    lessons:
      "W e-commerce każda sekunda ładowania ma przełożenie na koszyk i konwersję — inwestycja w wydajność się zwraca."
  },
  "landing-kampania": {
    title: "Landing kampanii produktowej",
    client: "Kampania produktowa",
    industry: "Marketing",
    context:
      "Potrzeba jednej strony pod kampanię z formularzem leadowym i śledzeniem konwersji.",
    challenge:
      "Szybkie wdrożenie, integracja z ads, mierzalna konwersja.",
    strategy:
      "Minimalistyczny landing: nagłówek, korzyści, formularz, jeden CTA. UTM i eventy pod remarketing.",
    implementation:
      "Statyczna strona, formularz z walidacją, integracja z CRM/ads, optymalizacja pod mobile.",
    stack: "Next.js, formularz + API, integracje analytics.",
    results:
      "Wdrożenie w 2 tygodnie, CTR formularza 12%, pełna ścieżka konwersji w analytics.",
    lessons:
      "Landing bez rozpraszaczy i z jednym celem konwersji działa lepiej niż wielosekcyjna „wizytówka”."
  }
};

type Props = { params: Promise<{ slug: string }> };

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];

  if (!study) notFound();

  return (
    <>
      <Section as="div" firstOnPage className="border-b border-border">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Realizacja
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {study.title}
        </h1>
        <p className="mt-4 text-foreground/80">
          {study.client} · {study.industry}
        </p>
      </Section>

      <Section className="border-b border-border">
        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Kontekst biznesowy
        </h2>
        <p className="mt-4 text-foreground">{study.context}</p>
      </Section>

      <Section className="border-b border-border">
        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Wyzwanie
        </h2>
        <p className="mt-4 text-foreground">{study.challenge}</p>
      </Section>

      <Section className="border-b border-border">
        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Strategia
        </h2>
        <p className="mt-4 text-foreground">{study.strategy}</p>
      </Section>

      <Section className="border-b border-border">
        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Wdrożenie
        </h2>
        <p className="mt-4 text-foreground">{study.implementation}</p>
      </Section>

      <Section className="border-b border-border">
        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Technical stack
        </h2>
        <p className="mt-4 text-foreground">{study.stack}</p>
      </Section>

      <Section className="border-b border-border">
        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Wyniki
        </h2>
        <p className="mt-4 text-foreground">{study.results}</p>
      </Section>

      <Section className="border-b border-border">
        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Wnioski
        </h2>
        <p className="mt-4 text-foreground">{study.lessons}</p>
      </Section>

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Link href="/realizacje">
            <Button variant="secondary">Wszystkie realizacje</Button>
          </Link>
          <Link href="/kontakt">
            <Button>Podobny projekt? Napisz do nas</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
