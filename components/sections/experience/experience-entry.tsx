import { StatusBadge } from "@/components/ui/status-badge";
import { TextLink } from "@/components/ui/text-link";
import type { Experience } from "@/data/experience";
import { formatPeriodLong } from "@/lib/dates";

type ExperienceEntryProps = {
  entry: Experience;
  index: number;
  total: number;
};

const pad = (value: number) => String(value).padStart(2, "0");
const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** One role as an editorial row: dates on the left, a large company name, role and short notes on the right. */
export function ExperienceEntry({ entry, index, total }: ExperienceEntryProps) {
  const titleId = `experience-${entry.id}-title`;
  const { organization } = entry;

  return (
    <article
      aria-labelledby={titleId}
      className="rule-top editorial-grid gap-y-fluid-md py-fluid-lg lg:py-[calc(var(--fluid-lg)*1.5)]"
    >
      <div className="col-span-full flex flex-col gap-3 md:col-span-3 lg:col-span-3">
        <p className="type-micro text-subtle">
          <span className="text-foreground">{pad(index + 1)}</span>
          <span aria-hidden> / </span>
          <span className="sr-only"> of </span>
          {pad(total)}
        </p>
        <p className="font-serif text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] leading-[1.05] text-mauve-ink">
          {formatPeriodLong(entry.period)}
        </p>
        {entry.status && <StatusBadge status={entry.status} className="self-start" />}
      </div>

      <div className="col-span-full flex flex-col gap-fluid-md md:col-span-5 md:col-start-4 lg:col-span-8 lg:col-start-5">
        <div className="flex flex-col gap-3">
          <h3 id={titleId} className="scroll-rise type-title text-balance">
            {organization.name}
          </h3>
          <p className="type-body-lg text-accent-strong">{entry.role}</p>
          {organization.location && (
            <p className="type-small text-subtle">{organization.location}</p>
          )}
        </div>

        {entry.summary && <p className="type-body max-w-[38rem] text-muted">{entry.summary}</p>}

        {entry.contributions.length > 0 && (
          <ul
            aria-label={`Selected contributions at ${organization.name}`}
            className="max-w-[44rem]"
          >
            {entry.contributions.map((contribution) => (
              <li
                key={contribution}
                className="type-small border-t border-border py-3 text-foreground first:border-t-0 first:pt-0"
              >
                {contribution}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-fluid-sm sm:flex-row sm:items-end sm:justify-between">
          {entry.capabilities.length > 0 && (
            <ul
              aria-label={`Capabilities at ${organization.name}`}
              className="type-micro dot-list flex flex-wrap gap-x-2 gap-y-1 text-subtle"
            >
              {entry.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          )}
          {organization.url && (
            <TextLink href={organization.url}>
              {host(organization.url)}
              <span className="sr-only">: {organization.name}</span>
            </TextLink>
          )}
        </div>
      </div>
    </article>
  );
}
