import type { Status } from "@/data/types";
import { cn } from "@/lib/cn";

type Tone = "accent" | "mauve" | "neutral";
type Indicator = "dot" | "ring" | "none";

const statusStyles: Record<Status, { label: string; tone: Tone; indicator: Indicator }> = {
  live: { label: "Live", tone: "accent", indicator: "dot" },
  current: { label: "Current", tone: "accent", indicator: "dot" },
  accepted: { label: "Accepted", tone: "mauve", indicator: "none" },
  submitted: { label: "Submitted", tone: "neutral", indicator: "ring" },
  "launching-soon": { label: "Launching soon", tone: "mauve", indicator: "ring" },
  "case-study": { label: "Case study", tone: "neutral", indicator: "none" },
  research: { label: "Research", tone: "neutral", indicator: "none" },
};

const toneClasses: Record<Tone, string> = {
  accent: "text-accent-strong",
  mauve: "text-mauve-ink",
  neutral: "text-muted",
};

type StatusBadgeProps = {
  status: Status;
  className?: string;
};

/** Quiet status label: a dot (or ring) and text, no box. */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, tone, indicator } = statusStyles[status];

  return (
    <span
      className={cn(
        "type-micro inline-flex shrink-0 items-center gap-2 whitespace-nowrap",
        indicator !== "none" &&
          "before:size-1.5 before:rounded-full before:content-[''] " +
            (indicator === "dot" ? "before:bg-current" : "before:border before:border-current"),
        toneClasses[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
