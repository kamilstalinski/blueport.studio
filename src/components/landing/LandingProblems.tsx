"use client";

import { Container } from "@/components/ui/Container";
import { IconBox } from "@/components/ui/IconBox";

const PROBLEMS = [
  { emoji: "🌐" as const, title: "Brak strony", description: "Twoja firma nie ma wizytówki online. Klienci szukają w internecie i Ciebie nie znajdują." },
  { emoji: "⏱️" as const, title: "Przestarzała strona", description: "Strona wygląda na nieaktualną, wolno się ładuje i nie działa dobrze na telefonie." },
  { emoji: "🔍" as const, title: "Brak widoczności w Google", description: "Strona istnieje, ale nikt jej nie odwiedza. Brak podstawowego SEO i struktury." },
  { emoji: "🛒" as const, title: "Brak sprzedaży online", description: "Chcesz sprzedawać w internecie, ale nie masz sklepu ani prostego sposobu na zamówienia." },
] as const;

export function LandingProblems() {
  return (
    <section className="border-t border-border bg-transparent py-section md:py-section-md">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Częste problemy małych firm
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Rozpoznajesz któryś? Pomagamy je rozwiązać.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map(({ emoji, title, description }) => (
            <li key={title}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface-alt p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/10 hover:shadow-lg">
                <IconBox emoji={emoji} />
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
