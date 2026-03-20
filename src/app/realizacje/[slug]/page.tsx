import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Building2, AlertTriangle, Lightbulb, Code2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/jsonLd";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { CaseStudy } from "@/types";
import type { PageParamsSlug } from "@/types";

const CASE_META: Partial<Record<string, { image: string; domain: string }>> = {
  dowytrenowania: { image: "/dowytrenowania.png", domain: "dowytrenowania.pl" },
  abcmosty: { image: "/abc_mosty.png", domain: "abcmosty.pl" },
  afterthesin: { image: "/after_the_sin.png", domain: "afterthesin.com" },
  vilmart: { image: "/vilmart.png", domain: "vilmart.pl" },
  dobreprecle: { image: "/dobre_precle.png", domain: "dobreprecle.pl" },
  spavalnia: { image: "/spavalnia.png", domain: "spavalnia.pl" },
};

const CASE_STUDIES: Record<string, CaseStudy> = {
  dowytrenowania: {
    title: "dowytrenowania.pl",
    client: "Anna Olszewska",
    industry: "Fizjoterapia / zdrowie",
    context:
      "Anna Olszewska — magister fizjoterapii, trenerka medyczna i szkoleniowiec w Profi Academy — potrzebowała strony, która zbuduje jej autorytet online i da możliwość sprzedaży wiedzy. Poprzednia wizytówka nie pozycjonowała się na lokalne frazy i nie budowała zaufania.",
    challenge:
      "Brak widoczności w Google na frazy z fizjoterapii i treningu medycznego, strona nieprzedstawiająca ekspertyzy specjalistki, brak kanału do monetyzacji wiedzy (poradniki, kursy).",
    strategy:
      "Nowa strona z jasną prezentacją specjalizacji, sekcja 'z czym możesz do mnie przyjść' jako narzędzie edukacyjne i SEO, sklep z poradnikami i kursami online wzmacniający autorytet i generujący przychód.",
    implementation:
      "WordPress z WooCommerce — sklep z poradnikami i kursami, integracja z mediami społecznościowymi (Instagram, YouTube, Facebook), newsletter, optymalizacja pod lokalne SEO.",
    stack: "Wordpress, WooCommerce",
    results:
      "Wzrost ruchu organicznego na frazy lokalne, sprzedaż poradników i kursów przez sklep online, aktywna baza subskrybentów newslettera.",
    lessons:
      "W branży medycznej zaufanie buduje treść — czytelna prezentacja specjalizacji i edukacja pacjentów przekłada się bezpośrednio na leady.",
  },
  abcmosty: {
    title: "ABC Mosty",
    client: "Przedsiębiorstwo handlowo-produkcyjne ABC",
    industry: "Szkółkarstwo / ogrodnictwo",
    context:
      "Rodzinna firma z 30-letnim doświadczeniem prowadzi szkółkę drzew i krzewów ozdobnych oraz plantację choinek. Brakowało im nowoczesnej obecności online, która oddawałaby jakość i wartości marki.",
    challenge:
      "Brak strony WWW jako kanału pozyskiwania klientów B2B i detalicznych, niska rozpoznawalność poza lokalnym rynkiem, konieczność prezentacji szerokiej oferty roślinnej.",
    strategy:
      "Elegancka wizytówka nawiązująca do natury — prezentacja oferty (krzewy ozdobne, trawy, choinki), historia rodzinnej firmy jako element budowania zaufania, galeria i dane kontaktowe.",
    implementation:
      "WordPress z designem inspirowanym naturą, sekcje produktowe, galeria, responsywny layout, lokalne SEO pod Mosty i okolice.",
    stack: "Wordpress",
    results:
      "Profesjonalna obecność online, zwiększony ruch z wyszukiwarek lokalnych, nowe zapytania ofertowe od klientów B2B i indywidualnych.",
    lessons:
      "Dla tradycyjnych branż kluczowy jest balans między estetyką marki a prostotą obsługi i znajdywalnością w sieci — design musi oddawać charakter firmy.",
  },
  afterthesin: {
    title: "After the Sin",
    client: "After the Sin",
    industry: "Muzyka / entertainment",
    context:
      "After the Sin to poznański zespół tworzący w klimatach dark wave, cold wave i post-punku. Potrzebowali reprezentacyjnej strony-wizytówki, która odda mroczny klimat muzyki i stanie się centralnym hubem informacji dla fanów i organizatorów koncertów.",
    challenge:
      "Komunikacja artystycznej tożsamości zespołu w formacie strony WWW, integracja kalendarza koncertów i materiałów wideo, zachowanie spójnego, mrocznego estetycznego DNA marki.",
    strategy:
      "Minimalistyczny, atmosferyczny design z mocnymi efektami wizualnymi, sekcja nadchodzących koncertów z linkami do zakupu biletów, galeria i teledyski.",
    implementation:
      "WordPress z atmosferycznym motywem, integracja z Facebook Events, sekcja wideo z YouTube, responsywny layout zoptymalizowany pod mobile.",
    stack: "Wordpress",
    results:
      "Strona stała się głównym kanałem informacji dla fanów, wspiera bookingowych w procesie wyceny koncertów, wzmacnia wizerunek zespołu przed debiutem zagranicznym.",
    lessons:
      "W projektach artystycznych design jest komunikatem — estetyka musi oddawać duszę marki, a nie tylko prezentować dane kontaktowe.",
  },
  vilmart: {
    title: "Vilmart Water Service",
    client: "Vilmart Water Service",
    industry: "Uzdatnianie wody / B2B + B2C",
    context:
      "Vilmart Water Service ze Szczecina to specjalista od uzdatniania wody z 15-letnim doświadczeniem — zmiękczacze, odżelaziacze, systemy odwróconej osmozy, filtry. Przestarzała strona nie oddawała profesjonalizmu marki i słabo generowała leady.",
    challenge:
      "Nieatrakcyjny design, brak wyraźnego CTA, niska konwersja na formularzu kontaktowym, słaba widoczność w wyszukiwarce na frazy lokalne.",
    strategy:
      "Nowa strona z mocnym akcentem na usługi (dobór, montaż, serwis), sekcja referencji jako social proof, dedykowany formularz doboru urządzenia jako główne narzędzie leadowe.",
    implementation:
      "WordPress z formularzem doboru urządzenia, sekcja recenzji klientów, integracja ze sklepem internetowym sklepzfiltrami.pl, lokalne SEO pod Szczecin i okolice.",
    stack: "Wordpress",
    results:
      "Wzrost liczby zapytań przez formularz online, lepsze pozycje na frazy lokalne, profesjonalna prezentacja marki wzmacniająca zaufanie klientów.",
    lessons:
      "W usługach specjalistycznych formularz doboru rozwiązania działa lepiej niż klasyczne 'Napisz do nas' — redukuje barierę wejścia i kwalifikuje klienta jeszcze przed pierwszym kontaktem.",
  },
  dobreprecle: {
    title: "Dobre Precle",
    client: "DP 1 sp. z o.o.",
    industry: "Gastronomia / sieć lokali",
    context:
      "Dobre Precle to dynamicznie rozwijająca się sieć punktów z tradycyjnymi preclami. Firma potrzebowała spójnej identyfikacji cyfrowej, która pokaże menu, lokalizacje i zbuduje społeczność wokół marki w mediach społecznościowych.",
    challenge:
      "Brak spójnej strony internetowej, trudność w prezentacji sieci punktów i rozbudowanego menu, konieczność wyróżnienia się w nasyconym rynku gastronomicznym.",
    strategy:
      "Prosta, apetyczna strona skupiona na menu, mapie lokalizacji i kanałach social media, z sekcją aktualności i transparentnym podejściem do informacji o alergenach.",
    implementation:
      "Next.js z TypeScript i Tailwind — dynamiczna sekcja lokalizacji, integracja z mediami społecznościowymi (Facebook, Instagram, TikTok, YouTube), sekcja alergenów, aktualności.",
    stack: "Next.js, TypeScript, Tailwind",
    results:
      "Spójna identyfikacja cyfrowa dla całej sieci, wzrost obserwujących w social media, łatwiejszy dostęp do informacji o lokalizacjach i ofercie dla klientów.",
    lessons:
      "Dla sieci gastronomicznych kluczowe jest połączenie wizualnej atrakcyjności oferty z praktyczną informacją o lokalizacjach i składnikach — klient musi znaleźć to, czego szuka w kilka sekund.",
  },
  spavalnia: {
    title: "SPAVALNIA",
    client: "SPAVALNIA",
    industry: "Moda / streetwear e-commerce",
    context:
      "SPAVALNIA to sklep internetowy z odzieżą streetwearową — ubrania i akcesoria dla osób ceniących miejski styl i autentyczną kulturę ulicy. Marka potrzebowała sklepu, który odda klimat streetwearu i sprawnie obsłuży sprzedaż online.",
    challenge:
      "Stworzenie sklepu e-commerce z charakterem — przekazanie estetyki streetwear przez design, przy zachowaniu prostej ścieżki zakupowej i wydajności na mobile.",
    strategy:
      "Sklep oparty na WooCommerce z mocno skustomizowanym motywem oddającym klimat marki — ciemna kolorystyka, odważna typografia, minimalne tarcie w ścieżce zakupowej.",
    implementation:
      "WordPress z WooCommerce, dedykowany motyw dopasowany do identyfikacji wizualnej marki, integracja z systemem płatności, optymalizacja kart produktowych i koszyka pod konwersję.",
    stack: "WordPress, WooCommerce",
    results:
      "Spójna identyfikacja wizualna marki w kanale e-commerce, sprawna sprzedaż online, pozytywny odbiór projektu przez społeczność streetwearową.",
    lessons:
      "W modzie streetwear design sklepu jest częścią produktu — klienci kupują nie tylko ubranie, ale też przynależność do estetyki marki.",
  },
};

