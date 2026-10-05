import { Container } from "@/components/layout/container";
import { Accent } from "@/components/ui/accent";
import { SectionIntro } from "@/components/ui/section-intro";
import { publications, thesis } from "@/data/research";
import { ResearchPublication } from "./research-publication";
import { ResearchThesis } from "./research-thesis";

export function ResearchSection() {
  return (
    <section
      id="research"
      aria-labelledby="research-title"
      className="defer-render relative bg-[linear-gradient(to_bottom,transparent,var(--background-secondary)_20rem,var(--background-secondary)_calc(100%-16rem),transparent)] pt-section pb-section [--defer-h:175rem] md:[--defer-h:143rem] lg:[--defer-h:154rem]"
    >
      <Container className="flex flex-col gap-fluid-xl">
        <SectionIntro
          id="research-title"
          label="Research"
          size="sm"
          title={
            <>
              Researching <Accent>intelligent</Accent> systems with real&#8209;world applications.
            </>
          }
          lead="Work spanning medical image analysis, deep learning, computer vision and practical intelligent systems."
        />

        <ResearchThesis item={thesis} />

        <div className="flex flex-col gap-fluid-sm">
          <div className="rule-top flex items-center justify-between gap-6 pt-fluid-sm">
            <p className="type-eyebrow text-muted">Publications</p>
            <p className="type-micro text-subtle">Status shown as recorded</p>
          </div>
          <ol aria-label="Publications">
            {publications.map((item, index) => (
              <li key={item.id}>
                <ResearchPublication item={item} index={index} />
              </li>
            ))}
          </ol>
        </div>

      </Container>
    </section>
  );
}
