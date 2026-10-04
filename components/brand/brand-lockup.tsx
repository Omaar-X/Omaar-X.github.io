import Link from "next/link";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { BrandMark } from "./brand-mark";
import { BrandWordmark } from "./brand-wordmark";

export function BrandLockup({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${profile.name}, home`}
      className={cn("group/brand inline-flex min-h-11 items-center gap-3 text-foreground", className)}
    >
      <BrandMark className="size-8 text-accent transition-transform duration-500 ease-editorial group-hover/brand:-rotate-6" />
      <span aria-hidden className="h-4 w-px bg-border-strong" />
      <BrandWordmark />
    </Link>
  );
}
