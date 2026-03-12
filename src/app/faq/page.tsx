import { Section } from "@/components/ui/Section";
import { FAQSection } from "@/components/sections/FAQSection";

const ALL_FAQ_KEYS = ["price", "time", "contract", "hosting", "cms", "support"] as const;

export default function FAQPage() {
  return (
    <>
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
