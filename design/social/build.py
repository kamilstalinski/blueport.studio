"""blueport studio: social media set (profile, covers, highlight covers, post templates).

Edit content.json, then run:  python3 build.py            -> out/*.png (and out/html/*.html)
                               python3 build.py ig-post-opinia   -> only the files whose name contains that text
The look is the homepage's: Tusz ground with the real Grainient still (assets/grain-*.png), the four-column
construction grid, Host Grotesk for words, Martian Mono for data, the logo (variant C) and orange as the one accent.
"""
import html
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT, OUT_HTML = os.path.join(HERE, "out"), os.path.join(HERE, "out", "html")
C = json.load(open(os.path.join(HERE, "content.json")))

LOCKUP = re.search(r"<svg.*</svg>", open(os.path.join(HERE, "assets/lockup-on-dark.svg")).read(), re.S).group(0)
SYMBOL = re.search(r"<svg.*</svg>", open(os.path.join(HERE, "assets/symbol-on-dark.svg")).read(), re.S).group(0)
ARROW = '<svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 7h11M8 3l4 4-4 4"/></svg>'
LOCK = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2.5" y="6" width="9" height="6.5"/><path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6"/></svg>'

CSS = """
:root { --tusz:#0A0F17; --tusz-2:#0E141F; --line:rgb(255 255 255 / .08); --line-2:rgb(255 255 255 / .16);
  --papier:#EEF1F5; --muted:#A6B0BF; --faint:#9BA7BA; --kobalt-ink:#8AA2F5; --sygnal:#FF5A1F; }
* { box-sizing: border-box; margin: 0; }
html, body { width: var(--w); height: var(--h); overflow: hidden; background: var(--tusz); }
body { font-family: "Host Grotesk", sans-serif; color: var(--muted); -webkit-font-smoothing: antialiased; }
.stage { position: relative; width: var(--w); height: var(--h); overflow: hidden; }
.bg { position: absolute; inset: 0; background-size: cover; background-position: var(--bgpos, center); }
.bg::after { content: ""; position: absolute; inset: 0; background:
  linear-gradient(90deg, var(--tusz) 0%, rgb(10 15 23 / .55) 18%, transparent 45%, transparent 70%, rgb(10 15 23 / .6) 100%),
  linear-gradient(180deg, rgb(10 15 23 / .35) 0%, transparent 30%, transparent 65%, rgb(10 15 23 / .75) 100%); }
.rails { position: absolute; inset: 0 var(--m); display: grid; grid-template-columns: repeat(var(--cols, 4), 1fr); border-left: 1px solid var(--line); }
.rails span { border-right: 1px solid var(--line); }
.content { position: absolute; inset: var(--m); display: flex; flex-direction: column; }
h1, h2 { color: var(--papier); font-weight: 500; letter-spacing: -.035em; line-height: 1.02; text-wrap: balance; }
.mono { font-family: "Martian Mono", monospace; letter-spacing: 0; }
.label { font-family: "Martian Mono", monospace; font-size: var(--label, 22px); color: var(--kobalt-ink); text-transform: lowercase; }
.lead { color: var(--muted); line-height: 1.45; text-wrap: pretty; }
.logo svg { display: block; height: 100%; width: auto; }
.foot { margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.foot .mono { color: var(--faint); }
.dot { display: inline-block; width: .5em; height: 1em; background: var(--sygnal); border-radius: 0 999px 999px 0; vertical-align: -.12em; margin-right: .45em; }
.win { background: #0C121C; border: 1px solid var(--line-2); box-shadow: 0 40px 90px -30px rgb(0 0 0 / .8); overflow: hidden; }
.win-bar { display: flex; align-items: center; gap: 14px; padding: 0 18px; border-bottom: 1px solid var(--line-2); color: var(--faint); }
.win-bar svg { width: 18px; height: 18px; flex: none; }
.win-bar .url { flex: 1; display: flex; align-items: center; padding: 0 14px; background: var(--tusz); border: 1px solid var(--line); color: var(--muted); }
.win .view { overflow: hidden; background: #fff; }
.win .view img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
.row-act { display: flex; align-items: center; justify-content: space-between; padding: 0 30px; font-weight: 500; color: var(--tusz); background: var(--sygnal); }
.row-act .arrow { width: .8em; height: .8em; }
"""


