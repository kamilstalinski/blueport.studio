export type ProjectType = "wordpress" | "nextjs" | "other";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  projectType: ProjectType;
}

export interface ContactFormState {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

