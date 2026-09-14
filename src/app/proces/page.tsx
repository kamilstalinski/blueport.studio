import type { Metadata } from "next";

import { PageHead } from "@/components/pages/PageHead";
import { ProcessDetail } from "@/components/pages/ProcessDetail";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { InView } from "@/components/ui/InView";

export const metadata: Metadata = {
  title: "Proces współpracy — Jak działamy",
  description:
    "Poznaj nasz proces tworzenia stron: od briefu przez projekt, wdrożenie aż po wsparcie po starcie. Transparentnie i bez niespodzianek.",
  alternates: { canonical: "https://blueport.studio/proces" },
  openGraph: { url: "https://blueport.studio/proces" },
};

export default function ProcesPage() {
  return (
    <>
      <PageHead
        title="Proces współpracy"
        titleWidth="20ch"
        lede="Współpraca z nami jest uporządkowana i przewidywalna. Każdy etap ma jasny cel, zakres i termin realizacji."
      />
      <section className="page-body" aria-label="Etapy współpracy">
        <div className="shell">
          <ProcessDetail />
          <InView className="reveal">
            <p className="meta process-total">Całość zwykle trwa 1–2 tygodnie.</p>
          </InView>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
