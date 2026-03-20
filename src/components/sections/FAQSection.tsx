"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ease } from "@/constants/animations";
import { cn } from "@/lib/utils";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";
import type { FAQSectionProps } from "@/types";
import { DEFAULT_FAQ_KEYS, FAQ_ITEMS } from "@/constants/faq";

export function FAQSection({ faqKeys }: FAQSectionProps) {
  const keys = (faqKeys ?? DEFAULT_FAQ_KEYS) as readonly string[];
  const [openKey, setOpenKey] = useState<string | null>(keys[0] ?? null);
  const glassBlurSm = useGlassBlurStyle("sm");

  return (
    <Section id="faq" noWrapper ariaLabelledBy="faq-heading">
      <div className="container-narrow">
        <ScrollReveal variant="fadeUp" className="mb-10">
          <h2 id="faq-heading" className="heading-2 text-center text-white mb-0">
            Najczęstsze pytania
          </h2>
        </ScrollReveal>
        <ul className="mx-auto list-none p-0 m-0">
        {keys.map((key) => {
          const item = FAQ_ITEMS[key];
          if (!item) return null;
          const isOpen = openKey === key;
          return (
            <li
              key={key}
              className={cn("faq-item", isOpen && "open")}
              style={glassBlurSm}
            >
              <motion.button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : key)}
                className={cn(
                  "group relative w-full flex justify-between items-center cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-inset",
                )}
                style={{ paddingBlock: "var(--space-3)", paddingInline: "var(--card-padding)" }}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${key}`}
                id={`faq-question-${key}`}
                whileTap={{ scale: 0.99 }}
              >
                {isOpen && (
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-white/50 rounded-l" aria-hidden />
                )}
                <span
                  className={cn(
                    "font-medium transition-colors duration-300",
                    isOpen ? "text-white" : "text-white/80",
                  )}
                >
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: ease.spring }}
                  className={cn(
                    "inline-block text-lg leading-none shrink-0 text-white/80",
                  )}
                  aria-hidden
                >
                  ▼
                </motion.span>
              </motion.button>
              <div
                id={`faq-answer-${key}`}
                role="region"
                aria-labelledby={`faq-question-${key}`}
                hidden={!isOpen}
                className="overflow-hidden"
              >
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: ease.spring },
                          opacity: { duration: 0.25, delay: 0.08 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25, ease: ease.sharp },
                          opacity: { duration: 0.15 },
                        },
                      }}
                    >
                      <p className="text-white/70 leading-relaxed" style={{ paddingInline: "var(--card-padding)", paddingTop: "var(--space-2)", paddingBottom: "var(--space-3)" }}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
        </ul>
      </div>
    </Section>
  );
}
