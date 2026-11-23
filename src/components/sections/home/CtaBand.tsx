import Link from "next/link";

import { Arrow } from "@/components/ui/Arrow";

/** The close on every page: the one action again, set large on the grid, right above the footer.
 * `onOfferPage`: on /oferta itself the "Zobacz ofertę" row would link to the page it sits on, so it is left out. */
export function CtaBand({ onOfferPage = false }: { onOfferPage?: boolean }) {
  return (
    <section className="bp-close bp-scope" aria-labelledby="cta-title">
      <div className="bp-shell bp-grid">
        <h2 id="cta-title">Opowiedz, czego potrzebuje Twoja firma.</h2>
        <p className="bp-lead">Odpowiadamy w 24 godziny w dni robocze. Rozmowa trwa około 30 minut, a umowę podpisujemy przed startem prac.</p>
        <div className="bp-rows-act">
          <Link className="bp-row-act bp-row-act--primary" href="/kontakt">
            Umów rozmowę <Arrow />
          </Link>
          {!onOfferPage && (
            <Link className="bp-row-act" href="/oferta">
              Zobacz ofertę <Arrow />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
