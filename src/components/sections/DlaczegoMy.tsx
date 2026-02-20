"use client";

import { motion } from "framer-motion";

import { IconBox } from "@/components/ui/IconBox";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/SpotlightCard";

import {
  fadeInUpStrong,
  fadeInUp,
  fadeInLeft,
  staggerContainer,
  viewportOnce,
  useReducedMotionPref,
} from "@/lib/animations";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";
import { cn } from "@/lib/utils";

import type { DlaczegoMyContentKey, DlaczegoMyProps } from "@/types";

function getSectionId(contentKey: DlaczegoMyContentKey): string {
  if (contentKey === "proces.dlaczego") return "dlaczego-proces";
  if (contentKey === "realizacjeEfekty") return "efekty";
  if (contentKey === "kalkulator.coDalej") return "co-dalej";
  return "dlaczego-my";
}

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

export function DlaczegoMy({ contentKey = "Home.dlaczegoMy", itemKeys, cardVariant = "default" }: DlaczegoMyProps) {
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";
  const glassBlurStyle = useGlassBlurStyle();
  const keys = (itemKeys ?? DEFAULT_KEYS) as string[];
  const content = TEXTS[contentKey];

  return (
    <Section id={getSectionId(contentKey)} className="section-benefits overflow-hidden" noWrapper>
      <div className="container-narrow section-intro">
        <motion.h2
          className="heading-2 text-white text-center"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUpStrong}
        >
          {content.title}
        </motion.h2>
        <motion.p
          className="section-desc text-center mt-4 mx-auto"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          {content.subtitle}
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
            variants={staggerContainer}
          >
            {keys.map((key) => {
              const emoji = EMOJI_MAP[key] ?? "💳";
              return (
                <motion.div
                  key={key}
                  variants={fadeInLeft}
                  initial={initial}
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="efekty-card"
                  style={glassBlurStyle}
                >
                  <IconBox emoji={emoji} className="efekty-icon" />
                  <h3 className="heading-3 text-white">
                    {content.items[key] ?? key}
                  </h3>
                  <p className="text-white/60 body-small mt-1">
                    {content.itemsDesc[key] ?? ""}
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
            variants={staggerContainer}
          >
            {keys.flatMap((key, index) => {
              const emoji = EMOJI_MAP[key] ?? "💳";
              const card = (
                <SpotlightCard
                  key={key}
                  className="custom-spotlight-card rounded-2xl h-full min-w-0 w-full"
                >
                  <div
                    className={cn(
                      "card benefit-card rounded-2xl flex flex-col items-center text-center card-padding h-full min-h-full",
                      cardVariant === "subpage" && "card-subpage",
                    )}
                    style={glassBlurStyle}
                  >
                    <motion.div
                      className="flex flex-col items-center text-center h-full min-h-full flex-1 min-w-0"
                      variants={fadeInLeft}
                      initial={initial}
                      whileInView="visible"
                      viewport={viewportOnce}
                    >
                      <IconBox emoji={emoji} />
                      <div className="min-w-0 flex-1 flex flex-col">
                        <h3 className="heading-3 text-white">
                          {content.items[key] ?? key}
                        </h3>
                        <p className="text-white/60 body-small mt-1">
                          {content.itemsDesc[key] ?? ""}
                        </p>
                      </div>
                    </motion.div>
                  </div>
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
