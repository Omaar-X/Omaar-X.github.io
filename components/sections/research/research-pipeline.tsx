import type { ModelStage } from "@/data/research";

type ResearchPipelineProps = {
  stages: readonly ModelStage[];
};

/** The model pipeline as four numbered steps separated by hairlines, not boxed cards. */
export function ResearchPipeline({ stages }: ResearchPipelineProps) {
  return (
    <ol
      aria-label="Research pipeline, in order"
      className="grid gap-x-fluid-md gap-y-fluid-md sm:grid-cols-2"
    >
      {stages.map((stage, index) => (
        <li key={stage.stage} className="rule-top flex flex-col gap-3 pt-fluid-sm">
          <span className="font-serif text-[clamp(2rem,1.6rem+1.2vw,3rem)] leading-none text-mauve-ink">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h4 className="type-h3">{stage.label}</h4>
          <ul
            aria-label={`${stage.label} models`}
            className="plus-list flex flex-wrap gap-x-2 gap-y-1 text-[0.9375rem] font-medium text-foreground"
          >
            {stage.models.map((model) => (
              <li key={model} className="flex items-center gap-2">
                {model}
              </li>
            ))}
          </ul>
          {stage.produces && (
            <p className="type-small text-muted">
              <span className="type-micro mr-2 text-subtle">Output</span>
              {stage.produces}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
