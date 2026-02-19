import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeInitScript } from "@/app/theme-script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GradualBlurWithFooter } from "@/components/effects/GradualBlurWithFooter";
import { GradualBlurTop } from "@/components/effects/GradualBlurTop";
import { GlobalGradientBackground } from "@/components/effects/GlobalGradientBackground";

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
  description:
    "We engineer scalable, high-performance websites. Stable. Precise. Modular."
};

type RootLayoutProps = {
  children: React.ReactNode;
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
      <body className="font-body min-h-screen bg-bg text-text-primary antialiased transition-[background-color,color] duration-250 ease-out">
        <SmoothScroll>
          <div className="relative flex min-h-screen flex-col">
            <GlobalGradientBackground />
            <div className="page-grid-overlay" aria-hidden />
            <GradualBlurTop />
            <div className="fixed left-0 right-0 top-0 z-30">
              <Navbar />
            </div>
            <main className="flex-1 min-h-full">
              {children}
            </main>
            <Footer />
            <GradualBlurWithFooter />
            <ScrollToTop />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
