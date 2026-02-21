"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/PageTransition";
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
      <div className="layout-root relative flex min-h-screen flex-col">
        <main className="flex-1 min-h-full">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
      <div className="fixed left-0 right-0 top-0 z-30 isolate">
        <Navbar />
      </div>
      <ScrollToTop />
    </>
  );
}
