import Link from "next/link";
import { PixelIcon } from "@/components/brand/PixelIcon";
import { cn } from "@/lib/utils";

const VARIANT_CLASS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
} as const;

interface ButtonLinkProps {
  href: string;
  variant?: keyof typeof VARIANT_CLASS;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({ href, variant = "primary", withArrow = false, className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn("btn", VARIANT_CLASS[variant], className)}>
      {children}
      {withArrow && <PixelIcon name="arrow-right" />}
    </Link>
  );
}
