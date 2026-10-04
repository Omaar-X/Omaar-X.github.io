import { cn } from "@/lib/cn";

export function NoiseOverlay({ className }: { className?: string }) {
  return <span aria-hidden className={cn("noise-overlay", className)} />;
}
