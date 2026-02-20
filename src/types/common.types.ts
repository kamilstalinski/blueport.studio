import type { ReactNode } from "react";

export interface Position {
  x: number;
  y: number;
}

export interface RootLayoutProps {
  children: ReactNode;
}

export interface PageParamsSlug {
  params: Promise<{ slug: string }>;
}
