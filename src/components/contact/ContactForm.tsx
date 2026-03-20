"use client";

import { useCallback, useState } from "react";
import { useContactForm } from "@/hooks/useContactForm";
import type { ContactFormData, ProjectType } from "@/types/contact.types";

const PROJECT_OPTIONS: { value: ProjectType; label: string }[] = [
  { value: "wordpress", label: "Strona firmowa" },
  { value: "nextjs", label: "Sklep internetowy" },
  { value: "other", label: "Inne" },
];

const INITIAL_FIELDS: ContactFormData = {
  name: "",
  email: "",
  message: "",
  projectType: "wordpress",
};

function isProjectType(value: string): value is ProjectType {
  return value === "wordpress" || value === "nextjs" || value === "other";
}

export function ContactForm() {
  const { formState, handleSubmit, resetForm } = useContactForm();
  const [fields, setFields] = useState<ContactFormData>(INITIAL_FIELDS);

  const setField = useCallback(
    <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
      setFields((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formState.status === "loading") return;
      await handleSubmit(fields);
    },
    [fields, formState.status, handleSubmit]
  );

  const onReset = useCallback(() => {
    resetForm();
    setFields(INITIAL_FIELDS);
  }, [resetForm]);

  if (formState.status === "success") {
    return (
      <div className="step step--success" role="status" aria-live="polite">
        <div className="success-icon" aria-hidden="true">
          ✓
        </div>
        <h3 className="mb-2 text-xl font-semibold tracking-tight text-text-primary">
          Wiadomość wysłana
        </h3>
        <p className="text-muted-foreground">
          Odezwę się do Ciebie w ciągu <strong>24–48 godzin</strong> w dni
          robocze.
        </p>
        <button type="button" className="contact-submit" onClick={onReset}>
          Wyślij kolejną wiadomość
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={formState.status === "loading"}>
      <div className="contact-field">
        <label htmlFor="contact-name" className="contact-label">
          Imię
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder="Imię"
          value={fields.name}
          onChange={(e) => setField("name", e.target.value)}
          required
          aria-required="true"
          autoComplete="name"
        />
      </div>

      <div className="contact-field">
        <label htmlFor="contact-email" className="contact-label">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder="Email"
          value={fields.email}
          onChange={(e) => setField("email", e.target.value)}
          required
          aria-required="true"
          autoComplete="email"
        />
      </div>

      <div className="contact-field">
        <label htmlFor="contact-type" className="contact-label">
          Typ projektu
        </label>
        <select
          id="contact-type"
          name="projectType"
          value={fields.projectType}
            onChange={(e) => {
              const value = e.target.value;
              if (!isProjectType(value)) return;
              setField("projectType", value);
            }}
          required
          aria-required="true"
        >
          {PROJECT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="contact-field">
        <label htmlFor="contact-message" className="contact-label">
          Wiadomość
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Wiadomość"
          value={fields.message}
          onChange={(e) => setField("message", e.target.value)}
          required
          aria-required="true"
        />
      </div>

      {formState.error && (
        <p role="alert" className="field-error">
          {formState.error}
        </p>
      )}

      <button
        type="submit"
        disabled={formState.status === "loading"}
        className="contact-submit"
      >
        {formState.status === "loading" ? "Wysyłam..." : "Wyślij zapytanie"}
      </button>
    </form>
  );
}

