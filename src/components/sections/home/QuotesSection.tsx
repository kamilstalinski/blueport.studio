import Image from "next/image";
import Link from "next/link";

import { PixelIcon } from "@/components/brand/PixelIcon";
import { DecoBubbles } from "@/components/deco/DecoBubbles";
import { InView } from "@/components/ui/InView";
import { TESTIMONIALS } from "@/constants/testimonials";

const STARS = [1, 2, 3, 4, 5] as const;

export function QuotesSection() {
  return (
    <section className="sec band px-host" aria-labelledby="quotes-title">
      <DecoBubbles />
      <div className="shell">
        <InView className="reveal">
          <h2 id="quotes-title" className="d2 quotes-title">
            Co mówią klienci.
          </h2>
        </InView>
        <div className="quotes">
          {TESTIMONIALS.map((testimonial) => (
            <InView key={testimonial.slug} className="reveal quote">
              <figure>
                <Link href={`/realizacje/${testimonial.slug}`} className="shot-sm" aria-label={`Realizacja ${testimonial.site}`}>
                  <Image src={testimonial.thumb} alt="" width={560} height={315} sizes="(max-width: 1000px) 100vw, 360px" />
                </Link>
                <div className="stars" role="img" aria-label="Ocena 5 na 5">
                  {STARS.map((star) => (
                    <PixelIcon key={star} name="star" />
                  ))}
                </div>
                <blockquote>„{testimonial.quote}”</blockquote>
                <figcaption>
                  <span className="who">{testimonial.author}</span>
                  <br />
                  <span className="where">{testimonial.place}</span>
                </figcaption>
              </figure>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
