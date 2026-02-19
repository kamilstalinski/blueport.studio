import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "outline" | "accent" | "secondary";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const base =
      "font-body inline-flex items-center justify-center rounded-[14px] min-h-12 px-6 py-3 font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60 disabled:pointer-events-none w-full md:w-auto";

    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        "bg-primary text-black font-semibold shadow-[0_0_20px_var(--color-primary-glow)] hover:bg-primary-hover hover:shadow-[0_0_24px_var(--color-primary-glow-hover)] active:scale-[0.99] focus-visible:ring-primary",
      ghost:
        "text-primary hover:bg-primary-subtle hover:underline focus-visible:ring-primary",
      outline:
        "border border-[var(--color-accent-active)] text-primary bg-transparent hover:bg-primary-subtle focus-visible:ring-primary",
      accent:
        "bg-primary text-black font-semibold shadow-[0_0_20px_var(--color-primary-glow)] hover:bg-primary-hover hover:shadow-[0_0_24px_var(--color-primary-glow-hover)] active:scale-[0.99] focus-visible:ring-primary",
      secondary:
        "border border-white/20 bg-transparent text-foreground backdrop-blur-sm hover:bg-white/15 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] focus-visible:ring-white/30",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variantClasses[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
