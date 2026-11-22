import re
from palettes import PAL, INK, PAPER, rgb, cmyk, cr
MARK = re.findall(r'<path[^>]*/>', open("r7-b-gniazdo.svg").read())
LOCK = open("r7-b-gniazdo-lockup.svg").read()
vb = re.search(r'viewBox="([^"]+)"', LOCK).group(1)
LP = re.findall(r'<path[^>]*/>', LOCK)
def paint(paths, cols):
    return "".join(re.sub(r'fill="[^"]+"', f'fill="{cols(i)}"', p) for i, p in enumerate(paths))
def mark(main, disc, size):
    return f'<svg viewBox="0 0 256 256" width="{size}" height="{size}">{paint(MARK, lambda i: disc if i==2 else main)}</svg>'
def lock(main, disc, word, h=64):
    return f'<svg viewBox="{vb}" height="{h}">{paint(LP, lambda i: disc if i==2 else (main if i<5 else word))}</svg>'
rows = ""
for name, note, cols in PAL:
    (bn,B),(pn,Pt),(xn,X) = cols
    sw = "".join(f'<div class=sw style="flex:{fl};background:{c};color:{"#fff" if c in (B,INK) else INK}"><b>{n}</b><span>{c}<br>RGB {rgb(c)}<br>CMYK {cmyk(c)}</span></div>'
                 for (n,c),fl in [((bn,B),5),((pn,Pt),2.4),((xn,X),1.2),(("Tusz",INK),1.6),(("Papier",PAPER),1.6)])
    hero = f'''<div class=hero style="background:{B}">
      <div class=nav>{lock(PAPER,X,PAPER,26)}<span style="color:{Pt}">Realizacje&nbsp;&nbsp; Cennik&nbsp;&nbsp; Kontakt</span></div>
      <h2 style="color:{PAPER}">Strony, które<br>dobijają do celu.</h2>
      <div class=cta style="background:{X};color:{INK}">Wyceń projekt →</div>
      <svg class=deco viewBox="0 0 200 200"><path fill="{Pt}" d="M100 0 A100 100 0 0 0 100 200 V160 A60 60 0 0 1 100 40 Z"/><path fill="{X}" d="M100 40 A60 60 0 0 1 100 160 Z"/></svg></div>'''
    rows += f'''<section><h1>{name}</h1><p class=note>{note}</p><div class=strip>{sw}</div>
    <div class=tiles>
      <div class=t style="background:{B}">{mark(PAPER,X,150)}</div>
      <div class=t style="background:{Pt}">{mark(B,X,150)}</div>
      <div class=t style="background:{X}">{mark(INK,B,150)}</div>
      <div class="t wide" style="background:{PAPER}">{lock(B,X,INK,70)}</div>
      {hero}
    </div></section>'''
open("palettes.html","w").write(f'''<html><body><style>
body{{margin:0;padding:32px;background:#fff;font:14px/1.35 system-ui;color:{INK}}}
section{{margin-bottom:40px}} h1{{font-size:22px;margin:0 0 4px}} .note{{margin:0 0 14px;color:#555;max-width:900px}}
.strip{{display:flex;height:120px;border-radius:14px;overflow:hidden;margin-bottom:14px;border:1px solid #e6e3da}}
.sw{{padding:12px;display:flex;flex-direction:column;justify-content:space-between;font-size:11px}} .sw b{{font-size:13px}}
.tiles{{display:flex;gap:12px;align-items:stretch}} .t{{width:200px;height:200px;border-radius:16px;display:grid;place-items:center;flex:none}}
.wide{{width:330px;border:1px solid #e6e3da}}
.hero{{position:relative;flex:1;height:200px;border-radius:16px;overflow:hidden;padding:16px 20px;box-sizing:border-box}}
.nav{{display:flex;justify-content:space-between;align-items:center;font-size:11px}}
.hero h2{{font:700 28px/1.05 system-ui;margin:22px 0 14px;letter-spacing:-.5px}}
.cta{{display:inline-block;padding:8px 14px;font-weight:700;font-size:12px;border-radius:999px}}
.deco{{position:absolute;right:-30px;bottom:-40px;width:190px;height:190px}}
</style>{rows}</body></html>''')
