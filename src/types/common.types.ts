import type { ReactNode } from "react";

export interface RootLayoutProps {
  children: ReactNode;
}

export interface PageParamsSlug {
  params: Promise<{ slug: string }>;
}
