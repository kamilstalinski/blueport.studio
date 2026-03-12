"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import styles from "./FAQ.module.css";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};

type FAQProps = {
  items: FAQItem[];
};

type FAQItemProps = {
  item: FAQItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
  index: number;
  shouldReduce: boolean;
};

function FAQItemComponent({
  item,
  isOpen,
  onToggle,
  shouldReduce,
}: FAQItemProps) {
  return (
    <div
      className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
      role="listitem"
    >
      <button
        className={styles.trigger}
        onClick={() => onToggle(item.id)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
        type="button"
      >
        <span className={styles.question}>{item.question}</span>
        <motion.span
          className={styles.chevron}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={
            shouldReduce
              ? { duration: 0 }
              : { duration: 0.25, ease: "easeInOut" }
          }
          aria-hidden="true"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            role="region"
            aria-labelledby={`faq-question-${item.id}`}
            className={styles.answer}
            initial={shouldReduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduce ? {} : { height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ overflow: "hidden" }}
          >
            <div className={styles.answerInner}>
              <p className={styles.answerText}>{item.answer}</p>
              {item.id === "price" && (
                <Link href="/kalkulator" className={styles.answerCta}>
                  Sprawdź dokładną wycenę →
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ({ items }: FAQProps) {
  const [openId, setOpenId] = useState<string>(items[0]?.id ?? "");
  const shouldReduce = useReducedMotion() ?? false;

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  }, []);

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.header}>
        <p className={styles.overline}>FAQ</p>
        <h2 id="faq-heading" className={styles.heading}>
          Najczęściej zadawane pytania.
        </h2>
        <p className={styles.subtitle}>
          Odpowiedzi na pytania które słyszę najczęściej przed startem
          współpracy.
        </p>
      </div>

      <div className={styles.list} role="list">
        {items.map((item, index) => (
          <FAQItemComponent
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={handleToggle}
            index={index}
            shouldReduce={!!shouldReduce}
          />
        ))}
      </div>

      <div className={styles.faqCta}>
        <p className={styles.faqCtaText}>
          Nie znalazłeś odpowiedzi na swoje pytanie?
        </p>
        <div className={styles.faqCtaButtons}>
          <Link href="/kontakt" className={styles.faqCtaPrimary}>
            Napisz do mnie
          </Link>
          <Link href="/kalkulator" className={styles.faqCtaSecondary}>
            Sprawdź wycenę →
          </Link>
        </div>
      </div>
    </section>
  );
}
