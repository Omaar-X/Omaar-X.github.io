"use client";

import { useEffect } from "react";

/**
 * Once the intro loader has finished, entrances no longer need to wait for it: drop the delay so
 * pages reached by client-side navigation (where the loader does not replay) animate straight away.
 */
export function IntroSettle() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.documentElement.style.setProperty("--intro-offset", "0ms");
    }, 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
