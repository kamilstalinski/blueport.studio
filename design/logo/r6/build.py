"""Round 6: constructed geometric marks (oe / Penta / K inspiration).
Every shape is computed from primitives so radii, angles and gaps stay exact.
Run: python3 build.py  -> writes *.svg next to this file.
"""
import math, os

OUT = os.path.dirname(os.path.abspath(__file__))
INK = "#0B1B2B"


def f(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def pt(cx, cy, r, deg):
    a = math.radians(deg)
    return cx + r * math.cos(a), cy - r * math.sin(a)


def svg(paths, w=256, h=256, title="blueport studio", fill=INK):
    EO = 'fill-rule="evenodd" '
    body = "\n".join(f'  <path fill="{c or fill}" {EO if eo else ""}d="{d}"/>' for d, c, eo in paths)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(w)} {f(h)}" width="{f(w)}" height="{f(h)}">\n'
        f"  <title>{title}</title>\n{body}\n</svg>\n"
    )


def P(d, c=None, eo=False):
    return (d, c, eo)


def save(name, paths, w=256, h=256):
    with open(os.path.join(OUT, name), "w") as fh:
        fh.write(svg(paths, w, h))


# ── A · Śluza: b = ascender + split "o" (left half ring / right inner half-disc), the oe trick ──────
def mark_split(cx=138, cy=158, R=82, t=34, top=16, accent=None):
    r = R - t
    x0 = cx - R
    ring = f"M{f(cx)} {f(cy-R)} A{R} {R} 0 0 0 {f(cx)} {f(cy+R)} V{f(cy+r)} A{r} {r} 0 0 1 {f(cx)} {f(cy-r)} Z"
    stem = f"M{f(x0)} {f(top)} H{f(x0+t)} V{f(cy)} H{f(x0)} Z"
    disc = f"M{f(cx)} {f(cy-r)} A{r} {r} 0 0 1 {f(cx)} {f(cy+r)} Z"
    return [P(stem), P(ring), P(disc, accent)]


# ── B · Latarnia: solid b, a widening beam of light cut from inside the stem (K-style wedge) ───────
def mark_beam(sx=68, s=46, top=16, R=74, base=242, apex_in=18, half=9, tilt=0, rc=9):
    cx, cy = sx + s, base - R
    ax, ay = cx - apex_in, cy

    def hit(deg):
        ux, uy = math.cos(math.radians(deg)), -math.sin(math.radians(deg))
        dx, dy = ax - cx, ay - cy
        b = dx * ux + dy * uy
        lam = -b + math.sqrt(b * b - (dx * dx + dy * dy - R * R))
        return ax + lam * ux, ay + lam * uy

    p1, p2 = hit(tilt + half), hit(tilt - half)
    d = (
        f"M{sx} {top+rc} A{rc} {rc} 0 0 1 {sx+rc} {top} H{cx-rc} A{rc} {rc} 0 0 1 {cx} {top+rc} "
        f"V{f(cy-R)} A{R} {R} 0 0 1 {f(p1[0])} {f(p1[1])} L{f(ax)} {f(ay)} L{f(p2[0])} {f(p2[1])} "
        f"A{R} {R} 0 0 1 {f(cx)} {f(cy+R)} H{sx+rc} A{rc} {rc} 0 0 1 {sx} {f(cy+R-rc)} Z"
    )
    return [P(d)]


