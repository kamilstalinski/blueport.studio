import type { Metadata } from "next";

import { PageHead } from "@/components/pages/PageHead";
import { ProcessDetail } from "@/components/pages/ProcessDetail";
import { CtaBand } from "@/components/sections/home/CtaBand";

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
        lede="Współpraca z nami jest uporządkowana i przewidywalna. Każdy etap ma jasny cel, zakres i termin realizacji."
      />
      <section className="bp-sec bp-sec--tight" aria-label="Etapy współpracy">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <p className="bp-total bp-mono">Całość zwykle trwa 1–2 tygodnie.</p>
          </div>
          <div className="bp-sec-body">
            <ProcessDetail />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
