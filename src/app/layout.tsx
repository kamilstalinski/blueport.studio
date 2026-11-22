import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/kafel.css";
import "@/styles/kafel-pages.css";
import "@/styles/kafel-calculator.css";
import "@/styles/bp.css";
import { Bricolage_Grotesque, Host_Grotesk, Martian_Mono, Schibsted_Grotesk } from "next/font/google";
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

/* the homepage world (bp.css): Host Grotesk for words, Martian Mono only for data */
export const hostGrotesk = Host_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-host",
  weight: ["400", "500", "600"],
});

export const martianMono = Martian_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-martian",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blueport.studio"),
  title: {
    default: "Strony internetowe Szczecin, od 2500 zł | Blueport Studio",
    template: "%s | Blueport Studio",
  },
  description:
    "Strony internetowe dla małych firm od 2500 zł. Studio ze Szczecina: WordPress, sklepy WooCommerce i Next.js. Wycena w kalkulatorze w 60 sekund, odpowiedź w 24 h.",
  keywords: [
    "strony internetowe Szczecin",
    "studio webowe Szczecin",
    "tworzenie stron internetowych Szczecin",
    "agencja webowa Szczecin",
    "sklepy internetowe Szczecin",
    "Next.js Szczecin",
    "WordPress Szczecin",
    "strony internetowe dla małych firm",
    "ile kosztuje strona internetowa",
    "strona WordPress dla firmy",
    "sklep WooCommerce",
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
      "Strony internetowe dla małych firm od 2500 zł. Studio ze Szczecina, wycena online w 60 sekund.",
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
    description: "Strony WordPress i sklepy WooCommerce dla małych firm, od 2500 zł. Studio ze Szczecina.",
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
      className={cn(schibstedGrotesk.variable, bricolageGrotesque.variable, hostGrotesk.variable, martianMono.variable, "dark")}
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
        <noscript>
          <style>{".reveal,.bp-stagger>*{opacity:1;transform:none}"}</style>
        </noscript>
      </head>
      <body className="font-body min-h-screen antialiased" suppressHydrationWarning>
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
