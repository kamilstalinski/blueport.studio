import type { Metadata } from "next";
import { Calculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Kalkulator wyceny — Ile kosztuje strona internetowa?",
  description:
    "Wybierz typ strony i funkcje, a kalkulator pokaże widełki cenowe w 60 sekund. Dane kontaktowe podajesz tylko, jeśli chcesz wycenę na e-mail.",
  alternates: { canonical: "https://blueport.studio/wycena" },
  openGraph: { url: "https://blueport.studio/wycena" },
  robots: { index: false, follow: false },
};

export default function KalkulatorPage() {
  return <Calculator />;
}
