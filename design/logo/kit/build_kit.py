"""blueport studio — final logo kit ("Gniazdo", palette Kobalt / Grafit / Sygnał).
Run from this folder: python3 build_kit.py  -> svg/ (masters + variants).
Geometry is computed; every lockup uses one translate+scale wrapper per part.
"""
import math, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "r6"))
import build as r6  # noqa: E402  (shared number formatting)
import json  # noqa: E402

r6.WM["asc"] = 40
OUT = os.path.join(HERE, "svg")
os.makedirs(OUT, exist_ok=True)

KOBALT, GRAFIT, SYGNAL, INK, PAPER = "#2F55D4", "#1E2633", "#FF5A1F", "#0A0F17", "#EEF1F5"
f = r6.f

# ── Symbol ──────────────────────────────────────────────────────────────────────────────────────
R, T, ASC = 66, 25, 18  # t/R = 0.379, the stroke-to-radius of the 'oe' reference (63/168)
OVERSHOOT = 0  # p's flat stem top level with the ring top: the 2 u optical drop read as a sunken stem


def symbol(t=T, R=R, asc=ASC):
    """Local coords: bbox (0,0)-(3R, 2R+2asc). Returns {part: d}; 'disc' is the accent part."""
    r = R - t
    c1, cy = R, asc + R
    x0 = 0
    px, c2 = c1 + r, c1 + r + t
    return {
        "b-stem": f"M{f(x0)} 0 H{f(x0+t)} V{f(cy)} H{f(x0)} Z",
        "b-ring": f"M{f(c1)} {f(cy-R)} A{R} {R} 0 0 0 {f(c1)} {f(cy+R)} V{f(cy+r)} A{r} {r} 0 0 1 {f(c1)} {f(cy-r)} Z",
        "disc": f"M{f(c1)} {f(cy-r)} A{r} {r} 0 0 1 {f(c1)} {f(cy+r)} Z",
        "p-stem": f"M{f(px)} {f(cy-R+OVERSHOOT)} H{f(c2+1)} V{f(cy+R+asc)} H{f(px)} Z",
        "p-ring": f"M{f(c2)} {f(cy-R)} A{R} {R} 0 0 1 {f(c2)} {f(cy+R)} V{f(cy+r)} A{r} {r} 0 0 0 {f(c2)} {f(cy-r)} Z",
    }, 3 * R, 2 * R + 2 * asc


def sym_paths(parts, ink, accent):
    return "".join(f'<path fill="{accent if k == "disc" else ink}" d="{d}"/>' for k, d in parts.items())