# ── C · Bulaj: b from four quadrant pieces around a round counter, split by a cross (Penta-style) ──
def mark_porthole(sx=65, s=50, top=16, R=76, base=242, rho=27, g=7, foot=26, accent=None):
    cx, cy = sx + s, base - R
    h = g / 2
    io = math.sqrt(rho * rho - h * h)  # inner circle vs. offset axis
    oo = math.sqrt(R * R - h * h)
    st = (f"M{sx} {top} H{f(cx-h)} V{f(cy-io)} A{rho} {rho} 0 0 0 {f(cx-io)} {f(cy-h)} H{sx} Z")
    sb = (f"M{sx} {f(cy+h)} H{f(cx-io)} A{rho} {rho} 0 0 0 {f(cx-h)} {f(cy+io)} V{base} "
          f"H{sx+foot} A{foot} {foot} 0 0 1 {sx} {base-foot} Z")
    bt = (f"M{f(cx+h)} {f(cy-oo)} A{R} {R} 0 0 1 {f(cx+oo)} {f(cy-h)} H{f(cx+io)} "
          f"A{rho} {rho} 0 0 0 {f(cx+h)} {f(cy-io)} Z")
    bb = (f"M{f(cx+io)} {f(cy+h)} H{f(cx+oo)} A{R} {R} 0 0 1 {f(cx+h)} {f(cy+oo)} V{f(cy+io)} "
          f"A{rho} {rho} 0 0 0 {f(cx+io)} {f(cy+h)} Z")
    return [P(st), P(sb), P(bt, accent), P(bb)]


# ── D · Kafel: b on a 2×3 tile grid — round top tile, square foot tile, one tile flipped concave ───
def mark_tiles(u=72, x0=56, y0=20, rc=10, rho=40):
    xm, ym = x0 + u, y0 + 2 * u  # stem/bowl seam, x-height centre
    xr, yb = x0 + 2 * u, y0 + 3 * u
    # stem with rounded top-left, square everything else
    stem = f"M{x0} {y0+rc} A{rc} {rc} 0 0 1 {x0+rc} {y0} H{xm} V{yb} H{x0} Z"
    # top tile: convex quarter disc, centre at seam corner
    top = f"M{xm} {ym-u} A{u} {u} 0 0 1 {xr} {ym} H{xm+rho} A{rho} {rho} 0 0 0 {xm} {ym-rho} Z"
    # foot tile: square with the counter bitten out and a soft outer corner
    foot = (f"M{xm+rho} {ym} H{xr} V{yb-rc} A{rc} {rc} 0 0 1 {xr-rc} {yb} H{xm} V{ym+rho} "
            f"A{rho} {rho} 0 0 0 {xm+rho} {ym} Z")
    return [P(stem), P(top), P(foot)]


# ── D · Gniazdo: bp ligature — p's stem drops exactly into the ring slot b leaves open (plug ↔ port) ─
def mark_bp(R=60, t=26, asc=44, accent=None):
    r = R - t
    W, H = 3 * R, 2 * R + 2 * asc
    c1 = (256 - W) / 2 + R
    cy = 128
    x0 = c1 - R
    b_stem = f"M{f(x0)} {f(cy-R-asc)} H{f(x0+t)} V{f(cy)} H{f(x0)} Z"
    b_ring = f"M{f(c1)} {f(cy-R)} A{R} {R} 0 0 0 {f(c1)} {f(cy+R)} V{f(cy+r)} A{r} {r} 0 0 1 {f(c1)} {f(cy-r)} Z"
    b_disc = f"M{f(c1)} {f(cy-r)} A{r} {r} 0 0 1 {f(c1)} {f(cy+r)} Z"
    px = c1 + r
    p_stem = f"M{f(px)} {f(cy-R)} H{f(px+t+1)} V{f(cy+R+asc)} H{f(px)} Z"
    c2 = px + t
    p_ring = f"M{f(c2)} {f(cy-R)} A{R} {R} 0 0 1 {f(c2)} {f(cy+R)} V{f(cy+r)} A{r} {r} 0 0 0 {f(c2)} {f(cy-r)} Z"
    return [P(b_stem), P(b_ring), P(b_disc, accent), P(p_stem), P(p_ring)]


# ── Wordmark "blueport" built from the same three primitives: stem, half ring, cut ring ────────────
WM = dict(R=56, t=28, asc=56, track=16)


