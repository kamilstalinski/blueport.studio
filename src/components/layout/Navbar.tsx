"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Arrow } from "@/components/ui/Arrow";
import { SERVICES, priceLabel } from "@/constants/services";
import { isNavActive } from "@/lib/navigation";

const NAV_LINKS = [
  { href: "/oferta", label: "Oferta" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/proces", label: "Proces" },
  { href: "/o-nas", label: "O nas" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

const SHEET_LINKS = [...NAV_LINKS, { href: "/cennik", label: "Cennik" }, { href: "/faq", label: "FAQ" }] as const;

const PRICE_LINKS = [
  { href: "/cennik#price-table-title", label: "Porównanie pakietów" },
  { href: "/cennik#addons-title", label: "Dodatki i ich ceny" },
  { href: "/faq", label: "Pytania o cenę i umowę" },
  { href: "/cennik", label: "Cennik" },
] as const;

/* the panel opens after the pointer has rested on its word this long (taste-skill nav-mega) */
const OPEN_DELAY_MS = 150;

/** One fixed, opaque bar on the page grid. "Oferta" opens a full-width flat panel: the four services, the price pages
 *  and one card that asks for a call. Below 1024px a full-screen sheet. */
export function Navbar() {
  const pathname = usePathname() ?? "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<number>(0);

  const closeAll = useCallback(() => {
    window.clearTimeout(openTimer.current);
    setIsMenuOpen(false);
    setIsPanelOpen(false);
  }, []);

  useEffect(() => {
    if (!isMenuOpen && !isPanelOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (isMenuOpen) burgerRef.current?.focus(); /* the links are about to be hidden: hand focus back to the control that opened them */
      closeAll();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, isPanelOpen, closeAll]);

  useEffect(() => closeAll, [pathname, closeAll]);

  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);
  const openPanelSoon = () => {
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setIsPanelOpen(true), OPEN_DELAY_MS);
  };
  const closePanel = () => {
    window.clearTimeout(openTimer.current);
    setIsPanelOpen(false);
  };
  const leaveItem = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closePanel();
  };

  const current = (href: string) => (isNavActive(pathname, href) ? "page" : undefined);

  return (
    <header className="bp-top bp-scope" onMouseLeave={closePanel}>
      <div className="bp-shell">
        <Link href="/" className="bp-brand" aria-label="blueport.studio, strona główna" translate="no" onClick={closeAll}>
          <BrandLogo size="footer" />
        </Link>
        <nav className="bp-nav" aria-label="Główna nawigacja">
          {NAV_LINKS.map((link) =>
            link.href === "/oferta" ? (
              <div key={link.href} className="bp-nav-item" onMouseEnter={openPanelSoon} onFocus={() => setIsPanelOpen(true)} onBlur={leaveItem}>
                <Link href={link.href} aria-current={current(link.href)} data-open={isPanelOpen ? "" : undefined} onClick={closeAll}>
                  {link.label}
                </Link>
                <div className="bp-mega" data-open={isPanelOpen ? "" : undefined}>
                  <div className="bp-shell bp-mega-grid">
                    <div className="bp-mega-col">
                      <p className="bp-mono">Usługi</p>
                      <ul>
                        {SERVICES.map((service) => (
                          <li key={service.slug}>
                            <Link href={`/oferta/${service.slug}`} onClick={closeAll}>
                              <span>{service.name}</span>
                              <span className="bp-mono">{priceLabel(service)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bp-mega-col">
                      <p className="bp-mono">Ceny</p>
                      <ul>
                        {PRICE_LINKS.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} onClick={closeAll}>
                              <span>{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bp-mega-card">
                      <p>Nie wiesz, od czego zacząć? Odpowiadamy w 24 godziny w dni robocze, a rozmowa trwa około 30 minut.</p>
                      <div className="bp-rows-act">
                        <Link className="bp-row-act bp-row-act--primary" href="/kontakt" onClick={closeAll}>
                          Umów rozmowę <Arrow />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link key={link.href} href={link.href} aria-current={current(link.href)} onMouseEnter={closePanel} onClick={closeAll}>
                {link.label}
              </Link>
            ),
          )}
        </nav>
        <div className="bp-act">
          <Link className="bp-btn-sq" href="/kontakt" onClick={closeAll}>
            Umów rozmowę <Arrow />
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
        {SHEET_LINKS.map((link) => (
          <Link key={link.href} href={link.href} aria-current={current(link.href)} onClick={closeAll}>
            {link.label}
            <Arrow />
          </Link>
        ))}
      </nav>
    </header>
  );
}
