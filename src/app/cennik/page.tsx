import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Cennik — Strony internetowe Szczecin",
  description:
    "Transparentne ceny bez ukrytych kosztów. Strony firmowe od 2 500 zł, sklepy od 4 500 zł. Sprawdź szczegółowy cennik Blueport Studio.",
  alternates: { canonical: "https://blueport.studio/cennik" },
  openGraph: { url: "https://blueport.studio/cennik" },
};

export default function CennikPage() {
  return (
    <Section firstOnPage>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Cennik
      </p>
      <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
        Przejrzysta struktura cenowa bez ukrytych kosztów.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Poniżej widełki cenowe głównych pakietów. Dokładną wycenę pod Twoje potrzeby
        sprawdzisz w <Link href="/kalkulator" className="text-primary hover:underline">kalkulatorze</Link> lub w sekcji <Link href="/oferta" className="text-primary hover:underline">Oferta</Link>.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-border bg-surface-alt p-6">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Strona start (WordPress)
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Prosta strona firmowa: do 5 podstron, CMS, formularz kontaktowy, responsywność.
            Od 2 500 zł, realizacja od 7 dni roboczych.
          </p>
        </article>
        <article className="rounded-2xl border border-border bg-surface-alt p-6">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Strona Pro (WordPress)
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Indywidualny projekt UI, do 10 podstron, lepsze SEO i animacje. Dla firm
            usługowych. Od 3 900 zł, od 14 dni roboczych.
          </p>
        </article>
        <article className="rounded-2xl border border-border bg-surface-alt p-6">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Sklep online (WooCommerce)
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Sklep do ok. 30 produktów, płatności online, integracja z kurierami, panel
            zamówień. Od 4 900 zł, od 21 dni roboczych. Wsparcie po wdrożeniu.
          </p>
        </article>
      </div>
    </Section>
  );
}
