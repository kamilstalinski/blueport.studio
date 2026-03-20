import type { Metadata } from "next";
import { Calculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Kalkulator wyceny — Ile kosztuje strona internetowa?",
  description:
    "Sprawdź cenę swojej strony internetowej w 60 sekund. Kalkulator wyceny online — bez zobowiązań, bez rejestracji.",
  alternates: { canonical: "https://blueport.studio/kalkulator" },
  openGraph: { url: "https://blueport.studio/kalkulator" },
  robots: { index: false, follow: false },
};

export default function KalkulatorPage() {
  return <Calculator />;
}
