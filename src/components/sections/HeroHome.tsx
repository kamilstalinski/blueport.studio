import Link from "next/link";

import { HeroBuildFrame } from "@/components/sections/HeroBuildFrame";
import { Arrow } from "@/components/ui/Arrow";

export function HeroHome() {
  return (
    <section id="hero" className="bp-hero" aria-labelledby="hero-h">
      <div className="bp-shell">
        <div className="bp-hero-copy">
          <h1 id="hero-h">Strona Twojej firmy w&nbsp;sieci w&nbsp;<span style={{ whiteSpace: "nowrap" }}>1–2 tygodnie</span> od akceptacji projektu</h1>
          <p className="bp-lead">
            Projektujemy strony WordPress i sklepy WooCommerce dla firm z całej Polski, od 2&nbsp;500&nbsp;zł. Cenę i
            datę publikacji znasz przed startem prac.
          </p>
          <div className="bp-rows-act">
            <Link className="bp-row-act bp-row-act--primary" href="/kalkulator">
              Sprawdź koszt <span className="bp-mono">60 s</span>
            </Link>
            <Link className="bp-row-act" href="/kontakt">
              Umów konsultację <Arrow />
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
