"use client";

import { Container } from "@/components/ui/Container";
import { IconBox } from "@/components/ui/IconBox";

const SERVICES = [
  { emoji: "🌐" as const, title: "Strony firmowe (WordPress)", price: "2 500 – 5 000 zł", features: ["CMS", "SEO basic", "Mobile friendly", "3–10 podstron"] },
  { emoji: "🛒" as const, title: "Sklepy internetowe", price: "4 900 – 9 000 zł", features: ["WooCommerce", "Płatności online", "Produkty", "Optymalizacja sprzedaży"] },
  { emoji: "💻" as const, title: "Projekty dedykowane (Next.js)", price: "od 6 500 zł", features: ["Custom UI", "Wysoka wydajność", "Skalowalność", "Integracje"] },
] as const;

export function LandingServices() {
  return (
    <section className="border-t border-border bg-transparent py-section md:py-section-md">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Co oferujemy
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Jasne pakiety i zakresy cenowe.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {SERVICES.map(({ emoji, title, price, features }) => (
            <article
              key={title}
              className="flex flex-col rounded-2xl border border-border bg-surface-alt p-6"
            >
              <IconBox emoji={emoji} />
              <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-lg font-medium text-foreground">{price}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary shrink-0" aria-hidden>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
