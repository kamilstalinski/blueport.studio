"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const NO_CHROME_PATHS = ["/wycena", "/kalkulator"];

export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = NO_CHROME_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (hideChrome) {
    return (
      <>
        {children}
        <ScrollToTop />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="layout-root relative flex min-h-screen flex-col">
        <main id="main-content" className="flex-1 min-h-full">
          {children}
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </>
  );
}
