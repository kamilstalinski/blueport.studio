import { Arrow } from "@/components/ui/Arrow";
import { siteHref, WORK_SITES } from "@/constants/work";

/** The client domains in the grid, the way Payload sets its customer logos: each a real link out. */
export function LiveDomains() {
  return (
    <section className="bp-live" aria-labelledby="live-h">
      <div className="bp-shell">
        <p id="live-h">Strony, które pracują dziś dla naszych klientów</p>
        <div className="bp-domains">
          {WORK_SITES.map((site) => (
            <a key={site.slug} className="bp-mono" href={siteHref(site)} target="_blank" rel="noopener noreferrer" translate="no">
              {site.domain} <Arrow />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
