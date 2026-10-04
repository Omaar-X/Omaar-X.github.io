"use client";

import { useEffect } from "react";

/**
 * A very small pointer-depth effect for the hero portrait: the photo and its ring drift a few
 * pixels in opposite directions (CSS reads --hx / --hy, see styles/effects.css). Fine pointers
 * only, never under reduced motion, and eased so it never snaps to the cursor.
 */
export function HeroDepth({ targetId }: { targetId: string }) {
  useEffect(() => {
    const hero = document.getElementById(targetId);
    if (!hero) return;

    const allowed = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!allowed.matches) return;

    let goalX = 0;
    let goalY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const tick = () => {
      frame = 0;
      x += (goalX - x) * 0.1;
      y += (goalY - y) * 0.1;
      hero.style.setProperty("--hx", x.toFixed(3));
      hero.style.setProperty("--hy", y.toFixed(3));
      if (Math.abs(goalX - x) > 0.002 || Math.abs(goalY - y) > 0.002) frame = requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      const box = hero.getBoundingClientRect();
      goalX = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1));
      goalY = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1));
      schedule();
    };
    const onLeave = () => {
      goalX = 0;
      goalY = 0;
      schedule();
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      hero.style.removeProperty("--hx");
      hero.style.removeProperty("--hy");
    };
  }, [targetId]);

  return null;
}
