"use client";

import { m } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import { PixelIcon } from "@/components/brand/PixelIcon";

type CalculatorProps = ReturnType<typeof useCalculator>;

export function Step5Contact({ calculator }: { calculator: CalculatorProps }) {
  const { state, setContact } = calculator;

  if (state.isSubmitted) {
    return (
      <m.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="step step--success"
      >
        <div className="success-icon" aria-hidden="true">
          <PixelIcon name="done" scale={4} />
        </div>
        <h2 className="step-title">Zapytanie wysłane!</h2>
        <p className="step-desc">
          Odpiszemy na <strong>{state.contact.email}</strong> w ciągu 24h.
        </p>
      </m.div>
    );
  }

  return (
    <div className="step">
      <h2 className="step-title">Ostatni krok</h2>
      <p className="step-desc">Wyślemy wycenę na Twój email.</p>

      <div className="contact-fields">
        <div className="contact-field">
          <label className="field-label" htmlFor="calc-name">
            Imię i nazwisko *
          </label>
          <input
            id="calc-name"
            type="text"
            value={state.contact.name}
            onChange={(e) => setContact("name", e.target.value)}
            placeholder="Jan Kowalski"
            className="field-input"
          />
        </div>

        <div className="contact-field">
          <label className="field-label" htmlFor="calc-email">
            Email *
          </label>
          <input
            id="calc-email"
            type="email"
            value={state.contact.email}
            onChange={(e) => setContact("email", e.target.value)}
            placeholder="jan@firma.pl"
            className="field-input"
          />
        </div>

        <div className="contact-field">
          <label className="field-label" htmlFor="calc-phone">
            Telefon (opcjonalnie)
          </label>
          <input
            id="calc-phone"
            type="tel"
            value={state.contact.phone}
            onChange={(e) => setContact("phone", e.target.value)}
            placeholder="+48 000 000 000"
            className="field-input"
          />
        </div>

        <div className="contact-field">
          <label className="field-label" htmlFor="calc-message">
            Dodatkowe uwagi
          </label>
          <textarea
            id="calc-message"
            value={state.contact.message}
            onChange={(e) => setContact("message", e.target.value)}
            placeholder="Coś co powinienem wiedzieć o projekcie..."
            rows={3}
            className="field-input field-textarea"
          />
        </div>

        {state.error && <p className="field-error">{state.error}</p>}
      </div>
    </div>
  );
}
