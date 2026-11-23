import type { Metadata } from "next";

import { PageHead } from "@/components/pages/PageHead";
import { ProcessAround } from "@/components/pages/ProcessAround";
import { ProcessDetail } from "@/components/pages/ProcessDetail";
import { CtaBand } from "@/components/sections/home/CtaBand";

export const metadata: Metadata = {
  title: "Jak powstaje strona internetowa: etapy",
  description:
    "Jak powstaje strona internetowa dla firmy: wycena, rozmowa o zakresie, projekt, testy na telefonach i publikacja. Zwykle 1–2 tygodnie od akceptacji projektu.",
  alternates: { canonical: "https://blueport.studio/proces" },
  openGraph: { url: "https://blueport.studio/proces" },
};

export default function ProcesPage() {
  return (
    <>
      <PageHead
        title="Jak powstaje strona internetowa"
        lede="Zakres i datę publikacji ustalamy pierwszego dnia i wpisujemy do umowy. Dalej pracujemy według tej umowy."
      />
      <ProcessDetail />
      <ProcessAround />
      <CtaBand />
    </>
  );
}
