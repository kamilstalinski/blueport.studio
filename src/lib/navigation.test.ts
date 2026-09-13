import { describe, expect, it } from "vitest";
import { isNavActive } from "@/lib/navigation";

describe("isNavActive", () => {
  it("matches a section and its children", () => {
    expect(isNavActive("/realizacje", "/realizacje")).toBe(true);
    expect(isNavActive("/realizacje/abcmosty", "/realizacje")).toBe(true);
  });

  it("does not match a sibling that shares a prefix", () => {
    expect(isNavActive("/realizacjex", "/realizacje")).toBe(false);
  });

  it("treats an empty pathname as home", () => {
    expect(isNavActive("", "/")).toBe(true);
    expect(isNavActive("/kontakt", "/")).toBe(false);
  });
});
