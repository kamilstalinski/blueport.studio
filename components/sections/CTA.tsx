"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  fadeInUp,
  viewportOnce,
  useReducedMotionPref
} from "@/lib/animations";

type CTAProps = { contentKey?: "Home.cta" | "oNas.cta" };

export function CTA({ contentKey = "Home.cta" }: CTAProps) {
  const t = useTranslations(contentKey);
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";
  const singleButton = contentKey === "oNas.cta";

  return (
    <Section id="cta" className="text-center">
      <motion.div
        initial={initial}
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeInUp}
      >
        <h2 className="heading-2 text-white mb-10">
          {t("title")}
        </h2>
        <p className="body-lead mx-auto max-w-prose text-white/70">
          {t("subtitle")}
        </p>
        <div className="mt-12 flex flex-col md:flex-row flex-wrap justify-center gap-4 w-full max-w-xl mx-auto">
          {singleButton ? (
            <Link href="/kontakt" className="w-full md:w-auto">
              <motion.span
                className="cta-button-shimmer inline-block w-full md:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="primary">{t("button")}</Button>
              </motion.span>
            </Link>
          ) : (
            <>
              <Link href="/kalkulator" className="w-full md:w-auto">
                <motion.span
                  className="cta-button-shimmer inline-block w-full md:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="primary">Sprawdź wycenę</Button>
                </motion.span>
              </Link>
              <Link href="/kontakt" className="w-full md:w-auto">
                <motion.span
                  className="cta-button-shimmer inline-block w-full md:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="secondary">{t("button")}</Button>
                </motion.span>
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </Section>
  );
}
