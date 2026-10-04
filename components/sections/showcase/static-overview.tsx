import { showcaseStages } from "@/data/skills";
import { Drawing, type DrawingId } from "./drawings";

/**
 * The reduced-motion version of the showcase: one static composition that shows every discipline
 * at once, with no animation, no pin and nothing to wait for.
 */
const groups = [
  { stage: "build", draw: "browser", names: ["Web Development"] },
  { stage: "grow", draw: "target", names: ["Digital Marketing", "Meta / Facebook Ads", "Google Ads"] },
  { stage: "automate", draw: "flow", names: ["AI Automation", "Business Automation"] },
  { stage: "create", draw: "canva", names: ["Video Editing", "Photography", "Visual Design / Canva"] },
  { stage: "research", draw: "explain", names: ["AI / Computer Vision Research"] },
] as const satisfies readonly { stage: string; draw: DrawingId; names: readonly string[] }[];

export function StaticOverview() {
  return (
    <div className="sc-static-grid">
      <p className="type-micro text-subtle sc-static-title">What I do</p>
      <ul className="sc-static-list">
        {groups.map((group) => {
          const stage = showcaseStages.find((candidate) => candidate.id === group.stage);
          return (
            <li key={group.stage} data-tone={group.stage} className="sc-static-item">
              <span className="sc-static-art" aria-hidden>
                <span className="pl">
                  <Drawing id={group.draw} />
                </span>
              </span>
              <p className="type-statement-sm text-(--tone-ink)">{stage?.label}</p>
              <ul className="sc-static-names">
                {group.names.map((name) => (
                  <li key={name} className="type-body">
                    {name}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
