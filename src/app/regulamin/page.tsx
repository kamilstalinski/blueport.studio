import { Section } from "@/components/ui/Section";

export default function RegulaminPage() {
  return (
    <Section as="div" firstOnPage>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Regulamin
      </h1>
      <p className="mt-6 text-muted-foreground">
        Placeholder pod regulamin świadczenia usług. W finalnej wersji umieść: zakres
        usług, warunki współpracy, odpowiedzialność, prawa własności intelektualnej,
        rozwiązanie umowy oraz dane BluePort Studio.
      </p>
      <ul className="mt-8 list-inside list-disc space-y-2 text-muted-foreground">
        <li>Zakres usług i warunki współpracy</li>
        <li>Odpowiedzialność i gwarancje</li>
        <li>Prawa do rezultatów prac (IP)</li>
        <li>Rozwiązanie umowy</li>
        <li>Kontakt: kontakt@blueport.studio</li>
      </ul>
    </Section>
  );
}
