import { Section } from "@/components/ui/Section";

const questions = [
  {
    q: "Jak wygląda współpraca krok po kroku?",
    a: "Wypełniasz kalkulator i określasz zakres. Kontaktujemy się, ustalamy szczegóły i finalną cenę. Realizujemy projekt i development strony. Na koniec publikacja, podpięcie domeny i szkolenie z obsługi. Całość zwykle trwa 1–2 tygodnie dla prostych projektów."
  },
  {
    q: "Ile trwa stworzenie nowej strony?",
    a: "Prosta strona firmowa: od ok. 7 dni roboczych. Strona Pro lub sklep do 30 produktów: zwykle 2–4 tygodnie. Większe projekty ustalamy indywidualnie po wycenie. Dokładne terminy zobaczysz przy każdym pakiecie w kalkulatorze."
  },
  {
    q: "Czy pomagacie w przygotowaniu treści na stronę?",
    a: "Tak. Oferujemy add-on „Profesjonalne teksty” – teksty dopasowane do Twojej branży i klientów. Możesz też przygotować treści samodzielnie; strony w WordPressie mają panel CMS do łatwej edycji."
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
