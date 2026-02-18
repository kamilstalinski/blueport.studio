"use client";

import { Container } from "@/components/ui/Container";
import {
  ExclamationTriangleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const PROBLEMS = [
  {
    icon: ExclamationTriangleIcon,
    title: "Brak strony",
    description:
      "Twoja firma nie ma wizytówki online. Klienci szukają w internecie i Ciebie nie znajdują.",
  },
  {
    icon: ClockIcon,
    title: "Przestarzała strona",
    description:
      "Strona wygląda na nieaktualną, wolno się ładuje i nie działa dobrze na telefonie.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Brak widoczności w Google",
    description:
      "Strona istnieje, ale nikt jej nie odwiedza. Brak podstawowego SEO i struktury.",
  },
  {
    icon: ShoppingCartIcon,
    title: "Brak sprzedaży online",
    description:
      "Chcesz sprzedawać w internecie, ale nie masz sklepu ani prostego sposobu na zamówienia.",
  },
] as const;

export function LandingProblems() {
  return (
    <section className="border-t border-border bg-section-gray py-section md:py-section-md">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Częste problemy małych firm
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Rozpoznajesz któryś? Pomagamy je rozwiązać.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface-alt p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-accent-orange/40 hover:shadow-lg">
                <Icon className="h-6 w-6 text-primary" strokeWidth={2} aria-hidden />
                <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{description}</p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
