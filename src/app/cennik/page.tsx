import type { Metadata } from "next";
import Link from "next/link";

import { PageHead } from "@/components/pages/PageHead";
import { PriceTable } from "@/components/pages/PriceTable";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { HomePricing } from "@/components/sections/home/HomePricing";
import { InView } from "@/components/ui/InView";

export const metadata: Metadata = {
  title: "Cennik — Strony internetowe Szczecin",
  description:
    "Transparentne ceny bez ukrytych kosztów. Strony firmowe od 2 500 zł, sklepy od 4 900 zł. Sprawdź szczegółowy cennik Blueport Studio.",
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
            Poniżej ceny bazowe i to, co dokładnie w nich jest. Dopłaty za dodatkowe funkcje policzysz w{" "}
            <Link href="/kalkulator" className="bp-link">
              kalkulatorze
            </Link>
            .
          </>
        }
      />
      <HomePricing />
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
      <CtaBand />
    </>
  );
}
