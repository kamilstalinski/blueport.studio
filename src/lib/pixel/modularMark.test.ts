import { describe, expect, it } from "vitest";
import { markRects, markViewBox, ROG_MARK } from "@/lib/pixel/modularMark";

describe("ROG_MARK", () => {
  it("lays three modules and a small accent in the open corner", () => {
    const rects = markRects(ROG_MARK);
    expect(rects).toHaveLength(4);
    expect(rects[0]).toEqual({ x: 8, y: 8, width: 84, height: 84, tone: "t1" });
    expect(rects[3]).toEqual({ x: 158, y: 8, width: 34, height: 34, tone: "t2" });
  });

  it("fits a 200×200 view box", () => {
    expect(markViewBox(ROG_MARK)).toBe("0 0 200 200");
  });
});
