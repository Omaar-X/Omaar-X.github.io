import Image from "next/image";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { StatusBadge } from "@/components/ui/status-badge";
import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/cn";
import { caseStudyHref, type FeaturedWork } from "@/data/projects";
import type { ImageAsset } from "@/data/types";

type WorkPanelProps = FeaturedWork & {
  index: number;
  total: number;
};

const pad = (value: number) => String(value).padStart(2, "0");
const aspect = (image: ImageAsset) => (image.src.width / image.src.height).toFixed(4);

export function WorkPanel({ project, surface, badge, context, index, total }: WorkPanelProps) {
  const titleId = `work-${project.slug}-title`;
  const caseStudy = caseStudyHref(project);
  const liveUrl = project.url ?? project.previewUrl;

  return (
    <article
      aria-labelledby={titleId}
      data-surface={surface}
      data-work-panel=""
      className="group/panel relative h-full origin-top overflow-hidden rounded-lg bg-(--panel) text-foreground"
    >
      <div className="grid h-full grid-rows-[auto_auto_minmax(0,1fr)_auto] gap-y-fluid-sm p-fluid-sm [grid-template-areas:'meta'_'title'_'visual'_'footer'] sm:p-fluid-md lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:gap-x-fluid-lg lg:gap-y-fluid-md lg:p-fluid-lg lg:[grid-template-areas:'meta_visual'_'title_visual'_'footer_visual']">
        <div className="flex items-center justify-between gap-4 [grid-area:meta]">
          <p className="type-micro text-subtle">
            <span className="text-foreground">{pad(index + 1)}</span>
            <span aria-hidden> / </span>
            <span className="sr-only"> of </span>
            {pad(total)}
          </p>
          <StatusBadge status={badge} />
        </div>

        <div className="flex flex-col gap-2 [grid-area:title] lg:gap-fluid-sm lg:self-center">
          {project.descriptor && (
            <p className="type-micro text-mauve-ink">{project.descriptor}</p>
          )}
          <h3 id={titleId} className="type-title text-balance">
            {project.name}
          </h3>
          {context && (
            <p className="type-small text-muted [@media(max-height:42rem)]:hidden">
              <span className="text-subtle">{context.label} — </span>
              {context.value}
            </p>
          )}
          {project.summary && (
            <p className="type-small line-clamp-2 max-w-md text-muted [@media(max-height:42rem)]:hidden lg:type-body lg:line-clamp-none">
              {project.summary}
            </p>
          )}
        </div>

        <div
          data-panel-visual=""
          className={cn(
            "flex min-h-0 items-end justify-center [container-type:size] [grid-area:visual] lg:items-center",
            // Later panels skip rendering (and so image loading) until they approach the viewport.
            index > 0 && "[content-visibility:auto]",
          )}
        >
          {project.image ? (
            <div
              className="relative shrink-0"
              style={{ width: `min(100cqw, calc((100cqh - 2rem) * ${aspect(project.image)}))` }}
            >
              <BrowserFrame url={liveUrl}>
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: aspect(project.image) }}
                >
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(min-width: 1024px) 60vw, (min-width: 640px) 88vw, 82vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 ease-editorial group-hover/panel:scale-[1.015]"
                  />
                </div>
              </BrowserFrame>
              {project.details?.map((detail, position) => (
                <figure
                  key={detail.alt}
                  className={
                    position === 0
                      ? "absolute -bottom-[7%] -left-[3%] hidden w-[38%] overflow-hidden rounded-md border border-border bg-surface shadow-elevated transition-transform duration-700 ease-editorial group-hover/panel:-translate-y-1 sm:block"
                      : "absolute -right-[2%] -bottom-[9%] hidden w-[17%] overflow-hidden rounded-md border border-border bg-surface shadow-elevated transition-transform duration-700 ease-editorial group-hover/panel:-translate-y-2 sm:block"
                  }
                >
                  <Image
                    src={detail.src}
                    alt={detail.alt}
                    sizes="(min-width: 1024px) 24vw, 38vw"
                    placeholder="blur"
                    className="h-auto w-full"
                  />
                </figure>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col justify-between p-fluid-md">
              <span className="type-title text-accent">{project.name}</span>
              <ul className="type-micro flex flex-col gap-2 text-muted">
                {project.capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 [grid-area:footer] sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start lg:gap-fluid-sm">
          {project.capabilities.length > 0 && (
            <ul aria-label="Capabilities" className="type-micro dot-list flex flex-wrap gap-x-2 gap-y-1 text-subtle">
              {project.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {liveUrl && (
              <TextLink href={liveUrl}>
                {project.sector === "Internal tool" ? "Open live app" : "Visit live site"}
                <span className="sr-only">: {project.name}</span>
              </TextLink>
            )}
            {caseStudy ? (
              <TextLink href={caseStudy}>
                View case study<span className="sr-only">: {project.name}</span>
              </TextLink>
            ) : (
              project.caseStudy?.status === "in-preparation" && (
                <span className="type-small text-subtle">Case study in preparation</span>
              )
            )}
          </div>
        </div>
      </div>
      <span
        aria-hidden
        data-panel-shade=""
        className="pointer-events-none absolute inset-0 bg-(--shade) opacity-0"
      />
    </article>
  );
}
