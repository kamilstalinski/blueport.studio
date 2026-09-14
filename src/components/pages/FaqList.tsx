import { PixelIcon } from "@/components/brand/PixelIcon";
import { FAQ_ITEMS, type FAQKey } from "@/constants/faq";

interface FaqListProps {
  keys: readonly FAQKey[];
}

/** Native details accordion: works without JavaScript and keeps browser find-in-page. */
export function FaqList({ keys }: FaqListProps) {
  return (
    <div className="faq">
      {keys.map((key) => (
        <details key={key} className="faq-row" name="faq">
          <summary>
            <span>{FAQ_ITEMS[key].q}</span>
            <PixelIcon name="plus" scale={3} />
          </summary>
          <p className="body">{FAQ_ITEMS[key].a}</p>
        </details>
      ))}
    </div>
  );
}