def doc(name, w, h, body, m=72, cols=4, bg="square", bgpos="center"):
    grain = os.path.join(HERE, "assets", f"grain-{bg}.png")
    page = f"""<!doctype html><html lang="pl"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600&family=Martian+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body style="--w:{w}px;--h:{h}px;--m:{m}px;--cols:{cols};--bgpos:{bgpos}">
<div class="stage"><div class="bg" style="background-image:url('file://{grain}')"></div>
<div class="rails">{'<span></span>' * cols}</div>{body}</div></body></html>"""
    path = os.path.join(OUT_HTML, f"{name}.html")
    open(path, "w").write(page)
    return name, w, h, path


def esc(s):
    # Polish typesetting: a one-letter word or a number never ends a line
    return re.sub(r"(?<=\b\w) (?=\S)|(?<=\d) (?=\S)", "&nbsp;", html.escape(s)) if s else s


def img(rel):
    return "file://" + os.path.join(HERE, "assets", rel)


def window(rel, domain, bar=56, font=22):
    return (f'<div class="win" style="height:100%;display:flex;flex-direction:column"><div class="win-bar" style="height:{bar}px">{LOCK}'
            f'<span class="url mono" style="height:{bar - 22}px;font-size:{font}px">{esc(domain)}</span></div>'
            f'<div class="view" style="flex:1"><img src="{img(rel)}"></div></div>')


# ── profile picture and covers ───────────────────────────────────────────────────────────────────
def avatar():
    # one file for all three platforms: the mark sits inside the circle they crop to
    body = f'<div style="position:absolute;inset:0;display:grid;place-items:center"><div class="logo" style="height:520px">{SYMBOL}</div></div>'
    return doc("avatar-1080", 1080, 1080, body, m=0, cols=1, bg="square", bgpos="30% 70%")


def fb_cover():
    # Facebook shows 820×312 on desktop and crops the sides on phones: words stay in the middle 1200 px
    body = f'''<div class="content" style="inset:0 220px;justify-content:center;gap:28px">
<span class="label" style="--label:24px">{esc(C["domain"])}</span>
<h1 style="font-size:74px;max-width:1000px">{esc(C["headline"])}</h1>
<p class="lead" style="font-size:30px;max-width:900px">{esc(C["tagline"])}</p></div>'''
    return doc("facebook-cover-1640x624", 1640, 624, body, m=220, cols=4, bg="wide")


def li_company_cover():
    # LinkedIn page logo covers the lower left: everything sits right of x = 360
    body = f'''<div class="content" style="inset:0 56px 0 360px;justify-content:center;align-items:flex-end;text-align:right;gap:10px">
<h2 style="font-size:40px">{esc(C["headline"])}</h2><span class="mono" style="font-size:18px;color:var(--faint)">{esc(C["domain"])}</span></div>'''
    return doc("linkedin-company-cover-1128x191", 1128, 191, body, m=56, cols=4, bg="wide")


def li_personal_cover():
    # personal profile photo covers the lower left third: words right, lockup top right
    body = f'''<div class="content" style="inset:56px 72px 56px 520px;justify-content:center;align-items:flex-end;text-align:right;gap:18px">
<div class="logo" style="height:64px">{LOCKUP}</div>
<h2 style="font-size:46px;max-width:900px">{esc(C["headline"])}</h2>
<span class="mono" style="font-size:20px;color:var(--faint)">{esc(C["domain"])}</span></div>'''
    return doc("linkedin-personal-cover-1584x396", 1584, 396, body, m=72, cols=4, bg="wide")


# ── Instagram highlight covers: the circle shows the middle of a 1080×1920 frame ─────────────────
def glyph(kind):
    if kind == "window":
        return ('<svg viewBox="0 0 200 160" width="300" fill="none" stroke="#EEF1F5" stroke-width="14"><rect x="7" y="7" width="186" height="146"/>'
                '<path d="M7 46h186"/><path d="M30 26h40" stroke="#FF5A1F"/></svg>')
    if kind == "steps":
        return ('<svg viewBox="0 0 220 120" width="320"><g fill="#EEF1F5"><rect x="0" y="80" width="60" height="40"/><rect x="80" y="40" width="60" height="80"/>'
                '<rect x="160" y="0" width="60" height="120"/></g><rect x="160" y="0" width="60" height="24" fill="#FF5A1F"/></svg>')
    return f'<span style="font-size:300px;font-weight:500;color:var(--papier);letter-spacing:-.04em;line-height:1">{esc(kind)}</span>'


