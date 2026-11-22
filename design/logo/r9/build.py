"""Round 9: the bp mark redrawn for the Payload-like site (square grid, straight cuts, one orange accent).
All shapes are disjoint rectangles (no overlapping even-odd fills); the one curve is the orange half-disc carried
over from the round mark. Run: python3 build.py -> b-okno.svg, e-sciana.svg, f-faza.svg
"""
import os

OUT = os.path.dirname(os.path.abspath(__file__))
INK, ACC = "#0B1B2B", "#FF5A1F"


def rect(x, y, w, h):
    return f"M{x} {y}h{w}v{h}h{-w}Z"


def half_disc(cx, cy, r):
    return f"M{cx} {cy - r}A{r} {r} 0 0 1 {cx} {cy + r}Z"


def poly(*pts):
    return "M" + " L".join(f"{x} {y}" for x, y in pts) + "Z"


# B · Okno: square b and p side by side, each one outline with a square counter; b's counter holds the orange
#     half-disc (the old mark's light).
def concept_b():
    t, H, A, bw, gap = 30, 104, 44, 88, 12
    y0 = (256 - (H + 2 * A)) // 2
    xh, bl = y0 + A, y0 + A + H
    x0 = (256 - (2 * bw + gap)) // 2
    px = x0 + bw + gap
    b = poly((x0, y0), (x0 + t, y0), (x0 + t, xh), (x0 + bw, xh), (x0 + bw, bl), (x0, bl)) + rect(x0 + t, xh + t, bw - 2 * t, H - 2 * t)
    p = poly((px, xh), (px + bw, xh), (px + bw, bl), (px + t, bl), (px + t, bl + A), (px, bl + A)) + rect(px + t, xh + t, bw - 2 * t, H - 2 * t)
    return [b, p], [half_disc(x0 + t, xh + H // 2, (H - 2 * t) // 2)], True


def ligature(k=0):
    """The b-p ligature: b's right wall is p's stem. k > 0 cuts b's lower-left and p's upper-right corners at 45°."""
    t, H, A, c = 30, 104, 44, 58
    W = 3 * t + 2 * c
    y0 = (256 - (H + 2 * A)) // 2
    xh, bl = y0 + A, y0 + A + H
    x0 = (256 - W) // 2
    sx = x0 + t + c
    pts = [(x0, y0), (x0 + t, y0), (x0 + t, xh)]
    pts += [(x0 + W - k, xh), (x0 + W, xh + k)] if k else [(x0 + W, xh)]
    pts += [(x0 + W, bl), (sx + t, bl), (sx + t, bl + A), (sx, bl + A), (sx, bl)]
    pts += [(x0 + k, bl), (x0, bl - k)] if k else [(x0, bl)]
    outline = poly(*pts) + rect(x0 + t, xh + t, c, H - 2 * t) + rect(sx + t, xh + t, c, H - 2 * t)
    return [outline], [half_disc(x0 + t, xh + H // 2, (H - 2 * t) // 2)], True


# E · Wspólna ściana: the plug-and-socket idea of the round mark, squared: b's right wall drops below the
#     baseline as p's stem. One outline, two square counters, the half-disc in b's counter.
def concept_e():
    return ligature(0)


# F · Faza: the same ligature with two corners cut at 45°, b's lower-left and p's upper-right: a turning balance
#     and the one slanted cut of the site's light, kept inside the mark.
def concept_f():
    return ligature(26)


CONCEPTS = [("b-okno", concept_b), ("e-sciana", concept_e), ("f-faza", concept_f)]


def markup(ink, acc, evenodd=False, ink_col=INK, acc_col=ACC):
    rule = ' fill-rule="evenodd"' if evenodd else ""
    return "".join(f'<path fill="{ink_col}"{rule} d="{d}"/>' for d in ink) + "".join(f'<path fill="{acc_col}" d="{d}"/>' for d in acc)


if __name__ == "__main__":
    for name in os.listdir(OUT):
        if name.endswith(".svg"):
            os.remove(os.path.join(OUT, name))
    for name, fn in CONCEPTS:
        out = fn()
        ink, acc, eo = out[0], out[1], (out[2] if len(out) > 2 else False)
        open(os.path.join(OUT, f"{name}.svg"), "w").write(
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256"><title>blueport studio</title>{markup(ink, acc, eo)}</svg>\n')
    print("ok")
