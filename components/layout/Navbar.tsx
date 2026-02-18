"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("common.nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/uslugi", label: t("services") },
    { href: "/realizacje", label: t("caseStudies") },
    { href: "/proces", label: t("process") },
    { href: "/o-nas", label: t("about") },
    { href: "/kontakt", label: t("contact") },
  ];

  const toUpper = (s: string) => (s.length ? s.toUpperCase() : s);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const check = () => setIsMobileView(window.innerWidth < 880);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const useScrolledStyle = scrolled || isMobileView;
  const glassBase = "nav-glass relative flex w-full items-center justify-between ";
  const glassClass =
    glassBase +
    (useScrolledStyle
      ? "nav-glass-scrolled border border-t-0 py-3 md:py-4 px-6 md:px-8"
      : "border-b border-l-0 border-r-0 border-t-0 py-[1.17rem] md:py-[1.56rem] px-6 md:px-8") +
    (menuOpen ? " nav-glass-menu-open" : "") +
    " transition-[border-radius,border-color,background-color,box-shadow,padding] duration-300 ease-out";
  const glassStyle = {
    WebkitBackdropFilter: "blur(12px)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    borderRadius: useScrolledStyle ? (menuOpen ? "1rem 1rem 0 0" : "1rem") : "0",
  };

  const navContent = (
    <>
      <Link
        href='/'
        className='relative z-10 flex shrink-0 items-center gap-2.5 text-foreground transition-opacity hover:opacity-90'
      >
        <span className='font-heading inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-black md:h-10 md:w-10'>
          BP
        </span>
        <span className='font-heading text-base font-semibold lowercase tracking-tight text-foreground md:text-lg'>
          blueport
        </span>
      </Link>
      <nav
        aria-label={t("ariaNav")}
        className='font-heading absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 text-base font-medium tracking-[0.3px] text-foreground min-[880px]:flex'
      >
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/" || pathname === ""
              : pathname === link.href ||
                pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative whitespace-nowrap pb-0.5 uppercase transition-colors duration-200 no-underline hover:text-primary",
                isActive && "text-primary",
              )}
            >
              {toUpper(link.label)}
            </Link>
          );
        })}
      </nav>
      <div className='relative z-10 flex shrink-0 items-center gap-3'>
        <Link
          href='/kalkulator'
          className='nav-cta-free-quote font-heading hidden items-center gap-2 rounded-[12px] border border-white/20 bg-transparent px-[18px] py-2.5 text-base font-semibold uppercase tracking-[0.5px] text-foreground transition-all duration-200 ease-out hover:border-primary/40 hover:text-primary hover:bg-primary/5 min-[880px]:inline-flex max-[1115px]:px-2.5'
          title={t("freeQuote")}
        >
          <Calculator className='h-4 w-4 shrink-0' strokeWidth={2} />
          <span className='max-[1115px]:hidden'>{toUpper(t("freeQuote"))}</span>
        </Link>
        <button
            type='button'
            className='group inline-flex w-10 h-10 min-[880px]:hidden items-center justify-center rounded-xl border border-white/20 bg-transparent text-foreground shadow-[0_1px_0_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_1px_0_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.08)]'
            aria-pressed={menuOpen}
            aria-label={menuOpen ? t("ariaMenuClose") : t("ariaMenu")}
            onClick={() => setMenuOpen((o) => !o)}
          >
          <span className='sr-only'>{t("menu")}</span>
          <svg className='w-5 h-5 fill-current pointer-events-none' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' aria-hidden>
            <rect className='origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-x-0 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[315deg]' y='7' width='9' height='2' rx='1' />
            <rect className='origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-[[aria-pressed=true]]:rotate-45' y='7' width='16' height='2' rx='1' />
            <rect className='origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[135deg]' y='7' width='9' height='2' rx='1' />
          </svg>
        </button>
        </div>
    </>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 box-border pb-2 transition-[padding] duration-300 ease-out",
        useScrolledStyle ? "px-4 pt-3 md:px-6 md:pt-4" : "px-0 pt-0",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full transition-[max-width,margin] duration-300 ease-out",
          useScrolledStyle ? "max-w-[1280px]" : "max-w-full",
        )}
      >
        <div className={glassClass} style={glassStyle}>
          {navContent}
        </div>

        {/* Rozwijane menu (mobile/tablet) */}
        <div
          className={cn(
            "min-[880px]:hidden transition-[max-height] duration-300 ease-out",
            menuOpen ? "max-h-[min(85vh,520px)] overflow-y-auto overflow-x-hidden" : "max-h-0 overflow-hidden",
          )}
        >
          <div
            className='nav-glass nav-glass-scrolled nav-glass-dropdown border border-t-0 border-border/80 px-6 py-5 pb-6'
            style={{
              WebkitBackdropFilter: "blur(12px)",
              backdropFilter: "blur(12px)",
              borderRadius: useScrolledStyle ? "0 0 1rem 1rem" : "0",
            }}
          >
            <nav
              aria-label={t("ariaNav")}
              className='font-heading flex flex-col gap-2 text-base font-medium uppercase tracking-wider text-foreground'
            >
              <Link
                href='/kalkulator'
                onClick={() => setMenuOpen(false)}
                className='nav-cta-free-quote font-heading inline-flex w-full md:w-fit items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-transparent px-[18px] py-2.5 text-base font-semibold uppercase tracking-[0.5px] text-foreground transition-all duration-200 ease-out hover:border-primary/40 hover:text-primary hover:bg-primary/5 mb-2'
              >
                <Calculator className='h-4 w-4 shrink-0' strokeWidth={2} />
                {toUpper(t("freeQuote"))}
              </Link>
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/" || pathname === ""
                    : pathname === link.href ||
                      pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "relative py-3 no-underline transition-colors duration-200 hover:text-primary",
                      isActive && "text-primary",
                    )}
                  >
                    {toUpper(link.label)}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
