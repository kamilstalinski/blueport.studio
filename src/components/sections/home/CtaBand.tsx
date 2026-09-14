import { DecoPlus } from "@/components/deco/DecoPlus";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InView } from "@/components/ui/InView";

export function CtaBand() {
  return (
    <section className="cta-band px-host" aria-labelledby="cta-title">
      <InView className="px-deco px-deco--plus" decorative>
        <DecoPlus />
      </InView>
      <div className="shell cta-in">
        <div>
          <h2 id="cta-title" className="d2">
            Sprawdź, ile kosztuje Twoja strona.
          </h2>
          <p className="lede cta-lede">Wybierasz zakres, dostajesz widełki. 60 sekund, bez rejestracji i bez zobowiązań.</p>
        </div>
        <div className="cta-actions">
          <ButtonLink href="/kalkulator" variant="oncobalt" withArrow>
            Sprawdź koszt
          </ButtonLink>
          <ButtonLink href="/kontakt" variant="ghost-oncobalt">
            Umów konsultację
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
