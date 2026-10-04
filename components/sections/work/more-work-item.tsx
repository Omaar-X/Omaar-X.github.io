import Image from "next/image";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { StatusBadge } from "@/components/ui/status-badge";
import { TextLink } from "@/components/ui/text-link";
import type { Project } from "@/data/projects";

type MoreWorkItemProps = {
  project: Project;
  index: number;
};

const pad = (value: number) => String(value).padStart(2, "0");

function primaryLink(project: Project) {
  if (project.url) {
    return {
      href: project.url,
      label: project.sector === "Internal tool" ? "Open live app" : "Visit live site",
    };
  }
  if (project.previewUrl) return { href: project.previewUrl, label: "View staging build" };
  return undefined;
}

/** A quiet editorial row: number, title, summary and links on one side, a small visual on the other. */
export function MoreWorkItem({ project, index }: MoreWorkItemProps) {
  const titleId = `more-work-${project.slug}-title`;
  const primary = primaryLink(project);

  return (
    <article
      aria-labelledby={titleId}
      className="group/item rule-top grid gap-x-fluid-lg gap-y-fluid-sm py-fluid-md md:max-lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:max-lg:[grid-template-areas:'meta_visual'_'main_visual'] lg:grid-cols-12 lg:gap-x-(--grid-gap) lg:py-fluid-lg"
    >
      <div className="flex items-center justify-between gap-4 md:max-lg:[grid-area:meta] lg:col-span-2 lg:flex-col lg:items-start lg:justify-start lg:gap-3">
        <span className="type-micro text-mauve-ink">{pad(index + 1)}</span>
        <StatusBadge status={project.status} />
      </div>

      <div className="flex flex-col gap-fluid-xs md:max-lg:[grid-area:main] lg:col-span-5">
        {project.descriptor && <p className="type-micro text-subtle">{project.descriptor}</p>}
        <h3
          id={titleId}
          className="font-serif text-[clamp(2rem,1.45rem+2.2vw,3.5rem)] leading-[1.02] tracking-[-0.015em] transition-transform duration-500 ease-editorial group-focus-within/item:translate-x-1 group-hover/item:translate-x-1"
        >
          {project.name}
        </h3>
        {project.summary && <p className="type-small max-w-md text-muted">{project.summary}</p>}
        <p className="type-micro mt-1 text-subtle">
          {project.technologies.join(" · ")}
          {project.year ? ` — ${project.year}` : ""}
        </p>
        <div className="mt-2 flex flex-wrap items-start gap-x-6">
          {primary && (
            <TextLink href={primary.href}>
              {primary.label}
              <span className="sr-only">: {project.name}</span>
            </TextLink>
          )}
          {project.repository && (
            <TextLink href={project.repository}>
              Source code<span className="sr-only">: {project.name}</span>
            </TextLink>
          )}
        </div>
      </div>

      {project.image && (
        <figure className="self-start md:max-lg:[grid-area:visual] lg:col-span-5">
          <BrowserFrame url={project.url ?? project.previewUrl}>
            <div
              className="image-reveal relative overflow-hidden"
              style={{ aspectRatio: `${project.image.src.width} / ${project.image.src.height}` }}
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 40vw, 90vw"
                placeholder="blur"
                className="object-cover transition-transform duration-700 ease-editorial group-hover/item:scale-[1.015]"
              />
            </div>
          </BrowserFrame>
          {project.image.caption && (
            <figcaption className="type-micro mt-2 text-subtle">{project.image.caption}</figcaption>
          )}
        </figure>
      )}
    </article>
  );
}
