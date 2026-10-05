import { Download, Plus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Accent } from "@/components/ui/accent";
import { Button } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/section-intro";
import { TextLink } from "@/components/ui/text-link";
import { careerEntries } from "@/data/experience";
import { profile } from "@/data/profile";
import { formatPeriodLong } from "@/lib/dates";

const pad = (value: number) => String(value).padStart(2, "0");
const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Career as numbered rows; each row opens to show what the role involved. */
export function ExperienceSection() {
  const { cv } = profile;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="defer-render relative pt-section pb-section-compact [--defer-h:50rem]"
    >
      <Container className="flex flex-col gap-fluid-lg">
        <SectionIntro
          id="experience-title"
          label="Career"
          title={
            <>
              My <Accent>impact</Accent> over the years.
            </>
          }
          action={
            <Button variant="secondary" size="sm" href={cv.general.href} download={cv.general.fileName} icon={Download}>
              View resume
            </Button>
          }
        />

        <ol aria-label="Roles, most recent first" className="border-t border-border">
          {careerEntries.map((entry, index) => {
            const notes = entry.contributions.length > 0 ? entry.contributions : entry.capabilities;
            return (
              <li key={entry.id} className="border-b border-border">
                <details className="group/role" open={index === 0}>
                  <summary className="grid cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-fluid-sm gap-y-1 py-fluid-sm marker:hidden md:grid-cols-[auto_minmax(0,1fr)_auto_auto] [&::-webkit-details-marker]:hidden">
                    <span className="type-h3 text-accent-soft tabular-nums">{pad(index + 1)}.</span>
                    <h3 className="type-h3 text-balance transition-colors duration-300 group-hover/role:text-accent">
                      {entry.role}
                    </h3>
                    <span className="type-small col-start-2 row-start-2 text-muted md:col-start-3 md:row-start-1 md:text-right">
                      {entry.organization.name}
                      <span className="text-subtle md:hidden"> · {formatPeriodLong(entry.period)}</span>
                    </span>
                    <span className="type-small hidden text-subtle md:col-start-4 md:row-start-1 md:block md:min-w-[11rem] md:text-right">
                      {formatPeriodLong(entry.period)}
                    </span>
                    <span
                      aria-hidden
                      className="col-start-3 row-start-1 grid size-8 place-items-center self-center rounded-full border border-border text-muted transition-transform duration-500 ease-editorial group-open/role:rotate-45 md:hidden"
                    >
                      <Plus strokeWidth={1.75} className="size-4" />
                    </span>
                  </summary>
                  <div className="grid gap-fluid-sm pb-fluid-md md:grid-cols-[3.5rem_minmax(0,1fr)]">
                    <div className="flex max-w-[44rem] flex-col gap-fluid-sm md:col-start-2">
                      {entry.summary && <p className="type-body text-muted">{entry.summary}</p>}
                      {notes.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
                          {notes.map((note) => (
                            <li
                              key={note}
                              className={
                                entry.contributions.length > 0
                                  ? "type-small w-full text-foreground before:mr-2 before:text-accent before:content-['→']"
                                  : "rounded-full border border-border bg-surface px-3 py-1.5 text-[0.8125rem] leading-none text-muted"
                              }
                            >
                              {note}
                            </li>
                          ))}
                        </ul>
                      )}
                      {entry.organization.url && (
                        <TextLink href={entry.organization.url}>{host(entry.organization.url)}</TextLink>
                      )}
                    </div>
                  </div>
                </details>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
