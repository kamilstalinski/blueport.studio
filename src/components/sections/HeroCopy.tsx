import { ButtonLink } from "@/components/ui/ButtonLink";

export function HeroCopy() {
  return (
    <div>
      <h1 className="d1 rise-slide" data-keep-out>
        Strony internetowe, które sprzedają.
      </h1>
      <p className="lede rise lag1" data-keep-out>
        Tak powstaje każda nasza strona: siatka, układ, treść i start. Obok na przykładzie prawdziwej realizacji.
      </p>
      <div className="hero-cta rise lag2" data-keep-out>
        <ButtonLink href="/kalkulator" withArrow>
          Sprawdź koszt
        </ButtonLink>
        <ButtonLink href="/kontakt" variant="secondary">
          Umów konsultację
        </ButtonLink>
      </div>
    </div>
  );
}
