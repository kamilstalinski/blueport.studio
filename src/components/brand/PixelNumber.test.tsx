import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PixelNumber } from "@/components/brand/PixelNumber";

describe("PixelNumber", () => {
  it("scales the numeral grid and splits ink from accent", () => {
    const html = renderToStaticMarkup(<PixelNumber value="24 h" />);
    expect(html).toContain('viewBox="0 0 20 7"');
    expect(html).toContain('width="100" height="35"');
    expect(html).toContain('class="n-ink"');
    expect(html).toContain('class="n-acc"');
  });
});
