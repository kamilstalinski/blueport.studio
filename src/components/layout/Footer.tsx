import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";

const FOOTER_COLUMNS = [
  {
    title: "Oferta",
    links: [
      { href: "/cennik", label: "Cennik" },
      { href: "/oferta", label: "Oferta" },
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
    <footer id="site-footer" className="bp-foot bp-scope">
      <div className="bp-shell">
        <div className="bp-grid">
          <div>
            <Link href="/" className="bp-brand" aria-label="blueport.studio, strona główna" translate="no">
              <BrandLogo size="footer" />
            </Link>
            <p>Studio webowe ze Szczecina. Strony i sklepy dla małych firm w całej Polsce.</p>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="bp-foot-h">{column.title}</h2>
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
            <h2 className="bp-foot-h">Kontakt</h2>
            <ul>
              <li><a className="bp-mono" href="mailto:kontakt@blueport.studio" translate="no">kontakt@blueport.studio</a></li>
              <li><a className="bp-mono" href="tel:+48534287233">+48&nbsp;534&nbsp;287&nbsp;233</a></li>
              <li>Szczecin i zdalnie</li>
            </ul>
          </div>
        </div>
        <div className="bp-legal">
          <span>© {new Date().getFullYear()} Blueport Studio</span>
          <span>
            <Link href="/polityka-prywatnosci">Polityka prywatności</Link> · <Link href="/regulamin">Regulamin</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
