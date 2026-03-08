import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeInitScript } from "@/app/theme-script";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GlobalGradientBackground } from "@/components/effects/GlobalGradientBackground";
import type { RootLayoutProps } from "@/types";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blueport.studio"),
  title: {
    default: "Blueport Studio — Strony internetowe Szczecin",
    template: "%s | Blueport Studio",
  },
  description:
    "Tworzymy nowoczesne strony internetowe i sklepy w Next.js. Szczecin i cała Polska. Bezpłatna wycena online.",
  keywords: [
    "strony internetowe Szczecin",
    "agencja webowa Szczecin",
    "Next.js",
    "WordPress Szczecin",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://blueport.studio",
    siteName: "Blueport Studio",
    title: "Blueport Studio — Strony internetowe Szczecin",
    description: "Nowoczesne strony w Next.js. Wycena online w 60 sekund.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blueport Studio",
    description: "Strony internetowe Szczecin — Next.js, WordPress",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/circle-logo.svg",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="pl"
      className={cn(inter.variable, spaceGrotesk.variable)}
      suppressHydrationWarning
    >
      <head>
        <ThemeInitScript />
      </head>
      <body className="font-body min-h-screen bg-transparent text-text-primary antialiased transition-[background-color,color] duration-250 ease-out">
        <a
          href="#main-content"
          className="skip-link fixed left-4 top-0 z-[9999] -translate-y-full rounded-b-lg bg-primary px-4 py-2.5 font-heading text-sm font-bold text-[var(--color-on-primary)] shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
        >
          Przejdź do treści
        </a>
        <SpeedInsights />
        <GlobalGradientBackground />
        <div className="page-grid-overlay" aria-hidden />
        <SmoothScroll>
          <ConditionalChrome>{children}</ConditionalChrome>
        </SmoothScroll>
      </body>
    </html>
  );
}
