import { DecoStairs } from "@/components/deco/DecoStairs";
import { TierCard } from "@/components/sections/home/TierCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InView } from "@/components/ui/InView";
import { HOME_TIERS, PACKAGES } from "@/constants/pricing";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

const DEDICATED = PACKAGES["projekt-dedykowany"];

export function HomePricing() {
  return (
    <section className="sec band px-host" aria-labelledby="pricing-title">
      <DecoStairs />
      <div className="shell">
        <InView className="reveal">
          <h2 id="pricing-title" className="d2 pricing-title">
            Trzy pakiety. Cena znana przed startem.
          </h2>
        </InView>
        <InView className="reveal" lag={1}>
          <p className="body pricing-lede">Poniżej ceny bazowe. Dokładną kwotę pod Twój zakres policzysz w kalkulatorze.</p>
        </InView>
        <div className="tiers">
          {HOME_TIERS.map((tier) => (
            <InView key={tier.packageId} className={cn("reveal tier-slot", tier.featured && "tier-slot--featured")}>
              <TierCard tier={tier} />
            </InView>
          ))}
        </div>
        <InView className="reveal">
          <div className="tier-wide">
            <div>
              <h3 className="d3">Projekt dedykowany</h3>
              <p className="body tier-wide-text">
                {`${DEDICATED.tech}. Dla zaawansowanych potrzeb, integracji API i skalowania. Od ${formatPrice(DEDICATED.basePrice)} zł, ${DEDICATED.deliveryLabel}.`}
              </p>
            </div>
            <ButtonLink href="/kontakt" variant="secondary">
              Umów konsultację
            </ButtonLink>
          </div>
        </InView>
      </div>
    </section>
  );
}
