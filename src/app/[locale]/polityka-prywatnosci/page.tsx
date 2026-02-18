import { Section } from "@/components/ui/Section";

export default function PolitykaPrywatnosciPage() {
  return (
    <Section as="div" firstOnPage>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Polityka prywatności
      </h1>
      <p className="mt-6 text-muted-foreground">
        Ta strona jest placeholderem pod pełną politykę prywatności. W finalnej wersji
        umieść: jakie dane zbieramy (np. formularz, cookies), cele przetwarzania, podstawy
        prawne, okres przechowywania, prawa użytkownika (dostęp, usunięcie, skarga do UODO)
        oraz dane kontaktowe administratora.
      </p>
      <ul className="mt-8 list-inside list-disc space-y-2 text-muted-foreground">
        <li>Dane z formularza kontaktowego</li>
        <li>Cookies (niezbędne, analityka — zgodnie z konfiguracją)</li>
        <li>Prawa użytkownika (RODO)</li>
        <li>Kontakt: kontakt@blueport.studio</li>
      </ul>
    </Section>
  );
}
