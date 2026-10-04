import { ArrowDown, Download } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import type { SectionId } from "@/data/navigation";
import { enterDelay } from "@/lib/motion";
import { HeroDepth } from "./hero-depth";
import { HeroPortrait } from "./hero-portrait";

const workSection: SectionId = "work";

/**
 * The introduction. Deliberately compact: the creative skill showcase starts right under it, so the
 * first screen answers "who" and begins to answer "what can they do".
 */
export function Hero() {
  const { name, heroRoles, positioning, portrait, cv, location } = profile;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate pt-[calc(var(--header-offset)+var(--fluid-md))] pb-fluid-sm"
    >
      <Container>
        <div className="editorial-grid items-center gap-y-fluid-sm">
          <h1 id="hero-title" className="col-span-full md:col-span-8 lg:col-span-8">
            <span
              className="enter-rise type-eyebrow flex items-center gap-3 text-foreground"
              style={enterDelay(0)}
            >
              <span aria-hidden className="h-px w-8 bg-mauve" />
              {name}
            </span>
            <span className="sr-only">: </span>
            <span className="type-roles mt-fluid-sm block">
              {heroRoles.map((role, index) => (
                <span
                  key={role}
                  className="enter-rise block"
                  style={enterDelay(120 + index * 110)}
                >
                  {role}
                </span>
              ))}
            </span>
          </h1>

          <div className="col-span-full flex items-center gap-4 sm:gap-fluid-md md:col-span-4 md:row-span-2 md:row-start-1 md:flex-col md:items-stretch lg:col-span-3 lg:col-start-10">
            <div className="parallax w-[34%] max-w-52 shrink-0 md:ml-auto md:w-full md:max-w-[15rem]">
              <HeroPortrait
                portrait={portrait}
                sizes="(min-width: 1024px) 15rem, (min-width: 768px) 24vw, 34vw"
                className="enter-fade w-full"
                style={enterDelay(180)}
              />
            </div>
            <dl
              className="enter-rise flex flex-col gap-3 md:w-full md:max-w-[15rem] md:self-end"
              style={enterDelay(560)}
            >
              <div className="flex flex-col gap-1">
                <dt className="type-micro flex items-center gap-2 text-subtle before:size-1.5 before:rounded-full before:bg-accent before:content-['']">
                  Currently
                </dt>
                <dd className="text-[0.9375rem] leading-snug font-medium text-foreground">
                  {profile.currentRole}
                </dd>
                <dd className="type-small text-muted">{profile.currentCompany.name}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="type-micro text-subtle">Based in</dt>
                <dd className="type-small text-muted">
                  {location.city}, {location.country}
                </dd>
              </div>
            </dl>
          </div>

          <div
            className="enter-rise col-span-full flex flex-col gap-fluid-sm md:col-span-8"
            style={enterDelay(460)}
          >
            <p className="type-micro text-subtle">
              <span className="sr-only">Focus: </span>
              {positioning.join(" · ")}
            </p>
            <div className="hero-ctas grid grid-cols-[1.25fr_1fr] gap-2.5 sm:flex sm:flex-wrap sm:gap-x-4">
              <Button href={`#${workSection}`} icon={ArrowDown} className="max-sm:min-h-11 max-sm:px-3 max-sm:text-[0.8125rem]">
                View Selected Work
              </Button>
              <Button
                variant="secondary"
                href={cv.general.href}
                download={cv.general.fileName}
                icon={Download}
                className="max-sm:min-h-11 max-sm:px-3 max-sm:text-[0.8125rem]"
              >
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <HeroDepth targetId="hero" />
    </section>
  );
}
