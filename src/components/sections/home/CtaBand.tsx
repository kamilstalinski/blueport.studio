import Link from "next/link";

import { Arrow } from "@/components/ui/Arrow";

/** The close on every page: the one action again, set large on the grid, right above the footer. */
export function CtaBand() {
  return (
    <section className="bp-close bp-scope" aria-labelledby="cta-title">
      <div className="bp-shell bp-grid">
        <h2 id="cta-title">Policz zakres swojej strony w 60 sekund.</h2>
        <p className="bp-lead">Wybierasz typ strony i funkcje, a kalkulator od razu pokazuje wstępną wycenę. E-mail podajesz dopiero, jeśli chcesz ją dostać.</p>
        <div className="bp-rows-act">
          <Link className="bp-row-act bp-row-act--primary" href="/kalkulator">
            Wyceń stronę <Arrow />
          </Link>
          <Link className="bp-row-act" href="/kontakt">
            Umów konsultację <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
