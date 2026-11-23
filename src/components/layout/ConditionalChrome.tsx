"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { cn } from "@/lib/utils";

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

  // the home page and the offer hub draw their own grid and background; every other page gets the same grid on a quiet ground
  const isHome = pathname === "/" || pathname === "/oferta";

  return (
    <>
      <Navbar />
      <div className={cn("layout-root relative flex min-h-screen flex-col", !isHome && "bp-sub bp-scope")}>
        {!isHome && (
          <div className="bp-rails" aria-hidden="true">
            <div className="bp-shell">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
        <main id="main-content" className="flex-1 min-h-full">
          {children}
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </>
  );
}
