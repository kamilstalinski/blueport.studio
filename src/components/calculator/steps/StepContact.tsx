"use client";

import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import type { StepContactProps } from "@/types";
import { PRIORITY_OPTIONS } from "../logic/calculatorOptions";
import { CALC_CARD_BASE, CALC_CARD_UNSELECTED, CALC_CARD_SELECTED } from "../calculatorStyles";

export function StepContact({
  projectPriority,
  name,
  email,
  phone,
  onProjectPriorityChange,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  error,
}: StepContactProps) {
  return (
    <div data-step="contact" className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Dane kontaktowe
      </h2>
      <p className="text-muted-foreground">
        Na podstawie tych danych przygotujemy wycenę i skontaktujemy się w sprawie konsultacji.
      </p>

      <div>
        <h3 className="mb-3 text-lg font-medium text-foreground">Co jest dla Ciebie najważniejsze?</h3>
        <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Priorytet">
          {PRIORITY_OPTIONS.map((opt) => {
            const isSelected = projectPriority === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onProjectPriorityChange(opt.value)}
                className={cn(
                  CALC_CARD_BASE,
                  "flex flex-col items-start gap-1 text-left font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.99]",
                  isSelected ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
                )}
                aria-pressed={isSelected}
              >
                <span>{opt.label}</span>
                {opt.description && (
                  <span className="text-sm font-normal text-muted-foreground">{opt.description}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
          {error}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground">Imię / nazwa *</span>
          <Input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="np. Jan Kowalski"
            required
            aria-required
            className={cn(
              "h-12 rounded-xl border-border bg-white/15 text-foreground placeholder:text-muted-foreground/80 focus:border-primary focus:ring-primary"
            )}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground">E-mail *</span>
          <Input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="jan@firma.pl"
            required
            aria-required
            className={cn(
              "h-12 rounded-xl border-border bg-white/15 text-foreground placeholder:text-muted-foreground/80 focus:border-primary focus:ring-primary"
            )}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground">Telefon (opcjonalnie)</span>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="+48 123 456 789"
          className={cn(
            "h-12 max-w-sm rounded-xl border-border bg-white/15 text-foreground placeholder:text-muted-foreground/80 focus:border-primary focus:ring-primary"
          )}
        />
      </label>
    </div>
  );
}
