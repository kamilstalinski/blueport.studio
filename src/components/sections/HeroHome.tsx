import { HeroCopy } from "@/components/sections/HeroCopy";
import { HeroCranes } from "@/components/sections/HeroCranes";
import { HeroCursorField } from "@/components/sections/HeroCursorField";

export function HeroHome() {
  return (
    <section id="hero" className="hero">
      <HeroCursorField />
      <HeroCranes />
      <div className="shell bd-grid">
        <HeroCopy />
      </div>
    </section>
  );
}
