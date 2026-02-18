"use client";

import { Container } from "@/components/ui/Container";
import {
  ClipboardDocumentCheckIcon,
  PhoneIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const STEPS = [
  { icon: ClipboardDocumentCheckIcon, label: "Wycena" },
  { icon: PhoneIcon, label: "Konsultacja" },
  { icon: CodeBracketIcon, label: "Realizacja" },
  { icon: RocketLaunchIcon, label: "Wdrożenie" },
] as const;

export function LandingProcess() {
  return (
    <section className="border-t border-border bg-section-gray py-section md:py-section-md">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Jak pracujemy
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Prosty, przewidywalny proces.
        </p>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, label }, index) => (
            <li key={label} className="flex flex-col items-center text-center">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white"
                aria-hidden
              >
                {index + 1}
              </span>
              <Icon
                className="mt-4 h-6 w-6 text-primary"
                strokeWidth={2}
                aria-hidden
              />
              <p className="mt-2 font-medium text-foreground">{label}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
