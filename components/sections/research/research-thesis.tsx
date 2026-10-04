import { StatusBadge } from "@/components/ui/status-badge";
import type { ResearchItem } from "@/data/research";
import { ResearchPipeline } from "./research-pipeline";

const number = new Intl.NumberFormat("en-US");

export function ResearchThesis({ item }: { item: ResearchItem }) {
  const { dataset, externalValidation } = item;

  const facts = [
    dataset && {
      term: "Internal dataset",
      detail: `${dataset.name}${dataset.slices ? ` · ${number.format(dataset.slices)} ${dataset.modality ?? ""} slices` : ""}`.replace(/\s+/g, " "),
    },
    dataset?.classes && {
      term: `${dataset.classes.length} classes`,
      detail: dataset.classes.join(", "),
    },
    dataset?.pixelMasks && {
      term: "Pixel-level masks",
      detail: number.format(dataset.pixelMasks),
    },
    externalValidation && {
      term: "External evaluation",
      detail: [
        externalValidation.name,
        externalValidation.slices && `${number.format(externalValidation.slices)} slices`,
        externalValidation.patients && `${externalValidation.patients} patients`,
      ]
        .filter(Boolean)
        .join(" · "),
    },
  ].filter((fact): fact is { term: string; detail: string } => Boolean(fact));

  return (
    <article aria-labelledby="research-thesis-title" className="flex flex-col gap-fluid-lg">
      <div className="flex flex-col gap-fluid-md">
        <div className="rule-top flex flex-wrap items-center justify-between gap-3 pt-fluid-sm">
          <p className="type-micro text-subtle">
            Thesis{item.year ? <span> · {item.year}</span> : null}
          </p>
          <StatusBadge status={item.status} />
        </div>
        <h3 id="research-thesis-title" className="scroll-rise type-mega text-foreground">
          {item.shortTitle}
        </h3>
        <p className="type-body-lg text-accent-strong">
          Brain MRI classification <span aria-hidden>+</span>
          <span className="sr-only"> and </span> segmentation <span aria-hidden>+</span>
          <span className="sr-only"> and </span> explainable AI
        </p>
      </div>

      <div className="editorial-grid gap-y-fluid-lg">
        <div className="col-span-full flex flex-col gap-fluid-md lg:col-span-5">
          <p className="type-body max-w-[34rem] text-muted">{item.summary}</p>
          <ul
            aria-label="Research areas"
            className="type-micro dot-list flex flex-wrap gap-x-2 gap-y-1 text-subtle"
          >
            {item.researchAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          {item.context && (
            <p className="type-small text-subtle">
              {item.context}
              {item.institution ? `, ${item.institution}` : ""}
            </p>
          )}
          {item.notice && <p className="type-small text-foreground">{item.notice}</p>}
        </div>

        <div className="col-span-full flex flex-col gap-fluid-sm lg:col-span-7">
          <p className="type-micro text-subtle">Pipeline</p>
          {item.stages && <ResearchPipeline stages={item.stages} />}
        </div>
      </div>

      <dl className="rule-top grid grid-cols-1 gap-x-(--grid-gap) gap-y-fluid-sm pt-fluid-sm sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.term} className="flex flex-col gap-1">
            <dt className="type-micro text-subtle">{fact.term}</dt>
            <dd className="type-small text-foreground">{fact.detail}</dd>
          </div>
        ))}
      </dl>

      <p className="type-small max-w-3xl text-subtle">
        <span className="type-micro mr-2">Full title</span>
        {item.title}
      </p>
    </article>
  );
}
