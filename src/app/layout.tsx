import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeInitScript } from "@/app/theme-script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GlobalGradientBackground } from "@/components/effects/GlobalGradientBackground";
import type { RootLayoutProps } from "@/types";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BluePort Studio – High-performance digital infrastructure",
  description: "We engineer scalable, high-performance websites. Stable. Precise. Modular.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeInitScript />
      </head>
      <body className="font-body min-h-screen bg-transparent text-text-primary antialiased transition-[background-color,color] duration-250 ease-out">
        <SpeedInsights />
        <GlobalGradientBackground />
        <div className="page-grid-overlay" aria-hidden />
        <SmoothScroll>
          <div className="layout-root relative flex min-h-screen flex-col">
            <main className="flex-1 min-h-full">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </SmoothScroll>
        <div className="fixed left-0 right-0 top-0 z-30 isolate">
          <Navbar />
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
