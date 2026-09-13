import { HeroCopy } from "@/components/sections/HeroCopy";
import { HeroCranes } from "@/components/sections/HeroCranes";

export function HeroHome() {
  return (
    <section id="hero" className="hero">
      <HeroCranes />
      <div className="shell bd-grid">
        <HeroCopy />
      </div>
    </section>
  );
}
