"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Calculator, MessageCircle, Code2, CheckSquare, Rocket } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { useReducedMotionPref } from "@/lib/animations";

const SPOTLIGHT_COLOR_FAQ = "rgba(0, 229, 160, 0.2)" as const;
const GLASS_CARD_CLASS =
  "glass-card relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 min-w-0 flex-1 p-6 sm:p-8";

const STEP_KEYS = ["1", "2", "3", "4", "5"] as const;

const STEP_ICONS = [
  Calculator,   // 1 – Wypełniasz kalkulator
  MessageCircle, // 2 – Kontakt i doprecyzowanie
  Code2,        // 3 – Projekt i realizacja
  CheckSquare,  // 4 – Testy i poprawki
  Rocket,       // 5 – Wdrożenie i wsparcie
] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0, 0, 0.2, 1], delay: i * 0.1 },
  }),
};

const viewport = { once: true, amount: 0.3 };

export function ProcesVerticalTimeline() {
  const t = useTranslations("proces.timeline");
  const tCta = useTranslations("proces.ctaBlock");
  const reduceMotion = useReducedMotionPref();

  return (
    <section
      id="proces-timeline"
      className="relative mx-auto w-full max-w-[1200px] px-6 pt-12 pb-[160px] md:px-8"
    >
      {/* Wrapper so the line ends before CTA */}
      <div className="relative">
        {/* Vertical line — mobile: through circle center (pl-4 + circle radius); desktop: center */}
        <div
          className="absolute top-0 left-[43px] w-0.5 opacity-70 md:left-1/2 md:-translate-x-px"
          style={{
            height: "100%",
            background: "linear-gradient(to bottom, #00e5a0, #00b8d9)",
          }}
          aria-hidden
        />

        <div className="relative space-y-0">
          {STEP_KEYS.map((key, index) => {
            const isLeft = index % 2 === 0;
            const rawBullets = t.raw(`${key}.bullets`) as string[] | Record<string, string> | undefined;
            const bullets: string[] = Array.isArray(rawBullets)
              ? rawBullets
              : rawBullets && typeof rawBullets === "object"
                ? Object.values(rawBullets)
                : [];
            const Icon = STEP_ICONS[index];

            const circleClass =
              "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#00e5a0] bg-white/[0.03] text-lg font-semibold text-[#00e5a0] backdrop-blur-[12px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,160,0.3)]";

            const cardContent = (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,229,160,0.12)] text-[#00e5a0]">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="heading-3 text-white">{t(`${key}.title`)}</h3>
                </div>
                <p className="mt-3 body-standard leading-relaxed text-white/70">
                  {t(`${key}.desc`)}
                </p>
                {bullets.length > 0 && (
                  <ul className="mt-4 space-y-2 list-none">
                    {bullets.map((bullet, i) => (
                      <li key={i} className="flex items-center gap-2 body-small text-white/60">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00e5a0]" aria-hidden />
                        {bullet}
                      </li>
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
                className="relative flex min-h-[180px] flex-col gap-4 py-4 md:min-h-0 md:flex-row md:items-center md:gap-6 md:py-10"
              >
                {/* Mobile: line on left, circle then card */}
                <div className="flex items-start gap-4 pl-4 md:hidden">
                  <div className={circleClass} aria-hidden>
                    {key}
                  </div>
                  <SpotlightCard
                    className="custom-spotlight-card min-w-0 flex-1 rounded-2xl overflow-hidden"
                    spotlightColor={SPOTLIGHT_COLOR_FAQ}
                  >
                    <div className={GLASS_CARD_CLASS}>{cardContent}</div>
                  </SpotlightCard>
                </div>

                {/* Desktop: alternating left/right cards, circle on line */}
                <div className="hidden md:flex md:w-full md:items-center">
                  <div className="flex flex-1 justify-end pr-6">
                    {isLeft && (
                      <SpotlightCard
                        className="custom-spotlight-card w-[420px] max-w-full rounded-2xl overflow-hidden lg:w-[480px]"
                        spotlightColor={SPOTLIGHT_COLOR_FAQ}
                      >
                        <div className={`${GLASS_CARD_CLASS} w-full`}>{cardContent}</div>
                      </SpotlightCard>
                    )}
                  </div>
                  <div className={circleClass} aria-hidden>
                    {key}
                  </div>
                  <div className="flex flex-1 justify-start pl-6">
                    {!isLeft && (
                      <SpotlightCard
                        className="custom-spotlight-card w-[420px] max-w-full rounded-2xl overflow-hidden lg:w-[480px]"
                        spotlightColor={SPOTLIGHT_COLOR_FAQ}
                      >
                        <div className={`${GLASS_CARD_CLASS} w-full`}>{cardContent}</div>
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
        <p className="body-lead text-foreground/80">{tCta("text")}</p>
        <p className="mt-2 heading-3 text-foreground">{tCta("question")}</p>
        <Link href="/kalkulator" className="mt-6 inline-block">
          <Button variant="primary" className="min-h-12 px-8">
            {tCta("button")}
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
