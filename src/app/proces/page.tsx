import type { Metadata } from "next";

import { PageHead } from "@/components/pages/PageHead";
import { ProcessAround } from "@/components/pages/ProcessAround";
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
        lede="Cenę i datę publikacji ustalamy pierwszego dnia i wpisujemy do umowy. Dalej pracujemy według niej."
      />
      <ProcessDetail />
      <ProcessAround />
      <CtaBand />
    </>
  );
}
