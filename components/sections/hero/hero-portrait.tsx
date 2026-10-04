import Image from "next/image";
import type { CSSProperties } from "react";
import type { PortraitAsset } from "@/data/profile";
import { cn } from "@/lib/cn";

type HeroPortraitProps = {
  portrait: PortraitAsset;
  sizes: string;
  className?: string;
  style?: CSSProperties;
};

export function HeroPortrait({ portrait, sizes, className, style }: HeroPortraitProps) {
  return (
    <div
      className={cn("hero-depth-ring relative aspect-square rounded-[50%] border border-border p-[4%]", className)}
      style={style}
    >
      <div className="hero-depth-photo relative size-full overflow-hidden rounded-[50%] bg-surface">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes={sizes}
          placeholder="blur"
          className={cn("object-cover", portrait.framing === "circle-cutout" && "scale-[1.04]")}
          style={portrait.framing === "photograph" ? { objectPosition: portrait.position } : undefined}
        />
      </div>
    </div>
  );
}
