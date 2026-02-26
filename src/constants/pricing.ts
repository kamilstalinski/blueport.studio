/**
 * Single source of truth for package and feature pricing.
 * Used by: OfertaPakiety (main page packages), Calculator (Step1Type, useCalculator, CalculatorRight).
 * Never hardcode prices in components.
 */

export const PACKAGES = {
  "strona-start": {
    id: "strona-start",
    name: "Strona start",
    tech: "WordPress",
    description:
      "Szybka i profesjonalna strona firmowa na sprawdzonym rozwiązaniu. Idealna na start działalności lub odświeżenie obecnej strony.",
    basePrice: 2500,
    deliveryDays: 7,
    deliveryLabel: "od 7 dni roboczych",
    tag: null,
    coZawiera: [
      "Gotowy, profesjonalny wygląd dopasowany do Twojej branży",
      "Personalizacja kolorów i treści pod Twoją markę",
      "Do 5 podstron (np. Oferta, O nas, Kontakt)",
      "Formularz kontaktowy",
      "Strona dostosowana do telefonów i tabletów",
      "Instalacja podstawowej analityki (statystyki odwiedzin)",
      "14 dni wsparcia po uruchomieniu",
    ],
  },
  "strona-pro": {
    id: "strona-pro",
    name: "Strona Pro",
    tech: "WordPress",
    description:
      "Indywidualnie zaprojektowana strona dopasowana do Twojej marki i klientów. Większa elastyczność, lepsza struktura treści i bardziej dopracowany wygląd.",
    basePrice: 3900,
    deliveryDays: 14,
    deliveryLabel: "od 14 dni roboczych",
    tag: null,
    coZawiera: [
      "Indywidualny projekt wizualny (bez gotowego szablonu)",
      "Do 10 podstron",
      "Przemyślana struktura sekcji zwiększająca czytelność",
      "Sekcje dopasowane do Twojej branży",
      "Subtelne animacje i nowoczesne detale",
      "Optymalizacja pod kątem widoczności w Google",
      "Szybsze i bardziej płynne działanie strony",
      "30 dni wsparcia po wdrożeniu",
    ],
  },
  "sklep-online": {
    id: "sklep-online",
    name: "Sklep Online (od 21 dni)",
    tech: "WooCommerce",
    description:
      "Kompletny sklep internetowy gotowy do sprzedaży. Prosty w obsłudze i przygotowany do przyjmowania zamówień online.",
    basePrice: 4900,
    deliveryDays: 21,
    deliveryLabel: "od 21 dni roboczych",
    tag: null,
    coZawiera: [
      "Sklep internetowy z możliwością zarządzania produktami",
      "Do 30 produktów na start",
      "Płatności online (karta, szybkie przelewy)",
      "Integracja z firmami kurierskimi",
      "Panel do obsługi zamówień",
      "Strona dostosowana do urządzeń mobilnych",
      "Podstawowa optymalizacja pod wyszukiwarki",
    ],
  },
  "projekt-dedykowany": {
    id: "projekt-dedykowany",
    name: "Dedykowany",
    tech: "Next.js / React",
    description: "Projekt pisany od podstaw dla zaawansowanych potrzeb i skalowania.",
    basePrice: 6500,
    deliveryDays: 30,
    deliveryLabel: "od 30 dni roboczych",
    tag: null,
    coZawiera: [
      "Architektura techniczna",
      "Custom frontend",
      "Integracje API",
      "Performance-first development",
      "Dokumentacja techniczna",
      "Możliwość headless CMS",
    ],
  },
} as const;

