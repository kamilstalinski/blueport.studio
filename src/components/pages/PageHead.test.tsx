import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PageHead } from "@/components/pages/PageHead";

describe("PageHead", () => {
  it("renders one h1 and the lede, without back link or meta", () => {
    const html = renderToStaticMarkup(<PageHead title="Napisz, co chcesz zbudować." lede="Odpowiadamy w ciągu 24 godzin." />);

    expect(html).toContain('<section class="page-head bp-head">');
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("Napisz, co chcesz zbudować.");
    expect(html).toContain('<p class="lede">Odpowiadamy w ciągu 24 godzin.</p>');
    expect(html).not.toContain("page-back");
    expect(html).not.toContain('class="meta');
  });

  it("adds the back link above the title and the meta line under the lede", () => {
    const html = renderToStaticMarkup(
      <PageHead title="Vilmart Water Service" lede="Opis." back={{ href: "/realizacje", label: "Wszystkie realizacje" }} meta="vilmart.pl" />
    );

    expect(html).toContain('href="/realizacje"');
    expect(html).toContain("Wszystkie realizacje");
    expect(html.indexOf("page-back")).toBeLessThan(html.indexOf("<h1"));
    expect(html).toContain('<p class="meta bp-mono">vilmart.pl</p>');
  });
});
