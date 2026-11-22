import Link from "next/link";

import { Arrow } from "@/components/ui/Arrow";

interface PageHeadProps {
  title: string;
  lede?: React.ReactNode;
  back?: { href: string; label: string };
  meta?: string;
}

/** The subpage opening on the grid: optional back link, one h1 over three columns, lede and a mono meta line. */
export function PageHead({ title, lede, back, meta }: PageHeadProps) {
  return (
    <section className="page-head bp-head">
      <div className="bp-shell bp-grid">
        <div className="bp-head-copy">
          {back && (
            <Link href={back.href} className="page-back bp-mono">
              <Arrow /> {back.label}
            </Link>
          )}
          <h1>{title}</h1>
          {lede && <p className="lede">{lede}</p>}
          {meta && <p className="meta bp-mono">{meta}</p>}
        </div>
      </div>
    </section>
  );
}
