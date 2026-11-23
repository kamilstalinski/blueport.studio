import Link from "next/link";

import { Arrow } from "@/components/ui/Arrow";
import { InView } from "@/components/ui/InView";

/** The hub opening: HeroHome's grid, and on the right a drawn client path (ad, page, form, AI) in PlanSection's hand.
 *  A drawing, never a real client's site: a real one would suggest that client buys ads and AI from us. */
export function OfferHero() {
  return (
    <section className="bp-hero bp-offer-hero" aria-labelledby="offer-h">
      <div className="bp-shell">
        <div className="bp-hero-copy">
          <h1 id="offer-h">Strony, sklepy, reklamy i&nbsp;AI dla małych firm</h1>
          <p className="bp-lead">
            Budujemy strony i sklepy, prowadzimy reklamy w&nbsp;Meta i&nbsp;Google i&nbsp;wdrażamy AI do pracy, którą dziś
            robisz ręcznie. Pracujemy ze Szczecina dla firm z&nbsp;całej Polski.
          </p>
          <p className="bp-offer-fact">Na wiadomość odpowiadamy w&nbsp;24 godziny w&nbsp;dni robocze.</p>
          <div className="bp-rows-act">
            <Link className="bp-row-act bp-row-act--primary" href="/kontakt">
              Umów rozmowę <Arrow />
            </Link>
            <Link className="bp-row-act" href="/realizacje">
              Zobacz realizacje <Arrow />
            </Link>
          </div>
        </div>
        <div className="bp-hero-visual">
          {/* data-in (InView) draws the path once; it is already on screen when the page loads */}
          <InView className="bp-offer-art">
            <svg
              viewBox="0 0 430 330"
              fill="none"
              shapeRendering="crispEdges"
              role="img"
              aria-label="Schemat ścieżki klienta: reklama prowadzi na stronę, strona do formularza, a zapytanie z formularza trafia do AI, które przekazuje je dalej."
            >
              {/* the ad */}
              <rect className="bp-box" x="8" y="8" width="120" height="132" />
              <rect className="bp-fill" x="18" y="18" width="100" height="56" />
              <rect className="bp-bar" x="18" y="84" width="78" height="8" />
              <rect className="bp-dim" x="18" y="98" width="60" height="6" />
              <rect className="bp-cta" x="18" y="114" width="44" height="14" />
              {/* the page, with its form */}
              <rect className="bp-box" x="152" y="8" width="270" height="208" />
              <line className="bp-hair" x1="152" y1="32" x2="422" y2="32" />
              <rect className="bp-bar" x="164" y="16" width="34" height="8" />
              <rect className="bp-dim" x="330" y="17" width="24" height="6" />
              <rect className="bp-dim" x="360" y="17" width="24" height="6" />
              <rect className="bp-cta" x="392" y="15" width="20" height="10" />
              <rect className="bp-fill" x="164" y="44" width="246" height="60" />
              <rect className="bp-bar" x="182" y="56" width="130" height="9" />
              <rect className="bp-dim" x="182" y="72" width="96" height="6" />
              <rect className="bp-cta" x="182" y="86" width="50" height="12" />
              <rect className="bp-fill" x="164" y="116" width="246" height="88" />
              <rect className="bp-bar" x="182" y="126" width="70" height="7" />
              <rect className="bp-field" x="182" y="140" width="104" height="14" />
              <rect className="bp-field" x="294" y="140" width="104" height="14" />
              <rect className="bp-field" x="182" y="160" width="216" height="18" />
              <rect className="bp-goal" x="182" y="185" width="50" height="12" />
              {/* AI, handing the enquiry on three ways */}
              <rect className="bp-box" x="158" y="244" width="98" height="78" />
              <rect className="bp-fill" x="187" y="262" width="40" height="40" />
              <path className="bp-hair" d="M256 283 H272 M272 258 V308 M272 258 H290 M272 283 H290 M272 308 H290" />
              <rect className="bp-fill" x="290" y="250" width="132" height="16" />
              <rect className="bp-fill" x="290" y="275" width="132" height="16" />
              <rect className="bp-fill" x="290" y="300" width="132" height="16" />
              <rect className="bp-dim" x="300" y="255" width="64" height="6" />
              <rect className="bp-dim" x="300" y="280" width="84" height="6" />
              <rect className="bp-dim" x="300" y="305" width="52" height="6" />
              <path
                className="bp-route"
                data-offer-path=""
                pathLength={1}
                d="M40 128 V160 H140 V92 H207 V110 H172 V191 H207 V276"
              />
              <rect className="bp-pin" x="201" y="276" width="12" height="12" />
            </svg>
          </InView>
        </div>
      </div>
    </section>
  );
}
