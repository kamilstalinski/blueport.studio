import type { Metadata } from "next";

import { FaqList } from "@/components/pages/FaqList";
import { PageHead } from "@/components/pages/PageHead";
import { CtaBand } from "@/components/sections/home/CtaBand";
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
      <PageHead title="Najczęściej zadawane pytania" titleWidth="20ch" lede="Odpowiedzi na pytania, które klienci zadają przed rozpoczęciem współpracy." />
      <section className="page-body" aria-label="Pytania i odpowiedzi">
        <div className="shell">
          <InView className="reveal">
            <FaqList keys={ALL_FAQ_KEYS} />
          </InView>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
