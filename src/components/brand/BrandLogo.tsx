import {
  LOGO_ACCENT,
  LOGO_MARK,
  LOGO_RATIO,
  LOGO_SUB,
  LOGO_VIEWBOX,
  LOGO_WORD,
  SIGNET_ACCENT,
  SIGNET_MARK,
  SIGNET_VIEWBOX,
} from "@/lib/brand/logo";

const FOOTER_HEIGHT = 38;
const SIGNET_SIZE = 26;

interface BrandLogoProps {
  /** nav: the "bp" signet on a tile; footer: the full "blueport studio" lockup */
  size: "nav" | "footer";
}

export function BrandLogo({ size }: BrandLogoProps) {
  if (size === "nav") {
    return (
      <span className="brand-signet">
        <svg viewBox={SIGNET_VIEWBOX} width={SIGNET_SIZE} height={SIGNET_SIZE} fillRule="evenodd" aria-hidden="true">
          {SIGNET_MARK.map((d) => (
            <path key={d} className="logo-mark" d={d} />
          ))}
          <path className="logo-accent" d={SIGNET_ACCENT} />
        </svg>
      </span>
    );
  }

  return (
    <svg
      className="brand-logo"
      viewBox={LOGO_VIEWBOX}
      width={Math.round(FOOTER_HEIGHT * LOGO_RATIO)}
      height={FOOTER_HEIGHT}
      fillRule="evenodd"
      aria-hidden="true"
    >
      {LOGO_MARK.map((d) => (
        <path key={d} className="logo-mark" d={d} />
      ))}
      <path className="logo-accent" d={LOGO_ACCENT} />
      {LOGO_WORD.map((d) => (
        <path key={d} className="logo-word" fillRule="nonzero" d={d} />
      ))}
      {LOGO_SUB.map((d) => (
        <path key={d} className="logo-sub" fillRule="nonzero" d={d} />
      ))}
    </svg>
  );
}