# ── "studio": same primitives, lighter stroke ───────────────────────────────────────────────────
def studio(Rs=56, ts=24, asc=40, track=12):
    X, rs = 2 * Rs, Rs - ts
    ps, x = [], 0.0
    rect = lambda a, b, c, d: f"M{f(a)} {f(b)} H{f(c)} V{f(d)} H{f(a)} Z"
    # s — two stacked half rings with flat terminals
    a = (X - ts) / 4
    o, i = a + ts / 2, a - ts / 2
    cx = x + o
    uy, ly = -X + ts / 2 + a, -ts / 2 - a
    ps.append(f"M{f(cx)} {f(uy-o)} A{f(o)} {f(o)} 0 0 0 {f(cx)} {f(uy+o)} V{f(uy+i)} A{f(i)} {f(i)} 0 0 1 {f(cx)} {f(uy-i)} Z")
    ps.append(f"M{f(cx)} {f(ly-o)} A{f(o)} {f(o)} 0 0 1 {f(cx)} {f(ly+o)} V{f(ly+i)} A{f(i)} {f(i)} 0 0 0 {f(cx)} {f(ly-i)} Z")
    ps.append(rect(cx - 1, -X, cx + o, -X + ts))
    ps.append(rect(cx - o, -ts, cx + 1, 0))
    x += 2 * o + track
    # t
    ps.append(rect(x + 10, -X - 28, x + 10 + ts, 0)); ps.append(rect(x, -X, x + 10 + ts + 20, -X + ts * 0.85))
    x += 10 + ts + 20 + track
    # u
    ps.append(rect(x, -X, x + ts, -Rs + 1)); ps.append(rect(x + X - ts, -X, x + X, 0))
    ps.append(f"M{f(x)} {f(-Rs)} A{Rs} {Rs} 0 0 0 {f(x+X)} {f(-Rs)} H{f(x+X-ts)} A{rs} {rs} 0 0 1 {f(x+ts)} {f(-Rs)} Z")
    x += X + track
    # d — left half ring + stem on the right
    c = x + Rs
    ps.append(f"M{f(c)} {f(-X)} A{Rs} {Rs} 0 0 0 {f(c)} 0 V{f(-ts)} A{rs} {rs} 0 0 1 {f(c)} {f(-X+ts)} Z")
    ps.append(rect(c - 1, -X - asc, c + ts, 0))
    x = c + ts + track
    # i — stem + round dot
    ps.append(rect(x, -X, x + ts, 0))
    dr = ts / 2
    dy = -X - 14 - dr
    ps.append(f"M{f(x)} {f(dy)} A{f(dr)} {f(dr)} 0 0 1 {f(x+ts)} {f(dy)} A{f(dr)} {f(dr)} 0 0 1 {f(x)} {f(dy)} Z")
    x += ts + track
    # o
    c = x + Rs
    ps.append(f"M{f(c)} {f(-X)} A{Rs} {Rs} 0 0 1 {f(c)} 0 A{Rs} {Rs} 0 0 1 {f(c)} {f(-X)} Z M{f(c)} {f(-X+ts)} A{rs} {rs} 0 0 0 {f(c)} {f(-ts)} A{rs} {rs} 0 0 0 {f(c)} {f(-X+ts)} Z")
    x += X
    return ps, x


# the wordmark: "blueport" Host Grotesk 600 + "studio" Host Grotesk 400, outlined by outline-wordmark.mjs (OFL)
WMJ = json.load(open(os.path.join(HERE, "wordmark.json")))
WM_XH = WMJ["blueport"]["xHeight"]
WM_ASC, WM_DESC = WMJ["blueport"]["ascender"], WMJ["blueport"]["descender"]
WM_GAP = WMJ["space"]                                   # one word space between "blueport" and "studio"
WM_W = WMJ["blueport"]["width"] + WM_GAP + WMJ["studioLine"]["width"]


GLYPH_ASC, GLYPH_DESC = 72, 22   # Host Grotesk: b/l/t/d reach 72 u above the baseline, p 22 u below (at 100 u/em)
LINE = 86                         # baseline to baseline: p's tail (x 183-195) sits over the bowl of the d, 13 u clear


def stacked_scale(height):
    """Scale so the two lines fill `height`: top of "b" to the baseline of "studio"."""
    return height / (GLYPH_ASC + LINE)


def stacked_words(word_col, sub_col):
    """"blueport" over "studio" (tracked to the same ink width), sharing both edges; origin at the top of the ascenders."""
    bp = g(0, GLYPH_ASC, 1, f'<path fill="{word_col}" d="{WMJ["blueport"]["d"]}"/>')
    st = g(0, GLYPH_ASC + LINE, 1, f'<path fill="{sub_col}" d="{WMJ["studio"]["d"]}"/>')
    return bp + st


def word_paths(word_col, sub_col):
    """Both words at the font's own size (100 u/em), baseline y=0, starting at x=0."""
    bp = f'<path fill="{word_col}" d="{WMJ["blueport"]["d"]}"/>'
    st = g(WMJ["blueport"]["width"] + WM_GAP, 0, 1, f'<path fill="{sub_col}" d="{WMJ["studioLine"]["d"]}"/>')
    return bp + st


def g(x, y, k, inner):
    return f'<g transform="translate({f(x)} {f(y)}) scale({f(k)})">{inner}</g>'


def doc(w, h, inner, title="blueport studio", bg=None):
    rect = f'<rect width="{f(w)}" height="{f(h)}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(w)} {f(h)}" width="{f(w)}" height="{f(h)}" '
            f'role="img"><title>{title}</title>{rect}{inner}</svg>\n')


def save(name, s):
    open(os.path.join(OUT, name), "w").write(s)


