"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { IconBox } from "@/components/ui/IconBox";
import SpotlightCard from "@/components/SpotlightCard";
import { cn } from "@/lib/utils";
import { viewportOnce, useReducedMotionPref } from "@/lib/animations";

const DEFAULT_KEYS = ["price", "time", "support"] as const;
const EMOJI_MAP: Record<string, string> = {
  price: "💳",
  time: "⏱️",
  support: "🤝",
  fast: "⚡",
  leads: "💬",
  seo: "🔍",
  conversion: "📊",
  send: "✉️",
  contact: "📞",
  quote: "📄",
};

const TEXTS: Record<string, { title: string; subtitle: string; items: Record<string, string>; itemsDesc: Record<string, string> }> = {
  "Home.dlaczegoMy": {
    title: "Szybko. Przejrzyście. Bez chaosu.",
    subtitle: "Proces uproszczony do minimum. Bez zbędnych formalności.",
    items: { price: "Jasna wycena przed startem", time: "Realizacja nawet w 1–2 tygodnie", stack: "Nowoczesny stack technologiczny", local: "Lokalna współpraca (Szczecin / online)", support: "Wsparcie po wdrożeniu" },
    itemsDesc: { price: "Stała cena, bez ukrytych kosztów.", time: "Szybki start i przewidywalny harmonogram.", stack: "Sprawdzone technologie i dobre praktyki.", local: "Blisko Ciebie — stacjonarnie lub zdalnie.", support: "Pomoc i szkolenie po oddaniu projektu." },
  },
  "proces.dlaczego": {
    title: "Dlaczego ten proces działa?",
    subtitle: "Przewidywalne etapy i jasna komunikacja.",
    items: { price: "Jasna wycena", time: "Szybka realizacja", support: "Transparentna komunikacja" },
    itemsDesc: { price: "Stała cena, bez ukrytych kosztów.", time: "Szybki start i ustalony harmonogram.", support: "Regularne informacje o postępach." },
  },
  "realizacjeEfekty": {
    title: "Efekty",
    subtitle: "Co zyskują nasi klienci.",
    items: { fast: "Szybsze ładowanie", leads: "Więcej zapytań", seo: "Lepsza widoczność", conversion: "Wyższa konwersja" },
    itemsDesc: { fast: "Lepsze Core Web Vitals i UX.", leads: "Formularze i CTA generujące leady.", seo: "Optymalizacja pod wyszukiwarki.", conversion: "Strony zaprojektowane pod konwersję." },
  },
  "kalkulator.coDalej": {
    title: "Co dalej?",
    subtitle: "Po wypełnieniu formularza.",
    items: { send: "Wysyłasz formularz", contact: "Kontakt w 24h", quote: "Finalna wycena" },
    itemsDesc: { send: "Wypełniasz zakres i dane kontaktowe.", contact: "Odpowiadamy w ciągu 24 godzin.", quote: "Przedstawiamy dokładną wycenę i plan." },
  },
};

type DlaczegoMyProps = {
  contentKey?: "Home.dlaczegoMy" | "proces.dlaczego" | "realizacjeEfekty" | "kalkulator.coDalej";
  itemKeys?: readonly string[];
  /** Styl kart na podstronach (tło #111827, obramowanie 0.08) */
  cardVariant?: "default" | "subpage";
};

const easeSmooth = [0.25, 0.46, 0.45, 0.94] as const;

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeSmooth } },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.06, ease: easeSmooth } },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: easeSmooth } },
};

export function DlaczegoMy({ contentKey = "Home.dlaczegoMy", itemKeys, cardVariant = "default" }: DlaczegoMyProps) {
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";
  const keys = (itemKeys ?? DEFAULT_KEYS) as string[];
  const c = TEXTS[contentKey];

  return (
    <Section id={contentKey === "proces.dlaczego" ? "dlaczego-proces" : contentKey === "realizacjeEfekty" ? "efekty" : contentKey === "kalkulator.coDalej" ? "co-dalej" : "dlaczego-my"} className="section-benefits overflow-hidden" noWrapper>
      <div className="container-narrow section-intro">
        <motion.h2
          className="heading-2 text-white text-center"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={headingVariants}
        >
          {c.title}
        </motion.h2>
        <motion.p
          className="section-desc text-center mt-4 mx-auto"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={subtitleVariants}
        >
          {c.subtitle}
        </motion.p>
      </div>

      <div className="container">
        {contentKey === "realizacjeEfekty" ? (
          <motion.div
            className="efekty-grid mt-14"
            role="list"
            initial={initial}
            whileInView="visible"
            viewport={viewportOnce}
            variants={listVariants}
          >
            {keys.map((key) => {
              const emoji = EMOJI_MAP[key] ?? "💳";
              return (
                <motion.div
                  key={key}
                  variants={itemVariants}
                  initial={initial}
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="efekty-card"
                >
                  <IconBox emoji={emoji} className="efekty-icon" />
                  <h3 className="heading-3 text-white">
                    {c.items[key] ?? key}
                  </h3>
                  <p className="text-white/60 body-small mt-1">
                    {c.itemsDesc[key] ?? ""}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch sm:mx-auto mt-14"
            style={{ gap: "var(--grid-gap)" }}
            role="list"
            initial={initial}
            whileInView="visible"
            viewport={viewportOnce}
            variants={listVariants}
          >
            {keys.flatMap((key, index) => {
              const emoji = EMOJI_MAP[key] ?? "💳";
              const card = (
                <SpotlightCard
                  key={key}
                  className="custom-spotlight-card rounded-2xl h-full min-w-0 w-full"
                >
                  <motion.div
                    variants={itemVariants}
                    initial={initial}
                    whileInView="visible"
                    viewport={viewportOnce}
                    className={cn(
                      "card benefit-card rounded-2xl flex flex-col items-center text-center card-padding h-full min-h-full",
                      cardVariant === "subpage" && "card-subpage",
                    )}
                  >
                    <IconBox emoji={emoji} />
                    <div className="min-w-0 flex-1 flex flex-col">
                      <h3 className="heading-3 text-white">
                        {c.items[key] ?? key}
                      </h3>
                      <p className="text-white/60 body-small mt-1">
                        {c.itemsDesc[key] ?? ""}
                      </p>
                    </div>
                  </motion.div>
                </SpotlightCard>
              );
              if (index === 0) return [card];
              return [
                <span
                  key={`arrow-${key}`}
                  className="hidden sm:flex items-center justify-center px-1 md:px-2 text-white/30 text-xl"
                  aria-hidden
                >
                  →
                </span>,
                card,
              ];
            })}
          </motion.div>
        )}
      </div>
    </Section>
  );
}
