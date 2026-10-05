import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { Accent } from "@/components/ui/accent";
import { SectionIntro } from "@/components/ui/section-intro";
import { skillGroups } from "@/data/skills";
import { SkillVisual } from "./skill-visuals";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * "How I work", on a light lavender panel: five stage cards, each with its skills as text and an
 * animated illustration of the work. On desktop the cards stack as they scroll past (native sticky,
 * each a little lower than the last).
 */
export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative isolate overflow-clip bg-[linear-gradient(180deg,var(--background),var(--lavender-light)_18%,var(--background-secondary)_82%,var(--background))] pt-section pb-section"
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

      <Container className="flex flex-col gap-fluid-lg">
        <SectionIntro
          id="skills-title"
          label="Services, skills, abilities"
          title={
            <>
              How I build <Accent>products</Accent>
            </>
          }
          lead="One person across the whole pipeline: the site, the campaign that brings people to it, the tools that keep it running and the research behind the next idea."
        />

        <ol className="flex flex-col gap-fluid-md" aria-label="Skills, by stage">
          {skillGroups.map((group, index) => (
            <li
              key={group.id}
              className="lg:sticky lg:top-[calc(var(--header-offset)+1.25rem+var(--i)*1.25rem)]"
              style={{ "--i": index } as CSSProperties}
            >
              <article
                aria-labelledby={`skill-${group.id}`}
                data-spotlight=""
                className="relative grid items-center gap-fluid-md overflow-hidden rounded-card border border-border bg-surface p-[clamp(1.25rem,0.75rem+2vw,2.5rem)] shadow-[0_30px_70px_-34px_rgb(60_40_90/0.35)] [--spot:rgb(120_96_154/0.08)] md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-fluid-lg"
              >
                <div className="flex flex-col gap-fluid-sm">
                  <p className="type-kicker text-accent">{group.kicker}</p>
                  <h3 id={`skill-${group.id}`} className="type-title">
                    <span className="text-accent-soft">{pad(index + 1)}.</span> {group.title}
                  </h3>
                  <p className="type-body max-w-[32rem] text-muted">{group.description}</p>
                  <ul aria-label={`${group.title} skills`} className="flex flex-wrap gap-2 pt-1">
                    {group.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-[0.8125rem] leading-none text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <SkillVisual stage={group.id} />
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
