import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeInitScript } from "@/app/theme-script";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
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
          <ConditionalChrome>{children}</ConditionalChrome>
        </SmoothScroll>
      </body>
    </html>
  );
}
