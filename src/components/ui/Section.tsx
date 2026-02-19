import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  id?: string;
  as?: "section" | "div";
  tight?: boolean;
  /** Pierwsza sekcja na stronie – dodaje padding-top = wysokość navbara + sekcja */
  firstOnPage?: boolean;
  /** Gradient od góry (jak w hero) – pierwsza sekcja po hero na podstronach */
  topGradient?: boolean;
  /** Gdy true – sekcja bez wrappera Container; użyj container-narrow/container wewnątrz (section-padding-block) */
  noWrapper?: boolean;
  children?: ReactNode;
  className?: string;
};

export function Section({
  id,
  as: Tag = "section",
  tight = false,
  firstOnPage = false,
  topGradient = false,
  noWrapper = false,
  children,
  className
}: SectionProps) {
  const firstClass = firstOnPage ? " pt-navbar-first" : "";
  const relativeClass = topGradient ? " relative" : "";
  const tightClass = tight ? " section-tight" : "";
  const paddingClass = noWrapper ? "section-padding-block" : "section-padding";
  const content = noWrapper ? (
    children
  ) : (
    <Container noPadding className={topGradient ? "relative z-10" : undefined}>
      {children}
    </Container>
  );
  return (
    <Tag
      id={id}
      className={`${paddingClass}${firstClass}${relativeClass}${tightClass} ${className ?? ""}`.trim()}
    >
      {topGradient && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72"
          style={{ background: "linear-gradient(to bottom, var(--color-hero-fade), transparent)" }}
          aria-hidden
        />
      )}
      {content}
    </Tag>
  );
}
