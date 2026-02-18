"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Section } from "@/components/ui/Section";
import SpotlightCard from "@/components/SpotlightCard";
import { cn } from "@/lib/utils";

const DEFAULT_FAQ_KEYS = ["price", "time", "contract", "hosting", "cms"] as const;

type FAQSectionProps = {
  contentKey?: "Home.faq" | "uslugi.faq";
  faqKeys?: readonly string[];
};

export function FAQSection({ contentKey = "Home.faq", faqKeys }: FAQSectionProps) {
  const t = useTranslations(contentKey);
  const keys = (faqKeys ?? DEFAULT_FAQ_KEYS) as readonly string[];
  const [openKey, setOpenKey] = useState<string | null>(keys[0] ?? null);

  return (
    <Section id="faq">
      <h2 className="heading-2 text-center text-white mb-10">
        {t("title")}
      </h2>
      <SpotlightCard
        className="custom-spotlight-card mx-auto max-w-2xl rounded-2xl overflow-hidden"
        spotlightColor="rgba(0, 229, 160, 0.2)"
      >
        <div className="glass-card relative rounded-2xl bg-white/15 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] overflow-hidden">
          <ul>
          {keys.map((key) => {
            const isOpen = openKey === key;
            return (
              <li key={key} className="border-b border-white/5 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenKey(isOpen ? null : key)}
                  className={cn(
                    "group relative w-full px-8 py-6 flex justify-between items-center cursor-pointer transition-all duration-300 hover:bg-white/20 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset",
                    isOpen && "bg-white/10 shadow-[0_0_40px_rgba(255,115,0,0.15)]",
                  )}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${key}`}
                  id={`faq-question-${key}`}
                >
                  {isOpen && (
                    <div className="absolute left-0 top-0 h-full w-[3px] bg-primary" aria-hidden />
                  )}
                  <span
                    className={cn(
                      "font-medium transition-colors duration-300",
                      isOpen ? "text-white" : "text-white/80",
                    )}
                  >
                    {t(`${key}.q`)}
                  </span>
                  <ChevronDownIcon
                    className={cn(
                      "h-6 w-6 shrink-0 transition-transform duration-300",
                      isOpen && "rotate-180 text-primary",
                    )}
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>
                <div
                  id={`faq-answer-${key}`}
                  role="region"
                  aria-labelledby={`faq-question-${key}`}
                  className={cn(
                    "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
                    isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <p className="px-8 pb-6 pt-4 text-white/70 leading-relaxed">
                    {t(`${key}.a`)}
                  </p>
                </div>
              </li>
            );
          })}
          </ul>
        </div>
      </SpotlightCard>
    </Section>
  );
}
