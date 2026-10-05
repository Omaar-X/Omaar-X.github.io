import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: readonly ReactNode[];
  /** Mark drawn between items. */
  separator?: ReactNode;
  /** Accessible label; the moving copy is hidden from assistive tech and listed once instead. */
  label: string;
  className?: string;
  itemClassName?: string;
  /** Seconds per loop. */
  duration?: number;
};

/**
 * An endless horizontal strip. The track holds the list twice and slides by half its width, so
 * the loop is seamless. Under reduced motion it stops and can be scrolled by hand.
 */
export function Marquee({ items, separator, label, className, itemClassName, duration = 40 }: MarqueeProps) {
  const row = (copy: number) =>
    items.map((item, index) => (
      <li key={`${copy}-${index}`} className={cn("flex shrink-0 items-center gap-[inherit]", itemClassName)}>
        {item}
        {separator}
      </li>
    ));

  return (
    <div className={cn("marquee", className)} style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
      <ul className="sr-only" aria-label={label}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ul aria-hidden className="marquee-track">
        {row(0)}
        {row(1)}
      </ul>
    </div>
  );
}
