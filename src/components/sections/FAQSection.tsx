"use client";

import { useMemo } from "react";
import { Section } from "@/components/ui/Section";
import { FAQ, type FAQItem } from "@/components/sections/FAQ";
import type { FAQSectionProps } from "@/types";

const FAQ_ITEMS: Record<string, { q: string; a: string }> = {
  price: {
    q: "Ile kosztuje strona internetowa?",
    a: "Proste strony firmowe zaczynają się od 2 500 zł. Sklepy internetowe od 4 000 zł. Dokładną wycenę sprawdzisz w kalkulatorze.",
  },
  time: {
    q: "Ile trwa realizacja?",
    a: "Strona firmowa lub sklep do 20 produktów: zwykle 2–4 tygodnie. Większe projekty ustalamy indywidualnie po wycenie.",
  },
  contract: {
    q: "Czy podpisujemy umowę?",
    a: "Tak. Przed rozpoczęciem prac podpisujemy umowę z jasno określonym zakresem, terminami i warunkami współpracy.",
  },
  hosting: {
    q: "Czy pomagasz z hostingiem?",
    a: "Tak. Możemy zarekomendować i skonfigurować hosting, a także przenieść gotową stronę na Twoją domenę.",
  },
  cms: {
    q: "Czy mogę sam edytować stronę?",
    a: "Tak. Strony oparte o WordPress mają panel CMS – możesz sam dodawać treści, zdjęcia i aktualizacje bez znajomości kodu.",
  },
  support: {
    q: "Czy pomagasz po wdrożeniu?",
    a: "Tak. Oferujemy wsparcie i szkolenie po oddaniu projektu, abyś mógł swobodnie zarządzać stroną.",
  },
};

const DEFAULT_FAQ_KEYS = ["price", "time", "contract", "hosting", "cms"] as const;

export function FAQSection({ faqKeys }: FAQSectionProps) {
  const keys = (faqKeys ?? DEFAULT_FAQ_KEYS) as readonly string[];

  const items: FAQItem[] = useMemo(
    () =>
      keys
        .map((key) => {
          const row = FAQ_ITEMS[key];
          if (!row) return null;
          return {
            id: key,
            question: row.q,
            answer: row.a,
          };
        })
        .filter((item): item is FAQItem => item !== null),
    [keys]
  );

  return (
    <Section id="faq" noWrapper ariaLabelledBy="faq-heading">
      <div className="container-narrow">
        <FAQ items={items} />
      </div>
    </Section>
  );
}
