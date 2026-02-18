"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LocaleSwitcherVariant = "default" | "dark";

export function LocaleSwitcher({
  variant = "default"
}: {
  variant?: LocaleSwitcherVariant;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-md p-0.5 text-xs font-medium uppercase tracking-wider",
        isDark
          ? "border border-white/25 bg-white/10"
          : "border border-border bg-background/80"
      )}
    >
      <button
        type="button"
        onClick={() => switchLocale("pl")}
        className={cn(
          "rounded px-2 py-1 transition-colors",
          locale === "pl"
            ? isDark
              ? "bg-white text-[#010A2B]"
              : "bg-primary text-white"
            : isDark
              ? "text-white/80 hover:text-white"
              : "text-text-secondary hover:text-foreground"
        )}
        aria-label="Polski"
      >
        PL
      </button>
      <span className={isDark ? "text-white/30" : "text-border"}>|</span>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={cn(
          "rounded px-2 py-1 transition-colors",
          locale === "en"
            ? isDark
              ? "bg-white text-[#010A2B]"
              : "bg-primary text-white"
            : isDark
              ? "text-white/80 hover:text-white"
              : "text-text-secondary hover:text-foreground"
        )}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