const getCaseStudySeo = (slug: string) => {
  const study = CASE_STUDIES[slug];
  if (!study) return null;

  const meta = CASE_META[slug];
  const image = meta?.image ? `/og/og-realizacje-${slug}.png` : "/og/og-default.png";
  const url = `https://blueport.studio/realizacje/${slug}`;

  return {
    title: `${study.title} — Realizacja Blueport Studio`,
    description: study.context,
    client: study.client,
    url,
    image,
  };
};

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const seo = getCaseStudySeo(params.slug);

  if (!seo) {
    return {
      title: "Realizacja — Blueport Studio",
      alternates: { canonical: "https://blueport.studio/realizacje" },
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.url },
    openGraph: {
      url: seo.url,
      title: seo.title,
      description: seo.description,
      images: [{ url: seo.image, width: 1200, height: 630, alt: seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.image],
    },
  };
}

type ContentCardVariant = "context" | "challenge" | "strategy" | "implementation";

const CARD_META: Record<
  ContentCardVariant,
  {
    label: string;
    Icon: React.ComponentType<{ size?: number }>;
    color: string;
    cssVars: Record<string, string>;
    cardClassName?: string;
  }
> = {
  context: {
    label: "Kontekst biznesowy",
    Icon: Building2,
    color: "var(--color-text-secondary)",
    cssVars: {},
  },
  challenge: {
    label: "Wyzwanie",
    Icon: AlertTriangle,
    color: "var(--color-status-red)",
    cssVars: {
      "--glass-bg": "color-mix(in srgb, var(--color-status-red) 4%, transparent)",
      "--glass-border": "color-mix(in srgb, var(--color-status-red) 22%, transparent)",
      "--glass-border-top": "color-mix(in srgb, var(--color-status-red) 30%, transparent)",
      "--glass-bg-hover": "color-mix(in srgb, var(--color-status-red) 8%, transparent)",
      "--glass-border-hover": "color-mix(in srgb, var(--color-status-red) 34%, transparent)",
      "--glass-border-top-hover": "color-mix(in srgb, var(--color-status-red) 44%, transparent)",
    },
  },
  strategy: {
    label: "Strategia",
    Icon: Lightbulb,
    color: "var(--color-primary)",
    cssVars: {
      "--glass-bg": "var(--color-primary-subtle)",
      "--glass-border": "var(--color-accent-border)",
      "--glass-border-top": "color-mix(in srgb, var(--color-primary) 35%, transparent)",
      "--glass-bg-hover": "color-mix(in srgb, var(--color-primary) 10%, transparent)",
      "--glass-border-hover": "color-mix(in srgb, var(--color-primary) 38%, transparent)",
      "--glass-border-top-hover": "color-mix(in srgb, var(--color-primary) 48%, transparent)",
    },
  },
  implementation: {
    label: "Wdrożenie",
    Icon: Code2,
    color: "var(--color-primary)",
    cssVars: {},
    cardClassName: "cs-card-implementation",
  },
} as const;

