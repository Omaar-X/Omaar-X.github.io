import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-[0.8125rem] leading-none font-medium tracking-[0.2em] whitespace-nowrap uppercase",
        className,
      )}
    >
      {profile.name}
    </span>
  );
}
