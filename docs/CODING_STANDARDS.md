# Blueport Studio — Coding Standards & Style Guide

> Prompt dla AI-asystentów i nowych developerów. Obowiązuje w całym repozytorium.
> Ostatnia aktualizacja: 2025

---

## Kontekst projektu

Next.js 14+ App Router, TypeScript strict, Tailwind CSS, Framer Motion. Stack zorientowany na wydajność i SEO. Każdy komponent, hook i util musi być prosty, przewidywalny i dający się przeczytać bez komentarzy.

---

## 1. Zasady ogólne

- **Jeden plik = jedna odpowiedzialność.** Komponenty nie łączą logiki biznesowej z UI.
- **Zero martwego kodu.** Żadnych zakomentowanych bloków, nieużywanych importów, zmiennych zadeklarowanych ale nigdzie niezapisanych.
- **Explicitness over cleverness.** Czytelny kod > sprytny oneliner.
- **DRY, ale nie na siłę.** Jeśli abstrakcja wymaga więcej wyjaśnień niż duplikat — zostaw duplikat.

---

## 2. TypeScript

```ts
// ✅ Zawsze explicit return type w hookach i funkcjach eksportowanych
export function useCalculator(): UseCalculatorReturn { ... }

// ✅ Typy w osobnym pliku (src/types/), re-eksportowane przez barrel
export type { CalculatorState, PriceSummary } from "@/types/calculator.types";

// ❌ Unikaj `any` i `as` casty — użyj type guard lub Zod
const data = response as SomeType; // ❌
if (isSomeType(data)) { ... }      // ✅

// ✅ `const` assertion tam, gdzie obiekt jest read-only
export const PACKAGES = { ... } as const;

// ✅ Destructuruj parametry funkcji — nie przyjmuj "worka" opcji bez interfejsu
function doSomething({ id, label }: { id: string; label: string }) { ... }
```

**Reguły:**
- `strict: true` w tsconfig — bez wyjątków.
- Preferuj `type` nad `interface` dla union types i prostych shape'ów. `interface` dla obiektów rozszerzanych przez OOP.
- Nie używaj `namespace`. Nie używaj `enum` — zamiast tego `as const` object + `keyof typeof`.

---

## 3. Struktura pliku komponentu

Kolejność bloków w każdym pliku `.tsx`:

```tsx
// 1. Dyrektywa (jeśli potrzeba)
"use client";

// 2. Importy — Next.js → React → biblioteki → lokalne (absolutne @/) → typy
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Foo } from "@/types";

// 3. Stałe lokalne komponentu (nie trafią do constants/)
const ITEMS = [...] as const;

// 4. Typy/interfejsy lokalne
interface Props { ... }

// 5. Komponent — default export na końcu, named export dla re-use
export function MyComponent({ prop }: Props) {
  // 5a. Hooki (kolejność: stan → derived → side effects → callbacki)
  const [open, setOpen] = useState(false);
  const label = useMemo(() => ..., []);
  useEffect(() => { ... }, []);
  const handleClick = useCallback(() => { ... }, []);

  // 5b. Early returns (loading, error, guard)
  if (!prop) return null;

  // 5c. JSX
  return ( ... );
}
```

---

## 4. Nazewnictwo

| Element | Konwencja | Przykład |
|---|---|---|
| Komponent React | PascalCase | `HeroSection`, `GlassCard` |
| Hook | `use` + camelCase | `useCalculator`, `useScrollAnimation` |
| Util / helper | camelCase | `calculatePrice`, `cn` |
| Stała / config | SCREAMING_SNAKE | `PACKAGES`, `TIMELINE_MULTIPLIERS` |
| Typ / interfejs | PascalCase | `PackageId`, `CalculatorState` |
| Plik komponentu | PascalCase.tsx | `Hero.tsx`, `SpotlightCard.tsx` |
| Plik hooka | camelCase.ts | `useCalculator.ts` |
| Plik stałych | camelCase.ts | `pricing.ts`, `animations.ts` |

