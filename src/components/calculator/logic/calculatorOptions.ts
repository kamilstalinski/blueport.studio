/**
 * Step data and options for the calculator (labels, presets, feature definitions).
 * Used by UI components and by pricing/summary logic.
 */

import type { ProjectType } from "@/types";

export type ProjectCategory = "wordpress" | "woocommerce" | "nextjs";
export type ProjectTier = "standard" | "pro";

export interface ProjectTypeOption {
  id: NonNullable<ProjectType>;
  title: string;
  subtitle: string;
  includes: string[];
  techNote?: string;
}

/** Resolve projectType from category + tier. Next.js has no tier. */
export function projectTypeFromCategoryTier(
  category: ProjectCategory,
  tier: ProjectTier
): NonNullable<ProjectType> {
  if (category === "wordpress") return tier === "pro" ? "wordpress-pro" : "wordpress-standard";
  if (category === "woocommerce") return tier === "pro" ? "woocommerce-pro" : "woocommerce-start";
  return "nextjs";
}

/** Category from projectType (for UI state). */
export function categoryFromProjectType(type: NonNullable<ProjectType>): ProjectCategory {
  if (type === "wordpress-standard" || type === "wordpress-pro") return "wordpress";
  if (type === "woocommerce-start" || type === "woocommerce-pro") return "woocommerce";
  return "nextjs";
}

/** Tier from projectType; for nextjs returns "standard". */
export function tierFromProjectType(type: NonNullable<ProjectType>): ProjectTier {
  if (type === "wordpress-pro" || type === "woocommerce-pro") return "pro";
  return "standard";
}

export const PROJECT_TYPE_OPTIONS: ProjectTypeOption[] = [
  {
    id: "wordpress-standard",
    title: "Strona firmowa Standard",
    subtitle: "Szybka realizacja na WordPress",
    includes: [
      "Do 5 podstron",
      "Motyw WordPress + customizacja",
      "SEO podstawowe",
      "Formularz kontaktowy",
      "Responsywność (mobile)",
    ],
  },
  {
    id: "wordpress-pro",
    title: "Strona firmowa PRO",
    subtitle: "Indywidualny projekt UI + WordPress",
    includes: [
      "Indywidualny projekt graficzny UI (wliczony w cenę)",
      "Do 10 podstron",
      "Zaawansowane sekcje i animacje",
      "SEO techniczne",
      "Wydajność i Core Web Vitals",
    ],
  },
  {
    id: "woocommerce-start",
    title: "Sklep WooCommerce Start",
    subtitle: "Gotowy sklep do 20 produktów",
    includes: [
      "Do 20 produktów",
      "Przelewy24 / PayU",
      "Integracja kurierów (InPost, DPD)",
      "Panel zarządzania zamówieniami",
      "Responsywność",
    ],
  },
  {
    id: "woocommerce-pro",
    title: "Sklep WooCommerce PRO",
    subtitle: "Rozbudowany sklep z optymalizacją sprzedaży",
    includes: [
      "Nielimitowane produkty",
      "Zaawansowane filtry i warianty",
      "Odzyskiwanie porzuconych koszyków",
      "Integracja z hurtownią / XML",
      "Projekt UI sklepu",
    ],
  },
  {
    id: "nextjs",
    title: "Projekt dedykowany",
    subtitle: "Strona pisana na zamówienie, bez szablonów",
    includes: [
      "Indywidualny projekt UX/UI",
      "Kod pisany od podstaw",
      "Wysoka wydajność i bezpieczeństwo",
      "Opcjonalny panel do zarządzania treścią",
      "Nieograniczone możliwości funkcjonalne",
    ],
    techNote: "Realizowane w Next.js / React",
  },
];

const optionById = new Map(PROJECT_TYPE_OPTIONS.map((o) => [o.id, o]));

/** Option to show for a category at given tier (includes list). */
export function getProjectTypeOptionForCategoryTier(
  category: ProjectCategory,
  tier: ProjectTier
): ProjectTypeOption {
  const id = projectTypeFromCategoryTier(category, tier);
  return optionById.get(id)!;
}

export const SCOPE_PRESETS_PAGES = [1, 3, 5, 10, 15, 20] as const;
export const SCOPE_PRESETS_PRODUCTS = [10, 20, 50, 100, 200, 500] as const;

export interface Feature {
  id: string;
  label: string;
  description: string;
  minCost: number;
  maxCost: number;
}

