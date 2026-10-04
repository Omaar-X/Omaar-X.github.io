import { StatusBadge } from "@/components/ui/status-badge";
import { TextLink } from "@/components/ui/text-link";
import type { ResearchItem } from "@/data/research";

type ResearchPublicationProps = {
  item: ResearchItem;
  index: number;
};

export function ResearchPublication({ item, index }: ResearchPublicationProps) {
  const titleId = `research-${item.id}-title`;
  const venue = [item.publisher, item.venue].filter(Boolean).join(" · ");
  const external = item.link ?? item.pdf;

  return (
    <article
      aria-labelledby={titleId}
      className="rule-top editorial-grid gap-y-fluid-sm py-fluid-md lg:py-fluid-lg"
    >
      <div className="col-span-full flex items-center justify-between gap-4 md:col-span-2 md:flex-col md:items-start md:justify-start lg:col-span-3">
        <span className="type-micro text-mauve-ink">{String(index + 1).padStart(2, "0")}</span>
        <StatusBadge status={item.status} />
      </div>
      <div className="col-span-full flex flex-col gap-3 md:col-span-6 lg:col-span-8 lg:col-start-5">
        {venue && <p className="type-micro text-subtle">{venue}</p>}
        <h3
          id={titleId}
          className="scroll-rise max-w-[44rem] font-serif text-[clamp(1.625rem,1.2rem+1.5vw,2.5rem)] leading-[1.08] tracking-[-0.01em]"
        >
          {item.title}
        </h3>
        <p className="type-small max-w-[36rem] text-muted">{item.summary}</p>
        <ul
          aria-label="Research areas"
          className="type-micro dot-list flex flex-wrap gap-x-2 gap-y-1 text-subtle"
        >
          {item.researchAreas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
        {external && (
          <div>
            <TextLink href={external}>
              Details<span className="sr-only">: {item.shortTitle}</span>
            </TextLink>
          </div>
        )}
      </div>
    </article>
  );
}
