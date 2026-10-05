import Image from "next/image";
import type { CSSProperties } from "react";
import type { ImageAsset } from "@/data/types";
import { cn } from "@/lib/cn";

type HeroDeviceProps = {
  screens: readonly ImageAsset[];
  /**
   * Load every screen up front so none is still blurred when its turn comes. Only the instance
   * that is visible on first paint should do this; a hidden copy stays lazy and costs nothing.
   */
  eager?: boolean;
  className?: string;
};

const SLOT_SECONDS = 3.2;

/**
 * A tilted tablet showing real project screens, cross-fading one after another (pure CSS: every
 * screen runs the same keyframes, offset by its slot). Reduced motion shows the first screen only.
 */
export function HeroDevice({ screens, eager = false, className }: HeroDeviceProps) {
  return (
    <div className={cn("hero-device [perspective:1600px]", className)}>
      <div className="hero-device-body relative rounded-[1.6rem] bg-ink p-[2.2%] shadow-float ring-1 ring-black/10">
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-[1.05rem] bg-surface"
          style={{ "--slots": screens.length, "--slot": `${SLOT_SECONDS}s` } as CSSProperties}
        >
          {screens.map((screen, index) => (
            <Image
              key={screen.alt}
              src={screen.src}
              alt={index === 0 ? screen.alt : ""}
              aria-hidden={index === 0 ? undefined : true}
              fill
              sizes="(min-width: 1024px) 34rem, 88vw"
              priority={eager && index === 0}
              loading={eager ? (index === 0 ? undefined : "eager") : "lazy"}
              placeholder="blur"
              data-first={index === 0 ? "" : undefined}
              className="hero-screen object-cover object-top"
              style={{ "--i": index } as CSSProperties}
            />
          ))}
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.22),transparent_38%)]" />
        </div>
        <span aria-hidden className="absolute top-1/2 left-[0.9%] size-1.5 -translate-y-1/2 rounded-full bg-white/25" />
      </div>
    </div>
  );
}
