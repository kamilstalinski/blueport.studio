"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconBox } from "@/components/ui/IconBox";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { useReducedMotionPref } from "@/lib/animations";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";
import type { ProcesVerticalTimelineProps } from "@/types";

const CARD_BASE =
  "card process-card relative rounded-2xl min-w-0 flex-1 proces-timeline-card-padding";

const STEP_KEYS = ["1", "2", "3", "4", "5"] as const;

const STEP_ICONS_5 = ["📋", "💬", "🛠", "✅", "🚀"] as const;

const TIMELINE_STEPS = [
  { title: "Wypełniasz kalkulator", desc: "W 60 sekund określasz zakres projektu i otrzymujesz wstępną wycenę. Bez zobowiązań i bez rozmów sprzedażowych.", bullets: ["wybierasz typ strony", "określasz funkcje", "otrzymujesz szacunkowy koszt"] },
  { title: "Kontakt i doprecyzowanie", desc: "Kontaktujemy się, aby ustalić szczegóły i potwierdzić finalną cenę oraz termin.", bullets: ["omawiamy potrzeby", "doprecyzowujemy funkcjonalności", "ustalamy harmonogram"] },
  { title: "Projekt i realizacja", desc: "Tworzymy projekt wizualny i wdrażamy go w wybranej technologii.", bullets: ["projekt UI", "implementacja", "optymalizacja szybkości"] },
  { title: "Testy i poprawki", desc: "Sprawdzamy stronę na różnych urządzeniach i nanosimy poprawki przed publikacją.", bullets: ["testy mobilne", "optymalizacja SEO", "akceptacja finalnej wersji"] },
  { title: "Wdrożenie i wsparcie", desc: "Publikujemy stronę i przekazujemy Ci pełną kontrolę nad projektem.", bullets: ["konfiguracja serwera", "podpięcie domeny", "szkolenie z obsługi"] },
];

const CTA_BLOCK = { text: "Całość zwykle trwa 1–2 tygodnie.", question: "Chcesz poznać dokładną wycenę?", button: "Przejdź do kalkulatora" };

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0, 0, 0.2, 1], delay: i * 0.1 },
  }),
};

const viewport = { once: true, amount: 0.3 };

export function ProcesVerticalTimeline({ cardVariant = "default" }: ProcesVerticalTimelineProps = {}) {
  const reduceMotion = useReducedMotionPref();
  const glassBlur = useGlassBlurStyle("default");
  const CARD_CLASS = `${CARD_BASE}${cardVariant === "subpage" ? " card-subpage" : ""}`;

  return (
    <section
      id="proces-timeline"
      className="relative mx-auto w-full max-w-[1200px] section-padding"
      style={{ paddingBottom: "var(--space-16)" }}
    >
      {/* Wrapper so the line ends before CTA */}
      <div className="relative">
        {/* Vertical line — mobile: through circle center (pl-4 + 24px radius); desktop: center; gap 48px */}
        <div
          className="absolute top-0 left-10 w-0.5 opacity-70 md:left-1/2 md:-translate-x-px"
          style={{
            height: "100%",
            background: `linear-gradient(to bottom, var(--color-timeline-line-start), var(--color-timeline-line-end))`,
          }}
          aria-hidden
        />

        <div className="relative flex flex-col gap-12">
          {STEP_KEYS.map((key, index) => {
            const isLeft = index % 2 === 0;
            const step = TIMELINE_STEPS[index];
            const bullets = step.bullets;
            const emoji = STEP_ICONS_5[index];

            const circleClass =
              "proces-timeline-circle relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold backdrop-blur-[12px] transition-all duration-300 hover:shadow-[0_0_20px_var(--color-accent-glow)]";

            const cardContent = (
              <>
                <div className="flex items-center gap-3">
                  <IconBox emoji={emoji} className="proces-timeline-icon" />
                  <h3 className="heading-3 text-white">{step.title}</h3>
                </div>
                <p className="mt-3 body-standard leading-relaxed text-white/70">
                  {step.desc}
                </p>
                {bullets.length > 0 && (
                  <ul className="proces-timeline-bullets mt-4">
                    {bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </>
            );

            return (
              <motion.div
                key={key}
                custom={index}
                initial={reduceMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={viewport}
                variants={itemVariants}
                className="relative flex min-h-[180px] flex-col gap-4 md:min-h-0 md:flex-row md:items-center md:gap-6"
              >
                {/* Mobile: line on left, circle then card */}
                <div className="flex items-start gap-4 pl-4 md:hidden">
                  <div className={circleClass} aria-hidden>
                    {key}
                  </div>
                  <SpotlightCard
                    className="custom-spotlight-card min-w-0 flex-1 rounded-2xl"
                  >
                    <div className={CARD_CLASS} style={glassBlur}>{cardContent}</div>
                  </SpotlightCard>
                </div>

                {/* Desktop: alternating left/right cards, circle on line */}
                <div className="hidden md:flex md:w-full md:items-center">
                  <div className="flex flex-1 justify-end pr-6">
                    {isLeft && (
                      <SpotlightCard
                        className="custom-spotlight-card w-[420px] max-w-full rounded-2xl lg:w-[480px]"
                      >
                        <div className={`${CARD_CLASS} w-full`} style={glassBlur}>{cardContent}</div>
                      </SpotlightCard>
                    )}
                  </div>
                  <div className={circleClass} aria-hidden>
                    {key}
                  </div>
                  <div className="flex flex-1 justify-start pl-6">
                    {!isLeft && (
                      <SpotlightCard
                        className="custom-spotlight-card w-[420px] max-w-full rounded-2xl lg:w-[480px]"
                      >
                        <div className={`${CARD_CLASS} w-full`} style={glassBlur}>{cardContent}</div>
                      </SpotlightCard>
                    )}
                  </div>
                </div>
            </motion.div>
          );
        })}
        </div>
      </div>

      {/* CTA block */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.35 }}
      >
        <p className="body-lead text-foreground/80">{CTA_BLOCK.text}</p>
        <p className="mt-2 heading-3 text-foreground">{CTA_BLOCK.question}</p>
        <Link href="/kalkulator" className="mt-6 inline-block">
          <Button variant="primary" className="proces-cta-button">
            {CTA_BLOCK.button}
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