# ── Colourways: (mark, accent, wordmark) ───────────────────────────────────────────────────────
WAYS = {  # (mark, accent, "blueport", "studio")
    "color": (INK, SYGNAL, INK, "#62666D"),          # on paper / white: the mark in Tusz, orange the one colour
    "on-dark": (PAPER, SYGNAL, PAPER, "#8E9399"),    # on ink / grafit; "studio" in a neutral grey
    "on-kobalt": (PAPER, PAPER, PAPER, "#C9D3F5"),   # accent never sits on kobalt
    "black": (INK, INK, INK, INK),
    "white": ("#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"),
}


def build():
    parts, sw, sh = symbol()
    thin, _, _ = symbol(t=T - 1)  # irradiation: white-on-dark is drawn 1 u lighter

    for way, (mk, ac, wc, sc) in WAYS.items():
        p = thin if way in ("on-dark", "on-kobalt", "white") else parts
        words = word_paths(wc, sc)
        # symbol on 256 canvas, centred
        save(f"symbol-{way}.svg", doc(256, 256, g((256 - sw) / 2, (256 - sh) / 2, 1, sym_paths(p, mk, ac))))

        # horizontal lockup: "blueport" over "studio" beside the mark, the block as tall as the mark
        # (top of the b = top of the mark's ascender, baseline of "studio" = foot of the p)
        kw, gap, pad = stacked_scale(sh), 0.42 * R, 8
        x_wm = pad + sw + gap
        W, H = x_wm + WMJ["blueport"]["inkWidth"] * kw + pad, sh + 2 * pad
        save(f"lockup-horizontal-{way}.svg", doc(W, H, g(pad, pad, 1, sym_paths(p, mk, ac)) + g(x_wm, pad, kw, stacked_words(wc, sc))))
        # the one-line version stays in the kit for very wide, very short spaces
        k1, base1 = R / WM_XH, pad + ASC + R + WM_XH * (R / WM_XH) / 2
        save(f"lockup-oneline-{way}.svg", doc(pad + sw + 0.5 * R + WM_W * k1 + pad, H,
                                              g(pad, pad, 1, sym_paths(p, mk, ac)) + g(pad + sw + 0.5 * R, base1, k1, words)))

        # wordmark only
        save(f"wordmark-{way}.svg", doc(WM_W * kw + 2 * pad, (WM_ASC - WM_DESC) * kw + 2 * pad, g(pad, pad + WM_ASC * kw, kw, words)))

        # two-line wordmark: "blueport" over "studio", as in the horizontal lockup
        BW, BH = WMJ["blueport"]["inkWidth"], GLYPH_ASC + LINE
        save(f"wordmark-twoline-{way}.svg", doc(BW * kw + 2 * pad, BH * kw + 2 * pad, g(pad, pad, kw, stacked_words(wc, sc))))

        # stacked lockup: symbol above, the two-line words centred below, 1.5× as wide as the symbol
        k2 = 1.5 * sw / BW
        W2 = max(sw, BW * k2) + 2 * pad
        y_wm = pad + sh + 0.5 * R
        inner2 = g((W2 - sw) / 2, pad, 1, sym_paths(p, mk, ac)) + g((W2 - BW * k2) / 2, y_wm, k2, stacked_words(wc, sc))
        save(f"lockup-stacked-{way}.svg", doc(W2, y_wm + BH * k2 + pad, inner2))

    # small-size cut: heavier stroke, shorter strokes, for 16–48 px
    small, ssw, ssh = symbol(t=32, asc=14)
    save("symbol-small-color.svg", doc(256, 256, g((256 - ssw) / 2, (256 - ssh) / 2, 1, sym_paths(small, INK, SYGNAL))))
    # favicon / app icon: ink tile, paper mark, sygnał disc (small cut inside)
    k = 0.66 * 256 / max(ssw, ssh)
    tile = lambda rx: f'<rect width="256" height="256" rx="{rx}" fill="{INK}"/>'
    icon = g((256 - ssw * k) / 2, (256 - ssh * k) / 2 - 3, k, sym_paths(small, PAPER, SYGNAL))
    save("favicon.svg", doc(256, 256, tile(56) + icon))
    save("app-icon.svg", doc(256, 256, tile(0) + icon))
    kb = 0.56 * 256 / max(ssw, ssh)  # maskable safe zone
    save("app-icon-maskable.svg", doc(256, 256, tile(0) + g((256 - ssw * kb) / 2, (256 - ssh * kb) / 2 - 3, kb,
                                                             sym_paths(small, PAPER, SYGNAL))))
    print("ok", sorted(os.listdir(OUT)))


