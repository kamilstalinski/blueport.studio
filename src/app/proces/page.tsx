import type { Metadata } from "next";

import { PageHead } from "@/components/pages/PageHead";
import { ProcessDetail } from "@/components/pages/ProcessDetail";
import { CtaBand } from "@/components/sections/home/CtaBand";

export const metadata: Metadata = {
  title: "Proces: od wyceny do publikacji w 5 krokach",
  description:
    "Kalkulator, rozmowa o cenie i terminie, projekt, testy na telefonach, publikacja ze szkoleniem. Od akceptacji projektu do startu mija zwykle 1–2 tygodnie.",
  alternates: { canonical: "https://blueport.studio/proces" },
  openGraph: { url: "https://blueport.studio/proces" },
};

export default function ProcesPage() {
  return (
    <>
      <PageHead
        title="Od kalkulatora do publikacji"
        lede="Cenę i datę publikacji ustalamy pierwszego dnia. Poniżej to, co dzieje się potem, krok po kroku."
      />
      <section className="bp-sec bp-sec--tight" aria-label="Etapy współpracy">
        <div className="bp-shell">
          <p className="bp-total bp-mono">Od akceptacji projektu do publikacji: zwykle 1–2 tygodnie.</p>
          <ProcessDetail />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
