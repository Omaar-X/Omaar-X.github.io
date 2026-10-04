import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cn } from "@/lib/cn";

export function StickyStack({ className, ...rest }: ComponentPropsWithoutRef<"ol">) {
  return <ol className={cn("sticky-stack", className)} {...rest} />;
}

type StickyStackItemProps = ComponentPropsWithoutRef<"li"> & {
  index: number;
};

export function StickyStackItem({ index, style, ...rest }: StickyStackItemProps) {
  return (
    <li
      data-stack-item=""
      style={{ "--stack-index": String(index), ...style } as CSSProperties}
      {...rest}
    />
  );
}
