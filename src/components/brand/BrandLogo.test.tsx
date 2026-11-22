import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { LOGO_MARK, LOGO_RATIO, LOGO_SUB, LOGO_WORD, SIGNET_MARK } from "@/lib/brand/logo";

describe("BrandLogo", () => {
  it("shows the bp signet with its single accent disc on a tile in the navbar", () => {
    const html = renderToStaticMarkup(<BrandLogo size="nav" />);
    expect(html).toMatch(/^<span class="brand-signet">/);
    expect(html.match(/class="logo-mark"/g)).toHaveLength(SIGNET_MARK.length);
    expect(html.match(/class="logo-accent"/g)).toHaveLength(1);
    expect(html).not.toContain("logo-word");
  });

  it("shows the full lockup in the footer, keeping its aspect ratio", () => {
    const html = renderToStaticMarkup(<BrandLogo size="footer" />);
    expect(html).toContain(`width="${Math.round(38 * LOGO_RATIO)}" height="38"`);
    expect(html.match(/class="logo-mark"/g)).toHaveLength(LOGO_MARK.length);
    expect(html.match(/class="logo-accent"/g)).toHaveLength(1);
    expect(html.match(/class="logo-word"/g)).toHaveLength(LOGO_WORD.length);
    expect(html.match(/class="logo-sub"/g)).toHaveLength(LOGO_SUB.length);
  });
});
