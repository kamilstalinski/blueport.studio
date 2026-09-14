import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamin",
  alternates: { canonical: "https://blueport.studio/regulamin" },
  robots: { index: false, follow: false },
};

export default function RegulaminPage() {
  return (
    <section className="sec legal-page">
      <div className="shell legal-shell">
        <h1 className="d2">Regulamin</h1>
        <p className="meta legal-date">https://blueport.studio | Obowiązuje od: 20 marca 2026</p>

        <article className="legal">
        <section>
          <h2>§1. Definicje</h2>
          <p>
            Użyte w niniejszym Regulaminie pojęcia oznaczają:
          </p>
          <ul>
            <li>
              <strong>Usługodawca</strong> — Kamil Staliński, prowadzący działalność pod nazwą Blueport Studio, ul.
              Panoramiczna 5/6, 71-447 Szczecin, NIP: 5252788177, REGON: 383198229.
            </li>
            <li>
              <strong>Usługobiorca / Klient</strong> — osoba fizyczna, osoba prawna lub jednostka organizacyjna
              nieposiadająca osobowości prawnej, która korzysta z usług Usługodawcy.
            </li>
            <li>
              <strong>Strona</strong> — serwis internetowy dostępny pod adresem https://blueport.studio.
            </li>
            <li>
              <strong>Usługi</strong> — projektowanie i tworzenie stron internetowych, sklepów internetowych,
              aplikacji webowych oraz powiązane usługi dodatkowe.
            </li>
            <li>
              <strong>Umowa</strong> — umowa o świadczenie usług zawierana pomiędzy Usługodawcą a Klientem.
            </li>
            <li>
              <strong>Brief</strong> — dokument określający zakres projektu, wymagania i oczekiwania Klienta.
            </li>
          </ul>
        </section>

        <section>
          <h2>§2. Postanowienia ogólne</h2>
          <p>
            Niniejszy Regulamin określa zasady korzystania z serwisu internetowego Blueport Studio oraz warunki
            świadczenia usług tworzenia stron internetowych i aplikacji webowych.
          </p>
          <p>
            Korzystanie z serwisu oraz złożenie zamówienia jest równoznaczne z akceptacją niniejszego Regulaminu
            w całości.
          </p>
          <p>
            Usługodawca zastrzega sobie prawo do zmiany Regulaminu. Zmiany wchodzą w życie z chwilą
            opublikowania ich na stronie. Zmiana Regulaminu nie wpływa na umowy już zawarte.
          </p>
        </section>

        <section>
          <h2>§3. Zakres usług</h2>
          <p>Blueport Studio świadczy następujące usługi:</p>
          <ul>
            <li>Projektowanie i tworzenie stron internetowych (WordPress, Next.js).</li>
            <li>Tworzenie sklepów internetowych (WooCommerce, Next.js Commerce).</li>
            <li>Projektowanie interfejsów użytkownika (UI/UX).</li>
            <li>Optymalizacja SEO stron internetowych.</li>
            <li>Konfiguracja hostingu i domeny.</li>
            <li>Wsparcie techniczne i opieka powdrożeniowa.</li>
          </ul>
          <p>
            Szczegółowy zakres usługi jest każdorazowo ustalany indywidualnie i określany w ofercie lub umowie.
          </p>
        </section>

        <section>
          <h2>§4. Zawarcie umowy i proces realizacji</h2>
          <p>Umowa zostaje zawarta w momencie:</p>
          <ul>
            <li>Podpisania przez obie strony umowy o dzieło lub zlecenia, lub</li>
            <li>
              Pisemnego (w tym e-mailowego) potwierdzenia przez Klienta akceptacji oferty i warunków współpracy.
            </li>
          </ul>

          <p>Standardowy proces realizacji projektu obejmuje następujące etapy:</p>
          <ul>
            <li>Brief i ustalenie zakresu — Klient dostarcza niezbędne materiały i informacje.</li>
            <li>
              Projekt graficzny / wireframe — Usługodawca przygotowuje projekt do akceptacji.
            </li>
            <li>Implementacja — tworzenie strony na podstawie zaakceptowanego projektu.</li>
            <li>
              Testy i poprawki — do 2 rund poprawek w ramach ustalonego zakresu.
            </li>
            <li>Wdrożenie — publikacja strony na serwerze docelowym.</li>
            <li>Odbiór — Klient potwierdza odbiór ukończonej pracy.</li>
          </ul>
        </section>

        <section>
          <h2>§5. Obowiązki Klienta</h2>
          <p>Klient zobowiązuje się do:</p>
          <ul>
            <li>
              Dostarczenia wszelkich niezbędnych materiałów (teksty, zdjęcia, logotypy, dane firmowe) w uzgodnionym terminie.
            </li>
            <li>Udzielania odpowiedzi na pytania Usługodawcy w terminie do 5 dni roboczych.</li>
            <li>Terminowego dokonywania płatności zgodnie z ustalonym harmonogramem.</li>
            <li>Przekazywania konstruktywnych uwag w formie pisemnej (e-mail).</li>
            <li>Zapewnienia, że dostarczone materiały nie naruszają praw osób trzecich.</li>
            <li>
              Opóźnienie po stronie Klienta (np. brak materiałów, brak odpowiedzi) może skutkować przesunięciem terminu realizacji projektu.
            </li>
          </ul>
        </section>

        <section>
          <h2>§6. Wynagrodzenie i płatności</h2>
          <p>
            Wynagrodzenie za usługi jest każdorazowo ustalane indywidualnie i podawane w ofercie lub umowie.
            Standardowy harmonogram płatności:
          </p>
          <ul>
            <li>50% wartości projektu — zaliczka płatna przed rozpoczęciem prac.</li>
            <li>50% wartości projektu — płatność końcowa po ukończeniu i przed wdrożeniem.</li>
          </ul>
          <p>
            Faktury wystawiane są w formie elektronicznej i przesyłane na adres e-mail Klienta. Termin płatności
            wynosi 7 dni od daty wystawienia faktury, chyba że strony ustalą inaczej.
          </p>
          <p>
            W przypadku opóźnienia płatności Usługodawca zastrzega sobie prawo do wstrzymania prac do czasu uregulowania należności oraz naliczania ustawowych odsetek za opóźnienie.
          </p>
        </section>

        <section>
          <h2>§7. Prawa autorskie i własność intelektualna</h2>
          <p>
            Po uiszczeniu pełnego wynagrodzenia Klient nabywa majątkowe prawa autorskie do wykonanego projektu
            graficznego i kodu źródłowego strony, na następujących polach eksploatacji: wyświetlanie w sieci Internet,
            modyfikacja, kopiowanie na własne potrzeby.
          </p>
          <p>
            Usługodawca zachowuje prawo do:
          </p>
          <ul>
            <li>
              Prezentowania wykonanej pracy w portfolio i materiałach marketingowych, chyba że Klient zastrzeże inaczej na piśmie.
            </li>
            <li>
              Korzystania z ogólnych rozwiązań technicznych, wzorców i bibliotek użytych podczas realizacji projektu w innych projektach.
            </li>
            <li>
              Jeśli w projekcie zostały użyte elementy objęte licencjami osób trzecich (np. wtyczki premium, zdjęcia stockowe, fonty), Klient jest odpowiedzialny za zakup stosownych licencji lub Usługodawca wyraźnie wskazuje, że koszt licencji jest wliczony w cenę.
            </li>
          </ul>
        </section>

        <section>
          <h2>§8. Gwarancja i reklamacje</h2>
          <p>
            Usługodawca zapewnia 30-dniowy bezpłatny okres gwarancyjny po wdrożeniu strony, obejmujący naprawę błędów wynikających bezpośrednio z realizacji projektu (nie dotyczy błędów wynikających z działań Klienta lub osób trzecich).
          </p>
          <p>
            Reklamacje należy składać pisemnie na adres e-mail: kontakt@blueport.studio. Reklamacja powinna
            zawierać opis problemu i — jeśli to możliwe — zrzuty ekranu lub inne materiały ilustrujące problem.
          </p>
          <p>
            Usługodawca rozpatruje reklamacje w terminie 14 dni roboczych od ich otrzymania.
          </p>
        </section>

        <section>
          <h2>§9. Odpowiedzialność</h2>
          <p>
            Usługodawca nie ponosi odpowiedzialności za:
          </p>
          <ul>
            <li>
              Szkody wynikające z niedostarczenia przez Klienta materiałów w terminie lub dostarczenia materiałów niepełnych, błędnych lub naruszających prawa osób trzecich.
            </li>
            <li>Utratę danych spowodowaną awariami sprzętu, serwera lub działaniem siły wyższej.</li>
            <li>Działania lub zaniechania podmiotów trzecich (dostawców hostingu, operatorów płatności, wtyczek).</li>
            <li>Jakiekolwiek pośrednie lub wtórne straty biznesowe Klienta.</li>
          </ul>
          <p>
            Odpowiedzialność Usługodawcy jest ograniczona do wartości wynagrodzenia brutto za dany projekt.
          </p>
        </section>

        <section>
          <h2>§10. Rozwiązanie umowy</h2>
          <p>Każda ze stron może odstąpić od umowy:</p>
          <ul>
            <li>
              Klient — za pisemnym wypowiedzeniem z 14-dniowym okresem wypowiedzenia. Klient zobowiązany jest do zapłaty za prace wykonane do dnia wypowiedzenia.
            </li>
            <li>
              Usługodawca — w przypadku braku płatności po upływie 14 dni od terminu lub rażącego naruszenia warunków współpracy przez Klienta, z prawem zatrzymania zaliczki jako odszkodowania.
            </li>
          </ul>
        </section>

        <section>
          <h2>§11. Poufność</h2>
          <p>
            Obie strony zobowiązują się do zachowania poufności informacji handlowych, technicznych i organizacyjnych uzyskanych w toku współpracy, przez okres 2 lat od zakończenia współpracy.
          </p>
        </section>

        <section>
          <h2>§12. Postanowienia końcowe</h2>
          <p>
            W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu Cywilnego oraz ustawy o prawie autorskim i prawach pokrewnych.
          </p>
          <p>
            Wszelkie spory wynikające z realizacji usług strony będą rozwiązywać polubownie. W przypadku braku porozumienia, sądem właściwym do rozstrzygania sporów jest sąd właściwy dla siedziby Usługodawcy.
          </p>
          <p>
            Niniejszy Regulamin obowiązuje od dnia 20 marca 2026.
          </p>

          <p>
            Blueport Studio | Kamil Staliński, prowadzący działalność pod nazwą Blueport Studio, ul. Panoramiczna 5/6, 71-447 Szczecin, NIP: 5252788177, REGON: 383198229
            <br />
            E-mail: kontakt@blueport.studio | Strona: https://blueport.studio
          </p>
        </section>
        </article>
      </div>
    </section>
  );
}
