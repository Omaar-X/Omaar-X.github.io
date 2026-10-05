import Image from "next/image";
import type { CSSProperties } from "react";
import type { PortraitAsset } from "@/data/profile";
import { cn } from "@/lib/cn";

type HeroPortraitProps = {
  portrait: PortraitAsset;
  sizes: string;
  /** Only one instance per page should be the high-priority image. */
  priority?: boolean;
  /** `ring` draws a hairline ring around the photo; `bare` is just the circular photo. */
  variant?: "ring" | "bare";
  className?: string;
  style?: CSSProperties;
};

export function HeroPortrait({ portrait, sizes, priority = true, variant = "ring", className, style }: HeroPortraitProps) {
  return (
    <div
      className={cn(
        "relative aspect-square rounded-[50%]",
        variant === "ring" && "border border-border p-[4%]",
        className,
      )}
      style={style}
    >
      <div className="relative size-full overflow-hidden rounded-[50%] bg-surface">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes={sizes}
          placeholder="blur"
          className={cn("object-cover", portrait.framing === "circle-cutout" && "scale-[1.04]")}
          style={portrait.framing === "photograph" ? { objectPosition: portrait.position } : undefined}
        />
      </div>
    </div>
  );
}
