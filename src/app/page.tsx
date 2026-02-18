import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Root path "/" – redirect to default locale so [locale] routes are used.
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
