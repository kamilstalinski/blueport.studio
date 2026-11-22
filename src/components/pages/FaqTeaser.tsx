import Link from "next/link";

import { FaqList } from "@/components/pages/FaqList";
import { Arrow } from "@/components/ui/Arrow";
import type { FAQKey } from "@/constants/faq";

interface FaqTeaserProps {
  id: string;
  title: string;
  keys: readonly FAQKey[];
}

/** A few questions from the FAQ where the visitor decides, with the way to the rest. */
export function FaqTeaser({ id, title, keys }: FaqTeaserProps) {
  return (
    <section className="bp-sec bp-sec--tight" aria-labelledby={id}>
      <div className="bp-shell bp-grid">
        <div className="bp-sec-head">
          <h2 id={id}>{title}</h2>
          <div className="bp-rows-act">
            <Link className="bp-row-act" href="/faq">
              Wszystkie pytania <Arrow />
            </Link>
          </div>
        </div>
        <div className="bp-sec-body">
          <FaqList keys={keys} />
        </div>
      </div>
    </section>
  );
}
