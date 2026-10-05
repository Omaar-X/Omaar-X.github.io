import type { ReactNode } from "react";

/** The one highlighted word in a heading ("Selected <Accent>Work</Accent>"). */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-accent">{children}</span>;
}
