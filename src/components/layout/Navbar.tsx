"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { useAccentTheme } from "@/hooks/useAccentTheme";
import { duration, ease } from "@/constants/animations";
import { cn } from "@/lib/utils";
import { applyAccent } from "@/lib/accent-theme";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";

import type { AccentTheme } from "@/types";

export function Navbar() {
  const glassBlurNav = useGlassBlurStyle("nav");
  const glassBlurDefault = useGlassBlurStyle();
  const pathname = usePathname() ?? "";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const accent = useAccentTheme();
  const [isPaletteDropdownOpen, setIsPaletteDropdownOpen] = useState(false);
  const paletteDropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/uslugi", label: "Usługi" },
    { href: "/realizacje", label: "Realizacje" },
    { href: "/proces", label: "Proces" },
    { href: "/o-nas", label: "O nas" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  const toUpper = (s: string) => (s.length ? s.toUpperCase() : s);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
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

  useEffect(() => {
    if (!isPaletteDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (paletteDropdownRef.current && !paletteDropdownRef.current.contains(e.target as Node)) {
        setIsPaletteDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPaletteDropdownOpen]);

  const useScrolledStyle = isScrolled || isMobileView;

  const accentOptions: { value: AccentTheme; color: string; label: string; bg: string }[] = [
    { value: "blue", color: "#3b82f6", label: "Niebieski", bg: "#00020f" },
    { value: "violet", color: "#a855f7", label: "Fioletowy", bg: "#07020f" },
    { value: "amber", color: "#f59e0b", label: "Złoty", bg: "#0d0700" },
    { value: "cyan", color: "#06b6d4", label: "Cyjan", bg: "#000d10" },
  ];

  const paletteButton = (
    <div className="relative shrink-0" ref={paletteDropdownRef}>
      <button
        type="button"
        onClick={() => setIsPaletteDropdownOpen((prev) => !prev)}
        aria-expanded={isPaletteDropdownOpen}
        aria-haspopup="true"
        aria-label="Wybierz kolor motywu"
        title="Wybierz kolor motywu"
        className={cn(
          "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-transparent text-foreground transition focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-transparent min-[880px]:h-10 min-[880px]:w-10",
          isPaletteDropdownOpen
            ? "border-primary/50 bg-primary/5"
            : "border-white/20 hover:border-primary/40 hover:bg-primary/5"
        )}
      >
        <span className="text-xl leading-none" aria-hidden>
          🎨
        </span>
      </button>
      {isPaletteDropdownOpen && (
        <div
          className="glass-card absolute right-0 top-full z-[100] mt-2 grid w-[9rem] grid-cols-2 gap-3 rounded-2xl p-3"
          role="menu"
          aria-label="Paleta kolorów"
          style={glassBlurDefault}
        >
          {accentOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="menuitem"
              onClick={() => {
                applyAccent(opt.value);
                setIsPaletteDropdownOpen(false);
              }}
              aria-label={opt.label}
              className={cn(
                "h-8 w-8 shrink-0 rounded-full border-2 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-transparent",
                accent === opt.value
                  ? "border-white/80 ring-2 ring-primary/50"
                  : "border-white/30 hover:border-white/50"
              )}
              style={{ backgroundColor: opt.color }}
            />
          ))}
        </div>
      )}
    </div>
  );
  const glassBase = "nav-glass relative flex w-full items-center justify-between ";
  const glassClass =
    glassBase +
    (useScrolledStyle
      ? "nav-glass-scrolled border py-3 md:py-4"
      : "border-b border-l-0 border-r-0 border-t-0 py-[1.17rem] md:py-[1.56rem]") +
    (isMenuOpen ? " nav-glass-menu-open" : "") +
    " transition-[border-radius,border-color,background-color,box-shadow,padding] duration-300 ease-out";
  const getNavBorderRadius = (): string => {
    if (!useScrolledStyle) return "0";
    return isMenuOpen ? "1rem 1rem 0 0" : "1rem";
  };
  const glassStyle: React.CSSProperties = {
    borderRadius: getNavBorderRadius(),
    ...glassBlurNav,
  };

  const navContent = (
    <>
      <Link
        href="/"
        className="relative z-10 flex shrink-0 items-center gap-2.5 text-foreground transition-opacity hover:opacity-90"
      >
        <span className="font-heading relative inline-flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-black md:h-10 md:w-10">
          <Image
            src="/logo.svg"
            alt="Blueport Studio — strona główna"
            width={40}
            height={40}
            className="h-full w-full object-contain"
          />
        </span>
        <span className="font-heading text-base font-semibold lowercase tracking-tight text-foreground md:text-lg">
          blueport
        </span>
      </Link>
      <nav
        aria-label="Główna nawigacja"
        className="font-heading absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 text-base font-medium tracking-[0.3px] text-foreground min-[880px]:flex"
      >
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/" || pathname === ""
              : pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative whitespace-nowrap pb-0.5 uppercase transition-colors duration-200 no-underline hover:text-primary",
                isActive && "text-primary"
              )}
            >
              {toUpper(link.label)}
            </Link>
          );
        })}
      </nav>
      <div className="relative z-10 flex shrink-0 items-center gap-3">
        <Link
          href="/kalkulator"
          className="nav-cta-free-quote font-heading hidden items-center gap-2 rounded-[12px] border border-white/20 bg-transparent px-[18px] py-2.5 text-sm font-semibold uppercase tracking-[0.5px] text-foreground transition-all duration-200 ease-out hover:border-primary/40 hover:text-primary hover:bg-primary/5 min-[880px]:inline-flex max-[1115px]:px-2.5"
          title="Bezpłatna wycena"
        >
          <span className="max-[1115px]:hidden">{toUpper("Bezpłatna wycena")}</span>
        </Link>
        {paletteButton}
        <button
          type="button"
          className="group inline-flex w-10 h-10 min-[880px]:hidden items-center justify-center rounded-xl border border-white/20 bg-transparent text-foreground shadow-[0_1px_0_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_1px_0_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.08)]"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="w-5 h-5 fill-current pointer-events-none"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <rect
              className="origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 ease-out-back group-[[aria-pressed=true]]:translate-x-0 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[315deg]"
              y="7"
              width="9"
              height="2"
              rx="1"
            />
            <rect
              className="origin-center transition-all duration-300 ease-out-back-strong group-[[aria-pressed=true]]:rotate-45"
              y="7"
              width="16"
              height="2"
              rx="1"
            />
            <rect
              className="origin-center translate-y-[5px] transition-all duration-300 ease-out-back group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[135deg]"
              y="7"
              width="9"
              height="2"
              rx="1"
            />
          </svg>
        </button>
      </div>
    </>
  );

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 box-border pb-2 transition-[padding] duration-300 ease-out isolate",
        useScrolledStyle ? "pt-3 md:pt-4" : "pt-0",
        !useScrolledStyle && "px-0",
        useScrolledStyle && "px-3 md:px-4"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration.hero, ease: ease.gentle, delay: 0.1 }}
    >
      <div
        className={cn(
          "mx-auto w-full transition-[max-width,margin] duration-300 ease-out",
          useScrolledStyle ? "max-w-[1400px]" : "max-w-full"
        )}
      >
        <motion.div className={glassClass} style={glassStyle}>
          <div className="container-wide relative flex w-full items-center justify-between gap-4">
            {navContent}
          </div>
        </motion.div>

        {/* Rozwijane menu (mobile/tablet) */}
        <div
          id="mobile-menu"
          aria-hidden={!isMenuOpen}
          className={cn(
            "min-[880px]:hidden transition-[max-height] duration-300 ease-out",
            isMenuOpen
              ? "max-h-[min(85vh,520px)] overflow-y-auto overflow-x-hidden"
              : "max-h-0 overflow-hidden"
          )}
        >
          <div
            className="nav-glass nav-glass-scrolled nav-glass-dropdown border border-t-0 border-white/[0.09] px-6 py-5 pb-6"
            style={{
              borderRadius: useScrolledStyle ? "0 0 1rem 1rem" : "0",
              ...glassBlurNav,
            }}
          >
            <nav
              aria-label="Główna nawigacja"
              className="font-heading flex flex-col gap-2 text-base font-medium uppercase tracking-wider text-foreground"
            >
              <Link
                href="/kalkulator"
                onClick={() => setIsMenuOpen(false)}
                className="nav-cta-free-quote font-heading inline-flex w-full md:w-fit items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-transparent px-[18px] py-2.5 text-sm font-semibold uppercase tracking-[0.5px] text-foreground transition-all duration-200 ease-out hover:border-primary/40 hover:text-primary hover:bg-primary/5 mb-2"
              >
                {toUpper("Bezpłatna wycena")}
              </Link>
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/" || pathname === ""
                    : pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "relative py-3 no-underline transition-colors duration-200 hover:text-primary",
                      isActive && "text-primary"
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
    </motion.header>
  );
}
