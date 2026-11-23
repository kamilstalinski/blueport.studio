import { Plus } from "@/components/ui/Marks";
import { FAQ_ITEMS, type FAQKey } from "@/constants/faq";

type FaqListProps = { keys: readonly FAQKey[] } | { items: readonly { q: string; a: string }[] };

/** Native details accordion: works without JavaScript and keeps browser find-in-page. */
export function FaqList(props: FaqListProps) {
  const items = "items" in props ? props.items : props.keys.map((key) => FAQ_ITEMS[key]);
  return (
    <div className="bp-faq">
      {items.map((item) => (
        <details key={item.q} className="faq-row" name="faq">
          <summary>
            <span>{item.q}</span>
            <Plus />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
