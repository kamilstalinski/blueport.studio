import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/kafel.css";
import { Bricolage_Grotesque, Schibsted_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/jsonLd";
import type { RootLayoutProps } from "@/types";

export const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  variable: "--font-heading",
  axes: ["opsz"],
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
  alternates: {
    canonical: "https://blueport.studio",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="pl"
      className={cn(schibstedGrotesk.variable, bricolageGrotesque.variable, "dark")}
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
      </head>
      <body className="font-body min-h-screen antialiased">
        <a
          href="#main-content"
          className="skip-link fixed left-4 top-0 z-[9999] -translate-y-full bg-primary px-4 py-2.5 font-heading text-sm font-bold text-[var(--color-on-primary)] transition-transform focus:translate-y-0 focus:outline-none"
        >
          Przejdź do treści
        </a>
        <LazyMotionProvider>
          <SmoothScroll>
            <ConditionalChrome>{children}</ConditionalChrome>
          </SmoothScroll>
        </LazyMotionProvider>
      </body>
    </html>
  );
}
