import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeInitScript } from "@/app/theme-script";

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
      <body className="font-body min-h-screen bg-bg text-text-primary antialiased transition-[background-color,color] duration-[250ms] ease-out">
        {children}
      </body>
    </html>
  );
}
