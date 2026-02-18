"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    question: "Ile trwa realizacja?",
    answer:
      "Strona firmowa lub sklep do 20 produktów: zwykle 2–4 tygodnie. Większe projekty ustalamy indywidualnie po wycenie.",
  },
  {
    question: "Czy podpisujemy umowę?",
    answer:
      "Tak. Przed rozpoczęciem prac podpisujemy umowę z jasno określonym zakresem, terminami i warunkami współpracy.",
  },
  {
    question: "Czy pomagasz z hostingiem?",
    answer:
      "Tak. Możemy zarekomendować i skonfigurować hosting, a także przenieść gotową stronę na Twoją domenę.",
  },
  {
    question: "Czy mogę sam edytować stronę?",
    answer:
      "Tak. Strony oparte o WordPress mają panel CMS – możesz sam dodawać treści, zdjęcia i aktualizacje bez znajomości kodu.",
  },
] as const;

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-border bg-background py-section md:py-section-md">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Najczęstsze pytania
        </h2>
        <div className="mx-auto mt-12 max-w-2xl">
          <ul className="divide-y divide-border rounded-2xl border border-border">
            {FAQ_ITEMS.map(({ question, answer }, index) => {
              const isOpen = openIndex === index;
              return (
                <li key={question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-medium text-foreground transition-colors hover:text-accent-orange focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    {question}
                    <ChevronDownIcon
                      className={cn(
                        "h-5 w-5 shrink-0 text-primary transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={cn(
                      "overflow-hidden transition-all duration-200 ease-out",
                      isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <p className="border-t border-border px-6 pb-4 pt-0 text-sm text-muted-foreground">
                      {answer}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
