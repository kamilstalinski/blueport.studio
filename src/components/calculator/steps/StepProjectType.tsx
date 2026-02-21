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

function TierSwitch({
  category,
  tier,
  onTierChange,
}: {
  category: "wordpress" | "woocommerce";
  tier: ProjectTier;
  onTierChange: (cat: "wordpress" | "woocommerce", t: ProjectTier) => void;
}) {
  const isPro = tier === "pro";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTierChange(category, isPro ? "standard" : "pro");
  };

  return (
    <div
      className="mt-2 flex items-center gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        role="switch"
        aria-checked={isPro}
        aria-label={isPro ? "Wariant Pro włączony" : "Wariant Standard włączony"}
        onClick={handleClick}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
          "hover:before:absolute hover:before:inset-0 hover:before:rounded-full hover:before:content-['']",
          isPro
            ? "bg-primary/30 hover:before:bg-primary/10"
            : "bg-white/20 hover:before:bg-white/10"
        )}
        style={{
          boxShadow: isPro ? "0 2px 8px var(--color-primary-glow)" : "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 rounded-full transition-all duration-200 mt-0.5 ml-0.5",
            "shadow-sm",
            isPro
              ? "translate-x-5 bg-primary"
              : "translate-x-0 bg-white"
          )}
          style={{
            boxShadow: isPro
              ? "0 2px 6px var(--color-primary-glow)"
              : "0 2px 4px rgba(0,0,0,0.15)",
          }}
        />
      </button>
      <span
        className={cn(
          "text-xs font-medium uppercase tracking-wide transition-colors duration-200",
          isPro ? "text-primary" : "text-muted-foreground/60"
        )}
      >
        PRO
      </span>
    </div>
  );
}

function ProjectTypeCardContent({
  option,
  afterSubtitle,
}: {
  option: ProjectTypeOption;
  afterSubtitle?: React.ReactNode;
}) {
  return (
    <>
      <span className="text-base">{option.title}</span>
      <span className="text-sm text-muted-foreground mt-0.5">{option.subtitle}</span>
      {afterSubtitle}
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
    const tierForCat =
      cat === "wordpress" || cat === "woocommerce"
        ? category === cat
          ? tier
          : "standard"
        : "standard";
    onChange(projectTypeFromCategoryTier(cat, tierForCat));
  };

  const handleTierChangeInCard = (cat: "wordpress" | "woocommerce", newTier: ProjectTier) => {
    onChange(projectTypeFromCategoryTier(cat, newTier));
  };

  const tierWordpress: ProjectTier =
    value && categoryFromProjectType(value) === "wordpress" ? tierFromProjectType(value) : "standard";
  const tierWooCommerce: ProjectTier =
    value && categoryFromProjectType(value) === "woocommerce" ? tierFromProjectType(value) : "standard";

  const cardClass = (isSelected: boolean) =>
    cn(
      CALC_CARD_BASE,
      "flex flex-col flex-1 min-w-0 font-medium text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
      isSelected ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
    );

  return (
    <div data-step="project-type" className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Czego potrzebujesz?
      </h2>
      <p className="text-muted-foreground">
        Wybierz rodzaj projektu, który najlepiej opisuje Twoje potrzeby.
      </p>

      <div
        className="grid gap-4 sm:grid-cols-3 lg:gap-6 items-stretch"
        role="group"
        aria-label="Rodzaj projektu"
      >
        {/* Card: Strona firmowa (ze switchem w środku) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleCategorySelect("wordpress")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCategorySelect("wordpress");
            }
          }}
          className={cardClass(category === "wordpress")}
          aria-pressed={category === "wordpress"}
          aria-required
        >
          <ProjectTypeCardContent
            option={getProjectTypeOptionForCategoryTier("wordpress", tierWordpress)}
            afterSubtitle={
              <TierSwitch
                category="wordpress"
                tier={tierWordpress}
                onTierChange={handleTierChangeInCard}
              />
            }
          />
        </div>

        {/* Card: Sklep (ze switchem w środku) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleCategorySelect("woocommerce")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCategorySelect("woocommerce");
            }
          }}
          className={cardClass(category === "woocommerce")}
          aria-pressed={category === "woocommerce"}
          aria-required
        >
          <ProjectTypeCardContent
            option={getProjectTypeOptionForCategoryTier("woocommerce", tierWooCommerce)}
            afterSubtitle={
              <TierSwitch
                category="woocommerce"
                tier={tierWooCommerce}
                onTierChange={handleTierChangeInCard}
              />
            }
          />
        </div>

        {/* Card: Projekt dedykowany (bez switcha) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleCategorySelect("nextjs")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCategorySelect("nextjs");
            }
          }}
          className={cardClass(category === "nextjs")}
          aria-pressed={category === "nextjs"}
          aria-required
        >
          <ProjectTypeCardContent option={getProjectTypeOptionForCategoryTier("nextjs", "standard")} />
        </div>
      </div>
    </div>
  );
}
