"""Writes variants.html: every svg/ file on the background it is meant for. Open it in a browser to review the kit."""
import os
BG = {"color": "#FFFFFF", "black": "#EEF1F5", "on-dark": "#0A0F17", "white": "#1E2633", "on-kobalt": "#2F55D4"}
cells = []
for f in sorted(os.listdir("svg")):
    n = f[:-4]
    b = next((c for w, c in BG.items() if n.endswith("-" + w)), "#EEF1F5")
    cells.append(f'<figure style="background:{b}"><img src="svg/{f}" alt=""><figcaption>{n}</figcaption></figure>')
open("variants.html", "w").write(f'''<!doctype html><meta charset="utf-8"><title>blueport studio logo variants</title>
<style>body{{margin:0;padding:32px;background:#d9dde3;font:13px ui-monospace,monospace;display:grid;grid-template-columns:repeat(5,1fr);gap:16px}}
figure{{margin:0;height:260px;display:grid;place-items:center;position:relative;border:1px solid #0001}}
img{{max-width:80%;max-height:56%}}figcaption{{position:absolute;left:10px;bottom:8px;color:#888;mix-blend-mode:difference}}</style>{"".join(cells)}''')
