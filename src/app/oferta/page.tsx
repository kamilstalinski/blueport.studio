import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Oferta — Pakiety i ceny",
  description:
    "Strony firmowe od 2 500 zł, sklepy internetowe od 4 500 zł. Sprawdź pełną ofertę Blueport Studio.",
  alternates: { canonical: "https://blueport.studio/oferta" },
  openGraph: { url: "https://blueport.studio/oferta" },
};

export default function OfertaPage() {
  return (
    <Section firstOnPage>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Oferta
      </p>
      <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
        Oferta BluePort Studio.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Struktura strony oferty, w której możesz szczegółowo opisać zakres prac, proces i
        najczęstsze pakiety współpracy. Poniżej zostawiamy miejsce na rozwinięcie
        poszczególnych usług.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <section aria-labelledby="oferta-strony" className="border-b border-border pb-6">
          <h2 id="oferta-strony" className="text-sm font-semibold tracking-tight text-foreground">
            Strony internetowe
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Miejsce na opis typów stron, które projektujecie – od prostych wizytówek po
            rozbudowane serwisy biznesowe, landing page&apos;e sprzedażowe czy portale
            contentowe.
          </p>
        </section>
        <section aria-labelledby="oferta-sklepy" className="border-b border-border pb-6">
          <h2 id="oferta-sklepy" className="text-sm font-semibold tracking-tight text-foreground">
            Sklepy internetowe
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Przestrzeń na opis podejścia do e-commerce – od wyboru platformy, przez
            projekt UX, po wdrożenie i integracje niezbędne w sprzedaży online.
          </p>
        </section>
      </div>
    </Section>
  );
}
