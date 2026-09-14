import { request, type FullConfig } from "@playwright/test";

const WARM_UP_TIMEOUT_MS = 120_000;
const RETRY_DELAY_MS = 1_000;

/* The suite reuses a dev server: compile and render / once so timing-sensitive tests do not pay for it. */
export default async function globalSetup(config: FullConfig): Promise<void> {
  const baseURL = config.projects[0]?.use.baseURL ?? "http://localhost:3000";
  const context = await request.newContext({ baseURL });
  const deadline = Date.now() + WARM_UP_TIMEOUT_MS;
  try {
    for (;;) {
      try {
        const response = await context.get("/", { timeout: WARM_UP_TIMEOUT_MS });
        if (response.ok()) return;
      } catch (error) {
        if (Date.now() >= deadline) throw error;
      }
      if (Date.now() >= deadline) throw new Error(`warm-up of ${baseURL}/ did not return 200 in time`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  } finally {
    await context.dispose();
  }
}
