"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import {
  fadeInUp,
  viewportOnce,
  useReducedMotionPref,
} from "@/lib/animations";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";

const TESTIMONIALS = [
  { text: "Strona gotowa w 10 dni, wszystko zgodnie z ustaleniami. Ruch z Google wzrósł 3x w ciągu miesiąca.", authorName: "Marek Kowalski", authorCompany: "Usługi hydrauliczne, Szczecin", initials: "MK" },
  { text: "Profesjonalna obsługa od A do Z. Sklep działa bez zarzutu, klienci chwalą prostotę zamawiania.", authorName: "Anna Nowak", authorCompany: "Sklep z rękodziełem, Poznań", initials: "AN" },
  { text: "W końcu mam stronę, z której jestem zadowolona. Szybki kontakt, konkretna wycena i termin dotrzymany w 100%.", authorName: "Katarzyna Wiśniewska", authorCompany: "Pracownia florystyczna, Gdańsk", initials: "KW" },
];

export function TestimonialsSection() {
  const reduceMotion = useReducedMotionPref();
  const glassBlurSm = useGlassBlurStyle("sm");
  const initial = reduceMotion ? "visible" : "hidden";

  return (
    <Section id="opinie" className="section-testimonials">
      <div className="section-testimonials-head">
        <motion.p
          className="section-testimonials-eyebrow"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          Opinie
        </motion.p>
        <motion.h2
          className="heading-2 text-white mt-0"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          Co mówią{" "}
          <span className="text-primary">nasi klienci.</span>
        </motion.h2>
      </div>

      <div className="testimonials-grid">
        {TESTIMONIALS.map((item, index) => (
          <motion.div
            key={index}
            className="testimonial-card"
            style={glassBlurSm}
            initial={initial}
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
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
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
