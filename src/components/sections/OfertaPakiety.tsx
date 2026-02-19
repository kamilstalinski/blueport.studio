"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconBox } from "@/components/ui/IconBox";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import SpotlightCard from "@/components/SpotlightCard";
import { cn } from "@/lib/utils";
import {
  fadeInUp,
  viewportOnce,
  useReducedMotionPref,
} from "@/lib/animations";

const CARDS = [
  { key: "sklepy" as const, emoji: "🛒" as const, title: "Sklepy internetowe (WooCommerce)", desc: "Sprzedawaj online bez skomplikowanych systemów.", price: "4 000 – 5 500 zł", cta: "Sprawdź wycenę" },
  { key: "strony" as const, emoji: "⚡" as const, title: "Strony firmowe (WordPress)", desc: "Idealne dla firm, które potrzebują nowoczesnej wizytówki online.", price: "2 500 – 3 000 zł", cta: "Sprawdź wycenę" },
  { key: "dedykowane" as const, emoji: "💻" as const, title: "Projekty dedykowane (Next.js)", desc: "Dla firm, które potrzebują czegoś więcej niż standardowy CMS.", price: "Od 6 000 zł", cta: "Sprawdź wycenę" },
] as const;

const PACKAGE_INCLUDES: Record<(typeof CARDS)[number]["key"], string[]> = {
  strony: [
    "Projekt graficzny UI",
    "Responsywność (mobile-first)",
    "Podstawowe SEO on-page",
    "Szkolenie z edycji (1h)",
    "30 dni wsparcia po wdrożeniu",
  ],
  sklepy: [
    "Projekt graficzny UI",
    "Konfiguracja płatności (Przelewy24, BLIK)",
    "Import produktów (do 50 szt.)",
    "SEO on-page dla sklepu",
    "Szkolenie z obsługi WooCommerce (2h)",
  ],
  dedykowane: [
    "Architektura techniczna",
    "Integracje API / CRM",
    "Wycena indywidualna",
    "Dedykowany opiekun projektu",
    "SLA i dokumentacja",
  ],
};

type OfertaPakietyProps = {
  /** Gradient od góry (domyślnie true). Na stronie głównej ustaw false, żeby go nie było. */
  topGradient?: boolean;
  /** Styl kart na podstronach (tło #111827, obramowanie 0.08) */
  cardVariant?: "default" | "subpage";
};

export function OfertaPakiety({ topGradient = true, cardVariant = "default" }: OfertaPakietyProps) {
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";

  return (
    <Section id="oferta-pakiety" className="section-packages" topGradient={topGradient} tight noWrapper>
      <div className={cn("container-narrow section-intro", topGradient && "relative z-10")}>
        <motion.h2
          className="heading-2 text-white mb-0"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          Jasne pakiety. Konkretne efekty.
        </motion.h2>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-stretch" style={{ gap: "var(--grid-gap)" }}>
        {CARDS.map((card, index) => {
          const { key, emoji, title, desc, price, cta } = card;
          const isMiddle = index === 1;

          return (
            <SpotlightCard
              key={key}
              className={`custom-spotlight-card rounded-2xl h-full oferta-package-card ${isMiddle ? "oferta-package-featured scale-[1.03] z-10" : ""}`}
            >
              <motion.article
                initial={initial}
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeInUp}
                className={cn(
                  "card rounded-2xl flex flex-col h-full relative card-padding",
                  isMiddle && "card-featured",
                  cardVariant === "subpage" && "card-subpage",
                )}
              >
                {isMiddle && (
                  <span
                    className="absolute top-4 right-4 body-small font-semibold px-3 py-1 rounded-full bg-primary text-black border-0"
                    aria-hidden
                  >
                    Najpopularniejsze
                  </span>
                )}
                <IconBox emoji={emoji} />
                <h3 className="heading-3 mt-6 text-white">{title}</h3>
                <p className="mt-3 body-standard text-white/60 leading-relaxed">{desc}</p>
                <div className="mt-6 flex-1">
                  <p className="heading-3 font-bold text-white mt-1">{price}</p>
                  {cardVariant === "subpage" && PACKAGE_INCLUDES[key] && (
                    <div
                      className="mt-4 pt-4 border-t flex flex-col gap-1"
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-secondary)",
                        paddingTop: 4,
                        borderTopColor: "var(--color-border)",
                      }}
                    >
                      <span className="font-semibold text-white/70" style={{ fontSize: "0.75rem" }}>
                        Co zawiera:
                      </span>
                      {PACKAGE_INCLUDES[key].map((item, i) => (
                        <div key={i} className="flex gap-2 items-start" style={{ padding: "4px 0" }}>
                          <span className="shrink-0 text-primary" aria-hidden>✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Link href="/kalkulator" className="mt-8 inline-block">
                  <Button
                    variant={isMiddle ? "primary" : "ghost"}
                    className={!isMiddle ? "!text-white/80 hover:!bg-white/10 hover:!text-white focus-visible:!ring-white/30" : undefined}
                  >
                    {cta}
                  </Button>
                </Link>
              </motion.article>
            </SpotlightCard>
          );
        })}
        </div>

        <p className="body-small text-white/50 mt-10 text-center">
          Nie wiesz, który pakiet wybrać?{" "}
          <Link href="/kalkulator" className="text-accent-2 hover:text-primary hover:underline decoration-primary">
            Sprawdź koszt w kalkulatorze.
          </Link>
        </p>
      </div>
    </Section>
  );
}
