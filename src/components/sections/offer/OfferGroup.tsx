import Link from "next/link";

import { OfferAiDiagram } from "@/components/sections/offer/OfferAiDiagram";
import { Arrow } from "@/components/ui/Arrow";
import { SERVICES, priceLabel, type ServiceGroup } from "@/constants/services";

interface OfferGroupProps {
  group: ServiceGroup;
  id: string;
  title: string;
  lead: string;
}

/** One group of services on the hub: the heading in column 1, one HomePricing-style column per service in 2–4.
 *  "automatyzacja" has one service, so the AI diagram and its example scenarios take the two columns left over. */
export function OfferGroup({ group, id, title, lead }: OfferGroupProps) {
  const services = SERVICES.filter((service) => service.group === group);

  return (
    <section className={`bp-sec bp-offer-group bp-offer-group--${group}`} aria-labelledby={id}>
      <div className="bp-shell bp-grid">
        <div className="bp-sec-head">
          <h2 id={id}>{title}</h2>
          <p>{lead}</p>
          {group === "klienci" && (
            <div className="bp-rows-act">
              <Link className="bp-row-act" href="/cennik">
                Porównaj pakiety <Arrow />
              </Link>
            </div>
          )}
        </div>
        <div className="bp-sec-body bp-plans bp-offer-cols">
          {services.map((service) => (
            <article key={service.slug} className="bp-plan-col bp-offer-col">
              <h3>{service.name}</h3>
              <p className="bp-offer-problem">{service.problem}</p>
              <ul className="bp-feat">
                {service.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="bp-offer-meta bp-mono">
                {/* each part stays whole; the line breaks only at the dot */}
                {[priceLabel(service), service.time].filter(Boolean).map((part, i) => (
                  <span key={part}>
                    {i > 0 && " · "}
                    <span className="bp-nowrap">{part}</span>
                  </span>
                ))}
              </p>
              <Link className="bp-row-act" href={`/oferta/${service.slug}`}>
                {service.name} <Arrow />
              </Link>
            </article>
          ))}
          {group === "automatyzacja" && (
            <div className="bp-offer-ai-side">
              <OfferAiDiagram />
              {services.map(
                (service) =>
                  service.proof.kind === "scenarios" && (
                    <dl key={service.slug} className="bp-pa-rows bp-offer-scen">
                      {service.proof.items.map((item) => (
                        <div key={item.title}>
                          <dt>{item.title}</dt>
                          <dd>{item.text}</dd>
                        </div>
                      ))}
                    </dl>
                  ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
