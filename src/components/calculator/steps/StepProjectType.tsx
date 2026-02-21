"use client";

import { cn } from "@/lib/utils";
import type { StepProjectTypeProps } from "@/types";
import {
  type ProjectCategory,
  type ProjectTier,
  type ProjectTypeOption,
  projectTypeFromCategoryTier,
  categoryFromProjectType,
  tierFromProjectType,
  getProjectTypeOptionForCategoryTier,
} from "../logic/calculatorOptions";
import { CALC_CARD_BASE, CALC_CARD_UNSELECTED, CALC_CARD_SELECTED } from "../calculatorStyles";

export type { StepProjectTypeProps } from "@/types";

function ProjectTypeCardContent({ option }: { option: ProjectTypeOption }) {
  return (
    <>
      <span className="text-base">{option.title}</span>
      <span className="text-sm text-muted-foreground mt-0.5">{option.subtitle}</span>
      <ul className="mt-3 space-y-1.5 text-sm text-foreground/85">
        {option.includes.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="text-primary/70 mt-0.5 shrink-0" aria-hidden>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {option.techNote && (
        <span className="mt-2 text-xs text-muted-foreground">{option.techNote}</span>
      )}
    </>
  );
}

const CATEGORIES: ProjectCategory[] = ["wordpress", "woocommerce", "nextjs"];

export function StepProjectType({ value, onChange }: StepProjectTypeProps) {
  const category: ProjectCategory | null = value ? categoryFromProjectType(value) : null;
  const tier: ProjectTier = value ? tierFromProjectType(value) : "standard";

  const handleCategorySelect = (cat: ProjectCategory) => {
    onChange(projectTypeFromCategoryTier(cat, tier));
  };

  const handleTierChange = (newTier: ProjectTier) => {
    if (category === "wordpress" || category === "woocommerce") {
      onChange(projectTypeFromCategoryTier(category, newTier));
    }
  };

  const showTierSwitch = category === "wordpress" || category === "woocommerce";

  return (
    <div data-step="project-type" className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Czego potrzebujesz?
      </h2>
      <p className="text-muted-foreground">
        Wybierz rodzaj projektu, który najlepiej opisuje Twoje potrzeby.
      </p>

      {/* Mobile: switch on top, then 3 cards */}
      <div className="sm:hidden space-y-4">
        <div className="flex justify-center">
          <div
            className={cn(
              "inline-flex rounded-xl border-2 border-white/20 bg-white/10 p-1",
              !showTierSwitch && "opacity-50"
            )}
            role="group"
            aria-label="Wariant Standard / Pro"
          >
            <button
              type="button"
              onClick={() => handleTierChange("standard")}
              disabled={!showTierSwitch}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                tier === "standard"
                  ? "bg-primary/20 text-primary border border-primary/40"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              )}
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => handleTierChange("pro")}
              disabled={!showTierSwitch}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                tier === "pro"
                  ? "bg-primary/20 text-primary border border-primary/40"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              )}
            >
              Pro
            </button>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1">
          {CATEGORIES.map((cat) => {
            const option = getProjectTypeOptionForCategoryTier(cat, tier);
            const isSelected = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={cn(
                  CALC_CARD_BASE,
                  "flex flex-col flex-1 font-medium text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                  isSelected ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
                )}
                aria-pressed={isSelected}
                aria-required
              >
                <ProjectTypeCardContent option={option} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: [Card] [Switch] [Card] [Card] */}
      <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr_1fr] gap-4 lg:gap-6 items-stretch" role="group" aria-label="Rodzaj projektu">
        {/* Card: Strona firmowa */}
        <button
          type="button"
          onClick={() => handleCategorySelect("wordpress")}
          className={cn(
            CALC_CARD_BASE,
            "flex flex-col flex-1 min-w-0 font-medium text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
            category === "wordpress" ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
          )}
          aria-pressed={category === "wordpress"}
          aria-required
        >
          <ProjectTypeCardContent option={getProjectTypeOptionForCategoryTier("wordpress", tier)} />
        </button>
        {/* Switch Standard / Pro */}
        <div className="flex items-center justify-center min-w-[140px]">
          <div
            className={cn(
              "inline-flex rounded-xl border-2 border-white/20 bg-white/10 p-1",
              !showTierSwitch && "opacity-50"
            )}
            role="group"
            aria-label="Wariant Standard / Pro"
          >
            <button
              type="button"
              onClick={() => handleTierChange("standard")}
              disabled={!showTierSwitch}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                tier === "standard"
                  ? "bg-primary/20 text-primary border border-primary/40"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              )}
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => handleTierChange("pro")}
              disabled={!showTierSwitch}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                tier === "pro"
                  ? "bg-primary/20 text-primary border border-primary/40"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              )}
            >
              Pro
            </button>
          </div>
        </div>
        {/* Card: Sklep */}
        <button
          type="button"
          onClick={() => handleCategorySelect("woocommerce")}
          className={cn(
            CALC_CARD_BASE,
            "flex flex-col flex-1 min-w-0 font-medium text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
            category === "woocommerce" ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
          )}
          aria-pressed={category === "woocommerce"}
          aria-required
        >
          <ProjectTypeCardContent option={getProjectTypeOptionForCategoryTier("woocommerce", tier)} />
        </button>
        {/* Card: Projekt dedykowany */}
        <button
          type="button"
          onClick={() => handleCategorySelect("nextjs")}
          className={cn(
            CALC_CARD_BASE,
            "flex flex-col flex-1 min-w-0 font-medium text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
            category === "nextjs" ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
          )}
          aria-pressed={category === "nextjs"}
          aria-required
        >
          <ProjectTypeCardContent option={getProjectTypeOptionForCategoryTier("nextjs", tier)} />
        </button>
      </div>
    </div>
  );
}
