"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener for every hover effect on the page, written as CSS variables:
 *  - [data-spotlight]  --mx / --my: pointer position inside the element (px), for a glow.
 *  - [data-tilt]       --rx / --ry: a small 3D tilt toward the pointer (deg).
 *  - [data-magnetic]   --tx / --ty: a pull of a few pixels toward the pointer.
 * Fine pointers only, never under reduced motion. Everything eases back on leave via CSS.
 */
export function PointerEffects() {
  useEffect(() => {
    const allowed = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!allowed.matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;
    const active = new Set<HTMLElement>();

    const reset = (element: HTMLElement) => {
      element.style.removeProperty("--rx");
      element.style.removeProperty("--ry");
      element.style.removeProperty("--tx");
      element.style.removeProperty("--ty");
      delete element.dataset.pointer;
    };

    const update = () => {
      frame = 0;
      const event = last;
      if (!event) return;
      const target = event.target instanceof Element ? event.target : null;
      const hits = new Set<HTMLElement>();
      let node: Element | null = target;
      while (node) {
        node = node.closest("[data-spotlight], [data-tilt], [data-magnetic]");
        if (!node) break;
        hits.add(node as HTMLElement);
        node = node.parentElement;
      }

      for (const element of active) if (!hits.has(element)) reset(element);
      active.clear();

      for (const element of hits) {
        active.add(element);
        element.dataset.pointer = "";
        const box = element.getBoundingClientRect();
        const x = event.clientX - box.left;
        const y = event.clientY - box.top;
        const nx = x / box.width - 0.5;
        const ny = y / box.height - 0.5;
        if (element.hasAttribute("data-spotlight")) {
          element.style.setProperty("--mx", `${x.toFixed(1)}px`);
          element.style.setProperty("--my", `${y.toFixed(1)}px`);
        }
        if (element.hasAttribute("data-tilt")) {
          const strength = Number(element.dataset.tilt) || 6;
          element.style.setProperty("--rx", `${(-ny * strength).toFixed(2)}deg`);
          element.style.setProperty("--ry", `${(nx * strength).toFixed(2)}deg`);
        }
        if (element.hasAttribute("data-magnetic")) {
          const pull = Number(element.dataset.magnetic) || 6;
          element.style.setProperty("--tx", `${(nx * pull * 2).toFixed(1)}px`);
          element.style.setProperty("--ty", `${(ny * pull * 2).toFixed(1)}px`);
        }
      }
    };

    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => {
      for (const element of active) reset(element);
      active.clear();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, []);

  return null;
}
