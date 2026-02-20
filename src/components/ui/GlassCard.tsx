"use client";

import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";
import { cn } from "@/lib/utils";
import type { GlassCardProps } from "@/types";

export function GlassCard({
  children,
  className,
  blurVariant = "default",
  as: Tag = "div",
}: GlassCardProps) {
  const blurStyle = useGlassBlurStyle(blurVariant);
  return (
    <Tag className={cn(className)} style={blurStyle}>
      {children}
    </Tag>
  );
}
