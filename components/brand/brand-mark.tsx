import { cn } from "@/lib/cn";

type BrandMarkProps = {
  className?: string;
  title?: string;
};

export function BrandMark({ className, title }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle cx="13.5" cy="20" r="9.75" stroke="currentColor" strokeWidth="1.75" />
      <path d="M27.25 31V9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
      <path
        d="M27.25 9H36.5M27.25 19.5H34"
        stroke="var(--mauve)"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}
