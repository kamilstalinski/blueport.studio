import Link from "next/link";

import { Arrow } from "@/components/ui/Arrow";
import { InView } from "@/components/ui/InView";
import { HOME_TIERS, PACKAGES } from "@/constants/pricing";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

const DEDICATED = PACKAGES["projekt-dedykowany"];
/* start when the columns pass ~75% of the screen height, so the entrance plays where it is seen */
const STAGGER_MARGIN = "0px 0px -25% 0px";

export function HomePricing() {
  return (
    <section className="bp-sec bp-pricing" id="cennik" aria-labelledby="cennik-h">
      <div className="bp-shell bp-grid">
        <div className="bp-sec-head">
          <h2 id="cennik-h">Trzy pakiety. Cena znana przed startem.</h2>
          <p>Poniżej ceny bazowe. Dokładną kwotę pod Twój zakres policzysz w kalkulatorze.</p>
          <div className="bp-rows-act">
            <Link className="bp-row-act bp-row-act--primary" href="/kalkulator">
              Otwórz kalkulator <span className="bp-mono">60 s</span>
            </Link>
          </div>
          <div className="bp-custom">
            <p>
              <b>Projekt dedykowany</b>
              <br />
              {`${DEDICATED.tech}, dla integracji API i skalowania. Od ${formatPrice(DEDICATED.basePrice)} zł, ${DEDICATED.deliveryLabel}.`}
            </p>
            <Link href="/kontakt">
              Umów konsultację <Arrow />
            </Link>
          </div>
        </div>
        <div className="bp-sec-body">
          <InView className="bp-plans bp-stagger" margin={STAGGER_MARGIN} threshold={0}>
            {HOME_TIERS.map((tier) => {
              const pkg = PACKAGES[tier.packageId];
              return (
                <article key={tier.packageId} className={cn("bp-plan-col", tier.featured && "bp-is-top")}>
                  <h3>{tier.name}</h3>
                  <span className="bp-tech bp-mono">{pkg.tech}</span>
                  <p className="bp-price">
                    <small>od</small>
                    {formatPrice(pkg.basePrice)}&nbsp;zł
                  </p>
                  <p className="bp-days bp-mono">{pkg.deliveryLabel}</p>
                  {tier.tag && <p className="bp-pick">{tier.tag}</p>}
                  <ul className="bp-feat">
                    {tier.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <Link className="bp-row-act" href="/kalkulator">
                    Wyceń: {tier.name} <Arrow />
                  </Link>
                </article>
              );
            })}
          </InView>
        </div>
      </div>
    </section>
  );
}
