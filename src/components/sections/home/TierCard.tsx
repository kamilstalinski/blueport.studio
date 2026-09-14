import { PixelIcon } from "@/components/brand/PixelIcon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PACKAGES, type HomeTier } from "@/constants/pricing";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

interface TierCardProps {
  tier: HomeTier;
}

export function TierCard({ tier }: TierCardProps) {
  const pkg = PACKAGES[tier.packageId];

  return (
    <article className={cn("tier", tier.featured && "featured")}>
      {tier.tag && <span className="tier-tag">{tier.tag}</span>}
      <h3 className="d3">{tier.name}</h3>
      <p className="tech">{pkg.tech}</p>
      <p className="price">
        od {formatPrice(pkg.basePrice)} <small>zł</small>
      </p>
      <p className="when">{pkg.deliveryLabel}</p>
      <ul>
        {tier.features.map((feature) => (
          <li key={feature}>
            <PixelIcon name="check" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <ButtonLink href="/kalkulator" variant={tier.featured ? "oncobalt" : "secondary"} withArrow>
        Sprawdź koszt
      </ButtonLink>
    </article>
  );
}
