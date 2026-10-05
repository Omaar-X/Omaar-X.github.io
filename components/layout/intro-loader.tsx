import type { CSSProperties } from "react";
import { profile } from "@/data/profile";

/**
 * The opening screen: the OF monogram draws itself, the name rises, a counter runs to 100, then the
 * panel wipes up into the hero. Pure CSS (styles/intro.css), so it always ends on its own, even
 * without JavaScript. It plays once per browser session (the inline script in app/layout.tsx marks
 * <html data-intro-seen>) and never under reduced motion. Decorative, so hidden from assistive tech.
 */
export function IntroLoader() {
  const letters = [...profile.name.toUpperCase()];

  return (
    <div aria-hidden className="intro">
      <div className="intro-glow" />
      <div className="intro-center">
        <svg viewBox="0 0 40 40" fill="none" className="intro-mark">
          <circle cx="13.5" cy="20" r="9.75" pathLength={1} className="intro-stroke" />
          <path d="M27.25 31V9" pathLength={1} className="intro-stroke" style={{ "--s": "0.25s" } as CSSProperties} />
          <path
            d="M27.25 9H36.5M27.25 19.5H34"
            pathLength={1}
            className="intro-stroke intro-stroke-accent"
            style={{ "--s": "0.45s" } as CSSProperties}
          />
        </svg>
        <p className="intro-name">
          {letters.map((letter, index) => (
            <span key={index} style={{ "--l": index } as CSSProperties}>
              {letter === " " ? " " : letter}
            </span>
          ))}
        </p>
        <p className="intro-tagline">{profile.heroTagline}</p>
      </div>

      <div className="intro-foot">
        <span className="intro-place">
          {profile.location.city}, {profile.location.country}
        </span>
        <span className="intro-count" />
      </div>
      <div className="intro-bar" />
    </div>
  );
}
