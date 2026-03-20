import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { FAQSection } from "@/components/sections/FAQSection";
import { faqJsonLd } from "@/lib/jsonLd";
import { FAQ_ITEMS } from "@/constants/faq";

const ALL_FAQ_KEYS = ["price", "time", "contract", "hosting", "cms", "support"] as const;

export const metadata: Metadata = {
  title: "FAQ — Najczęściej zadawane pytania",
  description:
    "Odpowiedzi na najczęstsze pytania o tworzenie stron, ceny, czas realizacji i współpracę z Blueport Studio.",
  alternates: { canonical: "https://blueport.studio/faq" },
  openGraph: { url: "https://blueport.studio/faq" },
};

const faqItemsForJsonLd = ALL_FAQ_KEYS.map((key) => {
  const item = FAQ_ITEMS[key];
  return { question: item.q, answer: item.a };
});

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqItemsForJsonLd)),
        }}
      />
      <Section firstOnPage>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          FAQ
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Najczęściej zadawane pytania
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Odpowiedzi na pytania, które klienci zadają przed rozpoczęciem współpracy.
        </p>
      </Section>
      <FAQSection faqKeys={[...ALL_FAQ_KEYS]} />
    </>
  );
}
