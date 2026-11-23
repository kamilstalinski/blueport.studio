import type { Metadata } from "next";

import { PageHead } from "@/components/pages/PageHead";
import { ProcessAround } from "@/components/pages/ProcessAround";
import { ProcessDetail } from "@/components/pages/ProcessDetail";
import { CtaBand } from "@/components/sections/home/CtaBand";

export const metadata: Metadata = {
  title: "Jak powstaje strona internetowa: etapy",
  description:
    "Jak powstaje strona internetowa dla firmy: rozmowa o zakresie, umowa, projekt, testy na telefonach i publikacja. Sprawdź, ile trwa każdy etap.",
  alternates: { canonical: "https://blueport.studio/proces" },
  openGraph: { url: "https://blueport.studio/proces" },
};

export default function ProcesPage() {
  return (
    <>
      <PageHead
        title="Od rozmowy do publikacji"
        lede="Zakres i datę publikacji ustalamy pierwszego dnia i wpisujemy do umowy. Dalej pracujemy według tej umowy."
      />
      <ProcessDetail />
      <ProcessAround />
      <CtaBand />
    </>
  );
}
