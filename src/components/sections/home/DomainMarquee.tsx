import { WORK_SITES } from "@/constants/work";

const DOMAINS = WORK_SITES.map((site) => site.domain);
const LOOP = [...DOMAINS, ...DOMAINS];

export function DomainMarquee() {
  return (
    <div className="marq" aria-hidden="true">
      <div className="marq-track">
        {LOOP.map((domain, index) => (
          <span key={`${domain}-${index}`}>{domain}</span>
        ))}
      </div>
    </div>
  );
}
