import Link from "next/link";

import { PixelIcon } from "@/components/brand/PixelIcon";
import { InView } from "@/components/ui/InView";
import { cn } from "@/lib/utils";

interface PageHeadProps {
  title: string;
  titleWidth: "20ch" | "23ch";
  lede?: React.ReactNode;
  back?: { href: string; label: string };
  meta?: string;
}

/** The subpage opening from the spec: optional back link, one h1, lede and meta line. */
export function PageHead({ title, titleWidth, lede, back, meta }: PageHeadProps) {
  return (
    <section className="page-head">
      <div className="shell">
        {back && (
          <InView className="reveal">
            <Link href={back.href} className="link page-back">
              <PixelIcon name="arrow-left" /> {back.label}
            </Link>
          </InView>
        )}
        <InView className={cn("reveal", back && "page-title-gap")} lag={back ? 1 : 0}>
          <h1 className="d1" style={{ maxWidth: titleWidth }}>
            {title}
          </h1>
        </InView>
        {lede && (
          <InView className="reveal" lag={1}>
            <p className="lede">{lede}</p>
          </InView>
        )}
        {meta && (
          <InView className="reveal" lag={2}>
            <p className="meta page-meta">{meta}</p>
          </InView>
        )}
      </div>
    </section>
  );
}