def bake(d, ox, oy, k):
    """Apply translate+scale to an absolute path (M L H V A Q C Z)."""
    import re
    out, cmd, buf = [], None, []
    for tok in re.findall(r"[MLHVAQCZ]|-?\d*\.?\d+(?:e-?\d+)?", d):
        if tok.isalpha():
            cmd = tok; out.append(tok); buf = []
            continue
        buf.append(float(tok))
        if cmd == "A" and len(buf) == 7:
            rx, ry, rot, la, sw, x, y = buf
            out.append(f"{f(rx*k)} {f(ry*k)} {f(rot)} {int(la)} {int(sw)} {f(ox+x*k)} {f(oy+y*k)}"); buf = []
        elif cmd in "QC" and len(buf) == (4 if cmd == "Q" else 6):
            out.append(" ".join(f"{f(ox + v * k)}" if i % 2 == 0 else f"{f(oy + v * k)}" for i, v in enumerate(buf))); buf = []
        elif cmd in "ML" and len(buf) == 2:
            out.append(f"{f(ox+buf[0]*k)} {f(oy+buf[1]*k)}"); buf = []
        elif cmd == "H" and len(buf) == 1:
            out.append(f(ox + buf[0] * k)); buf = []
        elif cmd == "V" and len(buf) == 1:
            out.append(f(oy + buf[0] * k)); buf = []
    return " ".join(out).replace(" Z", "Z").replace("Z ", "Z")


def export_ts():
    """src/lib/brand/logo.ts for <BrandLogo>: on-dark geometry (thinned 1 u), baked coordinates."""
    thin, sw, sh = symbol(t=T - 1)
    small, ssw, ssh = symbol(t=32, asc=14)
    kw, gap = stacked_scale(sh), 0.42 * R
    x_wm = sw + gap
    W, H = x_wm + WMJ["blueport"]["inkWidth"] * kw, sh
    word = [bake(WMJ["blueport"]["d"], x_wm, GLYPH_ASC * kw, kw)]
    sub = [bake(WMJ["studio"]["d"], x_wm, (GLYPH_ASC + LINE) * kw, kw)]
    mark = [d for k_, d in thin.items() if k_ != "disc"]
    arr = lambda xs: "[\n" + "".join(f'  "{x}",\n' for x in xs) + "]"
    ts = f'''/**
 * "Gniazdo" logo: p's stem drops into the ring slot b leaves open. Built from three primitives
 * (stem, half ring, half disc); generated by design/logo/kit/build_kit.py — regenerate, do not hand-edit.
 * Stroke-to-radius 0.379, after the "oe" reference. Geometry is the on-dark cut (stroke thinned 1 u against
 * irradiation). The words are Host Grotesk (SIL OFL) outlines: "blueport" 600, "studio" 400.
 */
export const SIGNET_VIEWBOX = "0 0 {f(ssw)} {f(ssh)}";
export const SIGNET_MARK = {arr([d for k_, d in small.items() if k_ != "disc"])};
export const SIGNET_ACCENT = "{small["disc"]}";

export const LOGO_VIEWBOX = "0 0 {f(W)} {f(H)}";
export const LOGO_RATIO = {round(W / H, 3)};
export const LOGO_MARK = {arr(mark)};
export const LOGO_ACCENT = "{thin["disc"]}";
export const LOGO_WORD = {arr(word)};
export const LOGO_SUB = {arr(sub)};
'''
    path = os.path.join(HERE, "..", "..", "..", "src", "lib", "brand", "logo.ts")
    open(os.path.normpath(path), "w").write(ts)
    print("wrote", os.path.normpath(path))


if __name__ == "__main__":
    build()
    export_ts()
