import { Section } from "@/components/ui/Section";

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
        Miejsce na opis przykładowych pakietów i widełek cenowych. Layout jest przygotowany pod
        3–4 główne opcje, które możesz później uzupełnić konkretnymi kwotami i zakresem.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-border bg-surface-alt p-6">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Pakiet startowy
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Miejsce na opis podstawowego pakietu – np. prosta strona wizytówka z kilkoma
            podstronami.
          </p>
        </article>
        <article className="rounded-2xl border border-border bg-surface-alt p-6">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Pakiet biznes
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Placeholder na opis pakietu dla firm usługowych potrzebujących bardziej
            rozbudowanej struktury strony.
          </p>
        </article>
        <article className="rounded-2xl border border-border bg-surface-alt p-6">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Pakiet e-commerce
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Sekcja pod ofertę sklepów internetowych – z informacją o liczbie produktów,
            integracjach i wsparciu po wdrożeniu.
          </p>
        </article>
      </div>
    </Section>
  );
}
