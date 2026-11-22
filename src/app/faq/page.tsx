import type { Metadata } from "next";
import Link from "next/link";

import { FaqList } from "@/components/pages/FaqList";
import { PageHead } from "@/components/pages/PageHead";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { Arrow } from "@/components/ui/Arrow";
import { InView } from "@/components/ui/InView";
import { FAQ_ITEMS } from "@/constants/faq";
import { faqJsonLd } from "@/lib/jsonLd";

const ALL_FAQ_KEYS = ["price", "time", "contract", "hosting", "cms", "support"] as const;

export const metadata: Metadata = {
  title: "FAQ — Najczęściej zadawane pytania",
  description:
    "Odpowiedzi na najczęstsze pytania o tworzenie stron, ceny, czas realizacji i współpracę z Blueport Studio.",
  alternates: { canonical: "https://blueport.studio/faq" },
  openGraph: { url: "https://blueport.studio/faq" },
};

const faqItemsForJsonLd = ALL_FAQ_KEYS.map((key) => ({ question: FAQ_ITEMS[key].q, answer: FAQ_ITEMS[key].a }));

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItemsForJsonLd)) }} />
      <PageHead title="Najczęściej zadawane pytania" lede="Odpowiedzi na pytania, które klienci zadają przed rozpoczęciem współpracy." />
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
