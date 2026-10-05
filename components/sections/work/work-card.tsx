import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SmartLink } from "@/components/ui/smart-link";
import { caseStudyHref, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";

type WorkCardProps = {
  project: Project;
  /** `lavender` is the light card (dark text), `plum` the dark one (light text). */
  tone: "plum" | "lavender";
  index: number;
  total: number;
  /** Extra context for featured projects, e.g. "Current role". */
  note?: string;
};

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  "launching-soon": "Launching soon",
};

const pad = (value: number) => String(value).padStart(2, "0");

function primaryLink(project: Project) {
  const caseStudy = caseStudyHref(project);
  if (caseStudy) return { href: caseStudy, label: "View case study" };
  if (project.url) {
    return { href: project.url, label: project.sector === "Internal tool" ? "Open live app" : "Visit live site" };
  }
  if (project.previewUrl) return { href: project.previewUrl, label: "View staging build" };
  return undefined;
}

/**
 * A project card for the sticky stack. Phones: a tall card, screen on top, caption below.
 * Tablets and up: a wide card, caption on the left and the live screen floating on the right.
 * The whole card is one link (the title's stretched link).
 */
export function WorkCard({ project, tone, index, total, note }: WorkCardProps) {
  const titleId = `work-${project.slug}-title`;
  const primary = primaryLink(project);
  const meta = [project.descriptor?.split(" · ")[0], project.year].filter(Boolean).join(" · ");
  const dark = tone === "plum";

  return (
    <article
      aria-labelledby={titleId}
      data-spotlight=""
      className={cn(
        "group/card relative isolate flex flex-col overflow-hidden rounded-card border shadow-[0_-12px_40px_-20px_rgb(60_40_90/0.25),0_30px_70px_-30px_rgb(60_40_90/0.35)] md:block md:h-(--work-card-h)",
        dark
          ? "border-white/10 bg-[radial-gradient(120%_120%_at_85%_0%,#5b4479,var(--ink)_65%)] text-on-ink [--spot:rgb(255_255_255/0.1)]"
          : "border-white/70 bg-[radial-gradient(120%_120%_at_85%_0%,#f7f2fd,var(--lavender)_70%)] text-foreground [--spot:rgb(255_255_255/0.45)]",
      )}
    >
      {project.image && (
        <div className="relative px-[6%] pt-[6%] md:absolute md:top-1/2 md:right-[4%] md:w-[56%] md:-translate-y-1/2 md:p-0">
          <div className="origin-center transition-transform duration-700 ease-editorial md:rotate-[-2deg] md:group-hover/card:rotate-0 md:group-hover/card:scale-[1.03]">
            <div className="overflow-hidden rounded-lg bg-surface shadow-float ring-1 ring-black/5">
              <div aria-hidden className="flex h-5 items-center gap-1 border-b border-border px-2.5 sm:h-7">
                <span className="size-1.5 rounded-full bg-[#f0bfdc] sm:size-2" />
                <span className="size-1.5 rounded-full bg-[#c9b8ec] sm:size-2" />
                <span className="size-1.5 rounded-full bg-[#b9c6f5] sm:size-2" />
                <span className="mx-auto hidden h-3 w-2/5 rounded-full bg-background sm:block" />
              </div>
              <div className="relative aspect-[16/9]">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 88vw"
                  placeholder="blur"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col justify-between gap-fluid-sm p-[clamp(1.25rem,0.75rem+2vw,2.75rem)] md:h-full md:w-[40%]">
        <div className="flex items-center justify-between gap-3 md:justify-start">
          <p className={cn("type-micro tabular-nums", dark ? "text-on-ink-muted" : "text-mauve-ink")}>
            {pad(index + 1)} / {pad(total)}
          </p>
          <span
            className={cn(
              "type-micro inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5",
              dark ? "bg-white/10 text-on-ink" : "bg-white/70 text-foreground",
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                project.status === "live" ? "bg-[#3fb97c]" : "border border-current",
              )}
            />
            {statusLabel[project.status]}
          </span>
        </div>

        <div className="flex flex-col gap-fluid-xs">
          {(meta || note) && (
            <p className={cn("type-micro", dark ? "text-on-ink-muted" : "text-mauve-ink")}>
              {meta}
              {note && meta ? " · " : ""}
              {note}
            </p>
          )}
          <h3 id={titleId} className="type-title text-balance">
            {primary ? (
              <SmartLink
                href={primary.href}
                className="after:absolute after:inset-0 after:z-20 after:content-[''] focus-visible:outline-none"
              >
                {project.name}
                <span className="sr-only">: {primary.label}</span>
              </SmartLink>
            ) : (
              project.name
            )}
          </h3>
          {project.summary && (
            <p className={cn("type-small line-clamp-3 max-w-md md:type-body", dark ? "text-on-ink-muted" : "text-muted")}>
              {project.summary}
            </p>
          )}
          {project.technologies.length > 0 && (
            <ul aria-label="Built with" className="flex flex-wrap gap-1.5 pt-1 max-md:hidden">
              {project.technologies.slice(0, 4).map((tech) => (
                <li
                  key={tech}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[0.75rem] leading-none",
                    dark ? "bg-white/8 text-on-ink-muted" : "bg-white/60 text-muted",
                  )}
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>

        {primary && (
          <p className="inline-flex items-center gap-3 text-sm font-medium">
            <span
              aria-hidden
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-full transition-[background-color,color,rotate] duration-500 ease-editorial group-hover/card:rotate-45",
                dark
                  ? "bg-white/12 group-hover/card:bg-accent-soft group-hover/card:text-ink"
                  : "bg-ink text-on-ink group-hover/card:bg-accent",
              )}
            >
              <ArrowUpRight strokeWidth={1.75} className="size-5" />
            </span>
            <span aria-hidden>{primary.label}</span>
          </p>
        )}
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 rounded-card ring-accent group-has-[:focus-visible]/card:ring-2"
      />
    </article>
  );
}
