import type { WorkSlug } from "@/constants/work";

/** O nas copy, rewritten from the facts in PRODUCT.md and the case studies. */
export const ABOUT_STORY = [
  "Mała firma potrzebuje strony, z której przychodzą zapytania. Ładny projekt nie wystarczy, jeśli klient nie znajdzie strony w Google albo nie wie, gdzie na niej kliknąć.",
  "Dlatego projekt zaczynamy od pytania, skąd przychodzą Twoi klienci i co mają zrobić na stronie. Dla Vilmart był to formularz doboru filtra, dla Dobrych Precli mapa punktów i menu z alergenami.",
  "Zakres i datę publikacji ustalamy na krótkiej rozmowie, zanim zaczniemy projektować, a potem się ich trzymamy. Od akceptacji projektu do publikacji mijają zwykle 1–2 tygodnie.",
] as const;

/** The statement that lights up word by word; `accent` is the one phrase set in the accent. */
export const ABOUT_STATEMENT = {
  before: "Zakres i datę publikacji wpisujemy do umowy, zanim zaczniemy projektować. Przez cały projekt rozmawiasz z ",
  accent: "Kamilem albo Rafałem",
  after: ". Po publikacji sam zmieniasz teksty, zdjęcia i ceny w panelu.",
} as const;

/** The tools we build on, each with client sites made on it. */
export const ABOUT_TECHS = [
  { name: "WordPress", icon: "/icons/wordpress.svg", use: "strony firmowe", sites: ["vilmart", "abcmosty"] },
  { name: "WooCommerce", icon: "/icons/woocommerce.svg", use: "sklepy internetowe", sites: ["dowytrenowania", "spavalnia"] },
  { name: "Next.js", icon: "/icons/nextjs.svg", use: "projekty dedykowane", sites: ["dobreprecle", "uniqueideas"] },
] as const satisfies readonly { name: string; icon: string; use: string; sites: readonly WorkSlug[] }[];

/** Who we work for, told by the trade and the real client behind it. */
export const ABOUT_CLIENTS = [
  { trade: "Gabinety i specjaliści", site: "dowytrenowania" },
  { trade: "Usługi lokalne", site: "vilmart" },
  { trade: "Gastronomia", site: "dobreprecle" },
  { trade: "Hurtownie i sprzedaż B2B", site: "polaqua" },
  { trade: "Firmy rodzinne", site: "abcmosty" },
  { trade: "Fundacje i organizacje", site: "uniqueideas" },
  { trade: "Muzycy i artyści", site: "afterthesin" },
] as const satisfies readonly { trade: string; site: WorkSlug }[];

export const ABOUT_NOT_FOR = [
  "Firmy, które potrzebują stałego zespołu i wielomiesięcznych wdrożeń",
  "Agencje szukające podwykonawcy do masowej produkcji",
] as const;
