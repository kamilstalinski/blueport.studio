import { InView } from "@/components/ui/InView";
import { TALLY } from "@/constants/process";
import { TESTIMONIALS } from "@/constants/testimonials";

export function QuotesSection() {
  return (
    <section className="bp-sec bp-opinie" id="opinie" aria-labelledby="opinie-h">
      <div className="bp-shell bp-grid">
        <div className="bp-sec-head">
          <h2 id="opinie-h">Opinie klientów</h2>
          <p>Ze Szczecina, Warszawy i Poznania.</p>
        </div>
        <div className="bp-sec-body">
          <InView className="bp-quotes bp-stagger" margin="0px 0px -25% 0px" threshold={0}>
            {TESTIMONIALS.map((item) => (
              <figure key={item.slug} className="bp-quote">
                <blockquote>„{item.quote}”</blockquote>
                <figcaption>
                  <b>{item.author}</b>
                  <span>{item.place}</span>
                </figcaption>
              </figure>
            ))}
          </InView>
          <div className="bp-facts">
            {TALLY.map((fact) => (
              <p key={fact.label}>
                <b>{`${fact.prefix.replace("-", "–")}${fact.count}${fact.suffix}`}</b>
                {fact.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
