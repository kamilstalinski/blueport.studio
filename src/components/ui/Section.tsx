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
  children?: ReactNode;
  className?: string;
};

export function Section({
  id,
  as: Tag = "section",
  tight = false,
  firstOnPage = false,
  topGradient = false,
  children,
  className
}: SectionProps) {
  const basePadding = tight
    ? "py-12 md:py-16"
    : "py-16 md:py-24 lg:py-28";
  const firstClass = firstOnPage ? " pt-navbar-first" : "";
  const relativeClass = topGradient ? " relative" : "";
  return (
    <Tag
      id={id}
      className={`${basePadding}${firstClass}${relativeClass} ${className ?? ""}`.trim()}
    >
      {topGradient && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72"
          style={{ background: "linear-gradient(to bottom, #030B22, transparent)" }}
          aria-hidden
        />
      )}
      <Container className={topGradient ? "relative z-10" : undefined}>
        {children}
      </Container>
    </Tag>
  );
}
