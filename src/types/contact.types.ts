import type { ContactTopic } from "@/constants/contact";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  topic: ContactTopic;
}

export interface ContactFormState {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}
