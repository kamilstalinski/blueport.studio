import { Section } from "@/components/ui/Section";

const questions = [
  {
    q: "Jak wygląda współpraca krok po kroku?",
    a: "Tutaj możesz opisać proces – od pierwszej rozmowy, przez warsztaty, projekt, implementację, aż po wdrożenie i opiekę powdrożeniową."
  },
  {
    q: "Ile trwa stworzenie nowej strony?",
    a: "Miejsce na uśrednione przedziały czasowe – np. od 3 do 8 tygodni w zależności od złożoności projektu i dostępności treści."
  },
  {
    q: "Czy pomagacie w przygotowaniu treści na stronę?",
    a: "Tutaj możesz doprecyzować, czy oferujecie wsparcie w copywritingu, strukturze treści lub konsultacje z zespołem klienta."
  }
];

export default function FAQPage() {
  return (
    <Section firstOnPage>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        FAQ
      </p>
      <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
        Najczęściej zadawane pytania.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Zbierz w jednym miejscu odpowiedzi na pytania, które klienci zadają przed rozpoczęciem
        współpracy. To dobry moment, aby rozwiać wątpliwości i uporządkować informacje.
      </p>
      <div className="mt-12 space-y-6">
        {questions.map((item) => (
          <section
            key={item.q}
            aria-label={item.q}
            className="border-b border-border pb-6"
          >
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              {item.q}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </section>
        ))}
      </div>
    </Section>
  );
}
