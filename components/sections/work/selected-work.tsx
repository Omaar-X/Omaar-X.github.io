import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { Accent } from "@/components/ui/accent";
import { Button } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/section-intro";
import { SmartLink } from "@/components/ui/smart-link";
import { featuredWork, moreWork } from "@/data/projects";
import { profile } from "@/data/profile";
import { WorkCard } from "./work-card";

const github = profile.socials.find((social) => social.id === "github");

/**
 * All projects as a sticky stack: each card pins near the top while the next one slides up over
 * it, a little lower each time, so the previous cards stay visible as a pile of edges.
 */
export function SelectedWork() {
  const cards = [
    ...featuredWork.map(({ project, context }) => ({
      project,
      note: context?.label === "Current role" ? "Current role" : undefined,
    })),
    ...moreWork.map((project) => ({ project, note: undefined })),
  ];

  return (
    <section
      aria-labelledby="work-title"
      className="relative pt-section-compact pb-section-compact"
      style={{ "--work-card-h": "min(34rem, calc(100svh - var(--header-offset) - 8rem))" } as CSSProperties}
    >
      <Container className="flex flex-col gap-fluid-lg">
        <SectionIntro
          id="work-title"
          label="Portfolio projects"
          title={
            <>
              Selected <Accent>Work</Accent>
            </>
          }
          action={
            github && (
              <Button variant="secondary" size="sm" href={github.href} icon={ArrowUpRight}>
                View all on GitHub
              </Button>
            )
          }
        />

        <ol aria-label="Projects" className="flex flex-col gap-fluid-md">
          {cards.map(({ project, note }, index) => (
            <li
              key={project.slug}
              className="sticky"
              style={{ top: `calc(var(--header-offset) + 1rem + ${index * 0.9}rem)` }}
            >
              <WorkCard
                project={project}
                tone={index % 2 === 0 ? "lavender" : "plum"}
                index={index}
                total={cards.length}
                note={note}
              />
            </li>
          ))}
        </ol>

        {github && (
          <SmartLink
            href={github.href}
            className="group/more flex items-center justify-between gap-4 rounded-card border border-dashed border-border-strong bg-surface/70 p-6 transition-colors duration-500 hover:border-accent hover:bg-surface sm:p-8"
          >
            <span className="flex flex-col gap-1">
              <span className="type-kicker text-muted">Explore the archive</span>
              <span className="type-title">
                More on <Accent>GitHub</Accent>
              </span>
            </span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-on-ink transition-transform duration-500 ease-editorial group-hover/more:rotate-45">
              <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-5" />
            </span>
          </SmartLink>
        )}
      </Container>
    </section>
  );
}
