import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bezpłatna wycena — Blueport Studio",
  description:
    "Sprawdź koszt swojej strony w 60 sekund. Bez zobowiązań.",
  robots: { index: false },
};

export default function KalkulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
