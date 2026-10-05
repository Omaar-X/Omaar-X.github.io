import { TextLink } from "@/components/ui/text-link";
import { education } from "@/data/education";
import { sectionHref } from "@/data/navigation";
import { thesis } from "@/data/research";

const yearOf = (completed: string) => completed.slice(0, 4);

export function AboutEducation() {
  const degree = education.find((entry) => entry.level === "degree");
  const earlier = education.filter((entry) => entry.level === "secondary");

  return (
    <div className="flex flex-col gap-fluid-sm">
      <div className="rule-top flex flex-wrap items-center justify-between gap-3 pt-fluid-sm">
        <h3 className="type-eyebrow text-muted">Education</h3>
        <p className="type-micro text-subtle">Graduate</p>
      </div>

      <ol aria-label="Education, most recent first">
        {degree && (
          <li className="editorial-grid gap-y-fluid-sm py-fluid-md">
            <div className="col-span-full flex flex-col gap-1 md:col-span-2 lg:col-span-3">
              <span className="font-display font-semibold [font-stretch:112%] text-[clamp(2.5rem,1.9rem+2.4vw,4.5rem)] leading-none">
                {yearOf(degree.completed)}
              </span>
              <span className="type-micro text-subtle">Completed</span>
            </div>
            <div className="col-span-full flex flex-col gap-2 md:col-span-6 lg:col-span-8 lg:col-start-5">
              <p className="type-h3">{degree.qualification}</p>
              <p className="type-body text-muted">{degree.institution}</p>
              <p className="type-small text-foreground">{degree.result}</p>
              {degree.capstoneResearchId === thesis.id && (
                <p className="type-small flex flex-wrap items-center gap-x-3 text-muted">
                  <span>
                    <span className="type-micro mr-2 text-subtle">Capstone thesis</span>
                    {thesis.shortTitle}
                  </span>
                  <TextLink href={sectionHref("research")}>
                    View research<span className="sr-only">: {thesis.shortTitle}</span>
                  </TextLink>
                </p>
              )}
            </div>
          </li>
        )}
        {earlier.map((entry) => (
          <li
            key={entry.id}
            className="editorial-grid gap-y-1 border-t border-border py-fluid-sm"
          >
            <span className="type-small col-span-full text-subtle md:col-span-2 lg:col-span-3">
              {yearOf(entry.completed)}
            </span>
            <div className="col-span-full flex flex-col gap-0.5 md:col-span-6 lg:col-span-8 lg:col-start-5">
              <p className="type-body text-foreground">{entry.qualification}</p>
              <p className="type-small text-muted">
                {entry.institution} · <span className="whitespace-nowrap">{entry.result}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