def wordmark(ox=0.0, oy=0.0, k=1.0):
    R, t, A, T = WM["R"], WM["t"], WM["asc"], WM["track"]
    r = R - t
    X = 2 * R
    ps, x = [], 0.0

    def tr(d):
        out, nums, i = [], d.replace(",", " ").split(), 0
        # coordinates are absolute pairs after each command letter; transform pairs, keep arc radii/flags
        res, cmd, buf = [], None, []
        for tok in nums:
            if tok[0].isalpha():
                cmd = tok
                res.append(tok)
                buf = []
                continue
            buf.append(float(tok))
            if cmd == "A" and len(buf) == 7:
                rx, ry, rot, la, sw, px, py = buf
                res += [f(rx * k), f(ry * k), f(rot), str(int(la)), str(int(sw)), f(ox + px * k), f(oy + py * k)]
                buf = []
            elif cmd in ("M", "L") and len(buf) == 2:
                res += [f(ox + buf[0] * k), f(oy + buf[1] * k)]
                buf = []
            elif cmd == "H" and len(buf) == 1:
                res.append(f(ox + buf[0] * k)); buf = []
            elif cmd == "V" and len(buf) == 1:
                res.append(f(oy + buf[0] * k)); buf = []
        return " ".join(res)

    def rect(x0, y0, x1, y1):
        return f"M {x0} {y0} H {x1} V {y1} H {x0} Z"

    def hring(cx, cy, side):  # half ring, side = 'r' | 'l' | 'b' | 't'
        if side == "r":
            return f"M {cx} {cy-R} A {R} {R} 0 0 1 {cx} {cy+R} V {cy+r} A {r} {r} 0 0 0 {cx} {cy-r} Z"
        if side == "l":
            return f"M {cx} {cy-R} A {R} {R} 0 0 0 {cx} {cy+R} V {cy+r} A {r} {r} 0 0 1 {cx} {cy-r} Z"
        if side == "b":
            return f"M {cx-R} {cy} A {R} {R} 0 0 0 {cx+R} {cy} H {cx+r} A {r} {r} 0 0 1 {cx-r} {cy} Z"

    cy = -R  # bowl centre (baseline at y=0)
    # b
    ps.append(rect(x, -2 * R - A, x + t + 1, 0)); ps.append(hring(x + t, cy, "r")); x += t + R + T
    # l
    ps.append(rect(x, -2 * R - A, x + t, 0)); x += t + T
    # u
    ps.append(rect(x, -2 * R, x + t, cy + 1)); ps.append(rect(x + X - t, -2 * R, x + X, 0)); ps.append(hring(x + R, cy, "b")); x += X + T
    # e: left half ring + top-right quarter ring + bar + bottom terminal cut flat
    c = x + R
    ps.append(hring(c, cy, "l"))
    ps.append(f"M {c-1} {cy-R} H {c} A {R} {R} 0 0 1 {c+R} {cy} H {c+r} A {r} {r} 0 0 0 {c} {cy-r} H {c-1} Z")
    ps.append(rect(c - r, cy - t * 0.4, c + math.sqrt(R * R - (t * 0.4) ** 2), cy + t * 0.4))
    dx = math.sqrt(R * R - r * r)
    x += X + T
    # p
    ps.append(rect(x, -2 * R, x + t + 1, A)); ps.append(hring(x + t, cy, "r")); x += t + R + T
    # o
    c = x + R
    ps.append(f"M {c} {cy-R} A {R} {R} 0 0 1 {c} {cy+R} A {R} {R} 0 0 1 {c} {cy-R} Z M {c} {cy-r} A {r} {r} 0 0 0 {c} {cy+r} A {r} {r} 0 0 0 {c} {cy-r} Z")
    x += X + T
    # r: stem + quarter ring arm
    ps.append(rect(x, -2 * R, x + t + 1, 0))
    ra, rr = 46, 46 - t
    ps.append(f"M {x+t} {-2*R} A {ra} {ra} 0 0 1 {x+t+ra} {-2*R+ra} H {x+t+rr} A {rr} {rr} 0 0 0 {x+t} {-2*R+t} Z")
    x += t + ra + T * 0.5
    # t
    ps.append(rect(x + 14, -2 * R - 34, x + 14 + t, 0)); ps.append(rect(x, -2 * R, x + 14 + t + 26, -2 * R + t * 0.85))
    x += 14 + t + 26
    width = x
    out = [P(tr(d), None, d.count("M") > 1) for d in ps]
    return out, width