def highlight(h):
    body = f'''<div style="position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);display:grid;justify-items:center;gap:56px">
{glyph(h["glyph"])}<span class="mono" style="font-size:40px;color:var(--faint);text-transform:lowercase">{esc(h["label"])}</span></div>'''
    return doc(h["file"], 1080, 1920, body, m=0, cols=1, bg="tall")


# ── post templates ──────────────────────────────────────────────────────────────────────────────
def footer(size=24, logo=64):
    return f'<div class="foot"><div class="logo" style="height:{logo}px">{LOCKUP}</div><span class="mono" style="font-size:{size}px">{esc(C["domain"])}</span></div>'


def post_headline(d, w=1080, h=1350, name=None):
    body = f'''<div class="content" style="gap:40px"><span class="label" style="--label:26px"><span class="dot"></span>{esc(d["label"])}</span>
<h1 style="font-size:{int(w * .085)}px;margin-top:auto">{esc(d["title"])}</h1>
<p class="lead" style="font-size:{int(w * .03)}px;max-width:80%;margin-bottom:60px">{esc(d["text"])}</p>{footer()}</div>'''
    return doc(name or d["file"], w, h, body, m=88)


def post_case(d, w=1080, h=1350, name=None):
    win_h = int(h * .48)
    body = f'''<div class="content" style="gap:30px"><span class="label" style="--label:26px"><span class="dot"></span>{esc(d["label"])}</span>
<h1 style="font-size:{int(w * .08)}px">{esc(d["name"])}</h1><p class="lead" style="font-size:{int(w * .03)}px;max-width:85%">{esc(d["line"])}</p>
<div style="height:{win_h}px;margin-top:10px">{window(d["image"], d["domain"])}</div>{footer()}</div>'''
    return doc(name or d["file"], w, h, body, m=88)


def post_quote(d, w=1080, h=1350, name=None):
    # the „ glyph sits on the baseline: an absolutely placed span pins its ink to the bottom of a short box
    mark = (f'<div style="position:relative;height:.34em;font-size:{int(w * .26)}px;color:var(--sygnal);font-weight:500">'
            f'<span style="position:absolute;left:-.04em;bottom:-.2em;line-height:1">„</span></div>')
    body = f'''<div class="content"><div style="margin:auto 0;display:flex;flex-direction:column;gap:44px">{mark}
<h2 style="font-size:{int(w * .058)}px;line-height:1.15;letter-spacing:-.025em">{esc(d["quote"])}</h2>
<div><p style="color:var(--papier);font-size:{int(w * .03)}px;font-weight:500">{esc(d["author"])}</p><p class="lead" style="font-size:{int(w * .024)}px">{esc(d["company"])}</p></div></div>{footer()}</div>'''
    return doc(name or d["file"], w, h, body, m=88)


def post_offer(d):
    items = "".join(f'<li style="padding:20px 0;border-top:1px solid var(--line-2)">{esc(i)}</li>' for i in d["items"])
    body = f'''<div class="content" style="gap:26px"><span class="label" style="--label:26px"><span class="dot"></span>{esc(d["label"])}</span>
<h1 style="font-size:96px;margin-top:20px">{esc(d["name"])}</h1><span class="mono" style="font-size:26px;color:var(--faint)">{esc(d["tech"])}</span>
<p class="mono" style="font-size:110px;color:var(--papier);letter-spacing:-.04em;margin-top:20px"><span style="font-size:34px;color:var(--faint);margin-right:14px">od</span>{esc(d["price"])}</p>
<span class="mono" style="font-size:26px;color:var(--muted)">{esc(d["days"])}</span>
<ul style="list-style:none;padding:0;margin:auto 0 60px;font-size:32px;color:var(--papier)">{items}</ul>{footer()}</div>'''
    return doc(d["file"], 1080, 1350, body, m=88)


