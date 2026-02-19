"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/messages";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  fadeInUp,
  viewportOnce,
  useReducedMotionPref,
} from "@/lib/animations";

const STEP_LABELS_5 = ["1", "2", "3", "4", "5"] as const;

type ProcesHomeProps = {
  contentKey?: "Home.proces" | "oNas.proces";
  stepCount?: 4 | 5;
};

export function ProcesHome({ contentKey = "Home.proces", stepCount = 5 }: ProcesHomeProps) {
  const t = useTranslations(contentKey);
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";
  const stepLabels = stepCount === 4 ? (["1", "2", "3", "4"] as const) : STEP_LABELS_5;

  return (
    <section id="proces" className="relative py-20 md:py-32 lg:py-36">
      <Container className="relative z-10">
        <motion.header
          className="text-center"
          initial={initial}
          animate="visible"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <h2 className="heading-2 text-foreground">{t("title")}</h2>
          {t("subtitle") && (
            <p className="mt-2 body-lead text-foreground/70">{t("subtitle")}</p>
          )}
        </motion.header>

        {/* Timeline: horizontal on desktop, vertical on mobile */}
        <motion.div
          className="mt-[60px]"
          initial={initial}
          animate="visible"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          {/* Desktop: horizontal line + 5 points */}
          <div className="relative hidden md:block">
            <div
              className="absolute left-0 right-0 top-6 h-px -translate-y-px bg-white/10"
              aria-hidden
            />
            <div className="flex">
              {stepLabels.map((label) => (
                <div
                  key={label}
                  className="group relative flex flex-1 flex-col items-center"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/60 bg-white/[0.02] backdrop-blur-sm text-[17px] font-semibold text-primary transition-all duration-200 hover:border-primary hover:shadow-[0_0_20px_rgba(0,229,160,0.25)]">
                    <span className="block transition-transform duration-200 group-hover:scale-105">
                      {label}
                    </span>
                  </div>
                  <h3 className="mt-4 text-center heading-3 text-white">
                    {t(`stepTitles.${label}`)}
                  </h3>
                  <p className="mt-1 text-center body-small text-white/60 transition-opacity group-hover:opacity-100">
                    {t(`steps.${label}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="relative flex flex-col gap-10 md:hidden">
            <div
              className="absolute left-6 top-0 bottom-0 w-px bg-white/10"
              aria-hidden
            />
            {stepLabels.map((label) => (
              <div
                key={label}
                className="group relative flex items-start gap-4"
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/60 bg-white/[0.02] backdrop-blur-sm text-[17px] font-semibold text-primary transition-all duration-200 hover:border-primary hover:shadow-[0_0_20px_rgba(0,229,160,0.25)]">
                  <span className="block transition-transform duration-200 group-hover:scale-105">
                    {label}
                  </span>
                </div>
                <div className="min-w-0 pt-1">
                  <h3 className="heading-3 text-white">
                    {t(`stepTitles.${label}`)}
                  </h3>
                  <p className="mt-0.5 body-small text-white/60 transition-opacity group-hover:opacity-100">
                    {t(`steps.${label}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="mt-8 text-center body-lead text-foreground/70"
          initial={initial}
          animate="visible"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          {t("timeline")}
        </motion.p>

        <motion.div
          className="mt-[60px] flex flex-col items-center justify-center gap-4 text-center"
          initial={initial}
          animate="visible"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          {t("outro") && (
            <p className="body-lead font-medium text-foreground/70 leading-relaxed">
              {t("outro")}
            </p>
          )}
          <Link href="/proces">
            <Button variant="primary" className="min-h-[3rem] px-8 py-3 body-standard font-medium">
              {t("cta")}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
