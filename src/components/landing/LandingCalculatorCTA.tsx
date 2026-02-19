"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function LandingCalculatorCTA() {
  return (
    <section className="border-t border-border bg-section-gray py-section md:py-section-md">
      <Container className="text-center">
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Sprawdź koszt realizacji w 60 sekund.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Wypełnij kalkulator i poznaj szacunkową wycenę.
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/kalkulator">
            <Button className="min-w-[220px]">Przejdź do kalkulatora</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
