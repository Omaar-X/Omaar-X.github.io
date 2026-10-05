import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { Accent } from "@/components/ui/accent";
import { SectionIntro } from "@/components/ui/section-intro";
import { skillGroups } from "@/data/skills";
import { SkillVisual } from "./skill-visuals";

const pad = (value: number) => String(value).padStart(2, "0");

const lead =
  "One person across the whole pipeline: the site, the campaign that brings people to it, the tools that keep it running and the research behind the next idea.";

/**
 * "How I work", on a light lavender panel: five stage cards, each with its skills as text and an
 * animated illustration of the work. The heading stays pinned and the cards stack beneath it as they
 * scroll past, at every size (native sticky, each a little lower than the last). Below desktop the
 * cards take a fixed height that follows the window (styles/effects.css, .skills-stack).
 */
export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="skills-stack relative isolate overflow-clip bg-[linear-gradient(180deg,var(--background),var(--lavender-light)_18%,var(--background-secondary)_82%,var(--background))] pt-section pb-section"
    >
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <span className="aurora top-[-6rem] left-[-6rem] size-[34rem] bg-[#e2d4f6]" />
        <span className="aurora top-[40%] right-[-10rem] size-[30rem] bg-[#f3dcec] opacity-60" />
        <span className="aurora bottom-[-8rem] left-[30%] size-[32rem] bg-[#d8defb] opacity-60" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgb(120_96_154/0.14)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]"
      />

      <Container
        className="flex flex-col gap-fluid-lg"
        style={{ "--skills-head": "9.5rem" } as CSSProperties}
      >
        {/*
          The heading stays pinned under the header at every size. Phones and tablets: the cards scroll
          beneath it (it has its own frosted background). Desktop: the cards stack just below it.
        */}
        <div className="skills-head grid gap-fluid-sm lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-x-fluid-lg">
          <SectionIntro
            id="skills-title"
            label="Services, skills, abilities"
            title={
              <>
                How I build <Accent>products</Accent>
              </>
            }
          />
          <p className="type-body hidden text-muted lg:block lg:pb-1">{lead}</p>
        </div>
        <p className="type-body -mt-fluid-sm text-muted lg:hidden">{lead}</p>

        <ol className="flex flex-col gap-fluid-md" aria-label="Skills, by stage">
          {skillGroups.map((group, index) => (
            <li key={group.id} className="skills-stack-item" style={{ "--i": index } as CSSProperties}>
              <article
                aria-labelledby={`skill-${group.id}`}
                data-spotlight=""
                className="relative flex h-(--skill-card-h) flex-col gap-3 overflow-hidden rounded-card border border-border bg-surface p-[clamp(1.125rem,0.75rem+2vw,2.5rem)] shadow-[0_30px_70px_-34px_rgb(60_40_90/0.35)] [--spot:rgb(120_96_154/0.08)] md:grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-center md:gap-fluid-md lg:h-auto lg:gap-fluid-lg"
              >
                <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden md:max-h-full md:flex-none md:gap-fluid-sm">
                  <p className="type-kicker text-accent">{group.kicker}</p>
                  <h3 id={`skill-${group.id}`} className="type-title">
                    <span className="text-accent-soft">{pad(index + 1)}.</span> {group.title}
                  </h3>
                  <p className="type-body line-clamp-3 max-w-[32rem] text-muted lg:line-clamp-none">{group.description}</p>
                  <ul
                    aria-label={`${group.title} skills`}
                    className="skill-tags flex gap-2 pt-1 max-lg:overflow-hidden lg:flex-wrap"
                  >
                    {group.tags.map((tag) => (
                      <li
                        key={tag}
                        className="shrink-0 rounded-full border border-border bg-background px-3 py-1.5 text-[0.8125rem] leading-none whitespace-nowrap text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0">
                  <SkillVisual stage={group.id} />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
