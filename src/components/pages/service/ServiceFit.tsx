import { Check, Dash } from "@/components/ui/Marks";
import type { Service } from "@/constants/services";

/** Who it is for, set bright, against who it is not for, set back: the was→now contrast of PlanSection. */
export function ServiceFit({ service }: { service: Service }) {
  return (
    <section className="bp-sec" aria-labelledby="fit-h">
      <div className="bp-shell bp-grid">
        <div className="bp-sec-head">
          <h2 id="fit-h">Czy to usługa dla Ciebie</h2>
        </div>
        <div className="bp-sec-body bp-fit bp-svc-fit">
          <div className="bp-fit-col">
            <h3>Dla kogo</h3>
            <ul className="bp-ticks">
              {service.forWho.map((item) => (
                <li key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bp-fit-col bp-fit-col--no">
            <h3>Nie dla kogo</h3>
            <ul className="bp-ticks">
              {service.notFor.map((item) => (
                <li key={item}>
                  <Dash />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
