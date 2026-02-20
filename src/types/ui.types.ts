import type React from "react";
import type { ReactNode } from "react";
import type { GlassBlurVariant } from "./theme.types";
import type {
  SummaryResult,
  StepIndex,
  Urgency,
  ProjectType,
} from "./api.types";

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

export interface SectionProps {
  id?: string;
  as?: "section" | "div";
  tight?: boolean;
  firstOnPage?: boolean;
  topGradient?: boolean;
  noWrapper?: boolean;
  children?: ReactNode;
  className?: string;
}

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blurVariant?: GlassBlurVariant;
  as?: "div" | "article" | "section";
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export type ThemeToggleVariant = "default" | "dark";

export interface GrainientProps {
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  className?: string;
  /** Debounce resize (ms) — ogranicza migotanie przy scrollu (np. chowający się navbar Chrome). */
  resizeDebounceMs?: number;
}

export interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

export interface ColorBendsProps {
  className?: string;
  style?: React.CSSProperties;
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
}

export interface SmoothScrollProps {
  children: React.ReactNode;
}

export type HeroContentKey =
  | "Home.hero"
  | "uslugi.hero"
  | "realizacje.hero"
  | "proces.hero"
  | "kalkulator.hero"
  | "kontakt.hero"
  | "oNas.hero";

export interface SubpageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  firstOnPage?: boolean;
}

export type CardVariant = "default" | "subpage";

export interface OfertaPakietyProps {
  topGradient?: boolean;
  cardVariant?: CardVariant;
}

export type DlaczegoMyContentKey =
  | "Home.dlaczegoMy"
  | "proces.dlaczego"
  | "realizacjeEfekty"
  | "kalkulator.coDalej";

export interface DlaczegoMyProps {
  contentKey?: DlaczegoMyContentKey;
  itemKeys?: readonly string[];
  cardVariant?: CardVariant;
}

export type ProcesHomeContentKey = "Home.proces" | "oNas.proces";

export interface ProcesHomeProps {
  contentKey?: ProcesHomeContentKey;
  stepCount?: 4 | 5;
  cardVariant?: CardVariant;
}

export type FAQSectionContentKey = "Home.faq" | "uslugi.faq";

export interface FAQSectionProps {
  contentKey?: FAQSectionContentKey;
  faqKeys?: readonly string[];
}

export interface ProcesVerticalTimelineProps {
  cardVariant?: CardVariant;
}

export type CTAContentKey = "Home.cta" | "oNas.cta";

export interface CTAProps {
  contentKey?: CTAContentKey;
}

export interface CalculatorProps {
  onSubmit?: (payload: {
    summary: SummaryResult;
    name: string;
    email: string;
    phone: string;
  }) => void;
  children?: never;
}

export interface CalculatorProgressBarProps {
  currentStep: StepIndex;
  className?: string;
}

export interface StepBudgetProps {
  urgency: Urgency;
  budgetRange: string;
  onUrgencyChange: (value: Urgency) => void;
  onBudgetRangeChange: (value: string) => void;
}

export interface StepFeaturesProps {
  projectType: ProjectType | null;
  features: string[];
  languageCount: number;
  integrations: string[];
  onFeaturesChange: (value: string[]) => void;
  onLanguageCountChange: (value: number) => void;
  onIntegrationsChange: (value: string[]) => void;
}

export interface StepScopeProps {
  pagesCount: number;
  productCount: number;
  onPagesCountChange: (value: number) => void;
  onProductCountChange: (value: number) => void;
  projectType: ProjectType;
}

export interface StepProjectTypeProps {
  value: ProjectType | null;
  onChange: (value: ProjectType) => void;
}

export interface StepContactProps {
  name: string;
  email: string;
  phone: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  error?: string;
}

export interface StepSummaryProps {
  summary: SummaryResult;
}

export interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "fadeUp" | "fadeIn" | "scaleIn" | "slideRight";
  delay?: number;
  className?: string;
}
