import { cn } from "@/lib/utils";
import type { ContainerProps, ContainerVariant } from "@/types";

const variantClass: Record<ContainerVariant, string> = {
  narrow: "container-narrow",
  default: "container",
  wide: "container-wide",
};

export function Container({
  children,
  className,
  variant = "default",
  noPadding,
}: ContainerProps) {
  return (
    <div
      className={cn(variantClass[variant], noPadding && "!px-0", className)}
    >
      {children}
    </div>
  );
}
