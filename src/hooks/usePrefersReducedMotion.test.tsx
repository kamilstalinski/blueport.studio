import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function Probe() {
  return <span>{String(usePrefersReducedMotion())}</span>;
}

describe("usePrefersReducedMotion", () => {
  it("renders false on the server so hydration always matches", () => {
    expect(renderToStaticMarkup(<Probe />)).toBe("<span>false</span>");
  });
});
