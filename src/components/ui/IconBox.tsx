"use client";

/**
 * Icon container matching the homepage "Proces" section (.step-icon) exactly.
 * Single source of truth: same wrapper, background, size, radius. Only emoji differs.
 */
export function IconBox({
  emoji,
  ariaHidden = true,
  className = "",
}: {
  emoji: string;
  ariaHidden?: boolean;
  className?: string;
}) {
  return (
    <div className={`step-icon ${className}`.trim()} aria-hidden={ariaHidden}>
      <span className="select-none">{emoji}</span>
    </div>
  );
}
