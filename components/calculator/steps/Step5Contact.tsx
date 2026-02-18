"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Imię lub nazwa (min. 2 znaki)"),
  company: z.string().min(1, "Podaj nazwę firmy lub „osoba prywatna”"),
  email: z.string().email("Podaj poprawny adres e-mail"),
  phone: z.string().optional(),
  description: z.string().min(10, "Krótki opis (min. 10 znaków)").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

interface Step5ContactProps {
  defaultValues: Partial<ContactFormValues>;
  onSubmit: (data: ContactFormValues) => void;
  isSubmitting: boolean;
}

export function Step5Contact({
  defaultValues,
  onSubmit,
  isSubmitting,
}: Step5ContactProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: defaultValues.name ?? "",
      company: defaultValues.company ?? "",
      email: defaultValues.email ?? "",
      phone: defaultValues.phone ?? "",
      description: defaultValues.description ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Na podstawie tych danych przygotujemy wycenę i skontaktujemy się w sprawie konsultacji.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="calc-name" className="mb-1.5 block text-sm font-medium text-foreground">
            Imię / nazwa *
          </label>
          <Input
            id="calc-name"
            placeholder="np. Jan Kowalski"
            {...register("name")}
            className={cn(errors.name && "border-accent-orange focus-visible:ring-accent-orange")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-accent-orange">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="calc-company" className="mb-1.5 block text-sm font-medium text-foreground">
            Firma *
          </label>
          <Input
            id="calc-company"
            placeholder="np. Firma Sp. z o.o. lub osoba prywatna"
            {...register("company")}
            className={cn(errors.company && "border-accent-orange focus-visible:ring-accent-orange")}
          />
          {errors.company && (
            <p className="mt-1 text-xs text-accent-orange">{errors.company.message}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="calc-email" className="mb-1.5 block text-sm font-medium text-foreground">
          E-mail *
        </label>
        <Input
          id="calc-email"
          type="email"
          placeholder="jan@firma.pl"
          {...register("email")}
          className={cn(errors.email && "border-accent-orange focus-visible:ring-accent-orange")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-accent-orange">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="calc-phone" className="mb-1.5 block text-sm font-medium text-foreground">
          Telefon (opcjonalnie)
        </label>
        <Input
          id="calc-phone"
          type="tel"
          placeholder="+48 123 456 789"
          {...register("phone")}
        />
      </div>
      <div>
        <label htmlFor="calc-desc" className="mb-1.5 block text-sm font-medium text-foreground">
          Krótki opis projektu (opcjonalnie)
        </label>
        <textarea
          id="calc-desc"
          rows={3}
          placeholder="Opisz w kilku zdaniach, czego potrzebujesz."
          {...register("description")}
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            errors.description && "border-accent-orange focus-visible:ring-accent-orange"
          )}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-accent-orange">{errors.description.message}</p>
        )}
      </div>
      <div className="pt-2">
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto min-w-[200px]">
          {isSubmitting ? "Wysyłanie…" : "Zobacz wycenę i wyślij"}
        </Button>
      </div>
    </form>
  );
}
