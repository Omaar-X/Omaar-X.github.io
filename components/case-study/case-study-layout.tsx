import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StatusBadge } from "@/components/ui/status-badge";
import { TextLink } from "@/components/ui/text-link";
import { sectionHref } from "@/data/navigation";
import type { CaseStudy, Project } from "@/data/projects";
import { caseStudyPath } from "@/lib/routes";
import { CaseStudyScreens } from "./case-study-screens";
import { CaseStudySection } from "./case-study-section";

type CaseStudyLayoutProps = {
  project: Project;
  caseStudy: CaseStudy;
  previous?: Project;
  next?: Project;
};

type SectionEntry = { id: string; label: string; layout?: "split" | "wide"; content: ReactNode };

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function CaseStudyLayout({ project, caseStudy, previous, next }: CaseStudyLayoutProps) {
  const liveUrl = project.url;
  const screens = (caseStudy.screens ?? []).filter(
    (screen) => screen.image.src.src !== project.image?.src.src,
  );

  const facts = [
    caseStudy.role && { term: "Role", detail: caseStudy.role },
    caseStudy.projectType && { term: "Project type", detail: caseStudy.projectType },
    project.client && { term: "Client", detail: project.client },
    project.year && { term: "Year", detail: project.year },
  ].filter((fact): fact is { term: string; detail: string } => Boolean(fact));

  const candidates: Array<SectionEntry | false | 0 | "" | undefined> = [
    caseStudy.overview && {
      id: "overview",
      label: "Overview",
      content: <p className="type-body-lg text-foreground">{caseStudy.overview}</p>,
    },
    caseStudy.challenge && {
      id: "challenge",
      label: "Challenge",
      content: <p className="type-body-lg text-muted">{caseStudy.challenge}</p>,
    },
    caseStudy.approach && {
      id: "approach",
      label: "Approach",
      content: <p className="type-body-lg text-muted">{caseStudy.approach}</p>,
    },
    caseStudy.keyAreas?.length && {
      id: "key-areas",
      label: "Key areas",
      content: (
        <ol className="grid gap-x-(--grid-gap) gap-y-fluid-md sm:grid-cols-2">
          {caseStudy.keyAreas.map((area, index) => (
            <li key={area.title} className="flex flex-col gap-2 border-t border-border pt-fluid-sm">
              <span className="type-micro text-subtle">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="type-h3">{area.title}</h3>
              <p className="type-small text-muted">{area.detail}</p>
            </li>
          ))}
        </ol>
      ),
    },
    screens.length > 0 && {
      id: "screens",
      label: "Selected screens",
      layout: "wide" as const,
      content: <CaseStudyScreens screens={screens} url={liveUrl} />,
    },
    project.technologies.length > 0 && {
      id: "technology",
      label: "Technology",
      content: (
        <ul className="type-body-lg dot-list flex flex-wrap gap-x-2 gap-y-1 text-foreground [--dot-color:var(--subtle)]">
          {project.technologies.map((technology) => (
            <li key={technology}>
              {technology}
            </li>
          ))}
        </ul>
      ),
    },
    (caseStudy.outcome || liveUrl) && {
      id: "status",
      label: "Current status",
      content: (
        <div className="flex flex-col items-start gap-fluid-sm">
          {caseStudy.outcome && <p className="type-body-lg text-foreground">{caseStudy.outcome}</p>}
          {liveUrl && (
            <Button href={liveUrl} icon={ArrowUpRight}>
              Visit {host(liveUrl)}
            </Button>
          )}
        </div>
      ),
    },
  ];
  const sections = candidates.filter((section): section is SectionEntry => Boolean(section));

  return (
    <article aria-labelledby="case-study-title">
      <header className="pt-[calc(var(--header-offset)+var(--fluid-md))]">
        <Container className="flex flex-col gap-fluid-md">
          <div>
            <TextLink href={sectionHref("work")} direction="back">
              Back to Selected Work
            </TextLink>
          </div>
          <div className="flex flex-col gap-fluid-md border-t border-border pt-fluid-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Eyebrow>Case study</Eyebrow>
              <StatusBadge status={project.status} />
            </div>
            <div className="flex flex-col gap-fluid-sm">
              <h1 id="case-study-title" className="type-display">
                {project.name}
              </h1>
              {project.descriptor && (
                <p className="type-body-lg max-w-2xl text-muted">{project.descriptor}</p>
              )}
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-fluid-sm md:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.term} className="flex flex-col gap-1">
                  <dt className="type-micro text-subtle">{fact.term}</dt>
                  <dd className="type-small text-foreground">{fact.detail}</dd>
                </div>
              ))}
              {liveUrl && (
                <div className="flex flex-col gap-1">
                  <dt className="type-micro text-subtle">Live site</dt>
                  <dd className="type-small">
                    <TextLink href={liveUrl}>{host(liveUrl)}</TextLink>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </Container>
      </header>

      {project.image && (
        <Container className="pt-fluid-lg">
          <BrowserFrame url={liveUrl}>
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: `${project.image.src.width} / ${project.image.src.height}` }}
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                preload
                sizes="(min-width: 1536px) 1344px, 94vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </BrowserFrame>
        </Container>
      )}

      <div className="pt-fluid-lg">
        {sections.map((section, index) => (
          <CaseStudySection
            key={section.id}
            id={section.id}
            index={index + 1}
            label={section.label}
            layout={section.layout}
          >
            {section.content}
          </CaseStudySection>
        ))}
      </div>

      <Container className="pt-fluid-lg pb-section">
        <nav
          aria-label="Case studies"
          className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-border pt-fluid-sm"
        >
          <TextLink href={sectionHref("work")} direction="back">
            Back to Selected Work
          </TextLink>
          {previous && (
            <TextLink href={caseStudyPath(previous.slug)} direction="back">
              Previous: {previous.name}
            </TextLink>
          )}
          {next ? (
            <TextLink href={caseStudyPath(next.slug)}>Next: {next.name}</TextLink>
          ) : (
            !previous && <p className="type-small text-subtle">More case studies in preparation</p>
          )}
        </nav>
      </Container>
    </article>
  );
}
