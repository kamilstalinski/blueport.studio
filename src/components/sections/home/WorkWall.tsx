"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Arrow, Lock } from "@/components/ui/Arrow";
import { WORK_SITES } from "@/constants/work";

const WALL_SITES = WORK_SITES.slice(0, 3);

/** Three recent sites: the list picks one, the browser window swaps to it with a wipe. */
export function WorkWall() {
  const [current, setCurrent] = useState<string>(WALL_SITES[0].slug);

  return (
    <section className="bp-sec bp-works" id="realizacje" aria-labelledby="works-h">
      <div className="bp-shell bp-grid">
        <div className="bp-sec-head">
          <h2 id="works-h">Ostatnie realizacje stron internetowych</h2>
          <p>Fundacja, hurtownia uzdatniania wody i sieć punktów z preclami.</p>
        </div>
        <div className="bp-work-list" role="group" aria-label="Wybierz realizację">
          {WALL_SITES.map((site) => (
            <button
              key={site.slug}
              className="bp-work-item"
              type="button"
              aria-pressed={current === site.slug}
              aria-controls={`work-${site.slug}`}
              onClick={() => setCurrent(site.slug)}
            >
              <h3>{site.name}</h3>
              <span className="bp-desc">{site.line}</span>
              <span className="bp-mono" translate="no">{site.domain}</span>
            </button>
          ))}
          <Link className="bp-work-more" href="/realizacje">
            Wszystkie realizacje <Arrow />
          </Link>
        </div>
        <div className="bp-work-stage">
          {WALL_SITES.map((site) => {
            const isOn = current === site.slug;
            return (
              <Link
                key={site.slug}
                id={`work-${site.slug}`}
                href={`/realizacje/${site.slug}`}
                className="bp-win bp-work-win"
                hidden={!isOn}
                inert={!isOn}
                aria-label={`${site.domain}: case study ${site.name}`}
              >
                <div className="bp-win-bar">
                  <Lock />
                  <span className="bp-url bp-mono" translate="no">{site.domain}</span>
                </div>
                <div className="bp-view">
                  <Image src={site.image} alt="" fill sizes="(max-width: 1023px) 100vw, 960px" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
