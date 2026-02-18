"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("common");

  const aboutLinks = [
    { href: "/o-nas", label: t("nav.about") },
    { href: "/kontakt", label: t("nav.contact") },
    { href: "/faq", label: "FAQ" },
    { href: "/polityka-prywatnosci", label: t("footer.privacy") }
  ];

  const moreLinks = [
    { href: "/uslugi", label: t("nav.services") },
    { href: "/realizacje", label: t("nav.caseStudies") },
    { href: "/proces", label: t("nav.process") },
    { href: "/regulamin", label: t("footer.terms") }
  ];

  return (
    <footer
      id="site-footer"
      className="relative bg-gradient-to-b from-[#040326] via-[#0B0F2A] to-[#040326] pt-20 pb-10"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-button bg-white/10 backdrop-blur-md border border-white/10 text-sm font-semibold text-white/90">
                BP
              </span>
              <span className="text-xl font-semibold lowercase tracking-tight text-white/90">
                blueport
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/90">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              {t("footer.about")}
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
              {t("footer.more")}
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
            © {new Date().getFullYear()} BluePort Studio. {t("footer.copyright")}
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
