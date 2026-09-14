import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { InView } from "@/components/ui/InView";

describe("InView", () => {
  it("renders hidden-until-seen markup on the server", () => {
    const html = renderToStaticMarkup(
      <InView className="reveal" lag={2}>
        <p>treść</p>
      </InView>,
    );
    expect(html).toContain('class="reveal"');
    expect(html).toContain('data-lag="2"');
    expect(html).not.toContain("data-in");
    expect(html).toContain("<p>treść</p>");
  });

  it("hides decorative wrappers from assistive technology", () => {
    const html = renderToStaticMarkup(<InView className="px-deco" decorative />);
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain("data-lag");
  });
});
