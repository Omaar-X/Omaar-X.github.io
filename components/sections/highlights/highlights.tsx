import { Asterisk } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { profile } from "@/data/profile";
import { highlights } from "@/data/proof";

/**
 * Two counter-scrolling strips between About and Career: the disciplines in giant type (filled and
 * outlined in turn), and the facts from data/proof.ts underneath.
 */
export function Highlights() {
  const words = profile.positioning.map((word, index) => (
    <span
      key={word}
      className={
        index % 2 === 0
          ? "text-foreground"
          : "text-transparent [-webkit-text-stroke:1.5px_var(--accent)]"
      }
    >
      {word}
    </span>
  ));

  return (
    <div className="relative overflow-hidden py-fluid-lg">
      <div className="-mx-[4%] -rotate-[1.5deg] bg-surface py-fluid-sm shadow-card">
        <Marquee
          label="Disciplines"
          items={words}
          duration={38}
          className="[--marquee-gap:clamp(1.5rem,3vw,3rem)]"
          itemClassName="font-display text-[clamp(2.25rem,1.4rem+3.6vw,5rem)] leading-none font-semibold tracking-[-0.035em] whitespace-nowrap uppercase [font-stretch:120%]"
          separator={<Asterisk aria-hidden strokeWidth={2.25} className="size-[0.6em] shrink-0 text-accent" />}
        />
      </div>
      <div className="relative z-10 -mx-[4%] mt-2 rotate-[1deg] bg-ink py-3.5 text-on-ink">
        <Marquee
          label="Highlights"
          items={highlights}
          duration={48}
          className="[--marquee-gap:2.5rem] [&_.marquee-track]:[animation-direction:reverse]"
          itemClassName="type-small whitespace-nowrap text-on-ink-muted"
          separator={<span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent-soft" />}
        />
      </div>
    </div>
  );
}
