import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = ComponentPropsWithoutRef<"p"> & {
  index?: string;
};

export function Eyebrow({ index, className, children, ...rest }: EyebrowProps) {
  return (
    <p className={cn("type-eyebrow flex items-center gap-3 text-muted", className)} {...rest}>
      {index && <span className="text-mauve-ink tabular-nums">{index}</span>}
      <span className="flex items-center gap-3 before:h-px before:w-6 before:shrink-0 before:bg-border-strong before:content-['']">
        {children}
      </span>
    </p>
  );
}
