import { toolsIndex } from "@/data/skills";

/** A compact, static index of tools and technologies. The creative range is shown at the top of the page. */
export function ToolsIndex() {
  return (
    <div className="flex flex-col gap-fluid-sm">
      <div className="rule-top flex flex-wrap items-center justify-between gap-3 pt-fluid-sm">
        <h3 className="type-eyebrow text-muted">Tools &amp; technologies</h3>
      </div>
      <dl>
        {toolsIndex.map((group) => (
          <div
            key={group.label}
            className="grid gap-x-(--grid-gap) gap-y-1 border-t border-border py-3 first:border-t-0 md:grid-cols-12"
          >
            <dt className="type-micro text-mauve-ink md:col-span-3">{group.label}</dt>
            <dd className="md:col-span-9">
              <ul className="type-small dot-list flex flex-wrap gap-x-2 gap-y-1 text-muted [--dot-color:var(--subtle)]">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
