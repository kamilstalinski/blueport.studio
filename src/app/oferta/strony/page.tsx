import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Strony internetowe Szczecin — WordPress i Next.js",
  description:
    "Profesjonalne strony firmowe w WordPress i Next.js. Szybkie, responsywne, zoptymalizowane pod SEO. Realizacje dla firm ze Szczecina i całej Polski.",
  alternates: { canonical: "https://blueport.studio/oferta/strony" },
  openGraph: { url: "https://blueport.studio/oferta/strony" },
};

export default function OfertaStronyPage() {
  return (
    <Section firstOnPage>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Oferta – Strony
      </p>
      <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
        Strony internetowe dopasowane do Twojego biznesu.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Tutaj możesz opisać konkretne typy stron, które projektujecie: wizytówki, strony
        firmowe, landing page&apos;e czy rozbudowane serwisy. Struktura zostawiona jest pod
        dopracowanie treści sprzedażowych.
      </p>
      <div className="mt-12 space-y-8">
        <section aria-labelledby="wizytowka" className="border-b border-border pb-6">
          <h2 id="wizytowka" className="text-sm font-semibold tracking-tight text-foreground">
            Strona wizytówka
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Miejsce na opis zakresu takiej realizacji, przykładowy układ sekcji i to, dla
            kogo jest to najlepsze rozwiązanie.
          </p>
        </section>
        <section aria-labelledby="strona-biznesowa" className="border-b border-border pb-6">
          <h2 id="strona-biznesowa" className="text-sm font-semibold tracking-tight text-foreground">
            Strona biznesowa
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Sekcja przeznaczona na opis rozbudowanych stron, które prezentują ofertę,
            zespół, procesy i case studies.
          </p>
        </section>
      </div>
    </Section>
  );
}