def carousel(d):
    out = []
    n = len(d["slides"]) + 2
    cover = f'''<div class="content" style="gap:40px"><span class="mono" style="font-size:26px;color:var(--faint)">1 / {n}</span>
<h1 style="font-size:116px;margin-top:auto">{esc(d["cover_title"])}</h1>
<p class="lead" style="font-size:32px;display:flex;align-items:center;gap:14px">przesuń {ARROW}</p>{footer()}</div>'''
    out.append(doc(f'{d["file"]}-1', 1080, 1350, cover, m=88))
    for i, s in enumerate(d["slides"], 2):
        body = f'''<div class="content" style="gap:40px"><span class="mono" style="font-size:26px;color:var(--faint)">{i} / {n}</span>
<p style="font-size:40px;color:var(--faint);text-decoration:line-through;text-decoration-color:var(--sygnal);margin-top:auto">{esc(s["was"])}</p>
<h2 style="font-size:92px">{esc(s["now"])}</h2>{footer()}</div>'''
        out.append(doc(f'{d["file"]}-{i}', 1080, 1350, body, m=88))
    cta = f'''<div class="content" style="gap:36px"><span class="mono" style="font-size:26px;color:var(--faint)">{n} / {n}</span>
<h1 style="font-size:104px;margin-top:auto">{esc(d["cta_title"])}</h1><p class="lead" style="font-size:34px">{esc(d["cta_text"])}</p>
<div class="row-act" style="height:110px;font-size:38px;margin-top:20px">Sprawdź koszt {ARROW}</div>{footer()}</div>'''
    out.append(doc(f'{d["file"]}-{n}', 1080, 1350, cta, m=88))
    return out


def story_case(d):
    body = f'''<div class="content" style="inset:200px 88px 260px;gap:32px"><span class="label" style="--label:30px"><span class="dot"></span>{esc(d["label"])}</span>
<h1 style="font-size:110px">{esc(d["name"])}</h1><p class="lead" style="font-size:38px">{esc(d["line"])}</p>
<div style="flex:1;margin-top:20px">{window(d["image"], d["domain"], bar=70, font=26)}</div></div>
<div style="position:absolute;left:88px;right:88px;bottom:110px">{footer(26, 70)}</div>'''
    return doc(d["file"], 1080, 1920, body, m=88, bg="tall")


def story_cta(d):
    body = f'''<div class="content" style="inset:260px 88px 300px;gap:40px;justify-content:center">
<h1 style="font-size:132px">{esc(d["title"])}</h1><p class="lead" style="font-size:42px">{esc(d["text"])}</p>
<div class="row-act" style="height:130px;font-size:44px;margin-top:30px">{esc(d["button"])} {ARROW}</div>
<span class="mono" style="font-size:30px;color:var(--faint)">{esc(C["domain"])}/kalkulator</span></div>
<div style="position:absolute;left:88px;right:88px;bottom:110px">{footer(26, 70)}</div>'''
    return doc(d["file"], 1080, 1920, body, m=88, bg="tall")


def li_link(d):
    body = f'''<div class="content" style="inset:64px 72px;gap:22px;justify-content:center"><span class="label" style="--label:20px">{esc(C["domain"])}</span>
<h1 style="font-size:62px;max-width:880px">{esc(d["title"])}</h1><p class="lead" style="font-size:26px;max-width:760px">{esc(d["text"])}</p></div>
<div class="logo" style="position:absolute;right:72px;bottom:56px;height:56px">{LOCKUP}</div>'''
    return doc(d["file"], 1200, 627, body, m=72, bg="wide")


def jobs():
    j = [avatar(), fb_cover(), li_company_cover(), li_personal_cover()]
    j += [highlight(h) for h in C["highlights"]]
    j += [post_headline(C["ig_headline"]), post_case(C["ig_case"]), post_quote(C["ig_quote"]), post_offer(C["ig_offer"])]
    j += carousel(C["ig_carousel"])
    j += [story_case(C["ig_story_case"]), story_cta(C["ig_story_cta"])]
    j += [post_case(C["li_case"], 1200, 1200), post_quote(C["li_quote"], 1200, 1200), li_link(C["li_link"])]
    return j


if __name__ == "__main__":
    os.makedirs(OUT_HTML, exist_ok=True)
    only = sys.argv[1] if len(sys.argv) > 1 else ""
    todo = [{"html": p, "png": os.path.join(OUT, f"{n}.png"), "w": w, "h": h} for n, w, h, p in jobs() if not only or only in n]
    spec = os.path.join(OUT_HTML, "jobs.json")
    json.dump(todo, open(spec, "w"))
    subprocess.run(["node", os.path.join(HERE, "render.mjs"), spec], check=True)