**Nazwy opisują intencję, nie implementację:**
```ts
// ❌
const d = 7;
const arr2 = items.filter(...);

// ✅
const DELIVERY_DAYS = 7;
const availableFeatures = items.filter(...);
```

---

## 5. Hooki — zasady

```ts
// ✅ useCallback dla każdego handlera przekazywanego jako prop lub używanego w useEffect
const handleSubmit = useCallback(async () => { ... }, [state, priceSummary]);

// ✅ useMemo tylko gdy obliczenia są kosztowne lub wynik jest zależnością innego hooka
const priceSummary = useMemo(() => calculatePrice(...), [projectType, features]);

// ❌ Nie owijaj w useMemo prymitywów i prostych operacji
const label = useMemo(() => `od ${price} zł`, [price]); // ❌ — zwykła zmienna wystarczy

// ✅ Jeden hook = jedna odpowiedzialność
// useCalculator zarządza stanem kalkulatora — nie dotyka DOM, nie robi fetch poza handleSubmit
```

---

## 6. Komponenty stron (`app/**/page.tsx`)

- Strony są **Server Components** domyślnie. `"use client"` tylko gdy niezbędne.
- Strona nie zawiera logiki — wyłącznie kompozycja sekcji:

```tsx
// ✅
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemRozwiazanie />
      <CTA />
    </>
  );
}

// ❌ Nie umieszczaj inline JSX z logiką w page.tsx
```

- `dynamic()` z `{ ssr: true }` dla sekcji poniżej fold — zachowaj wzorzec z `page.tsx`.
- Każda podstrona ma `layout.tsx` z `metadata` — nie definiuj `metadata` w `page.tsx`.

---

## 7. Stałe i pricing (`src/constants/`)

- **Single source of truth** — żadnych hardcodowanych cen ani etykiet w komponentach.
- Eksportuj pure funkcje obliczeniowe (`calculatePrice`, `getFeaturesForPackage`) — bez side effects, bez zależności od React.
- Typy wyprowadzaj z obiektów `as const`, nie deklaruj ręcznie:

```ts
// ✅
export type PackageId = keyof typeof PACKAGES;

// ❌
export type PackageId = "strona-start" | "strona-pro" | ...; // duplikacja, desync
```

---

## 8. Animacje (`src/constants/animations.ts`)

- Wszystkie `variants`, `ease`, `duration` definiuj w `animations.ts` — zero magic numbers w komponentach.
- Używaj `useMotionSafe()` wszędzie tam, gdzie animacja jest dekoracyjna (respektuje `prefers-reduced-motion`).
- `useScrollAnimation()` jako domyślny trigger dla sekcji — nie pisz własnych `useInView` inline.

```tsx
// ✅
const { ref, animate } = useScrollAnimation();
<motion.section ref={ref} variants={variants.fadeUp} animate={animate} />

// ❌
const ref = useRef(null);
const isInView = useInView(ref, { once: true });
<motion.section ref={ref} animate={isInView ? { opacity: 1 } : { opacity: 0 }} />
```

---

## 9. Styling — Tailwind

- **Nie mieszaj** inline `style` z Tailwind, chyba że wartość jest dynamiczna i niemożliwa do wyrażenia klasą (np. `borderRadius` z JS, `backdropFilter` z CSS variables).
- Dynamiczne klasy przez `cn()` (clsx + twMerge) — nigdy template literals z warunkami.

```tsx
// ✅
className={cn("base-class", isActive && "text-primary", variant === "ghost" && "bg-transparent")}

// ❌
className={`base-class ${isActive ? "text-primary" : ""}`}
```

- Kolejność klas: layout → spacing → sizing → typography → color → border → shadow → animation → state (`hover:`, `focus:`, `group-*`).
- Warianty komponentów (np. `cardVariant`) rozwiązuj mapą, nie if-chain:

