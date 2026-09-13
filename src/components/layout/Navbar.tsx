"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { PixelIcon } from "@/components/brand/PixelIcon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { isNavActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/realizacje", label: "Realizacje" },
  { href: "/cennik", label: "Cennik" },
  { href: "/proces", label: "Proces" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function Navbar() {
  const pathname = usePathname() ?? "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const markRef = useRef<HTMLLIElement>(null);

  /* the square under the links: follows the hovered link, rests on the current one */
  const placeMark = useCallback((target: HTMLElement | null) => {
    const mark = markRef.current;
    if (!mark) return;
    if (!target) {
      mark.style.setProperty("--s", "0");
      mark.style.setProperty("--o", "0");
      return;
    }
    const x = target.offsetLeft + target.offsetWidth / 2 - mark.offsetWidth / 2;
    mark.style.setProperty("--x", `${Math.round(x)}px`);
    mark.style.setProperty("--s", "1");
    mark.style.setProperty("--o", "1");
  }, []);

  const placeMarkOnCurrent = useCallback(() => {
    placeMark(listRef.current?.querySelector<HTMLElement>('a[aria-current="page"]') ?? null);
  }, [placeMark]);

  useEffect(() => {
    placeMarkOnCurrent();
    window.addEventListener("resize", placeMarkOnCurrent);
    return () => window.removeEventListener("resize", placeMarkOnCurrent);
  }, [pathname, placeMarkOnCurrent]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const handleLinkEnter = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (event.pointerType !== "mouse") return;
      listRef.current?.classList.add("preview");
      placeMark(event.currentTarget);
    },
    [placeMark],
  );

  const handleListLeave = useCallback(() => {
    listRef.current?.classList.remove("preview");
    placeMarkOnCurrent();
  }, [placeMarkOnCurrent]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);

  return (
    <header className="nav">
      <div className="shell nav-in">
        <Link href="/" className="brand" aria-label="blueport.studio, strona główna" onClick={closeMenu}>
          <BrandLogo size="nav" />
        </Link>
        <div className="nav-right">
          <nav aria-label="Główna nawigacja">
            <ul id="nav-links" ref={listRef} className={cn("nav-links", isMenuOpen && "open")} onPointerLeave={handleListLeave}>
              <li ref={markRef} className="nav-mark" aria-hidden="true" />
              {NAV_LINKS.map((link) => {
                const isActive = isNavActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onPointerEnter={handleLinkEnter}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <span className="nav-sep" aria-hidden="true" />
          <ButtonLink href="/kalkulator" withArrow className="nav-cta">
            Sprawdź koszt
          </ButtonLink>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={isMenuOpen}
            aria-controls="nav-links"
            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
            onClick={toggleMenu}
          >
            <PixelIcon name="list" />
          </button>
        </div>
      </div>
    </header>
  );
}
