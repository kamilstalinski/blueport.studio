import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { CaseStudy } from "@/types";
import type { PageParamsSlug } from "@/types";

const CASE_STUDIES: Record<string, CaseStudy> = {
  dowytrenowania: {
    title: "dowytrenowania.pl",
    client: "Anna Olszewska",
    industry: "Fizjoterapia / zdrowie",
    context:
      "Anna Olszewska — magister fizjoterapii, trenerka medyczna i szkoleniowiec w Profi Academy — potrzebowała strony, która zbuduje jej autorytet online i przyciągnie nowych pacjentów. Poprzednia wizytówka nie pozycjonowała się na lokalne frazy i nie budowała zaufania.",
    challenge:
      "Brak widoczności w Google na frazy z fizjoterapii i treningu medycznego, strona nieprzedstawiająca ekspertyzy specjalistki, brak kanału do pozyskiwania zapisów.",
    strategy:
      "Nowa strona z jasną prezentacją specjalizacji, sekcja 'z czym możesz do mnie przyjść' jako narzędzie edukacyjne i SEO, blog z poradami zdrowotnymi wzmacniający autorytet.",
    implementation:
      "Next.js, formularz rezerwacji wizyty, integracja z mediami społecznościowymi (Instagram, YouTube, Facebook), newsletter, optymalizacja pod lokalne SEO.",
    stack: "Next.js, TypeScript, Tailwind, Vercel",
    results:
      "Wzrost ruchu organicznego na frazy lokalne, nowi pacjenci przez formularz online, aktywna baza subskrybentów newslettera.",
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
      "Statyczna strona z designem inspirowanym naturą, sekcje produktowe, galeria, responsywny layout, lokalne SEO pod Mosty i okolice.",
    stack: "Next.js, TypeScript, Tailwind, Vercel",
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
      "Next.js, animowane elementy z Framer Motion, integracja z Facebook Events, sekcja wideo z YouTube, responsywny layout zoptymalizowany pod mobile.",
    stack: "Next.js, Framer Motion, TypeScript, Tailwind, Vercel",
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
      "Next.js z formularzem doboru urządzenia, sekcja recenzji klientów, integracja ze sklepem internetowym sklepzfiltrami.pl, lokalne SEO pod Szczecin i okolice.",
    stack: "Next.js, TypeScript, Tailwind, Vercel",
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
      "Next.js, dynamiczna sekcja lokalizacji, integracja z mediami społecznościowymi (Facebook, Instagram, TikTok, YouTube), sekcja alergenów, aktualności.",
    stack: "Next.js, TypeScript, Tailwind, Vercel",
    results:
      "Spójna identyfikacja cyfrowa dla całej sieci, wzrost obserwujących w social media, łatwiejszy dostęp do informacji o lokalizacjach i ofercie dla klientów.",
    lessons:
      "Dla sieci gastronomicznych kluczowe jest połączenie wizualnej atrakcyjności oferty z praktyczną informacją o lokalizacjach i składnikach — klient musi znaleźć to, czego szuka w kilka sekund.",
  },
  spavalnia: {
    title: "SPAVALNIA",
    client: "SPAVALNIA",
    industry: "Konstrukcje stalowe / e-commerce",
    context:
      "SPAVALNIA z Lublina produkuje ogrodzenia, bramy, furtki, schody i balustrady stalowe łączące nowoczesność z solidnym wykonaniem. Potrzebowali strony obsługującej dwie ścieżki klientów: e-commerce z gotowymi produktami i formularz dla projektów na wymiar.",
    challenge:
      "Obsługa dwóch segmentów klientów (gotowe produkty vs. realizacje niestandardowe) w jednej spójnej strukturze strony bez dezorientacji użytkownika.",
    strategy:
      "Podwójne CTA — sklep online dla standardowych produktów i formularz zapytania dla niestandardowych zleceń, galeria realizacji jako dowód jakości wykonania.",
    implementation:
      "Next.js z integracją sklepu, system wycen i formularz zapytań dla projektów niestandardowych, galeria realizacji, responsywny design z naciskiem na Lublin i okolice.",
    stack: "Next.js, TypeScript, Tailwind, Vercel, integracja z e-commerce",
    results:
      "Wzrost sprzedaży przez kanał online, skuteczna segmentacja ruchu między gotowe produkty a realizacje niestandardowe, profesjonalna prezentacja oferty.",
    lessons:
      "Firmy produkcyjne z wieloma ścieżkami sprzedaży zyskują na jasnym podziale oferty — klient szybko trafia tam, gdzie potrzebuje, bez zbędnego tarcia.",
  },
  "strona-firmowa-b2b": {
    title: "Strona firmowa B2B",
    client: "Firma B2B",
    industry: "Usługi B2B",
    context:
      "Klient potrzebował odświeżenia wizytówki i poprawy widoczności w Google. Stara strona była wolna i nieprzystosowana do mobile.",
    challenge: "Wolna, przestarzała strona, słabe pozycjonowanie, brak jasnego CTA pod leady.",
    strategy:
      "Audyt treści, nowa struktura informacji, wydajny stack, SEO on-page i Core Web Vitals jako priorytet.",
    implementation:
      "Next.js, statyczne strony z ISR, optymalizacja obrazów, semantyczny HTML, szybki hosting.",
    stack: "Next.js, TypeScript, Tailwind, Vercel",
    results:
      "LCP < 2,5 s, wzrost ruchu organicznego o 40% w pół roku, formularz kontaktowy jako główne CTA.",
    lessons:
      "Nawet 'prosta' strona firmowa zyskuje na wydajności i jasnej strukturze — użytkownik i Google to doceniają.",
  },
  "sklep-ecommerce": {
    title: "Sklep branżowy",
    client: "Sklep branżowy",
    industry: "E-commerce",
    context:
      "Sklep z jednej platformy migrowany na nowy stack. Niska konwersja, wolne ładowanie listingu i koszyka.",
    challenge: "Niska konwersja, problemy z wydajnością koszyka i listingu, słabe Core Web Vitals.",
    strategy:
      "Headless e-commerce, optymalizacja ścieżki zakupowej, wydajność listingu i strony produktu.",
    implementation:
      "Next.js, headless CMS dla treści, integracja z systemem płatności i dostaw, optymalizacja obrazów i cache.",
    stack: "Next.js, headless CMS, integracje API",
    results:
      "Konwersja +25%, Core Web Vitals w zieleni, krótszy czas do pierwszego interaktywnego (TTI).",
    lessons:
      "W e-commerce każda sekunda ładowania ma przełożenie na koszyk i konwersję — inwestycja w wydajność się zwraca.",
  },
  "landing-kampania": {
    title: "Landing kampanii produktowej",
    client: "Kampania produktowa",
    industry: "Marketing",
    context: "Potrzeba jednej strony pod kampanię z formularzem leadowym i śledzeniem konwersji.",
    challenge: "Szybkie wdrożenie, integracja z ads, mierzalna konwersja.",
    strategy:
      "Minimalistyczny landing: nagłówek, korzyści, formularz, jeden CTA. UTM i eventy pod remarketing.",
    implementation:
      "Statyczna strona, formularz z walidacją, integracja z CRM/ads, optymalizacja pod mobile.",
    stack: "Next.js, formularz + API, integracje analytics",
    results: "Wdrożenie w 2 tygodnie, CTR formularza 12%, pełna ścieżka konwersji w analytics.",
    lessons:
      "Landing bez rozpraszaczy i z jednym celem konwersji działa lepiej niż wielosekcyjna 'wizytówka'.",
  },
};