```ts
const variantClass: Record<CardVariant, string> = {
  default: "bg-card",
  subpage: "bg-card/80",
};
```

---

## 10. Nawigacja i routing

- Zawsze `Link` z `next/link` — nigdy `<a>` dla tras wewnętrznych.
- `usePathname()` do active state — wzorzec z `Navbar.tsx` jako standard:

```ts
const isActive = link.href === "/"
  ? pathname === "/" || pathname === ""
  : pathname === link.href || pathname.startsWith(link.href + "/");
```

- Nie sprawdzaj active state w pętli przez warunki inline — wydziel do zmiennej.

---

## 11. Obrazy i media

- Zawsze `Image` z `next/image` — nigdy `<img>`.
- `alt=""` dla ikon dekoracyjnych (+ `aria-hidden` na wrapperze).
- `alt` opisujący treść dla obrazów merytorycznych.
- Nie używaj `width`/`height` zgadywanych — mierz faktyczny asset.

---

## 12. Dostępność (a11y)

- Interaktywne elementy: `<button>` lub `<a>` — nie `<div onClick>`.
- Własne toggle (menu mobilne): `aria-expanded`, `aria-controls`, `aria-label` — wzorzec z `Navbar.tsx`.
- Elementy dekoracyjne: `aria-hidden="true"`.
- `sr-only` dla tekstów tylko dla screen readerów.

---

## 13. Czego nie robić — lista anty-wzorców

```tsx
// ❌ Zakomentowany kod — usuń, git pamięta
// const oldHandler = () => { ... }

// ❌ Nieużywany import
import { useEffect } from "react"; // jeśli useEffect nie jest w pliku

// ❌ Pusty useEffect / handler
useEffect(() => {}, []);

// ❌ `console.log` w kodzie produkcyjnym
console.log("debug", state);

// ❌ Inline handler z logiką — wydziel do useCallback
<button onClick={() => { setState(...); doSomethingElse(); }}>

// ❌ Magic string / number bez stałej
if (price > 28000) { ... } // co to jest 28000?
// ✅
if (price > MAX_PRICE) { ... }

// ❌ Komponent robiący zbyt wiele — split na mniejsze
// Jeśli komponent przekracza ~150 linii JSX — prawdopodobnie czas go podzielić

// ❌ Props drilling > 2 poziomy — użyj Context lub przenieś stan wyżej/niżej
```

---

## 14. Struktura katalogów (referencja)

```
src/
├── app/                    # Next.js App Router — tylko strony i layouty
│   ├── page.tsx            # Home
│   ├── kalkulator/
│   │   ├── layout.tsx      # metadata tu, nie w page
│   │   └── page.tsx
│   └── [inne podstrony]/
├── components/
│   ├── layout/             # Navbar, Footer — singleton per app
│   ├── sections/           # Sekcje stron (Hero, CTA, FAQ...)
│   └── ui/                 # Atomowe komponenty UI (Button, Section, GlassCard)
├── constants/              # Stałe, pricing, animacje — zero React
├── hooks/                  # Custom hooks — tylko React
├── lib/                    # Utils, helpers — zero React
└── types/                  # Typy TypeScript — zero logiki
```

---

## 15. Code review checklist

Przed każdym PR sprawdź:

- [ ] Brak `any`, brak `// @ts-ignore`
- [ ] Brak zakomentowanego kodu
- [ ] Brak nieużywanych importów i zmiennych
- [ ] Brak `console.log`
- [ ] Ceny/etykiety pobierane z `constants/pricing.ts`
- [ ] Animacje używają `useMotionSafe()` i wariantów z `constants/animations.ts`
- [ ] Klasy dynamiczne przez `cn()`, nie template literals
- [ ] Obrazy przez `next/image` z właściwym `alt`
- [ ] Interaktywne elementy dostępne klawiaturowo
- [ ] Komponent nie przekracza ~150 linii JSX (jeśli tak — rozważ podział)
- [ ] Typy wyprowadzane z `as const`, nie ręcznie powielane
