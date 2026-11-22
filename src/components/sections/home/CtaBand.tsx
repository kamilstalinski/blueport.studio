import Link from "next/link";

import { Arrow } from "@/components/ui/Arrow";

/** The close on every page: the one action again, set large on the grid, right above the footer. */
export function CtaBand() {
  return (
    <section className="bp-close bp-scope" aria-labelledby="cta-title">
      <div className="bp-shell bp-grid">
        <h2 id="cta-title">Sprawdź, ile kosztuje Twoja strona.</h2>
        <p className="bp-lead">Wybierasz zakres, dostajesz widełki. 60 sekund, bez rejestracji i bez zobowiązań.</p>
        <div className="bp-rows-act">
          <Link className="bp-row-act bp-row-act--primary" href="/kalkulator">
            Sprawdź koszt <Arrow />
          </Link>
          <Link className="bp-row-act" href="/kontakt">
            Umów konsultację <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
