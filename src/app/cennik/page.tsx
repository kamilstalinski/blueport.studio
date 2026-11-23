import type { Metadata } from "next";
import Link from "next/link";

import { PageHead } from "@/components/pages/PageHead";
import { AddonPicker } from "@/components/pages/AddonPicker";
import { PriceTable } from "@/components/pages/PriceTable";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { HomePricing } from "@/components/sections/home/HomePricing";
import { Arrow } from "@/components/ui/Arrow";
import { InView } from "@/components/ui/InView";

export const metadata: Metadata = {
  title: "Cennik stron internetowych: od 2 500 zł",
  description:
    "Strony firmowe od 2 500 zł, sklepy WooCommerce od 4 900 zł, ceny netto. Tabela z tym, co zawiera każdy pakiet. Hosting i domena bez naszej marży.",
  alternates: { canonical: "https://blueport.studio/cennik" },
  openGraph: { url: "https://blueport.studio/cennik" },
};

export default function CennikPage() {
  return (
    <>
      <PageHead
        title="Ceny, które widzisz przed podpisaniem umowy."
        lede={
          <>
            Poniżej ceny bazowe i to, co dokładnie w nich jest. Reklamy i wdrożenia AI opisujemy w{" "}
            <Link href="/oferta" className="bp-link">
              ofercie
            </Link>
            .
          </>
        }
      />
      <HomePricing onPricePage />
      <section className="bp-sec" aria-labelledby="price-table-title">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <h2 id="price-table-title">Co dokładnie dostajesz w każdym pakiecie.</h2>
            <p>Ceny netto. Hosting i domena rozliczane bezpośrednio u dostawcy, bez naszej marży.</p>
          </div>
          <InView className="reveal bp-sec-body">
            <PriceTable />
          </InView>
        </div>
      </section>
      <section className="bp-sec" aria-labelledby="addons-title">
        <div className="bp-shell">
          <AddonPicker>
            <h2 id="addons-title">Dodatki: policz swój zakres</h2>
            <p>Wybierz pakiet i zaznacz dodatki. Suma liczy się od razu, ceny są netto.</p>
          </AddonPicker>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
