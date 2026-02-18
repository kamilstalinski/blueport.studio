# Phase 1 — Codebase Analysis Summary

## Unused files (safe to delete)

| File | Reason |
|------|--------|
| `components/DarkVeil.tsx` | Never imported anywhere |
| `lib/useTheme.ts` | Never imported; ThemeToggle uses `lib/theme` directly with local state |

## Unused calculator flow (entire alternate flow)

The **active** calculator on `/kalkulator` uses: `Calculator.tsx`, `CalculatorContext`, steps `StepProjectType` / `StepScope` / `StepFeatures` / `StepBudget` / `StepContact` / `StepSummary`, `CalculatorProgressBar`, `components/calculator/types.ts`, and logic in `components/calculator/logic/` (pricingEngine, constants, summary, validation).

The following form-based flow is **never mounted** (no page imports `CalculatorForm`):

| File | Reason |
|------|--------|
| `components/calculator/CalculatorForm.tsx` | Not used by any page |
| `components/calculator/ProgressBar.tsx` | Only used by CalculatorForm |
| `components/calculator/StepWrapper.tsx` | Only used by CalculatorForm |
| `components/calculator/ResultScreen.tsx` | Only used by CalculatorForm |
| `components/calculator/steps/Step1ProjectType.tsx` | Only used by CalculatorForm |
| `components/calculator/steps/Step2Scope.tsx` | Only used by CalculatorForm |
| `components/calculator/steps/Step3Features.tsx` | Only used by CalculatorForm |
| `components/calculator/steps/Step4Timeline.tsx` | Only used by CalculatorForm |
| `components/calculator/steps/Step5Contact.tsx` | Only used by CalculatorForm |
| `store/calculatorStore.ts` | Only used by CalculatorForm |
| `lib/pricingLogic.ts` | Only used by CalculatorForm |
| `types/calculator.ts` | Only used by the above (Form, store, pricingLogic, Step2–5, ResultScreen) |

## Files to refactor (do not delete)

- **StepFeatures.tsx** — TS error: icon type is `ComponentType<{ className?: string }>` but Lucide icons receive `strokeWidth`. Widen to SVG-compatible props.
- **GradualBlur.tsx** — Uses `any` in several places; add proper types.
- **ColorBends.tsx** — Uses `(THREE as any)` and `(renderer as any)`; use proper Three.js types where possible.
- **CalculatorForm.tsx** — Contains `console.log` (will be removed with the unused flow).

## Duplicate / redundant

- **Two calculator systems**: One in use (context + pricingEngine + calculator/types), one unused (store + pricingLogic + types/calculator). Remove unused flow and keep single source of truth.
- **Two type files**: `components/calculator/types.ts` (active) and `types/calculator.ts` (unused flow). After removing unused flow, only `components/calculator/types.ts` remains.

## Structure notes for Phase 4

- No `/src` folder; app, components, lib, types, store, i18n, styles at root. Target: move under `src/` with `app`, `components` (ui, layout, sections), `hooks`, `lib`, `utils`, `types`, `constants`, `styles`.
- `lib/utils.ts` holds `cn`; can stay in lib or move to `utils`.
- ESLint: not configured (only `next lint` in package.json). Prettier: not present.

## TypeScript

- **Current errors**: 2 in `StepFeatures.tsx` (Icon `strokeWidth` not assignable). tsconfig already has `strict: true`.
- **noImplicitAny**: Not explicitly set; strict implies it. Add `noImplicitAny: true` and `strictNullChecks: true` explicitly if desired (already under strict).

## Summary counts

- **Files safe to delete**: 2 standalone + 12 from unused calculator flow = 14 total.
- **Files to merge**: None (remove unused flow instead of merging).
- **Files to refactor**: StepFeatures (fix types), GradualBlur (reduce any), ColorBends (Three types), plus cleanup in Phase 2 (unused imports/vars, console.log).
