"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";
import type { FAQSectionProps } from "@/types";

const FAQ_ITEMS: Record<string, { q: string; a: string }> = {
  price: { q: "Ile kosztuje strona internetowa?", a: "Proste strony firmowe zaczynają się od 2 500 zł. Sklepy internetowe od 4 000 zł. Dokładną wycenę sprawdzisz w kalkulatorze." },
  time: { q: "Ile trwa realizacja?", a: "Strona firmowa lub sklep do 20 produktów: zwykle 2–4 tygodnie. Większe projekty ustalamy indywidualnie po wycenie." },
  contract: { q: "Czy podpisujemy umowę?", a: "Tak. Przed rozpoczęciem prac podpisujemy umowę z jasno określonym zakresem, terminami i warunkami współpracy." },
  hosting: { q: "Czy pomagasz z hostingiem?", a: "Tak. Możemy zarekomendować i skonfigurować hosting, a także przenieść gotową stronę na Twoją domenę." },
  cms: { q: "Czy mogę sam edytować stronę?", a: "Tak. Strony oparte o WordPress mają panel CMS – możesz sam dodawać treści, zdjęcia i aktualizacje bez znajomości kodu." },
  support: { q: "Czy pomagasz po wdrożeniu?", a: "Tak. Oferujemy wsparcie i szkolenie po oddaniu projektu, abyś mógł swobodnie zarządzać stroną." },
};

const DEFAULT_FAQ_KEYS = ["price", "time", "contract", "hosting", "cms"] as const;

export function FAQSection({ faqKeys }: FAQSectionProps) {
  const keys = (faqKeys ?? DEFAULT_FAQ_KEYS) as readonly string[];
  const [openKey, setOpenKey] = useState<string | null>(keys[0] ?? null);
  const glassBlurSm = useGlassBlurStyle("sm");

  return (
    <Section id="faq" noWrapper>
      <div className="container-narrow">
        <h2 className="heading-2 text-center text-white mb-10">
          Najczęstsze pytania
        </h2>
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
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : key)}
                className={cn(
                  "group relative w-full flex justify-between items-center cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-inset",
                )}
                style={{ paddingBlock: "var(--space-3)", paddingInline: "var(--card-padding)" }}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${key}`}
                id={`faq-question-${key}`}
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
                <span
                  className={cn(
                    "inline-block text-lg leading-none shrink-0 transition-transform duration-300",
                    isOpen && "rotate-180 text-white/80",
                  )}
                  aria-hidden
                >
                  ▼
                </span>
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
                <p className="text-white/70 leading-relaxed" style={{ paddingInline: "var(--card-padding)", paddingTop: "var(--space-2)", paddingBottom: "var(--space-3)" }}>
                  {item.a}
                </p>
              </div>
            </li>
          );
        })}
        </ul>
      </div>
    </Section>
  );
}
