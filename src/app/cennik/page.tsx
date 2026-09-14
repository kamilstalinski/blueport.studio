import type { Metadata } from "next";
import Link from "next/link";

import { PageHead } from "@/components/pages/PageHead";
import { PriceTable } from "@/components/pages/PriceTable";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { TierCard } from "@/components/sections/home/TierCard";
import { InView } from "@/components/ui/InView";
import { HOME_TIERS } from "@/constants/pricing";
import { cn } from "@/lib/utils";

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
        titleWidth="23ch"
        lede={
          <>
            Poniżej ceny bazowe i to, co dokładnie w nich jest. Dopłaty za dodatkowe funkcje policzysz w{" "}
            <Link href="/kalkulator" className="link">
              kalkulatorze
            </Link>
            .
          </>
        }
      />
      <section className="price-tiers" aria-labelledby="price-tiers-title">
        <div className="shell">
          <h2 id="price-tiers-title" className="sr-only">
            Pakiety
          </h2>
          <div className="tiers">
            {HOME_TIERS.map((tier) => (
              <InView key={tier.packageId} className={cn("reveal tier-slot", tier.featured && "tier-slot--featured")}>
                <TierCard tier={tier} />
              </InView>
            ))}
          </div>
        </div>
      </section>
      <section className="sec band" aria-labelledby="price-table-title">
        <div className="shell">
          <InView className="reveal">
            <h2 id="price-table-title" className="d2 price-table-title">
              Co dokładnie dostajesz w każdym pakiecie.
            </h2>
          </InView>
          <InView className="reveal" lag={1}>
            <PriceTable />
          </InView>
          <p className="meta price-note">Ceny netto. Hosting i domena rozliczane bezpośrednio u dostawcy, bez naszej marży.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
