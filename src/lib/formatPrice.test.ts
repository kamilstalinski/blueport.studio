import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/formatPrice";

describe("formatPrice", () => {
  it("groups thousands with a non-breaking space", () => {
    expect(formatPrice(2500)).toBe("2 500");
    expect(formatPrice(12000)).toBe("12 000");
  });

  it("leaves small amounts untouched and rounds to whole złoty", () => {
    expect(formatPrice(950)).toBe("950");
    expect(formatPrice(3899.6)).toBe("3 900");
  });
});
