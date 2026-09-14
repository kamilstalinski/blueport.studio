import { describe, expect, it } from "vitest";
import { PX_ICONS } from "@/lib/pixel/glyphs";

describe("PX_ICONS", () => {
  it("includes the subpage icons from the spec", () => {
    expect(PX_ICONS["arrow-left"]).toEqual(["...X...", "..X....", ".X.....", "XXXXXXX", ".X.....", "..X....", "...X..."]);
    expect(PX_ICONS.minus).toEqual([".......", ".......", ".......", ".XXXXX.", ".......", ".......", "......."]);
    expect(PX_ICONS.plus).toEqual([".......", "...X...", "...X...", ".XXXXX.", "...X...", "...X...", "......."]);
    expect(PX_ICONS.warning).toEqual(["XXXXXXX", "XXX.XXX", "XXX.XXX", "XXX.XXX", "XXXXXXX", "XXX.XXX", "XXXXXXX"]);
    expect(PX_ICONS.done).toEqual(["XXXXXXX", "XXXXXX.", "XXXXX.X", "X.XX.XX", "XX..XXX", "XXX.XXX", "XXXXXXX"]);
  });

  it("keeps every icon a solid rectangle of cells", () => {
    for (const rows of Object.values(PX_ICONS)) {
      const width = rows[0].length;
      for (const row of rows) {
        expect(row).toHaveLength(width);
        expect(row).toMatch(/^[.X]+$/);
      }
    }
  });
});
