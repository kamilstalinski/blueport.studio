import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { SetHtmlLang } from "@/components/providers/SetHtmlLang";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GradualBlurWithFooter } from "@/components/effects/GradualBlurWithFooter";
import { GradualBlurTop } from "@/components/effects/GradualBlurTop";
import { GlobalGradientBackground } from "@/components/effects/GlobalGradientBackground";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SetHtmlLang locale={locale} />
      <SmoothScroll>
        <div className="relative flex min-h-screen flex-col">
          <GlobalGradientBackground />
          <div className="page-grid-overlay" aria-hidden />
          <GradualBlurTop />
          <div className="fixed left-0 right-0 top-0 z-30">
            <Navbar />
          </div>
          <main className="flex-1 min-h-full">
          <PageTransition>{children}</PageTransition>
        </main>
          <Footer />
          <GradualBlurWithFooter />
          <ScrollToTop />
        </div>
      </SmoothScroll>
    </NextIntlClientProvider>
  );
}
