import type { Metadata } from "next";
import Link from "next/link";

import { FaqList } from "@/components/pages/FaqList";
import { PageHead } from "@/components/pages/PageHead";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { Arrow } from "@/components/ui/Arrow";
import { InView } from "@/components/ui/InView";
import { FAQ_ITEMS } from "@/constants/faq";
import { faqJsonLd } from "@/lib/jsonLd";

const ALL_FAQ_KEYS = ["time", "contract", "revisions", "materials", "hosting", "cms", "support"] as const;

export const metadata: Metadata = {
  title: "FAQ: czas, umowa, hosting i edycja strony",
  description:
    "Ile trwa stworzenie strony internetowej, czy podpisujemy umowę, kto płaci za hosting i czy sam edytujesz stronę. Sprawdź krótkie odpowiedzi.",
  alternates: { canonical: "https://blueport.studio/faq" },
  openGraph: { url: "https://blueport.studio/faq" },
};

const faqItemsForJsonLd = ALL_FAQ_KEYS.map((key) => ({ question: FAQ_ITEMS[key].q, answer: FAQ_ITEMS[key].a }));

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItemsForJsonLd)) }} />
      <PageHead title="Pytania o stronę internetową dla firmy" lede="Pytania, które słyszymy najczęściej przed podpisaniem umowy, z krótkimi odpowiedziami." />
      <section className="bp-sec bp-sec--tight" aria-label="Pytania i odpowiedzi">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <p className="bp-side-note">Nie ma tu Twojego pytania? Odpowiadamy w ciągu 24 godzin w dni robocze.</p>
            <div className="bp-rows-act">
              <Link className="bp-row-act" href="/kontakt">
                Zadaj pytanie <Arrow />
              </Link>
            </div>
          </div>
          <InView className="reveal bp-sec-body">
            <FaqList keys={ALL_FAQ_KEYS} />
          </InView>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
