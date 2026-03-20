import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeInitScript } from "@/app/theme-script";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";
import { GlobalGradientBackground } from "@/components/effects/GlobalGradientBackground";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/jsonLd";
import type { RootLayoutProps } from "@/types";

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
    "Studio webowe z Szczecina. Tworzymy strony internetowe i sklepy online w Next.js i WordPress. Szybkie, nowoczesne, zoptymalizowane pod SEO. Bezpłatna wycena online.",
  keywords: [
    "strony internetowe Szczecin",
    "studio webowe Szczecin",
    "tworzenie stron internetowych Szczecin",
    "agencja webowa Szczecin",
    "sklepy internetowe Szczecin",
    "Next.js Szczecin",
    "WordPress Szczecin",
    "strony internetowe",
    "web development Polska",
  ],
  authors: [{ name: "Kamil", url: "https://blueport.studio" }],
  creator: "Blueport Studio",
  publisher: "Blueport Studio",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://blueport.studio",
    siteName: "Blueport Studio",
    title: "Blueport Studio — Strony internetowe Szczecin",
    description:
      "Studio webowe z Szczecina. Strony i sklepy w Next.js i WordPress. Wycena online w 60 sekund.",
    images: [
      {
        url: "/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "Blueport Studio — Studio webowe Szczecin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blueport Studio — Strony internetowe Szczecin",
    description: "Studio webowe z Szczecina. Strony i sklepy w Next.js i WordPress.",
    images: ["/og/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/circle-logo.svg",
  },
  alternates: {
    canonical: "https://blueport.studio",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <link
          rel="preload"
          href="/circle-logo.svg"
          as="image"
          type="image/svg+xml"
        />
        <ThemeInitScript />
      </head>
      <body className="font-body min-h-screen bg-transparent text-text-primary antialiased transition-[background-color,color] duration-250 ease-out">
        <a
          href="#main-content"
          className="skip-link fixed left-4 top-0 z-[9999] -translate-y-full rounded-b-lg bg-primary px-4 py-2.5 font-heading text-sm font-bold text-[var(--color-on-primary)] shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
        >
          Przejdź do treści
        </a>
        <LazyMotionProvider>
          <GlobalGradientBackground />
          <div className="page-grid-overlay" aria-hidden />
          <SmoothScroll>
            <ConditionalChrome>{children}</ConditionalChrome>
          </SmoothScroll>
        </LazyMotionProvider>
      </body>
    </html>
  );
}
