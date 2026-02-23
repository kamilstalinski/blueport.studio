/**
 * Single source of truth for package and feature pricing.
 * Used by: OfertaPakiety (main page packages), Calculator (Step1Type, useCalculator, CalculatorRight).
 * Never hardcode prices in components.
 */

export const PACKAGES = {
  wordpress: {
    id: "wordpress",
    name: "Strona Firmowa",
    tech: "WordPress",
    description:
      "Do 5 podstron, SEO on-page, formularz kontaktowy, panel CMS.",
    basePrice: 2500,
    deliveryDays: 14,
    tag: null,
  },
  woocommerce: {
    id: "woocommerce",
    name: "Sklep Internetowy",
    tech: "WooCommerce",
    description:
      "Płatności online, integracja kurierów, panel zamówień, do 50 produktów.",
    basePrice: 4500,
    deliveryDays: 21,
    tag: "Najpopularniejszy",
  },
  nextjs: {
    id: "nextjs",
    name: "Projekt Dedykowany",
    tech: "Next.js",
    description:
      "Własna logika biznesowa, API, bez szablonów. Wycena indywidualna.",
    basePrice: 6500,
    deliveryDays: 30,
    tag: null,
  },
} as const;

export const FEATURES = {
  seo: {
    id: "seo",
    label: "SEO on-page",
    description:
      "Optymalizacja meta, nagłówków, sitemap, robots.txt",
    price: 500,
  },
  copywriting: {
    id: "copywriting",
    label: "Copywriting",
    description: "Teksty sprzedażowe do 5 podstron",
    price: 800,
  },
  animations: {
    id: "animations",
    label: "Animacje premium",
    description:
      "Framer Motion — scroll reveal, hover, page transitions",
    price: 600,
  },
  cms: {
    id: "cms",
    label: "Rozszerzony CMS",
    description: "Panel do edycji treści bez programisty",
    price: 400,
  },
  integrations: {
    id: "integrations",
    label: "Integracje zewnętrzne",
    description:
      "Google Analytics, Hotjar, CRM, systemy mailingowe",
    price: 700,
  },
  hosting: {
    id: "hosting",
    label: "Hosting i domena",
    description:
      "Konfiguracja VPS, SSL, backup, pierwszy rok w cenie",
    price: 300,
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

export interface CalculatePriceResult {
  base: number;
  featuresTotal: number;
  total: number;
  label: string;
}

/**
 * Compute final price from package, selected features, and timeline.
 */
export function calculatePrice(
  packageId: PackageId,
  features: FeatureId[],
  timeline: TimelineId
): CalculatePriceResult {
  const base = PACKAGES[packageId].basePrice;
  const featuresTotal = features.reduce(
    (sum, f) => sum + FEATURES[f].price,
    0
  );
  const multiplier = TIMELINE_MULTIPLIERS[timeline].multiplier;
  const raw = (base + featuresTotal) * multiplier;
  const total = Math.round(raw / 100) * 100;

  const label =
    timeline === "express"
      ? `od ${total.toLocaleString("pl-PL")} zł`
      : `${total.toLocaleString("pl-PL")} – ${Math.round((total * 1.15) / 100) * 100} zł`;

  return { base, featuresTotal, total, label };
}
