import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";

const FOOTER_COLUMNS = [
  {
    title: "Oferta",
    links: [
      { href: "/uslugi", label: "Usługi" },
      { href: "/cennik", label: "Cennik" },
      { href: "/kalkulator", label: "Kalkulator wyceny" },
      { href: "/realizacje", label: "Realizacje" },
      { href: "/proces", label: "Proces" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/o-nas", label: "O nas" },
      { href: "/kontakt", label: "Kontakt" },
      { href: "/faq", label: "FAQ" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer id="site-footer" className="foot">
      <div className="shell">
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand" aria-label="blueport.studio, strona główna">
              <BrandLogo size="footer" />
            </Link>
            <p className="foot-about">Studio webowe ze Szczecina. Strony i sklepy dla małych firm, w całej Polsce.</p>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="foot-title">{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="foot-title">Kontakt</h2>
            <ul>
              <li><a href="mailto:kontakt@blueport.studio">kontakt@blueport.studio</a></li>
              <li><a href="tel:+48534287233">+48 534 287 233</a></li>
              <li><span>Szczecin + zdalnie</span></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Blueport Studio</span>
          <span className="foot-legal">
            <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
            <span aria-hidden="true">·</span>
            <Link href="/regulamin">Regulamin</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
