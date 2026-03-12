"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";

const FAQ_ITEMS = [
  {
    question: "Ile trwa realizacja?",
    answer:
      "Strona firmowa lub sklep do 30 produktów: zwykle 2–4 tygodnie. Większe projekty ustalamy indywidualnie po wycenie.",
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
  const glassBlurSm = useGlassBlurStyle("sm");

  return (
    <section className="border-t border-border bg-transparent py-section md:py-section-md">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Najczęstsze pytania
        </h2>
        <div className="mx-auto mt-12 max-w-2xl">
          <ul className="list-none p-0 m-0">
            {FAQ_ITEMS.map(({ question, answer }, index) => {
              const isOpen = openIndex === index;
              return (
                <li key={question} className={cn("faq-item", isOpen && "open")} style={glassBlurSm}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-medium text-foreground transition-colors hover:text-accent-orange focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    {question}
                    <span
                      className={cn(
                        "inline-block text-lg leading-none shrink-0 text-primary transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden
                    >
                      ▼
                    </span>
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
                    <p className="border-t border-white/10 px-6 pb-4 pt-0 text-sm text-muted-foreground">
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
