import { Download } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/section-intro";
import { TextLink } from "@/components/ui/text-link";
import { sectionHref } from "@/data/navigation";
import { profile } from "@/data/profile";
import { AboutCredentials } from "./about-credentials";
import { AboutEducation } from "./about-education";
import { ToolsIndex } from "@/components/sections/showcase/tools-index";

export function AboutSection() {
  const { about, cv, location, currentCompany } = profile;
  const [lead, ...rest] = about.paragraphs;

  const facts = [
    { term: "Based in", detail: `${location.city}, ${location.country}` },
    { term: "Currently", detail: currentCompany.name },
    { term: "Focus", detail: "Web · Growth · AI research" },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="defer-render relative bg-[linear-gradient(to_bottom,transparent,var(--surface-soft)_18rem,var(--surface-soft)_calc(100%-14rem),transparent)] pt-section-compact pb-section [--defer-h:175rem] md:[--defer-h:142rem] lg:[--defer-h:161rem]"
    >
      <Container className="flex flex-col gap-fluid-xl">
        <SectionIntro
          id="about-title"
          index="05"
          label="About"
          meta={
            <>
              {location.city}, {location.country}
            </>
          }
          size="sm"
          title="Building at the intersection of technology, business & intelligent systems."
          lead={about.introduction}
        />

        <div className="editorial-grid gap-y-fluid-lg">
          <div className="col-span-full flex flex-col gap-fluid-md lg:col-span-7 lg:col-start-6">
            {lead && (
              <p className="max-w-[40rem] font-serif text-[clamp(1.5rem,1.15rem+1.4vw,2.375rem)] leading-[1.18] tracking-[-0.01em] text-foreground">
                {lead}
              </p>
            )}
            <div className="flex max-w-[40rem] flex-col gap-fluid-sm">
              {rest.map((paragraph) => (
                <p key={paragraph} className="type-body text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="rule-top flex flex-col gap-fluid-sm pt-fluid-sm">
              <h3 className="type-eyebrow text-muted">Current focus</h3>
              <ul className="grid gap-x-(--grid-gap) gap-y-fluid-sm sm:grid-cols-2">
                {about.currentFocus.map((item) => (
                  <li key={item.label} className="flex flex-col gap-0.5">
                    <span className="type-body font-medium text-foreground">{item.label}</span>
                    <span className="type-small text-muted">{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <dl className="rule-top col-span-full flex flex-col gap-fluid-sm pt-fluid-sm lg:sticky lg:top-[calc(var(--header-offset)+2rem)] lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:self-start">
            {facts.map((fact) => (
              <div key={fact.term} className="flex flex-col gap-1">
                <dt className="type-micro text-subtle">{fact.term}</dt>
                <dd className="type-body text-foreground">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-fluid-xl">
          <AboutEducation />
          <AboutCredentials />
          <ToolsIndex />
        </div>

        <div className="flex flex-col gap-fluid-md">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button
              variant="secondary"
              href={cv.general.href}
              download={cv.general.fileName}
              icon={Download}
            >
              Download CV
            </Button>
          </div>
          <div className="rule-top flex items-center justify-between gap-6 pt-fluid-sm">
            <p className="type-micro text-subtle">Next</p>
            <TextLink href={sectionHref("contact")}>Contact</TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
