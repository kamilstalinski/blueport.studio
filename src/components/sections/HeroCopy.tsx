import { ButtonLink } from "@/components/ui/ButtonLink";
import { PACKAGES } from "@/constants/pricing";
import { formatPrice } from "@/lib/formatPrice";

const START_PRICE = formatPrice(PACKAGES["strona-start"].basePrice);

export function HeroCopy() {
  return (
    <div>
      <h1 className="d1 rise-slide" data-keep-out>
        {`Strony internetowe dla małych firm, od ${START_PRICE} zł.`}
      </h1>
      <p className="lede rise lag1" data-keep-out>
        Blueport Studio ze Szczecina projektuje strony WordPress i sklepy WooCommerce dla firm z całej Polski. Od
        akceptacji projektu do publikacji mijają 1–2 tygodnie. Obok widać, jak powstawała jedna z realizacji.
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
