import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionIntroProps = {
  id: string;
  /** Hand-written kicker above the heading, shown as "/ Label". */
  label: string;
  title: ReactNode;
  /** `sm` for longer statements. */
  size?: "lg" | "sm";
  lead?: ReactNode;
  /** A small action aligned to the heading's right edge (e.g. "View CV"). */
  action?: ReactNode;
  className?: string;
};

/** Section opener: a hand-written kicker, a bold heading with one accent word, an optional lead. */
export function SectionIntro({ id, label, title, size = "lg", lead, action, className }: SectionIntroProps) {
  return (
    <header className={cn("flex flex-col gap-fluid-sm", className)}>
      <p className="type-kicker scroll-rise text-muted">
        <span aria-hidden>/ </span>
        {label}
      </p>
      <div className="flex flex-wrap items-end justify-between gap-x-fluid-md gap-y-fluid-sm">
        <h2
          id={id}
          className={cn(
            "scroll-rise max-w-[22ch] text-balance",
            size === "lg" ? "type-statement" : "type-statement-sm",
          )}
        >
          {title}
        </h2>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {lead && <p className="type-body-lg max-w-[36rem] text-muted">{lead}</p>}
    </header>
  );
}
