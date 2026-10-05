import { useId } from "react";
import type { PortraitAsset } from "@/data/profile";
import { HeroPortrait } from "./hero-portrait";

type AvailabilityRingProps = {
  portrait: PortraitAsset;
  label: string;
  priority?: boolean;
};

/** The portrait as an avatar, a live status dot, and the status written around it on a slow orbit. */
export function AvailabilityRing({ portrait, label, priority }: AvailabilityRingProps) {
  const text = `${label} • ${label} • `;
  const pathId = `${useId()}-ring`;

  return (
    <div className="relative size-[7.5rem] shrink-0 sm:size-[8.5rem]">
      <svg aria-hidden viewBox="0 0 100 100" className="orbit-text absolute inset-0 size-full text-muted">
        <defs>
          <path id={pathId} d="M50,50 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
        </defs>
        <text className="fill-current font-sans text-[7.2px] font-medium tracking-[0.18em] uppercase">
          <textPath href={`#${pathId}`} textLength="268">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[17%]">
        <HeroPortrait portrait={portrait} sizes="6rem" priority={priority} variant="bare" className="w-full shadow-card" />
        <span className="absolute right-[4%] bottom-[4%] grid size-5 place-items-center rounded-full bg-surface shadow-elevated">
          <span className="size-2.5 animate-pulse rounded-full bg-[#3fb97c]" />
        </span>
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}
