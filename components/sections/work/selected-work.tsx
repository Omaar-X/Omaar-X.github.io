import { Container } from "@/components/layout/container";
import { StickyStack, StickyStackItem } from "@/components/layout/sticky-stack";
import { SectionIntro } from "@/components/ui/section-intro";
import { featuredWork } from "@/data/projects";
import { WorkPanel } from "./work-panel";
import { WorkStackMotion } from "./work-stack-motion";

const stackId = "work-stack";
const pad = (value: number) => String(value).padStart(2, "0");

export function SelectedWork() {
  const total = featuredWork.length;

  return (
    <section
      aria-labelledby="work-title"
      className="relative bg-[linear-gradient(to_bottom,transparent,var(--background-secondary)_22rem,var(--background-secondary)_calc(100%-18rem),transparent)] pt-section pb-section-compact"
    >
      <Container className="flex flex-col gap-fluid-xl">
        <SectionIntro
          id="work-title"
          index="01"
          label="Selected Work"
          meta={
            <>
              <span className="text-foreground">{pad(total)}</span> Featured Projects
            </>
          }
          title="Ideas turned into digital products."
        />

        <StickyStack id={stackId} aria-label="Featured projects" className="work-stack">
          {featuredWork.map((work, index) => (
            <StickyStackItem key={work.project.slug} index={index}>
              <WorkPanel {...work} index={index} total={total} />
            </StickyStackItem>
          ))}
        </StickyStack>
        <WorkStackMotion stackId={stackId} />
      </Container>
    </section>
  );
}
