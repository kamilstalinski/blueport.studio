import re, colorsys
INK, PAPER = "#0A0F17", "#EEF1F5"
PAL = [
  ("A · Kobalt / Grafit / Sygnał", "Stonowany kobalt, grafit jako ciemny partner i pomarańcz sygnałowy (jak oznaczenia przemysłowe) jako jedyny ostry akcent.",
   [("Kobalt","#2F55D4"),("Grafit","#1E2633"),("Sygnał","#FF5A1F")]),
  ("B · Stal / Terminal", "Głęboki niebieski, stalowa szarość jako partner i zieleń fosforu z ekranu terminala jako przełamanie.",
   [("Głęboki niebieski","#1D3FAE"),("Stal","#8794A8"),("Fosfor","#3DF59B")]),
  ("C · Aluminium / Laser", "Elektryczny niebieski na prawie czarnym, jasne aluminium jako partner i czerwień lasera jako punkt.",
   [("Elektryczny","#2F5AEE"),("Aluminium","#C5CDD8"),("Laser","#FF3D2E")]),
]
def lum(h):
    c=[int(h[i:i+2],16)/255 for i in (1,3,5)]
    c=[x/12.92 if x<=0.03928 else ((x+0.055)/1.055)**2.4 for x in c]
    return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]
def cr(a,b):
    la,lb=sorted([lum(a),lum(b)],reverse=True); return (la+0.05)/(lb+0.05)
def cmyk(h):
    r,g,b=[int(h[i:i+2],16)/255 for i in (1,3,5)]; k=1-max(r,g,b)
    if k==1: return "0 0 0 100"
    return " ".join(str(round(100*(1-x-k)/(1-k))) for x in (r,g,b))+f" {round(100*k)}"
def rgb(h): return " ".join(str(int(h[i:i+2],16)) for i in (1,3,5))
def grey(h): return round(lum(h)**(1/2.2)*100)
if __name__=="__main__":
    for name,_,cols in PAL:
        B,Pt,X=[c for _,c in cols]
        print(f"\n{name}")
        for n,c in cols: print(f"  {n:14} {c}  RGB {rgb(c):12} CMYK {cmyk(c):14} L*~{grey(c)}")
        for a,b,lab in [(PAPER,B,"papier/niebieski"),(INK,Pt,"tusz/partner"),(INK,X,"tusz/przełamanie"),(X,B,"przełamanie/niebieski"),(B,PAPER,"niebieski/papier"),(Pt,B,"partner/niebieski")]:
            r=cr(a,b); print(f"  {lab:24} {r:5.2f}  {'AA' if r>=4.5 else 'AA-large' if r>=3 else 'tylko dekor'}")
