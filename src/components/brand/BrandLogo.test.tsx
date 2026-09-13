import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BrandLogo } from "@/components/brand/BrandLogo";

describe("BrandLogo", () => {
  it("pairs a 34px Róg mark with the 84×34 pixel wordmark in the navbar", () => {
    const html = renderToStaticMarkup(<BrandLogo size="nav" />);
    expect(html).toContain('width="34" height="34"');
    expect(html).toContain('width="84" height="34"');
    expect(html.match(/<rect /g)).toHaveLength(4);
  });

  it("scales both parts to 51px in the footer", () => {
    const html = renderToStaticMarkup(<BrandLogo size="footer" />);
    expect(html).toContain('width="51" height="51"');
    expect(html).toContain('width="126" height="51"');
  });
});
