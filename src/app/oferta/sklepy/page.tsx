import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Sklepy internetowe Szczecin — WooCommerce i Next.js",
  description:
    "Sklepy internetowe na WooCommerce i Next.js Commerce. Płatności, integracje kurierskie, panel zarządzania. Szczecin i cała Polska.",
  alternates: { canonical: "https://blueport.studio/oferta/sklepy" },
  openGraph: { url: "https://blueport.studio/oferta/sklepy" },
};

export default function OfertaSklepyPage() {
  return (
    <Section firstOnPage>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Oferta – Sklepy internetowe
      </p>
      <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
        Projektujemy sklepy internetowe nastawione na sprzedaż.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Sekcja dedykowana ofercie e-commerce – od strategii i architektury informacji, przez
        projekt kart produktów, aż po proces koszyka i checkoutu.
      </p>
      <div className="mt-12 space-y-8">
        <section aria-labelledby="sklepy-od-zera" className="border-b border-border pb-6">
          <h2 id="sklepy-od-zera" className="text-sm font-semibold tracking-tight text-foreground">
            Sklepy od zera
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Tutaj możesz opisać proces tworzenia sklepu od podstaw – od wyboru platformy,
            przez projekt UX, po wdrożenie i konfigurację.
          </p>
        </section>
        <section aria-labelledby="przebudowa-sklepu" className="border-b border-border pb-6">
          <h2 id="przebudowa-sklepu" className="text-sm font-semibold tracking-tight text-foreground">
            Przebudowa istniejącego sklepu
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Miejsce na opis usług związanych z redesignem i optymalizacją już działających
            sklepów internetowych.
          </p>
        </section>
      </div>
    </Section>
  );
}
