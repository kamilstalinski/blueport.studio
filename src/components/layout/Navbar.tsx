"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Arrow } from "@/components/ui/Arrow";
import { isNavActive } from "@/lib/navigation";

const NAV_LINKS = [
  { href: "/realizacje", label: "Realizacje" },
  { href: "/cennik", label: "Cennik" },
  { href: "/proces", label: "Proces" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function Navbar() {
  const pathname = usePathname() ?? "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      /* the links are about to be hidden: hand focus back to the control that opened them */
      burgerRef.current?.focus();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);

  const links = NAV_LINKS.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      aria-current={isNavActive(pathname, link.href) ? "page" : undefined}
      onClick={closeMenu}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="bp-top bp-scope">
      <div className="bp-shell">
        <Link href="/" className="bp-brand" aria-label="blueport.studio, strona główna" translate="no" onClick={closeMenu}>
          <BrandLogo size="footer" />
        </Link>
        <nav className="bp-nav" aria-label="Główna nawigacja">
          {links}
        </nav>
        <div className="bp-act">
          <Link className="bp-btn-sq" href="/kalkulator" onClick={closeMenu}>
            Sprawdź koszt <Arrow />
          </Link>
        </div>
        <button
          ref={burgerRef}
          type="button"
          className="bp-menu-btn"
          aria-expanded={isMenuOpen}
          aria-controls="bp-sheet"
          aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          onClick={toggleMenu}
        >
          <svg viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
            {isMenuOpen ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2 6h14M2 12h14" />}
          </svg>
        </button>
      </div>
      <nav id="bp-sheet" className="bp-sheet" aria-label="Menu" hidden={!isMenuOpen}>
        {links}
      </nav>
    </header>
  );
}
