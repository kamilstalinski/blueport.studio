import Link from "next/link";

import { Arrow } from "@/components/ui/Arrow";
import { Check } from "@/components/ui/Marks";
import { PACKAGES, PACKAGE_SHORT } from "@/constants/pricing";
import type { Service } from "@/constants/services";
import { formatPrice } from "@/lib/formatPrice";

/** Scope and terms on ProcessAround's dl rows, then the packages behind the price, each a row to /cennik. */
export function ServiceTerms({ service }: { service: Service }) {
  return (
    <section className="bp-sec" aria-labelledby="terms-h">
      <div className="bp-shell bp-grid">
        <div className="bp-sec-head">
          <h2 id="terms-h">Zakres i warunki</h2>
        </div>
        <div className="bp-sec-body">
          <div className="bp-pa">
            <div className="bp-pa-col">
              <h3>Co obejmuje</h3>
              <ul className="bp-ticks">
                {service.scope.map((item) => (
                  <li key={item}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bp-pa-col">
              <h3>Warunki</h3>
              <dl className="bp-pa-rows">
                {service.terms.map((row) => (
                  <div key={row.term}>
                    <dt>{row.term}</dt>
                    <dd>{row.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          {service.packages.length > 0 && (
            <div className="bp-svc-packs">
              <h3>{service.packages.length > 1 ? "Pakiety" : "Pakiet"}</h3>
              <div className="bp-rows-act">
                {service.packages.map((id) => (
                  <Link key={id} className="bp-row-act" href="/cennik">
                    <span>
                      {PACKAGE_SHORT[id]} <span className="bp-svc-tech">{PACKAGES[id].tech}</span>
                    </span>
                    <span className="bp-svc-price">
                      <span className="bp-mono">
                        od {formatPrice(PACKAGES[id].basePrice)} zł · {PACKAGES[id].deliveryLabel}
                      </span>
                      <Arrow />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
