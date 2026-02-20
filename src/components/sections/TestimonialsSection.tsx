"use client";

import { Section } from "@/components/ui/Section";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";

const TESTIMONIALS = [
  { text: "Strona gotowa w 10 dni, wszystko zgodnie z ustaleniami. Ruch z Google wzrósł 3x w ciągu miesiąca.", authorName: "Marek Kowalski", authorCompany: "Usługi hydrauliczne, Szczecin", initials: "MK" },
  { text: "Profesjonalna obsługa od A do Z. Sklep działa bez zarzutu, klienci chwalą prostotę zamawiania.", authorName: "Anna Nowak", authorCompany: "Sklep z rękodziełem, Poznań", initials: "AN" },
  { text: "W końcu mam stronę, z której jestem zadowolona. Szybki kontakt, konkretna wycena i termin dotrzymany w 100%.", authorName: "Katarzyna Wiśniewska", authorCompany: "Pracownia florystyczna, Gdańsk", initials: "KW" },
];

export function TestimonialsSection() {
  const glassBlurSm = useGlassBlurStyle("sm");

  return (
    <Section id="opinie" className="section-testimonials">
      <div className="section-testimonials-head">
        <p className="section-testimonials-eyebrow">
          Opinie
        </p>
        <h2 className="heading-2 text-white mt-0">
          Co mówią{" "}
          <span className="text-primary">nasi klienci.</span>
        </h2>
      </div>

      <div className="testimonials-grid">
        {TESTIMONIALS.map((item, index) => (
          <div
            key={index}
            className="testimonial-card"
            style={glassBlurSm}
          >
            <div className="testimonial-stars" aria-hidden>
              ★★★★★
            </div>
            <p className="testimonial-text">&quot;{item.text}&quot;</p>
            <div className="testimonial-author">
              <div className="author-avatar" aria-hidden>
                {item.initials}
              </div>
              <div>
                <div className="author-name">{item.authorName}</div>
                <div className="author-company">{item.authorCompany}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
