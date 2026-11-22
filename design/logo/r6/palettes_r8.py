import re, colorsys
INK, PAPER = "#0B1426", "#F4F1EA"
PAL = [
  ("A · Ultramaryna", "Głęboki, nasycony niebieski z nutą fioletu, lodowy błękit jako partner i koralowy pomarańcz jako sygnał (kontynuacja obecnego akcentu).",
   [("Ultramaryna","#2A33C7"),("Lód","#B9CCFF"),("Koral","#FF7448")]),
  ("B · Głębia portu", "Morski kobalt, szkło morskie (turkus) jako analogiczny partner i bursztyn jak sodowe światło nabrzeża.",
   [("Kobalt","#123E9C"),("Szkło morskie","#86D3C6"),("Bursztyn","#FFB21F")]),
  ("C · Sygnał", "Jasny lazur, lawenda jako miękki partner i kwaśna limonka, która mocno przełamuje oba.",
   [("Lazur","#1F55EE"),("Lawenda","#D9CEFF"),("Limonka","#D4FF3F")]),
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
