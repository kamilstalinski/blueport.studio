import { describe, expect, it } from "vitest";
import { framePan } from "@/lib/framePan";

describe("framePan", () => {
  it("scrolls the hidden part of a tall page at 260px per second", () => {
    expect(framePan(400, 390, 820, 2803)).toEqual({ shift: -977, seconds: 3.8 });
  });

  it("does nothing when the page almost fits the pane", () => {
    expect(framePan(400, 390, 820, 780)).toBeNull();
  });

  it("caps very long pages at 26 seconds", () => {
    expect(framePan(400, 390, 820, 40000)?.seconds).toBe(26);
  });
});
