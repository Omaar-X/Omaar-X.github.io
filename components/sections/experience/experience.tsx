import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { TextLink } from "@/components/ui/text-link";
import { careerEntries } from "@/data/experience";
import { sectionHref } from "@/data/navigation";
import { ExperienceEntry } from "./experience-entry";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="defer-render relative pt-section-compact pb-section [--defer-h:103rem] md:[--defer-h:99rem] lg:[--defer-h:117rem]"
    >
      <Container className="flex flex-col gap-fluid-xl">
        <SectionIntro
          id="experience-title"
          index="03"
          label="Experience"
          meta={
            <>
              <span className="text-foreground">{String(careerEntries.length).padStart(2, "0")}</span>{" "}
              Roles
            </>
          }
          title="Building across technology & business."
          lead="Experience across web development, digital operations, marketing and business-focused technology."
        />

        <ol aria-label="Roles, most recent first">
          {careerEntries.map((entry, index) => (
            <li key={entry.id}>
              <ExperienceEntry entry={entry} index={index} total={careerEntries.length} />
            </li>
          ))}
        </ol>

        <div className="rule-top flex items-center justify-between gap-6 pt-fluid-sm">
          <p className="type-micro text-subtle">Next</p>
          <TextLink href={sectionHref("research")}>Research</TextLink>
        </div>
      </Container>
    </section>
  );
}
