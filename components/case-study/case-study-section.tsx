import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Grid, GridItem } from "@/components/layout/grid";

type CaseStudySectionProps = {
  id: string;
  index: number;
  label: string;
  layout?: "split" | "wide";
  children: ReactNode;
};

export function CaseStudySection({ id, index, label, layout = "split", children }: CaseStudySectionProps) {
  const titleId = `${id}-title`;
  const heading = (
    <h2 id={titleId} className="type-eyebrow flex items-center gap-3 text-muted">
      <span className="text-mauve-ink">{String(index).padStart(2, "0")}</span>
      {label}
    </h2>
  );

  return (
    <section aria-labelledby={titleId} className="py-fluid-lg">
      <Container>
        {layout === "wide" ? (
          <div className="flex flex-col gap-fluid-md border-t border-border pt-fluid-md">
            {heading}
            {children}
          </div>
        ) : (
          <Grid className="gap-y-fluid-sm border-t border-border pt-fluid-md">
            <GridItem span={{ md: 2, lg: 3 }}>{heading}</GridItem>
            <GridItem span={{ md: 6, lg: 8 }} start={{ lg: 5 }}>
              {children}
            </GridItem>
          </Grid>
        )}
      </Container>
    </section>
  );
}
