import Image from "next/image";
import Link from "next/link";

import { FaqTeaser } from "@/components/pages/FaqTeaser";
import { TESTIMONIALS } from "@/constants/testimonials";

const ON_TIME = TESTIMONIALS.find((item) => item.slug === "vilmart")!;

const BRING = [
  { term: "Logotyp", text: "W najlepszej jakości, jaką masz." },
  { term: "Zdjęcia", text: "Firmy, produktów, zespołu albo realizacji." },
  { term: "Gotowy projekt", text: "Jeśli już go masz, budujemy stronę według niego." },
] as const;

const AFTER = [
  { term: "Szkolenie", text: "Pokazujemy, jak w panelu zmienić tekst, zdjęcie czy cenę." },
  { term: "Wsparcie", text: "14 dni w pakiecie Start, 30 dni w Pro i Sklepie." },
  { term: "Hosting i domena", text: "Opłacasz je bezpośrednio u dostawcy, bez naszej marży. Strona jest Twoja." },
] as const;

function Rows({ title, rows }: { title: string; rows: readonly { term: string; text: string }[] }) {
  return (
    <div className="bp-pa-col">
      <h3>{title}</h3>
      <dl className="bp-pa-rows">
        {rows.map((row) => (
          <div key={row.term}>
            <dt>{row.term}</dt>
            <dd>{row.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** /proces after the chapters: what the client brings and gets after launch, closed by a client's word on the date; then the questions asked before signing. */
export function ProcessAround() {
  return (
    <>
      <section className="bp-sec" aria-labelledby="pa-h">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <h2 id="pa-h">Przed startem i po publikacji</h2>
            <p>Od Ciebie potrzebujemy trzech rzeczy. Po publikacji masz u nas wsparcie przez 14 albo 30 dni.</p>
          </div>
          <div className="bp-sec-body">
            <div className="bp-pa">
              <Rows title="Przygotowujesz" rows={BRING} />
              <Rows title="Po publikacji dostajesz" rows={AFTER} />
            </div>
            <figure className="bp-pa-quote">
              <Link href={`/realizacje/${ON_TIME.slug}`} className="bp-pa-thumb" aria-label={`Realizacja ${ON_TIME.site}`}>
                <Image src={ON_TIME.thumb} alt="" width={560} height={315} sizes="240px" />
              </Link>
              <div>
                <blockquote>„{ON_TIME.quote}”</blockquote>
                <figcaption>
                  <b>{ON_TIME.author}</b>
                  <span>{ON_TIME.place}</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <FaqTeaser id="pq-h" title="Pytania przed podpisaniem umowy" keys={["contract", "revisions", "materials", "support"]} />
    </>
  );
}