/** Add-on groups: 1=Widoczność, 2=Sprzedaż (sklep), 3=Automatyzacja, 4=Skalowanie (Next.js). */
export const FEATURES = {
  "seo-advanced": {
    id: "seo-advanced",
    label: "Lepsza widoczność w Google",
    description:
      "Rozszerzona optymalizacja pomagająca Twojej stronie pojawiać się wyżej w wynikach wyszukiwania.",
    price: 700,
    group: "widocznosc" as const,
    availableForPackages: [
      "strona-start",
      "strona-pro",
      "sklep-online",
      "projekt-dedykowany",
    ] as const,
  },
  copywriting: {
    id: "copywriting",
    label: "Profesjonalne teksty",
    description:
      "Teksty dopasowane do Twojej branży i klientów, które budują zaufanie i zachęcają do kontaktu.",
    price: 800,
    group: "widocznosc" as const,
    availableForPackages: [
      "strona-start",
      "strona-pro",
      "sklep-online",
      "projekt-dedykowany",
    ] as const,
  },
  blog: {
    id: "blog",
    label: "Sekcja aktualności / poradniki",
    description: "Możliwość publikowania artykułów, wpisów i aktualności firmowych.",
    price: 500,
    group: "widocznosc" as const,
    availableForPackages: [
      "strona-start",
      "strona-pro",
      "sklep-online",
      "projekt-dedykowany",
    ] as const,
  },
  "language-version": {
    id: "language-version",
    label: "Dodatkowy język",
    description: "Strona dostępna w kolejnym języku, np. polskim i angielskim.",
    price: 900,
    group: "widocznosc" as const,
    availableForPackages: [
      "strona-start",
      "strona-pro",
      "sklep-online",
      "projekt-dedykowany",
    ] as const,
  },
  "product-filters": {
    id: "product-filters",
    label: "Zaawansowane filtry",
    description: "Filtrowanie po cechach, cenie, dostępności (AJAX)",
    price: 1000,
    group: "sprzedaz" as const,
    availableForPackages: ["sklep-online"] as const,
  },
  "product-variants": {
    id: "product-variants",
    label: "Warianty produktów",
    description: "Rozmiary, kolory, konfiguratory",
    price: 850,
    group: "sprzedaz" as const,
    availableForPackages: ["sklep-online"] as const,
  },
  "abandoned-cart": {
    id: "abandoned-cart",
    label: "Porzucone koszyki",
    description: "Automatyczne maile do klientów, którzy nie dokończyli zakupu",
    price: 700,
    group: "sprzedaz" as const,
    availableForPackages: ["sklep-online"] as const,
  },
  "loyalty-program": {
    id: "loyalty-program",
    label: "Program lojalnościowy",
    description: "Punkty, rangi klientów, kupony",
    price: 1500,
    group: "sprzedaz" as const,
    availableForPackages: ["sklep-online"] as const,
  },
  "wholesaler-feed": {
    id: "wholesaler-feed",
    label: "Integracja hurtowni",
    description: "Automatyczny import produktów (XML/API)",
    price: 1900,
    group: "sprzedaz" as const,
    availableForPackages: ["sklep-online"] as const,
  },
  crm: {
    id: "crm",
    label: "CRM",
    description: "HubSpot, Pipedrive — formularze i leady",
    price: 650,
    group: "automatyzacja" as const,
    availableForPackages: ["strona-pro", "sklep-online", "projekt-dedykowany"] as const,
  },
  "mail-automation": {
    id: "mail-automation",
    label: "Automatyzacja mailowa",
    description: "Mailchimp, Brevo — kampanie i automaty",
    price: 550,
    group: "automatyzacja" as const,
    availableForPackages: ["strona-pro", "sklep-online", "projekt-dedykowany"] as const,
  },
  "integrations-api": {
    id: "integrations-api",
    label: "Integracje API",
    description: "Zewnętrzne systemy, webhooks",
    price: 700,
    group: "automatyzacja" as const,
    availableForPackages: ["strona-pro", "sklep-online", "projekt-dedykowany"] as const,
  },
  erp: {
    id: "erp",
    label: "ERP",
    description: "Subiekt / system magazynowy",
    price: 1850,
    group: "automatyzacja" as const,
    availableForPackages: ["sklep-online"] as const,
  },
  "headless-cms": {
    id: "headless-cms",
    label: "Headless CMS",
    description: "Sanity / Contentful — edytor oddzielony od kodu",
    price: 1900,
    group: "skalowanie" as const,
    availableForPackages: ["projekt-dedykowany"] as const,
  },
  "performance-upgrade": {
    id: "performance-upgrade",
    label: "Szybsze działanie strony",
    description: "Poprawa szybkości i stabilności działania strony.",
    price: 500,
    group: "skalowanie" as const,
    availableForPackages: [
      "strona-start",
      "strona-pro",
      "sklep-online",
      "projekt-dedykowany",
    ] as const,
  },
  "cicd-deployment": {
    id: "cicd-deployment",
    label: "CI/CD deployment",
    description: "Automatyczne wdrożenia i testy",
    price: 1200,
    group: "skalowanie" as const,
    availableForPackages: ["projekt-dedykowany"] as const,
  },
  "multi-language-advanced": {
    id: "multi-language-advanced",
    label: "Multi-language advanced",
    description: "Wielojęzyczność zaawansowana (3+ języki)",
    price: 1400,
    group: "skalowanie" as const,
    availableForPackages: ["projekt-dedykowany"] as const,
  },
} as const;

export const TIMELINE_MULTIPLIERS = {
  express: {
    label: "Ekspresowo",
    days: "7 dni roboczych",
    multiplier: 1.3,
  },
  standard: {
    label: "Standardowo",
    days: "2–3 tygodnie",
    multiplier: 1.0,
  },
  relaxed: {
    label: "Elastycznie",
    days: "4+ tygodnie",
    multiplier: 0.95,
  },
} as const;

export type PackageId = keyof typeof PACKAGES;
export type FeatureId = keyof typeof FEATURES;
export type TimelineId = keyof typeof TIMELINE_MULTIPLIERS;

const MIN_PRICE = 2500;
const MAX_PRICE = 28000;

export interface CalculatePriceResult {
  base: number;
  featuresTotal: number;
  total: number;
  label: string;
}

/**
 * Compute final price from package, selected features, and timeline.
 * Clamped to MIN_PRICE–MAX_PRICE.
 */
export function calculatePrice(
  packageId: PackageId,
  features: FeatureId[],
  timeline: TimelineId
): CalculatePriceResult {
  const base = PACKAGES[packageId].basePrice;
  const allowed = getFeaturesForPackage(packageId);
  const validFeatures = features.filter((f) => allowed.includes(f));
  const featuresTotal = validFeatures.reduce((sum, f) => sum + FEATURES[f].price, 0);
  const multiplier = TIMELINE_MULTIPLIERS[timeline].multiplier;
  const raw = (base + featuresTotal) * multiplier;
  const totalRounded = Math.round(raw / 100) * 100;
  const total = Math.max(MIN_PRICE, Math.min(MAX_PRICE, totalRounded));

  const label = `od ${total.toLocaleString("pl-PL")} zł`;

  return { base, featuresTotal, total, label };
}

/** Features available for a given package (for calculator step). */
export function getFeaturesForPackage(packageId: PackageId): FeatureId[] {
  return (Object.keys(FEATURES) as FeatureId[]).filter((id) =>
    (FEATURES[id].availableForPackages as readonly PackageId[]).includes(packageId)
  );
}
