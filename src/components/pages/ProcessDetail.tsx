import { PixelIcon } from "@/components/brand/PixelIcon";
import { PixelTile } from "@/components/brand/PixelTile";
import { InView } from "@/components/ui/InView";
import { PROCESS_DETAILS, PROCESS_STEPS } from "@/constants/process";

/** The five home steps, each with its timing, description and what happens inside it. */
export function ProcessDetail() {
  return (
    <ol className="process-detail">
      {PROCESS_STEPS.map((step, index) => (
        <li key={step.title}>
          <InView className="reveal process-detail-row">
            <div className="process-detail-mark">
              <PixelTile digit={step.digit} />
            </div>
            <div>
              <p className="when">{step.when}</p>
              <h2 className="d3">{step.title}</h2>
              <p className="body">{step.text}</p>
            </div>
            <ul>
              {PROCESS_DETAILS[index].map((bullet) => (
                <li key={bullet}>
                  <PixelIcon name="check" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </InView>
        </li>
      ))}
    </ol>
  );
}
