"use client";

import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { springs } from "@/constants/animations";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";
import { m } from "framer-motion";

const TESTIMONIALS = [
  {
    text: "Strona gotowa w 10 dni, wszystko zgodnie z ustaleniami. Ruch z Google wzrósł 3x w ciągu miesiąca.",
    authorName: "Kamil Głogowski",
    authorCompany: "Vilmart Water Services, Szczecin",
    initials: "KG",
  },
  {
    text: "Profesjonalna obsługa od A do Z. Sklep działa bez zarzutu, klienci chwalą prostotę zamawiania.",
    authorName: "Igor Romanowski",
    authorCompany: "SPAVALNIA, Warszawa",
    initials: "IR",
  },
  {
    text: "W końcu mam stronę, z której jestem zadowolony. Szybki kontakt, konkretna wycena i termin dotrzymany w 100%.",
    authorName: "Andrzej Szymko",
    authorCompany: "After The Sin, Poznań",
    initials: "AS",
  },
];

export function TestimonialsSection() {
  const glassBlurSm = useGlassBlurStyle("sm");
  const { variants: v } = useMotionSafe();

  return (
    <Section id="opinie" className="section-testimonials">
      <ScrollReveal variant="fadeUp" className="section-testimonials-head">
        <p className="section-testimonials-eyebrow">Opinie</p>
        <h2 className="heading-2 text-white mt-0">
          Co mówią <span className="text-primary">nasi klienci.</span>
        </h2>
      </ScrollReveal>

      <m.div
        variants={v.stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="testimonials-grid"
      >
        {TESTIMONIALS.map((item, index) => (
          <m.div
            key={index}
            variants={v.scaleIn}
            whileHover={{ y: -3, transition: springs.smooth }}
            whileTap={{ scale: 0.992, transition: springs.stiff }}
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
          </m.div>
        ))}
      </m.div>
    </Section>
  );
}
