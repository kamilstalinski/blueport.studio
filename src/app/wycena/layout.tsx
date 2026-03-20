import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bezpłatna wycena — Blueport Studio",
  description:
    "Sprawdź koszt swojej strony w 60 sekund. Bez zobowiązań.",
  alternates: { canonical: "https://blueport.studio/wycena" },
  openGraph: { url: "https://blueport.studio/wycena" },
  robots: { index: true, follow: false },
};

export default function WycenaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
