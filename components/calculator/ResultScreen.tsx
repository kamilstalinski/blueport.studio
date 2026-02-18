"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { PriceResult } from "@/types/calculator";
import { Button } from "@/components/ui/Button";

interface ResultScreenProps {
  result: PriceResult;
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function ResultScreen({ result }: ResultScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-10 pb-32"
    >
      <div className="rounded-2xl border border-border bg-surface-alt p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          Szacunkowa inwestycja
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-accent-orange sm:text-4xl">
          {formatPrice(result.minPrice)} – {formatPrice(result.maxPrice)} PLN
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface-alt p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Rekomendowany pakiet
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {result.recommendedPackage}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface-alt p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Szacowany czas
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {result.estimatedTimeline}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        To szacunkowy przedział na podstawie wybranych opcji. Ostateczny zakres
        ustalamy podczas bezpłatnej konsultacji.
      </p>

      <div className="pt-4">
        <Link href="/kontakt" className="inline-block">
          <Button className="w-full sm:w-auto min-w-[260px]">
            Umów bezpłatną konsultację
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