WM_H = 2 * WM["R"] + 2 * WM["asc"]  # asc + x-height + desc


def lockup(name, mark_paths, mark_box=(0, 0, 256, 256)):
    """Symbol left, wordmark right; height 256, wordmark cap/desc box ≈ symbol height × 0.74."""
    k = 176 / WM_H
    _, w = wordmark()
    mx0, my0, mw, mh = mark_box
    gap = 40
    ox = mw + gap
    oy = 128 + (WM["R"] - WM["asc"]) * k * 0 + (2 * WM["R"] + WM["asc"] - WM_H / 2) * k
    wm, _ = wordmark(ox, oy, k)
    save(name, mark_paths + wm, w=ox + w * k + 8, h=256)


# ── Round 7: shorter strokes + A×B merges, all from one "split o" module ───────────────────────────
def module(c, cy, R, t, stem, L, accent=None):
    """Left half ring + right inner half-disc; stem on the left going 'up' (b) or 'down' (p)."""
    r = R - t
    x0 = c - R
    ring = f"M{f(c)} {f(cy-R)} A{R} {R} 0 0 0 {f(c)} {f(cy+R)} V{f(cy+r)} A{r} {r} 0 0 1 {f(c)} {f(cy-r)} Z"
    disc = f"M{f(c)} {f(cy-r)} A{r} {r} 0 0 1 {f(c)} {f(cy+r)} Z"
    if stem == "up":
        s = f"M{f(x0)} {f(cy-R-L)} H{f(x0+t)} V{f(cy)} H{f(x0)} Z"
    else:
        s = f"M{f(x0)} {f(cy)} H{f(x0+t)} V{f(cy+R+L)} H{f(x0)} Z"
    return [P(s), P(ring), P(disc, accent)]


def a2(R=90, t=37, L=38, accent=None):
    r = R - t
    H = 2 * R + L
    cy = (256 - H) / 2 + L + R - 2  # 2 u optical lift
    c = 128 + (R - r) / 2 - (R - r) * 0.25  # between bbox centre and optical (implied circle) centre
    return module(c, cy, R, t, "up", L, accent)


def lustro(R=62, t=26, L=30, accent=None, accent2=None):
    """b + its vertical mirror p; p's ring kisses b's disc at a single point."""
    r = R - t
    W = 2 * R + 2 * r
    c1 = (256 - W) / 2 + R
    c2 = c1 + r + R
    return module(c1, 128, R, t, "up", L, accent) + module(c2, 128, R, t, "down", L, accent2)


if __name__ == "__main__":
    WM["asc"] = 40
    WM_H = 2 * WM["R"] + 2 * WM["asc"]
    r7 = {
        "r7-a-sluza": a2(),
        "r7-b-gniazdo": mark_bp(R=66, t=27, asc=28),
        "r7-ab-lustro": lustro(),
    }
    for n, m in r7.items():
        save(f"{n}.svg", m)
        lockup(f"{n}-lockup.svg", m)
    marks = {
        "a-sluza": mark_split(),
        "b-latarnia": mark_beam(),
        "b-latarnia-30": mark_beam(tilt=30, half=8),
        "c-bulaj": mark_porthole(),
        "d-kafel": mark_tiles(),
        "d-gniazdo": mark_bp(),
    }
    for n, m in marks.items():
        save(f"{n}.svg", m)
        lockup(f"{n}-lockup.svg", m)
    wm, w = wordmark(16, 16 + 2 * WM["R"] + WM["asc"])
    save("wordmark.svg", wm, w=w + 32, h=WM_H + 32)
    print("ok")
