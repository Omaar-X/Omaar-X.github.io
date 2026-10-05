import { ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Accent } from "@/components/ui/accent";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { HeroPortrait } from "@/components/sections/hero/hero-portrait";
import { ToolsIndex } from "@/components/sections/about/tools-index";
import { sectionHref } from "@/data/navigation";
import { profile } from "@/data/profile";
import { clientNames } from "@/data/proof";
import { AboutCredentials } from "./about-credentials";
import { AboutEducation } from "./about-education";

export function AboutSection() {
  const { about, cv, location, heroStatement, heroSummary, portrait } = profile;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="defer-render relative pt-section-compact pb-section-compact [--defer-h:175rem] md:[--defer-h:142rem] lg:[--defer-h:150rem]"
    >
      <Container className="flex flex-col gap-fluid-xl">
        <div className="grid items-center gap-fluid-lg lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-fluid-xl">
          <div className="flex flex-col gap-fluid-md">
            <p className="type-kicker scroll-rise text-muted">
              <span aria-hidden>/ </span>About me
            </p>
            <h2 id="about-title" className="type-statement scroll-rise max-w-[18ch] text-balance">
              {heroStatement.lead}
              <Accent>{heroStatement.accent}</Accent>
              {heroStatement.tail}
            </h2>
            <p className="type-body-lg font-medium text-foreground">{about.introduction}</p>
            <div className="flex max-w-[38rem] flex-col gap-fluid-sm">
              <p className="type-body text-muted">{heroSummary}</p>
              {about.paragraphs.slice(1, 3).map((paragraph) => (
                <p key={paragraph} className="type-body text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={sectionHref("contact")} icon={ArrowRight}>
                Let’s talk
              </Button>
              <Button variant="secondary" href={cv.general.href} download={cv.general.fileName} icon={Download}>
                View resume
              </Button>
            </div>
            <div className="flex flex-col gap-fluid-sm pt-fluid-xs">
              <p className="type-h3 max-w-[30rem] text-balance">
                Built for {clientNames.slice(0, 3).join(", ")} &amp; more.
              </p>
              <SocialLinks />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[26rem] [perspective:1400px]">
            <div className="relative rotate-[4deg] rounded-[2rem] bg-ink p-3 shadow-float transition-transform duration-700 ease-editorial hover:rotate-[1.5deg]">
              <div className="relative overflow-hidden rounded-[1.4rem] bg-[radial-gradient(110%_80%_at_50%_10%,var(--lavender-light),var(--lavender))] p-[12%]">
                <HeroPortrait portrait={portrait} sizes="22rem" priority={false} variant="bare" className="w-full" />
                <p className="type-micro mt-6 text-center text-mauve-ink">
                  {location.city}, {location.country}
                </p>
              </div>
            </div>
            <p className="type-kicker absolute -bottom-5 -left-3 -rotate-6 rounded-full bg-accent px-4 py-2 text-on-accent shadow-elevated sm:-left-8">
              Hello, I’m {profile.shortName}!
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-fluid-xl">
          <AboutEducation />
          <AboutCredentials />
          <ToolsIndex />
        </div>
      </Container>
    </section>
  );
}
