import Link from "next/link";

import { Arrow } from "@/components/ui/Arrow";
import { priceLabel, type Service } from "@/constants/services";

/** The service opening: PageHead's grid and type, with the price line and the one action under the lede. */
export function ServiceHero({ service }: { service: Service }) {
  return (
    <section className="page-head bp-head bp-svc-hero">
      <div className="bp-shell bp-grid">
        <div className="bp-head-copy">
          <Link href="/oferta" className="page-back bp-mono">
            <Arrow /> Oferta
          </Link>
          <h1>{service.h1}</h1>
          <p className="lede">{service.lede}</p>
          <p className="meta bp-mono">{[priceLabel(service), service.time].filter(Boolean).join(" · ")}</p>
          <div className="bp-rows-act">
            <Link className="bp-row-act bp-row-act--primary" href={`/kontakt?temat=${service.topic}`}>
              Umów rozmowę <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
