import { StatusBadge } from "@/components/ui/status-badge";
import { credentials } from "@/data/credentials";

export function AboutCredentials() {
  return (
    <div className="flex flex-col gap-fluid-sm">
      <div className="rule-top flex flex-wrap items-center justify-between gap-3 pt-fluid-sm">
        <h3 className="type-eyebrow text-muted">Credentials</h3>
        <p className="type-micro text-subtle">Status shown as recorded</p>
      </div>

      <ul aria-label="Credentials">
        {credentials.map((credential) => (
          <li
            key={credential.id}
            className="editorial-grid items-start gap-y-2 border-t border-border py-fluid-sm first:border-t-0"
          >
            <span className="type-micro col-span-full text-mauve-ink md:col-span-2 lg:col-span-3">
              {credential.category}
            </span>
            <div className="col-span-full flex flex-col gap-1 md:col-span-4 lg:col-span-6 lg:col-start-5">
              <p className="type-body font-medium text-foreground">{credential.title}</p>
              {credential.detail && <p className="type-small text-muted">{credential.detail}</p>}
              {credential.entries && (
                <ul className="mt-1 flex flex-col gap-1">
                  {credential.entries.map((entry) => (
                    <li key={entry.title} className="type-small text-muted">
                      <span className="text-foreground">{entry.title}</span> — {entry.role}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {credential.status && (
              <div className="col-span-full md:col-span-2 md:justify-self-end lg:col-span-2">
                <StatusBadge status={credential.status} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