interface ContentCardProps {
  label: string;
  children: ReactNode;
  delay?: number;
  featured?: boolean;
}

function ContentCard({ label, children, delay = 0, featured = false }: ContentCardProps) {
  return (
    <ScrollReveal delay={delay}>
      <GlassCard className={`${featured ? "card-featured" : "glass-card"} card-padding h-full`}>
        <p className="section-eyebrow">{label}</p>
        <div className="mt-3">{children}</div>
      </GlassCard>
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

  return (
    <>
      <Section as="div" firstOnPage topGradient>
        <ScrollReveal>
          <p className="section-eyebrow">Case Study</p>
          <h1 className="font-heading text-h1 text-text-primary mt-3 max-w-3xl">{study.title}</h1>
          <p className="mt-4 text-lead text-text-secondary">
            {study.client} · {study.industry}
          </p>
        </ScrollReveal>
      </Section>

      <Section tight>
        <div className="flex flex-col gap-6">
          <ScrollReveal delay={0.05}>
            <div className="flex flex-wrap gap-3">
              {techItems.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            <ContentCard label="Kontekst biznesowy" delay={0.08}>
              <p className="text-body text-text-secondary leading-relaxed">{study.context}</p>
            </ContentCard>
            <ContentCard label="Wyzwanie" delay={0.14}>
              <p className="text-body text-text-secondary leading-relaxed">{study.challenge}</p>
            </ContentCard>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ContentCard label="Strategia" delay={0.08}>
              <p className="text-body text-text-secondary leading-relaxed">{study.strategy}</p>
            </ContentCard>
            <ContentCard label="Wdrożenie" delay={0.14}>
              <p className="text-body text-text-secondary leading-relaxed">
                {study.implementation}
              </p>
            </ContentCard>
          </div>

          <ContentCard label="Wyniki" delay={0.08} featured>
            <p className="text-lead text-text-primary leading-relaxed">{study.results}</p>
          </ContentCard>

          <ScrollReveal delay={0.08}>
            <GlassCard className="glass-card card-padding">
              <p className="section-eyebrow">Wnioski</p>
              <p className="mt-3 border-l-2 border-primary pl-5 text-lead text-text-primary leading-relaxed">
                {study.lessons}
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
