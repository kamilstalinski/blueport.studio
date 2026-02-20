"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  fadeInUp,
  viewportOnce,
  useReducedMotionPref
} from "@/lib/animations";
import type { CTAProps } from "@/types";

export function CTA({ contentKey: _contentKey = "Home.cta" }: CTAProps) {
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";
  const title = "Gotowy na nową stronę?";
  const subtitle = "Umów bezpłatną konsultację i sprawdź, jak możemy pomóc Twojej firmie.";

  return (
    <Section id="cta" className="text-center" noWrapper>
      <div className="container-narrow">
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <h2 className="heading-2 text-white mb-10">
            {title}
          </h2>
          <p className="body-lead mx-auto max-w-prose text-white/70">
            {subtitle}
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 w-full max-w-xl mx-auto">
            <Link href="/kalkulator" className="w-full md:w-auto">
              <motion.span
                className="cta-button-shimmer inline-block w-full md:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="primary"
                  className="!rounded-[10px] !px-7 !py-3.5 font-bold !min-h-0"
                  style={{ background: "var(--color-primary)", color: "var(--color-on-primary)" }}
                >
                  Sprawdź wycenę
                </Button>
              </motion.span>
            </Link>
            <Link
              href="/kontakt"
              className="text-sm text-white/70 hover:text-primary underline underline-offset-2 transition-colors"
            >
              Umów konsultację
            </Link>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
