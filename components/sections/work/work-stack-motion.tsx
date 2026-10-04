"use client";

import { useEffect } from "react";

const motionQuery = "(prefers-reduced-motion: no-preference) and (min-height: 36.01rem)";

function stackGeometry(stack: HTMLElement) {
  const items = [...stack.querySelectorAll<HTMLElement>(":scope > [data-stack-item]")];
  const naturalTop = (index: number) => {
    const gap = parseFloat(getComputedStyle(stack).rowGap) || 0;
    const stackTop = stack.getBoundingClientRect().top + window.scrollY;
    return items.slice(0, index).reduce((top, item) => top + item.offsetHeight + gap, stackTop);
  };
  const stickTop = (item: HTMLElement) => parseFloat(getComputedStyle(item).top) || 0;
  return { items, naturalTop, stickTop };
}

export function WorkStackMotion({ stackId }: { stackId: string }) {
  useEffect(() => {
    const stack = document.getElementById(stackId);
    if (!stack) return;

    const onFocusIn = (event: FocusEvent) => {
      const { items, naturalTop, stickTop } = stackGeometry(stack);
      const index = items.findIndex((item) => item.contains(event.target as Node));
      const item = items[index];
      if (!item || getComputedStyle(item).position !== "sticky") return;

      requestAnimationFrame(() => {
        window.scrollTo({ top: naturalTop(index) - stickTop(item), behavior: "instant" });
      });
    };
    stack.addEventListener("focusin", onFocusIn);

    let cancelled = false;
    let revert: (() => void) | undefined;
    const motion = window.matchMedia(motionQuery);

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const [{ gsap }] = await Promise.all([import("@/lib/gsap"), import("@/lib/scroll-trigger")]);
        if (cancelled) return;

        const media = gsap.matchMedia();
        media.add(motionQuery, () => {
          const { items, naturalTop, stickTop } = stackGeometry(stack);
          const recessedScale = window.matchMedia("(width >= 64rem)").matches ? 0.965 : 0.95;

          items.slice(0, -1).forEach((item, index) => {
            const next = items[index + 1];
            const panel = item.querySelector("[data-work-panel]");
            const shade = item.querySelector("[data-panel-shade]");
            if (!next || !panel || !shade) return;

            gsap
              .timeline({
                scrollTrigger: {
                  start: () => naturalTop(index + 1) - window.innerHeight,
                  end: () => naturalTop(index + 1) - stickTop(next),
                  scrub: 0.4,
                  invalidateOnRefresh: true,
                },
              })
              .fromTo(
                panel,
                { scale: 1, rotationX: 0, transformPerspective: 1400 },
                { scale: recessedScale, rotationX: 1.6, ease: "none" },
                0,
              )
              .fromTo(shade, { opacity: 0 }, { opacity: 0.12, ease: "none" }, 0);
          });
        });

        revert = () => media.revert();
      },
      { rootMargin: "50% 0px" },
    );

    const arm = () => {
      if (!motion.matches) return;
      motion.removeEventListener("change", arm);
      observer.observe(stack);
    };
    motion.addEventListener("change", arm);
    arm();

    return () => {
      cancelled = true;
      stack.removeEventListener("focusin", onFocusIn);
      motion.removeEventListener("change", arm);
      observer.disconnect();
      revert?.();
    };
  }, [stackId]);

  return null;
}
