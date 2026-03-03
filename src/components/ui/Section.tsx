import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types";

export function Section({
  id,
  as: Tag = "section",
  tight = false,
  firstOnPage = false,
  topGradient = false,
  noWrapper = false,
  children,
  className,
  ariaLabelledBy,
}: SectionProps) {
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
      className={cn(
        paddingClass,
        firstOnPage && "pt-navbar-first",
        topGradient && "relative",
        tight && "section-tight",
        className
      )}
      {...(ariaLabelledBy && { "aria-labelledby": ariaLabelledBy })}
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
