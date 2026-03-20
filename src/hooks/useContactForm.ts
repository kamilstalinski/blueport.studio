"use client";

import { useCallback, useState } from "react";
import type { ContactFormData, ContactFormState } from "@/types/contact.types";

const INITIAL_STATE: ContactFormState = {
  status: "idle",
  error: null,
};

export type UseContactFormReturn = {
  formState: ContactFormState;
  handleSubmit: (data: ContactFormData) => Promise<void>;
  resetForm: () => void;
};

export function useContactForm(): UseContactFormReturn {
  const [formState, setFormState] = useState<ContactFormState>(INITIAL_STATE);

  const handleSubmit = useCallback(async (data: ContactFormData): Promise<void> => {
    setFormState({ status: "loading", error: null });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Unknown error");
      }

      setFormState({ status: "success", error: null });
    } catch (error) {
      setFormState({
        status: "error",
        error:
          "Coś poszło nie tak. Napisz bezpośrednio na kontakt@blueport.studio",
      });
      console.error("Contact form error:", error);
    }
  }, []);

  const resetForm = useCallback((): void => {
    setFormState(INITIAL_STATE);
  }, []);

  return { formState, handleSubmit, resetForm };
}

