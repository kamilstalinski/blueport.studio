import { getTranslations } from "@/lib/messages";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import SpotlightCard from "@/components/SpotlightCard";
import { KalkulatorSection } from "@/components/sections/KalkulatorSection";
import { CTA } from "@/components/sections/CTA";

export default async function KontaktPage() {
  const tForm = getTranslations("kontakt.form");
  const tAlt = getTranslations("kontakt.alternatywa");

  return (
    <>
      <Hero contentKey="kontakt.hero" />

      <Section id="formularz-kontaktowy" topGradient>
        <SpotlightCard
          className="custom-spotlight-card rounded-2xl overflow-hidden"
          spotlightColor="rgba(0, 229, 160, 0.2)"
        >
          <div className="glass-card rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {tForm("title")}
          </h2>
          <form className="mt-8 space-y-6" action="#" method="post">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-foreground/80">
                {tForm("name")}
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-[#00c287] focus:outline-none focus:ring-2 focus:ring-[rgba(0,229,160,0.15)]"
                placeholder={tForm("name")}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-foreground/80">
                {tForm("email")}
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-[#00c287] focus:outline-none focus:ring-2 focus:ring-[rgba(0,229,160,0.15)]"
                placeholder={tForm("email")}
              />
            </div>
            <div>
              <label htmlFor="contact-type" className="block text-sm font-medium text-foreground/80">
                {tForm("projectType")}
              </label>
              <select
                id="contact-type"
                name="projectType"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-foreground focus:border-[#00c287] focus:outline-none focus:ring-2 focus:ring-[rgba(0,229,160,0.15)]"
              >
                <option value="">—</option>
                <option value="strona">Strona firmowa</option>
                <option value="sklep">Sklep internetowy</option>
                <option value="inne">Inne</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-budget" className="block text-sm font-medium text-foreground/80">
                {tForm("budget")}
              </label>
              <input
                id="contact-budget"
                type="text"
                name="budget"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-[#00c287] focus:outline-none focus:ring-2 focus:ring-[rgba(0,229,160,0.15)]"
                placeholder={tForm("budget")}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-foreground/80">
                {tForm("message")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-[#00c287] focus:outline-none focus:ring-2 focus:ring-[rgba(0,229,160,0.15)]"
                placeholder={tForm("message")}
              />
            </div>
            <Button type="submit" variant="primary" className="min-h-12 px-8">
              {tForm("submit")}
            </Button>
          </form>
          </div>
        </SpotlightCard>
      </Section>

      <Section id="alternatywa">
        <SpotlightCard
          className="custom-spotlight-card rounded-2xl overflow-hidden"
          spotlightColor="rgba(0, 229, 160, 0.2)"
        >
          <div className="glass-card rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {tAlt("title")}
          </h2>
          <p className="mt-4 text-foreground/80">
            <span className="font-medium text-foreground">{tAlt("email")}: </span>
            <a href="mailto:kontakt@blueport.studio" className="text-[#00b8d9] hover:text-primary hover:underline">
              kontakt@blueport.studio
            </a>
          </p>
          <p className="mt-2 text-foreground/80">
            <span className="font-medium text-foreground">{tAlt("phone")}: </span>
            <a href="tel:+48123456789" className="text-[#00b8d9] hover:text-primary hover:underline">
              +48 123 456 789
            </a>
          </p>
          <p className="mt-4 text-sm text-foreground/70">{tAlt("info")}</p>
          </div>
        </SpotlightCard>
      </Section>

      <KalkulatorSection />
      <CTA />
    </>
  );
}
