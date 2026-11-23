import Link from "next/link";

import { ContactForm } from "@/components/contact/ContactForm";
import { Arrow } from "@/components/ui/Arrow";
import { SERVICES, priceLabel, type Service } from "@/constants/services";

/** The close: the contact form with this service's topic already picked, and the other three services as rows. */
export function ServiceContact({ service }: { service: Service }) {
  const rest = SERVICES.filter((other) => other.slug !== service.slug);
  return (
    <section className="bp-sec bp-contact" aria-labelledby="svc-contact-h">
      <div className="bp-shell bp-grid">
        <div className="bp-contact-form">
          <h2 id="svc-contact-h" className="bp-svc-contact-h">Napisz, czego potrzebujesz</h2>
          <ContactForm initialTopic={service.topic} />
        </div>
        <div className="bp-contact-aside">
          <h2>Reszta oferty</h2>
          <div className="bp-rows-act bp-svc-rest" data-rest>
            {rest.map((other) => (
              <Link key={other.slug} className="bp-row-act" href={`/oferta/${other.slug}`}>
                <span>{other.name}</span>
                <span className="bp-svc-price">
                  <span className="bp-mono">{priceLabel(other)}</span>
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
