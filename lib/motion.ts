import type { CSSProperties } from "react";

export function enterDelay(milliseconds: number) {
  return { "--enter-delay": `${milliseconds}ms` } as CSSProperties;
}
