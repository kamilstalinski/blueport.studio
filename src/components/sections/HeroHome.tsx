import Link from "next/link";

import { HeroBuildFrame } from "@/components/sections/HeroBuildFrame";
import { Arrow } from "@/components/ui/Arrow";

export function HeroHome() {
  return (
    <section id="hero" className="bp-hero" aria-labelledby="hero-h">
      <div className="bp-shell">
        <div className="bp-hero-copy">
          <h1 id="hero-h">Strony internetowe dla firm ze&nbsp;Szczecina i&nbsp;z&nbsp;całej Polski</h1>
          <p className="bp-lead">
            Projektujemy strony WordPress i sklepy WooCommerce dla małych firm. Publikujemy je
            1–2&nbsp;tygodnie po akceptacji projektu, a datę startu znasz przed rozpoczęciem prac.
          </p>
          <div className="bp-rows-act">
            <Link className="bp-row-act bp-row-act--primary" href="/kontakt">
              Umów rozmowę <Arrow />
            </Link>
            <Link className="bp-row-act" href="/oferta">
              Zobacz ofertę <Arrow />
            </Link>
          </div>
        </div>
        <div className="bp-hero-visual">
          <HeroBuildFrame />
        </div>
      </div>
    </section>
  );
}
