"use client";

import { cn } from "@/lib/utils";

type IconBoxProps = {
  emoji: string;
  ariaHidden?: boolean;
  className?: string;
};

export function IconBox({
  emoji,
  ariaHidden = true,
  className,
}: IconBoxProps) {
  return (
    <div className={cn("step-icon", className)} aria-hidden={ariaHidden}>
      <span className="select-none">{emoji}</span>
    </div>
  );
}
