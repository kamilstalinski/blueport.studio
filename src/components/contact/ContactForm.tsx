"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { PixelIcon } from "@/components/brand/PixelIcon";
import { CONTACT_TOPICS } from "@/constants/contact";
import { useContactForm } from "@/hooks/useContactForm";
import { isContactTopic, validateContact, type ContactErrors } from "@/lib/contactValidation";
import { cn } from "@/lib/utils";
import type { ContactFormData } from "@/types/contact.types";

type TextField = "name" | "email" | "message";

const INITIAL_FIELDS: ContactFormData = { name: "", email: "", message: "", topic: "strona" };
const FIELD_ORDER: readonly TextField[] = ["name", "email", "message"];

export function ContactForm() {
  const { formState, handleSubmit } = useContactForm();
  const [fields, setFields] = useState<ContactFormData>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<ContactErrors>({});
  const inputs = useRef<Partial<Record<TextField, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const submitting = useRef(false);
  const successHeading = useRef<HTMLHeadingElement | null>(null);
  const isSending = formState.status === "loading";

  const setText = (key: TextField, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (value.trim()) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // Move focus to the success heading once it has mounted, so assistive tech announces it.
  useEffect(() => {
    if (formState.status === "success") successHeading.current?.focus();
  }, [formState.status]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending || submitting.current) return;
    const found = validateContact(fields);
    const firstBroken = FIELD_ORDER.find((key) => found[key]);
    if (firstBroken) {
      // Flush the error state synchronously so aria-invalid/aria-describedby and the
      // error text exist in the DOM before we move focus, not after.
      flushSync(() => setErrors(found));
      inputs.current[firstBroken]?.focus();
      return;
    }
    setErrors(found);
    submitting.current = true;
    try {
      await handleSubmit({ ...fields, name: fields.name.trim(), email: fields.email.trim(), message: fields.message.trim() });
    } finally {
      submitting.current = false;
    }
  };

  if (formState.status === "success") {
    return (
      <div className="px-note contact-sent" role="status" aria-live="polite">
        <h2 className="d3" ref={successHeading} tabIndex={-1}>
          <span className="contact-sent-icon">
            <PixelIcon name="done" scale={3} />
          </span>
          Zapytanie wysłane
        </h2>
        <p className="body">
          Odpowiemy na <strong>{fields.email.trim()}</strong> w ciągu 24 godzin w dni robocze.
        </p>
      </div>
    );
  }

  const errorFor = (key: TextField) =>
    errors[key] && (
      <p id={`contact-${key}-error`} className="err">
        <PixelIcon name="warning" />
        {errors[key]}
      </p>
    );

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-busy={isSending}>
      <div className={cn("field", errors.name && "invalid")}>
        <label htmlFor="contact-name">Imię</label>
        <input
          ref={(node) => {
            inputs.current.name = node;
          }}
          id="contact-name"
          name="name"
          type="text"
          placeholder="Jak się do Ciebie zwracać?"
          autoComplete="given-name"
          required
          value={fields.name}
          onChange={(event) => setText("name", event.target.value)}
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errorFor("name")}
      </div>

      <div className={cn("field", errors.email && "invalid")}>
        <label htmlFor="contact-email">Adres e-mail</label>
        <input
          ref={(node) => {
            inputs.current.email = node;
          }}
          id="contact-email"
          name="email"
          type="email"
          placeholder="nazwa@firma.pl"
          autoComplete="email"
          required
          value={fields.email}
          onChange={(event) => setText("email", event.target.value)}
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "contact-email-error contact-email-hint" : "contact-email-hint"}
        />
        <p id="contact-email-hint" className="hint">
          Użyjemy go tylko do odpowiedzi na to zapytanie.
        </p>
        {errorFor("email")}
      </div>

      <div className="field">
        <label htmlFor="contact-topic">Czego potrzebujesz?</label>
        <select
          id="contact-topic"
          name="topic"
          value={fields.topic}
          onChange={(event) => {
            const value = event.target.value;
            if (isContactTopic(value)) setFields((prev) => ({ ...prev, topic: value }));
          }}
        >
          {CONTACT_TOPICS.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </div>

      <div className={cn("field", errors.message && "invalid")}>
        <label htmlFor="contact-message">Wiadomość</label>
        <textarea
          ref={(node) => {
            inputs.current.message = node;
          }}
          id="contact-message"
          name="message"
          placeholder="Czym zajmuje się Twoja firma i co ma robić strona?"
          required
          value={fields.message}
          onChange={(event) => setText("message", event.target.value)}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errorFor("message")}
      </div>

      <button className="btn btn-primary contact-submit" type="submit" aria-disabled={isSending ? "true" : undefined}>
        {isSending ? (
          <>
            <span className="px-load" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            Wysyłamy…
          </>
        ) : (
          <>
            Wyślij zapytanie
            <PixelIcon name="arrow-right" />
          </>
        )}
      </button>
      <p className="meta" role="status" aria-live="polite">
        {formState.status === "error" ? formState.error : ""}
      </p>
    </form>
  );
}
