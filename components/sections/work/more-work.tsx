import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { TextLink } from "@/components/ui/text-link";
import { sectionHref } from "@/data/navigation";
import { moreWork } from "@/data/projects";
import { MoreWorkItem } from "./more-work-item";

const pad = (value: number) => String(value).padStart(2, "0");

export function MoreWork() {
  return (
    <section
      aria-labelledby="more-work-title"
      className="defer-render relative pt-section-compact pb-section [--defer-h:127rem] md:[--defer-h:88rem] lg:[--defer-h:119rem]"
    >
      <Container className="flex flex-col gap-fluid-lg">
        <SectionIntro
          id="more-work-title"
          index="02"
          label="More Work"
          meta={
            <>
              <span className="text-foreground">{pad(moreWork.length)}</span> Projects
            </>
          }
          size="sm"
          title="More websites, systems & internal tools."
          lead="A broader selection of projects across web development, internal tools and business-focused digital work."
        />

        <ol aria-label="More projects">
          {moreWork.map((project, index) => (
            <li key={project.slug}>
              <MoreWorkItem project={project} index={index} />
            </li>
          ))}
        </ol>

        <div className="rule-top flex items-center justify-between gap-6 pt-fluid-sm">
          <p className="type-micro text-subtle">Next</p>
          <TextLink href={sectionHref("experience")}>Experience</TextLink>
        </div>
      </Container>
    </section>
  );
}