const ALL_FEATURES: Feature[] = [
  {
    id: "custom-ui-upgrade",
    label: "Projekt graficzny UI (upgrade)",
    description: "Własny projekt graficzny zamiast gotowego motywu",
    minCost: 900,
    maxCost: 1600,
  },
  {
    id: "seo-advanced",
    label: "SEO zaawansowane",
    description: "Schema.org, sitemap XML, Google Search Console, meta opisy",
    minCost: 550,
    maxCost: 900,
  },
  {
    id: "blog",
    label: "Moduł bloga / aktualności",
    description: "System publikacji wpisów, kategorie, tagi",
    minCost: 350,
    maxCost: 600,
  },
  {
    id: "booking",
    label: "System rezerwacji online",
    description: "Kalendarz, sloty, potwierdzenia e-mail",
    minCost: 1200,
    maxCost: 2000,
  },
  {
    id: "automation",
    label: "Automatyzacja i CRM",
    description: "Formularze → CRM, maile automatyczne, webhooks",
    minCost: 1100,
    maxCost: 1900,
  },
  {
    id: "performance",
    label: "Optymalizacja wydajności",
    description: "Core Web Vitals, lazy loading, caching, CDN setup",
    minCost: 350,
    maxCost: 650,
  },
  {
    id: "product-filters",
    label: "Zaawansowane filtry produktów",
    description: "Filtrowanie po cechach, cenie, dostępności (AJAX)",
    minCost: 700,
    maxCost: 1300,
  },
  {
    id: "product-variants",
    label: "Warianty produktów",
    description: "Rozmiary, kolory, konfiguratory — zaawansowane kombinacje",
    minCost: 600,
    maxCost: 1100,
  },
  {
    id: "abandoned-cart",
    label: "Odzyskiwanie porzuconych koszyków",
    description: "Automatyczne maile do klientów którzy nie dokończyli zakupu",
    minCost: 500,
    maxCost: 900,
  },
  {
    id: "loyalty-program",
    label: "Program lojalnościowy",
    description: "Punkty, rangi klientów, kupony",
    minCost: 1100,
    maxCost: 1900,
  },
  {
    id: "wholesaler-feed",
    label: "Integracja z hurtownią (XML/API)",
    description: "Automatyczny import produktów z zewnętrznego źródła",
    minCost: 1400,
    maxCost: 2500,
  },
  {
    id: "headless-cms",
    label: "CMS headless (Sanity / Contentful)",
    description: "Edytor treści zewnętrzny, oddzielony od kodu",
    minCost: 1400,
    maxCost: 2400,
  },
  {
    id: "online-payments",
    label: "Płatności online",
    description: "Przelewy24, PayU lub Stripe — konfiguracja i testy",
    minCost: 600,
    maxCost: 1100,
  },
];

const featureById = new Map(ALL_FEATURES.map((f) => [f.id, f]));

export function getFeatureCost(id: string): { min: number; max: number } | undefined {
  const f = featureById.get(id);
  return f ? { min: f.minCost, max: f.maxCost } : undefined;
}

export function getFeatureLabel(id: string): string {
  return featureById.get(id)?.label ?? id;
}

export const FEATURES_BY_TYPE: Record<NonNullable<ProjectType>, Feature[]> = {
  "wordpress-standard": (["custom-ui-upgrade", "seo-advanced", "blog", "booking", "performance"] as const).map(
    (id) => featureById.get(id)!
  ),
  "wordpress-pro": (["seo-advanced", "blog", "booking", "automation", "performance"] as const).map(
    (id) => featureById.get(id)!
  ),
  "woocommerce-start": (["seo-advanced", "blog", "product-filters", "product-variants", "abandoned-cart", "performance"] as const).map(
    (id) => featureById.get(id)!
  ),
  "woocommerce-pro": (
    [
      "seo-advanced",
      "blog",
      "product-filters",
      "product-variants",
      "abandoned-cart",
      "loyalty-program",
      "wholesaler-feed",
      "automation",
      "performance",
    ] as const
  ).map((id) => featureById.get(id)!),
  nextjs: (
    [
      "seo-advanced",
      "blog",
      "booking",
      "automation",
      "performance",
      "headless-cms",
      "online-payments",
    ] as const
  ).map((id) => featureById.get(id)!),
};

export const LANGUAGE_OPTIONS = [
  { value: 1, label: "1 język (polski)" },
  { value: 2, label: "2 języki (np. PL + EN)" },
  { value: 3, label: "3 języki" },
  { value: 4, label: "4+ języki" },
] as const;

export interface IntegrationOption {
  id: string;
  label: string;
  description: string;
  minCost: number;
  maxCost: number;
  woocommerceOnly?: boolean;
}

export const INTEGRATION_OPTIONS: IntegrationOption[] = [
  { id: "crm", label: "CRM (HubSpot, Pipedrive)", description: "", minCost: 450, maxCost: 850 },
  { id: "mail", label: "E-mail marketing (Mailchimp, Brevo)", description: "", minCost: 280, maxCost: 550 },
  { id: "analytics", label: "Analityka (GA4, GTM, Hotjar)", description: "", minCost: 220, maxCost: 420 },
  { id: "social", label: "Social / Meta Pixel", description: "", minCost: 250, maxCost: 450 },
  { id: "maps", label: "Mapa Google", description: "", minCost: 250, maxCost: 450 },
  { id: "chat", label: "Chat (LiveChat, Tidio)", description: "", minCost: 350, maxCost: 650 },
  { id: "pos", label: "Kasa / system POS", description: "", minCost: 800, maxCost: 1500, woocommerceOnly: true },
  { id: "erp", label: "ERP / Subiekt / system magazynowy", description: "", minCost: 1200, maxCost: 2500, woocommerceOnly: true },
  { id: "other", label: "Inna integracja", description: "", minCost: 450, maxCost: 950 },
];

/** Step 5 — Contact: priority selector (optional). */
export const PRIORITY_OPTIONS = [
  { value: "speed" as const, label: "Szybka realizacja", description: "Zależy mi na czasie, chcę działać sprawnie" },
  { value: "price" as const, label: "Optymalna cena", description: "Szukam dobrego stosunku jakości do ceny" },
  { value: "quality" as const, label: "Najwyższa jakość", description: "Zależy mi na efekcie, budżet elastyczny" },
  { value: "feature" as const, label: "Konkretna funkcjonalność", description: "Mam specyficzne wymagania techniczne" },
];
