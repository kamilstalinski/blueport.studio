import Link from "next/link";

import { Arrow } from "@/components/ui/Arrow";
import { SERVICES } from "@/constants/services";

/** The four services as rows, each straight to its own page; the hub link under the heading. */
export function HomeOffer() {
  return (
    <section className="bp-sec bp-home-offer" aria-labelledby="home-offer-h">
      <div className="bp-shell bp-grid">
        <div className="bp-sec-head">
          <h2 id="home-offer-h">Strony, sklepy, reklamy i AI dla małych firm</h2>
          <p>Każdą usługę zaczynamy od rozmowy o tym, czego potrzebuje Twoja firma.</p>
          <div className="bp-rows-act">
            <Link className="bp-row-act" href="/oferta">
              Cała oferta <Arrow />
            </Link>
          </div>
        </div>
        <div className="bp-sec-body bp-rows-act">
          {SERVICES.map((service) => (
            <Link key={service.slug} className="bp-row-act" href={`/oferta/${service.slug}`}>
              <span className="bp-home-offer-row">
                <b>{service.name}</b>
                <span>{service.problem}</span>
              </span>
              <Arrow />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
