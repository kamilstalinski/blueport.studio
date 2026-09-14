/** "Czego potrzebujesz?" options on the contact form (spec order and labels). */
export const CONTACT_TOPICS = [
  { value: "strona", label: "Strona firmowa" },
  { value: "sklep", label: "Sklep internetowy" },
  { value: "dedykowany", label: "Projekt dedykowany" },
  { value: "nie-wiem", label: "Jeszcze nie wiem" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];
