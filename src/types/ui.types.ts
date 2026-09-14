import type React from "react";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "ghost" | "outline" | "accent" | "secondary";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export type ContainerVariant = "narrow" | "default" | "wide";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  variant?: ContainerVariant;
  noPadding?: boolean;
}

export interface SmoothScrollProps {
  children: React.ReactNode;
}
