"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProjectType, WebsiteScope, StoreScope } from "@/types/calculator";

const WEBSITE_OPTIONS: { value: WebsiteScope; label: string }[] = [
  { value: "3-5-pages", label: "3–5 stron" },
  { value: "5-10-pages", label: "5–10 stron" },
  { value: "10-plus-pages", label: "10+ stron" },
];

const STORE_OPTIONS: { value: StoreScope; label: string }[] = [
  { value: "up-to-20", label: "do 20 produktów" },
  { value: "20-100", label: "20–100 produktów" },
  { value: "100-plus", label: "100+ produktów" },
];

interface Step2ScopeProps {
  projectType: ProjectType;
  websiteScope: WebsiteScope | null;
  storeScope: StoreScope | null;
  onWebsiteScope: (value: WebsiteScope) => void;
  onStoreScope: (value: StoreScope) => void;
}

export function Step2Scope({
  projectType,
  websiteScope,
  storeScope,
  onWebsiteScope,
  onStoreScope,
}: Step2ScopeProps) {
  const isWebsite = projectType === "company-website" || projectType === "redesign";
  const isStore = projectType === "online-store";
  const options = isWebsite ? WEBSITE_OPTIONS : isStore ? STORE_OPTIONS : null;
  const value = isWebsite ? websiteScope : isStore ? storeScope : null;

  const handleSelect = (optValue: WebsiteScope | StoreScope) => {
    if (isWebsite) onWebsiteScope(optValue as WebsiteScope);
    else if (isStore) onStoreScope(optValue as StoreScope);
  };

  if (projectType === "dedicated-app") {
    return (
      <p className="text-muted-foreground">
        Dedykowana aplikacja (Next.js) — wycena zależy od wybranych funkcji w kolejnym kroku.
      </p>
    );
  }

  if (!options) return null;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {isWebsite
          ? "Jaki zakres stron planujesz?"
          : "Ile produktów ma mieć sklep?"}
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((opt) => (
          <motion.button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(opt.value)}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-colors",
              value === opt.value
                ? "border-accent-orange bg-accent-orange-subtle text-accent-orange"
                : "border-border bg-surface-alt text-foreground hover:border-white/25 hover:bg-surface"
            )}
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
