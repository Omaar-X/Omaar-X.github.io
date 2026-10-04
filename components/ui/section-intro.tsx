import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";

type SectionIntroProps = {
  id: string;
  index: string;
  label: string;
  /** Right-aligned counter next to the label, e.g. "03 Featured Projects". */
  meta?: ReactNode;
  title: ReactNode;
  /** `sm` for longer statements. */
  size?: "lg" | "sm";
  lead?: ReactNode;
  className?: string;
};

/** Editorial section opener: hairline, numbered label, large serif statement, optional lead. */
export function SectionIntro({
  id,
  index,
  label,
  meta,
  title,
  size = "lg",
  lead,
  className,
}: SectionIntroProps) {
  return (
    <header className={cn("flex flex-col gap-fluid-lg", className)}>
      <div className="rule-top flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-fluid-sm">
        <Eyebrow index={index} className="whitespace-nowrap">
          {label}
        </Eyebrow>
        {meta && <p className="type-micro whitespace-nowrap text-subtle">{meta}</p>}
      </div>
      <div className="editorial-grid gap-y-fluid-md">
        <h2
          id={id}
          className={cn(
            "scroll-rise col-span-full text-balance lg:col-span-10",
            size === "lg" ? "type-statement" : "type-statement-sm",
          )}
        >
          {title}
        </h2>
        {lead && (
          <p className="type-body-lg col-span-full max-w-[30rem] text-muted md:col-span-6 lg:col-span-5 lg:col-start-6">
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}
