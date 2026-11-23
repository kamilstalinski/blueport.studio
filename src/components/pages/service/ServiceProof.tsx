import Image from "next/image";
import Link from "next/link";

import { Arrow, Lock } from "@/components/ui/Arrow";
import type { Service } from "@/constants/services";
import { WORK_SITES } from "@/constants/work";

/** Proof: real sites as WorkWall's browser windows, or, where there is no client work yet, worked scenarios. */
export function ServiceProof({ service }: { service: Service }) {
  const { proof } = service;

  if (proof.kind === "work") {
    const sites = WORK_SITES.filter((site) => (proof.slugs as readonly string[]).includes(site.slug));
    return (
      <section className="bp-sec" aria-labelledby="proof-h">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <h2 id="proof-h">Realizacje</h2>
            <p>{sites.map((site) => site.line).join(" ")}</p>
          </div>
          <div className="bp-sec-body bp-svc-wins" style={{ "--n": sites.length } as React.CSSProperties}>
            {sites.map((site) => (
              <Link key={site.slug} href={`/realizacje/${site.slug}`} className="bp-win bp-svc-win" aria-label={`${site.domain}: case study ${site.name}`}>
                <div className="bp-win-bar">
                  <Lock />
                  <span className="bp-url bp-mono" translate="no">{site.domain}</span>
                  <Arrow />
                </div>
                <div className="bp-view">
                  <Image src={site.image} alt="" fill sizes="(max-width: 1023px) 100vw, 420px" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bp-sec" aria-labelledby="proof-h">
      <div className="bp-shell bp-grid">
        <div className="bp-sec-head">
          <h2 id="proof-h">Jak to wygląda w praktyce</h2>
          <p>Przykładowe scenariusze, nie opisy wdrożeń u klientów.</p>
        </div>
        <div className="bp-sec-body">
          <dl className="bp-pa-rows bp-svc-scen">
            {proof.items.map((item) => (
              <div key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
          {proof.tools.length > 0 && (
            // shortcut: tool names as tags, no logos yet; swap in drawn icons once the tools are confirmed (Task 8)
            <ul className="bp-tags bp-svc-tools" aria-label="Narzędzia">
              {proof.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
