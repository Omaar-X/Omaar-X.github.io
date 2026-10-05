import { ArrowDown, Download } from "lucide-react";
import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/smart-link";
import type { SectionId } from "@/data/navigation";
import { profile } from "@/data/profile";
import { featuredWork, moreWork } from "@/data/projects";
import { proofPoints } from "@/data/proof";
import type { ImageAsset } from "@/data/types";
import { enterDelay } from "@/lib/motion";
import { AvailabilityRing } from "./availability-ring";
import { HeroDevice } from "./hero-device";
import { LocalTime } from "./local-time";

const workSection: SectionId = "work";

/** Five live screens for the tablet (the cross-fade keyframes assume five): featured projects first. */
const deviceScreens: readonly ImageAsset[] = [...featuredWork.map(({ project }) => project), ...moreWork]
  .flatMap((project) => (project.image ? [project.image] : []))
  .slice(0, 5);

/** A word whose letters rise one after another (see .letter-mask). `offset` continues the stagger. */
function RisingWord({ word, offset = 0 }: { word: string; offset?: number }) {
  return (
    <span className="letter-mask">
      {[...word].map((letter, index) => (
        <span key={index} style={{ "--l": index + offset } as CSSProperties}>
          {letter}
        </span>
      ))}
    </span>
  );
}

/** Glass stat chip floating beside the tablet. */
function StatChip({ value, label, className, delay }: { value: string; label: string; className: string; delay: string }) {
  return (
    <div
      aria-hidden
      className={`chip-float glass absolute z-20 flex items-center gap-3 rounded-xl px-4 py-3 shadow-card ${className}`}
      style={{ "--d": delay } as CSSProperties}
    >
      <span className="font-display text-2xl leading-none font-bold [font-stretch:112%] text-accent-strong">{value}</span>
      <span className="type-micro max-w-[8rem] leading-snug text-muted">{label}</span>
    </div>
  );
}

/**
 * The introduction: the full name set huge on one line, a tilted tablet beneath it that plays real
 * project screens, with the role on one side and the two main actions on the other.
 */
export function Hero() {
  const { name, heroTagline, heroRoles, portrait, cv, location, currentRole, currentCompany } = profile;
  const [first = name, ...rest] = name.split(" ");
  const last = rest.join(" ");

  const role = (
    <p className="type-small text-muted">
      {currentRole} @{" "}
      {currentCompany.url ? (
        <SmartLink href={currentCompany.url} className="font-medium text-accent hover:underline">
          {currentCompany.name}
        </SmartLink>
      ) : (
        <span className="font-medium text-accent">{currentCompany.name}</span>
      )}
    </p>
  );
  const place = (
    <p className="type-small text-subtle">
      {location.city}, {location.country}
      <LocalTime />
    </p>
  );

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-(--viewport-height-stable) flex-col justify-center overflow-hidden pt-[calc(var(--header-offset)+var(--fluid-sm))] pb-[calc(var(--fluid-xl)+2rem)] lg:pb-fluid-xl"
    >
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <span className="aurora top-[8%] left-[18%] size-[34rem] bg-[#d9c8f2]" />
        <span className="aurora top-[30%] right-[8%] size-[28rem] bg-[#f1d6ea]" />
        <span className="aurora bottom-[-10%] left-[40%] size-[30rem] bg-[#cfd8fb]" />
      </div>
      <div aria-hidden className="dot-grid absolute inset-0 -z-10" />

      <h1 id="hero-title" className="sr-only">
        {name} — {heroRoles.join(", ")}
      </h1>

      <Container className="flex flex-col gap-fluid-lg">
        {/* Phones and tablets: stacked. */}
        <div className="flex flex-col gap-fluid-md lg:hidden">
          <div className="enter-fade" style={enterDelay(0)}>
            <AvailabilityRing portrait={portrait} label="Open to conversations" priority={false} />
          </div>
          <div className="enter-rise flex flex-col gap-3" style={enterDelay(120)}>
            <p className="type-body-lg text-muted">{heroTagline}</p>
            <p aria-hidden className="type-display flex flex-col text-[clamp(3rem,0.8rem+11vw,6rem)] text-foreground">
              <RisingWord word={first} />
              <RisingWord word={last} offset={first.length} />
            </p>
            {role}
            {place}
          </div>
          <div className="enter-rise flex flex-wrap gap-3" style={enterDelay(260)}>
            <Button href={`#${workSection}`} icon={ArrowDown}>
              View work
            </Button>
            <Button variant="secondary" href={cv.general.href} download={cv.general.fileName} icon={Download}>
              Download CV
            </Button>
          </div>
        </div>

        {/* Desktop: the full name on one line, the tablet beneath it between the role and the actions. */}
        <div className="hidden lg:flex lg:flex-col lg:gap-fluid-sm">
          <div className="flex items-end justify-between gap-fluid-md">
            <div className="enter-fade flex items-center gap-fluid-sm" style={enterDelay(0)}>
              <AvailabilityRing portrait={portrait} label="Open to conversations" />
              <p className="type-body-lg text-muted">{heroTagline}</p>
            </div>
            <div className="enter-rise pb-3 text-right" style={enterDelay(160)}>
              {place}
            </div>
          </div>

          <p
            aria-hidden
            className="type-display text-center text-[clamp(3.5rem,8.4vw,9rem)] whitespace-nowrap text-foreground"
          >
            <RisingWord word={first} />
            <span className="inline-block w-[0.3em]" />
            <RisingWord word={last} offset={first.length} />
          </p>

          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,min(32rem,36vw))_minmax(0,1fr)] items-center gap-fluid-md">
            <div className="enter-rise max-w-[20rem] text-balance" style={enterDelay(220)}>
              {role}
            </div>

            <div className="enter-fade relative z-10 py-8" style={enterDelay(260)}>
              <div data-tilt="10">
                <HeroDevice screens={deviceScreens} eager />
              </div>
              {proofPoints[0] && (
                <StatChip {...proofPoints[0]} delay="0s" className="top-0 -left-12" />
              )}
              {proofPoints[1] && (
                <StatChip {...proofPoints[1]} delay="-2.5s" className="-right-10 bottom-0" />
              )}
            </div>

            <div className="enter-rise flex flex-col items-end gap-3" style={enterDelay(300)}>
              <Button href={`#${workSection}`} icon={ArrowDown}>
                View work
              </Button>
              <Button variant="secondary" href={cv.general.href} download={cv.general.fileName} icon={Download}>
                Download CV
              </Button>
            </div>
          </div>
        </div>

        <a
          href={`#${workSection}`}
          className="enter-fade absolute bottom-[calc(var(--fluid-md)+0.5rem)] left-[max(var(--gutter),env(safe-area-inset-left))] hidden items-center gap-3 text-muted transition-colors hover:text-foreground lg:flex"
          style={enterDelay(900)}
        >
          <span aria-hidden className="scroll-cue block h-10 w-[3px] rounded-full bg-border" />
          <span className="type-micro">Scroll to explore</span>
        </a>

        <div className="enter-fade lg:hidden" style={enterDelay(360)}>
          <HeroDevice screens={deviceScreens} className="mx-auto w-[92%] max-w-xl" />
        </div>
      </Container>
    </section>
  );
}
