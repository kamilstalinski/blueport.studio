import { PixelIcon } from "@/components/brand/PixelIcon";
import { DecoTetro } from "@/components/deco/DecoTetro";
import { PlanArt } from "@/components/sections/home/PlanArt";
import { InView } from "@/components/ui/InView";

const SWAPS = [
  { was: "Nie widać Cię w Google", now: "Struktura i treść pisane pod wyszukiwanie lokalne" },
  { was: "Strona ładuje się wieki", now: "Optymalizacja szybkości przed publikacją" },
  { was: "Nikt się nie kontaktuje", now: "Formularz i ścieżka kontaktu w centrum układu" },
] as const;

export function PlanSection() {
  return (
    <section className="sec ink px-host" aria-labelledby="plan-title">
      <InView className="px-deco px-deco--tetro" decorative>
        <DecoTetro />
      </InView>
      <div className="shell ink-grid">
        <div>
          <InView className="reveal">
            <h2 id="plan-title" className="d2">
              Większość stron dla małych firm powstaje bez planu. Potem nie sprzedaje.
            </h2>
          </InView>
          <InView className="reveal" lag={1}>
            <p className="lede plan-lede">
              Wygląda dobrze na prezentacji i nic nie robi przez kolejne trzy lata. Zaczynamy od pytania, kto ma na tę
              stronę trafić i co ma na niej zrobić.
            </p>
          </InView>
          <InView className="reveal" lag={1}>
            <ul className="swap">
              {SWAPS.map((swap) => (
                <li key={swap.now}>
                  <PixelIcon name="arrow-right" />
                  <div>
                    <span className="was">{swap.was}</span>
                    <br />
                    <span className="now">{swap.now}</span>
                  </div>
                </li>
              ))}
            </ul>
          </InView>
        </div>
        <InView className="reveal plan-wrap" lag={1}>
          <PlanArt />
          <p className="plan-cap">Ścieżka od pierwszego ekranu do formularza. Projektujemy ją, zanim powstanie pierwszy piksel.</p>
        </InView>
      </div>
    </section>
  );
}
