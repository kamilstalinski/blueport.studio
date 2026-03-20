import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  alternates: { canonical: "https://blueport.studio/polityka-prywatnosci" },
  robots: { index: false, follow: false },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <Section as="div" firstOnPage>
      <div className="container-narrow">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Polityka prywatności
        </h1>
        <p className="mt-6 text-muted-foreground">
          https://blueport.studio | Obowiązuje od: 20 marca 2026
        </p>

        <div className="mt-10 space-y-10 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">§1. Administrator danych osobowych</h2>
          <p className="mt-4 leading-relaxed">
            Administratorem Twoich danych osobowych jest Kamil Staliński, prowadzący działalność pod
            nazwą Blueport Studio, ul. Panoramiczna 5/6, 71-447 Szczecin, NIP: 5252788177, REGON:
            383198229. Kontakt w sprawach dotyczących danych osobowych: kontakt@blueport.studio.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§2. Jakie dane zbieramy</h2>
          <p className="mt-4 leading-relaxed">
            W zależności od sposobu korzystania ze strony, możemy zbierać następujące dane:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 leading-relaxed">
            <li>
              Imię i adres e-mail — podane dobrowolnie przez formularz kontaktowy lub kalkulator wyceny.
            </li>
            <li>Numer telefonu — jeśli zostanie podany opcjonalnie w formularzu.</li>
            <li>
              Informacje o projekcie (typ, budżet, opis) — przekazane przez kalkulator wyceny.
            </li>
            <li>
              Dane techniczne — adres IP, typ przeglądarki, system operacyjny, strony odwiedzane w serwisie
              (pliki cookies i logi serwera).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§3. Cel i podstawa prawna przetwarzania</h2>
          <p className="mt-4 leading-relaxed">
            Twoje dane przetwarzamy w następujących celach:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 leading-relaxed">
            <li>
              Odpowiedź na wiadomość i prowadzenie korespondencji (art. 6 ust. 1 lit. b RODO — niezbędność
              do wykonania umowy lub podjęcia działań na żądanie osoby przed zawarciem umowy).
            </li>
            <li>Przesłanie wyceny i oferty współpracy (art. 6 ust. 1 lit. b RODO).</li>
            <li>
              Wypełnienie obowiązków prawnych, m.in. podatkowych i rachunkowych (art. 6 ust. 1 lit. c RODO).
            </li>
            <li>
              Analiza ruchu na stronie i poprawa jej funkcjonowania — na podstawie uzasadnionego interesu
              administratora (art. 6 ust. 1 lit. f RODO).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§4. Odbiorcy danych</h2>
          <p className="mt-4 leading-relaxed">Twoje dane możemy przekazywać następującym podmiotom:</p>
          <ul className="mt-4 list-inside list-disc space-y-2 leading-relaxed">
            <li>Resend Inc. — w celu wysyłki wiadomości e-mail (serwer pocztowy).</li>
            <li>Supabase Inc. — w celu przechowywania danych z formularzy (baza danych).</li>
            <li>Hetzner Online GmbH — dostawca serwera VPS, na którym hostowana jest strona.</li>
            <li>
              Google LLC — w zakresie usług analitycznych (Google Analytics), jeśli są wdrożone.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            Wszystkie podmioty są zobowiązane do przetwarzania danych zgodnie z obowiązującymi przepisami
            i wyłącznie w zakresie niezbędnym do świadczenia usług.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§5. Przekazywanie danych poza EOG</h2>
          <p className="mt-4 leading-relaxed">
            Część podmiotów wymienionych w §4 (m.in. Resend, Supabase, Google) może przetwarzać dane poza
            Europejskim Obszarem Gospodarczym. Przekazanie odbywa się na podstawie standardowych klauzul
            umownych zatwierdzonych przez Komisję Europejską lub w ramach programów certyfikacji
            zapewniających odpowiedni poziom ochrony.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§6. Okres przechowywania danych</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 leading-relaxed">
            <li>
              Dane z formularzy kontaktowych — przez czas niezbędny do obsługi zapytania, jednak nie dłużej
              niż 2 lata od ostatniego kontaktu.
            </li>
            <li>
              Dane z wyceń i umów — przez 5 lat od zakończenia współpracy (wymogi podatkowe).
            </li>
            <li>
              Dane analityczne (logi, cookies) — do 26 miesięcy.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§7. Twoje prawa</h2>
          <p className="mt-4 leading-relaxed">
            W związku z przetwarzaniem Twoich danych osobowych przysługują Ci następujące prawa:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 leading-relaxed">
            <li>Prawo dostępu do danych (art. 15 RODO).</li>
            <li>Prawo do sprostowania danych (art. 16 RODO).</li>
            <li>Prawo do usunięcia danych (&quot;prawo do bycia zapomnianym&quot;) (art. 17 RODO).</li>
            <li>Prawo do ograniczenia przetwarzania (art. 18 RODO).</li>
            <li>Prawo do przenoszenia danych (art. 20 RODO).</li>
            <li>Prawo do sprzeciwu wobec przetwarzania (art. 21 RODO).</li>
            <li>
              Prawo do wniesienia skargi do organu nadzorczego — Prezesa Urzędu Ochrony Danych Osobowych
              (ul. Stawki 2, 00-193 Warszawa, www.uodo.gov.pl).
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            Aby skorzystać z powyższych praw, skontaktuj się z nami pod adresem: kontakt@blueport.studio.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§8. Pliki cookies</h2>
          <p className="mt-4 leading-relaxed">
            Strona może używać plików cookies (ciasteczek) w następujących celach:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 leading-relaxed">
            <li>
              Cookies niezbędne — zapewniają prawidłowe działanie strony (sesja, preferencje).
            </li>
            <li>
              Cookies analityczne — umożliwiają analizę ruchu i zachowań użytkowników (np. Google Analytics).
              Wymagają Twojej zgody.
            </li>
            <li>
              Cookies marketingowe — jeśli są stosowane, wymagają wyraźnej zgody.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            Możesz zarządzać ustawieniami cookies poprzez ustawienia swojej przeglądarki lub panel zgód
            dostępny na stronie. Odrzucenie cookies analitycznych i marketingowych nie wpływa na korzystanie
            z podstawowych funkcji serwisu.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§9. Bezpieczeństwo danych</h2>
          <p className="mt-4 leading-relaxed">
            Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych przed
            nieuprawnionym dostępem, utratą lub zniszczeniem. Dane przesyłane są z wykorzystaniem protokołu
            HTTPS (szyfrowanie TLS). Dostęp do danych mają wyłącznie osoby upoważnione.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§10. Zmiany polityki prywatności</h2>
          <p className="mt-4 leading-relaxed">
            Zastrzegamy sobie prawo do zmiany niniejszej Polityki Prywatności. O istotnych zmianach poinformujemy
            poprzez aktualizację daty na początku dokumentu. Aktualna wersja jest zawsze dostępna pod adresem:
            https://blueport.studio/polityka-prywatnosci.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§11. Kontakt</h2>
          <p className="mt-4 leading-relaxed">
            W sprawach dotyczących ochrony danych osobowych prosimy o kontakt: kontakt@blueport.studio.
          </p>
          <p className="mt-4 leading-relaxed">
            Blueport Studio | Kamil Staliński, prowadzący działalność pod nazwą Blueport Studio, ul.
            Panoramiczna 5/6, 71-447 Szczecin, NIP: 5252788177, REGON: 383198229
          </p>
        </section>
        </div>
      </div>
    </Section>
  );
}
