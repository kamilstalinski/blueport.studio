import { CONTACT_TOPICS, type ContactTopic } from "@/constants/contact";
import type { ContactFormData } from "@/types/contact.types";

export type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;
const MIN_MESSAGE = 10;
const TOPIC_VALUES: readonly string[] = CONTACT_TOPICS.map((topic) => topic.value);

/** The spec's client-side checks, with its exact messages. */
export function validateContact({ name, email, message }: Pick<ContactFormData, "name" | "email" | "message">): ContactErrors {
  const errors: ContactErrors = {};
  if (!name.trim()) errors.name = "Podaj imię, żebyśmy wiedzieli jak się zwracać.";
  if (!EMAIL.test(email.trim())) errors.email = "Ten adres e-mail wygląda na niepełny.";
  if (message.trim().length < MIN_MESSAGE) errors.message = "Napisz choć jedno zdanie o projekcie.";
  return errors;
}

export function isContactTopic(value: string): value is ContactTopic {
  return TOPIC_VALUES.includes(value);
}