interface ContentCardProps {
  variant: ContentCardVariant;
  children: ReactNode;
  delay?: number;
}

function ContentCard({ variant, children, delay = 0 }: ContentCardProps) {
  const { label, Icon, color, cssVars, cardClassName } = CARD_META[variant];
  return (
    <ScrollReveal delay={delay}>
      <div
        className={cn("glass-card card-padding h-full", cardClassName)}
        style={Object.keys(cssVars).length > 0 ? (cssVars as React.CSSProperties) : undefined}
      >
        <div className="cs-card-label" style={{ color }}>
          <Icon size={11} />
          <span>{label}</span>
        </div>
        <p className="text-body text-text-secondary leading-relaxed">{children}</p>
      </div>
    </ScrollReveal>
  );
}

export default async function CaseStudyPage({ params }: PageParamsSlug) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];

  if (!study) notFound();

  const techItems = study.stack
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const meta = CASE_META[slug];
  const seo = getCaseStudySeo(slug);

  if (!seo) notFound();

  const breadcrumbItems = [
    { name: "Strona główna", url: "https://blueport.studio" },
    { name: "Realizacje", url: "https://blueport.studio/realizacje" },
    { name: study.title, url: seo.url },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            caseStudyJsonLd({
              title: seo.title,
              description: seo.description,
              client: seo.client,
              url: seo.url,
              image: seo.image,
            }),
          ),
        }}
      />
      {/* Hero — reduced padding via .cs-hero */}
      <Section as="div" topGradient className="cs-hero">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left column — text */}
          <ScrollReveal>
            <p className="section-eyebrow">Case Study</p>
            <h1 className="font-heading text-h1 text-text-primary mt-3">{study.title}</h1>
            <p className="mt-4 text-lead text-text-secondary">
              {study.client} · {study.industry}
            </p>
          </ScrollReveal>

          {/* Right column — screenshot inside the browser mockup */}
          {meta && (
            <ScrollReveal delay={0.2}>
              <div className="glass-card cs-hero-screenshot">
                <div className="cs-screenshot-chrome">
                  <div className="cs-screenshot-dots" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="cs-screenshot-url">{meta.domain}</div>
                </div>
                <div className="cs-screenshot-img">
                  <Image
                    src={meta.image}
                    alt={`Podgląd strony ${study.title}`}
                    width={800}
                    height={500}
                    sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 90vw"
                    className="object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </Section>

      <Section tight noWrapper>
        <div className="container flex flex-col" style={{ gap: "var(--element-gap)" }}>
          {/* Tech stack tags */}
          <ScrollReveal delay={0.05}>
            <div className="flex flex-wrap gap-2">
              {techItems.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <div className="cs-divider" aria-hidden />

          {/* Context + challenge */}
          <div className="grid md:grid-cols-2" style={{ gap: "var(--grid-gap)" }}>
            <ContentCard variant="context" delay={0.1}>
              {study.context}
            </ContentCard>
            <ContentCard variant="challenge" delay={0.2}>
              {study.challenge}
            </ContentCard>
          </div>

          {/* Strategy + implementation */}
          <div className="grid md:grid-cols-2" style={{ gap: "var(--grid-gap)" }}>
            <ContentCard variant="strategy" delay={0.1}>
              {study.strategy}
            </ContentCard>
            <ContentCard variant="implementation" delay={0.2}>
              {study.implementation}
            </ContentCard>
          </div>

          <div className="cs-divider" aria-hidden />

          {/* Results — featured card (primary) */}
          <ScrollReveal delay={0.3}>
            <div className="glass-card card-padding cs-card-results">
              <div className="cs-card-label cs-card-label-primary">
                <TrendingUp size={12} />
                <span>Wyniki</span>
              </div>
              <p className="cs-results-text">{study.results}</p>
            </div>
          </ScrollReveal>

          {/* Lessons learned — left-bordered blockquote */}
          <ScrollReveal delay={0.4}>
            <div className="cs-card-wnioski">
              <div className="cs-card-label cs-card-label-primary-muted">
                <span>Wnioski</span>
              </div>
              <p className="cs-lessons-text">{study.lessons}</p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* CTA — primary (conversion) first, ghost (navigation) second */}
      <Section noWrapper>
        <div className="container flex flex-col gap-4 sm:flex-row sm:items-center flex-wrap">
          <Link href="/kontakt">
            <Button>Podobny projekt? Napisz do nas</Button>
          </Link>
          <Link href="/realizacje">
            <Button variant="ghost">← Wszystkie realizacje</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
