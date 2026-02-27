"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const aboutLinks = [
    { href: "/o-nas", label: "O nas" },
    { href: "/kontakt", label: "Kontakt" },
    { href: "/faq", label: "FAQ" },
    { href: "/polityka-prywatnosci", label: "Polityka prywatności" }
  ];

  const moreLinks = [
    { href: "/uslugi", label: "Usługi" },
    { href: "/realizacje", label: "Realizacje" },
    { href: "/proces", label: "Proces" },
    { href: "/regulamin", label: "Regulamin" }
  ];

  return (
    <footer
      id="site-footer"
      className="relative bg-gradient-to-b from-[var(--color-footer-from)] via-[var(--color-footer-via)] to-[var(--color-footer-to)]"
      style={{ paddingTop: "var(--space-10)", paddingBottom: "var(--space-5)" }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />
      <div className="container-wide relative py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-button bg-white/10 backdrop-blur-md border border-white/10">
                <Image
                  src="/logo%20v1.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </span>
              <span className="text-xl font-semibold lowercase tracking-tight text-white/90">
                blueport
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/90">
              BluePort Studio — nowoczesne strony i sklepy online dla małych firm. Lokalnie. Konkretnie. Z jasną wyceną.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              O nas
            </h3>
            <ul className="mt-6 flex flex-col gap-3">
              {aboutLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Więcej
            </h3>
            <ul className="mt-6 flex flex-col gap-3">
              {moreLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} BluePort Studio. Wszelkie prawa zastrzeżone.
          </p>
          <a
            href="mailto:kontakt@blueport.studio"
            className="text-sm text-white/90 transition-colors duration-300 hover:text-primary"
          >
            kontakt@blueport.studio
          </a>
        </div>
      </div>
    </footer>
  );
}
