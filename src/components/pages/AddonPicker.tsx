"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

import { Arrow } from "@/components/ui/Arrow";
import {
  calculatePrice,
  FEATURE_GROUPS,
  FEATURES,
  getFeaturesForPackage,
  PACKAGE_SHORT,
  PACKAGES,
  packageTopic,
  TIMELINE_MULTIPLIERS,
  type FeatureId,
  type PackageId,
  type TimelineId,
} from "@/constants/pricing";
import { formatPrice } from "@/lib/formatPrice";

const PACKAGE_IDS = Object.keys(PACKAGES) as PackageId[];
const TIMELINE_IDS = Object.keys(TIMELINE_MULTIPLIERS) as TimelineId[];

function surcharge(multiplier: number): string {
  if (multiplier === 1) return "bez dopłaty";
  const percent = Math.round((multiplier - 1) * 100);
  return percent > 0 ? `+${percent}%` : `−${-percent}%`;
}

/** Cennik: pick a package, a delivery mode and add-ons as tiles; the summary beside them adds it up with the calculator's own calculatePrice and hands the package to the contact form as its topic. */
export function AddonPicker({ children }: { children: ReactNode }) {
  const [packageId, setPackageId] = useState<PackageId>("strona-pro");
  const [timeline, setTimeline] = useState<TimelineId>("standard");
  const [picked, setPicked] = useState<FeatureId[]>([]);

  const available = useMemo(() => getFeaturesForPackage(packageId), [packageId]);
  const chosen = picked.filter((id) => available.includes(id));
  const price = calculatePrice(packageId, chosen, timeline);
  const pkg = PACKAGES[packageId];
  const handOver = `/kontakt?temat=${packageTopic(packageId)}`;

  const toggle = (id: FeatureId) =>
    setPicked((list) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]));

  return (
    <div className="bp-picker">
      <div className="bp-pick-side">
        {children}
        <aside className="bp-pick-sum" aria-label="Twój zakres">
          <p className="bp-mono bp-pick-sum-label">Twój zakres</p>
          <p className="bp-pick-total" aria-live="polite">
            <small>od</small>
            {formatPrice(price.total)}&nbsp;zł
          </p>
          <p className="bp-mono bp-pick-days">
            {timeline === "standard" ? pkg.deliveryLabel : TIMELINE_MULTIPLIERS[timeline].days}
          </p>
          <ul className="bp-pick-lines">
            <li>
              <span>{PACKAGE_SHORT[packageId]}</span>
              <span className="bp-mono">{formatPrice(pkg.basePrice)} zł</span>
            </li>
            {chosen.map((id) => (
              <li key={id}>
                <span>{FEATURES[id].label}</span>
                <span className="bp-mono">+{formatPrice(FEATURES[id].price)} zł</span>
              </li>
            ))}
            {timeline !== "standard" && (
              <li>
                <span>{TIMELINE_MULTIPLIERS[timeline].label}</span>
                <span className="bp-mono">
                  {surcharge(TIMELINE_MULTIPLIERS[timeline].multiplier)}
                </span>
              </li>
            )}
          </ul>
          <Link className="bp-row-act bp-row-act--primary" href={handOver}>
            Umów rozmowę <Arrow />
          </Link>
        </aside>
      </div>

      <div className="bp-pick-main">
        <fieldset className="bp-seg">
          <legend>Pakiet</legend>
          <div className="bp-seg-row bp-seg-row--4">
            {PACKAGE_IDS.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={id === packageId}
                onClick={() => setPackageId(id)}
              >
                <b>{PACKAGE_SHORT[id]}</b>
                <span className="bp-mono">od {formatPrice(PACKAGES[id].basePrice)} zł</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="bp-seg">
          <legend>Termin</legend>
          <div className="bp-seg-row bp-seg-row--3">
            {TIMELINE_IDS.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={id === timeline}
                onClick={() => setTimeline(id)}
              >
                <b>{TIMELINE_MULTIPLIERS[id].label}</b>
                <span className="bp-mono">{surcharge(TIMELINE_MULTIPLIERS[id].multiplier)}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {FEATURE_GROUPS.map((group) => {
          const ids = available.filter((id) => FEATURES[id].group === group.id);
          if (!ids.length) return null;
          return (
            <fieldset key={group.id} className="bp-seg">
              <legend>{group.label}</legend>
              <div className="bp-tiles">
                {ids.map((id) => {
                  const on = chosen.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      className="bp-tile"
                      aria-pressed={on}
                      onClick={() => toggle(id)}
                    >
                      <span className="bp-tile-top">
                        <b>{FEATURES[id].label}</b>
                        <span className="bp-tile-box" aria-hidden="true">
                          <svg viewBox="0 0 14 14">
                            <path d={on ? "M3 7.5l2.5 2.5L11 4.5" : "M7 3v8M3 7h8"} />
                          </svg>
                        </span>
                      </span>
                      <span className="bp-tile-desc">{FEATURES[id].description}</span>
                      <span className="bp-tile-price bp-mono">
                        +{formatPrice(FEATURES[id].price)} zł
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}
