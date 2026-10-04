import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Building blocks for the Capabilities scenes. Everything is positioned in percent of the scene's
 * world box, so the same coordinates work at any size. Scenes read three CSS variables that the
 * controller writes while the visitor scrolls: --vis (fade), --build (0 → 1, how much is drawn)
 * and --s (scene-local progress, drives subtle rotation). See styles/capabilities.css.
 *
 * Phones get their own portrait arrangement: pass `m` (x, y, and width for planes) and `mobile`
 * line paths. Anything without `m` keeps its desktop position; `m: false` hides it on phones.
 */
export const vars = (values: Record<string, string | number | undefined>) => values as CSSProperties;

/** Authoring coordinates are percents (0–100); the SVG uses a 160 × 100 box to match a 16:10 world. */
function toViewBox(d: string) {
  let index = 0;
  return d.replace(/-?\d*\.?\d+/g, (match) => {
    const value = parseFloat(match);
    const scaled = index % 2 === 0 ? value * 1.6 : value;
    index += 1;
    return String(Number(scaled.toFixed(2)));
  });
}

export type LinePath = {
  d: string;
  /** Build threshold (0–1) at which the line starts drawing. */
  from?: number;
  /** Draw speed: higher draws faster. */
  speed?: number;
  soft?: boolean;
  /** The travelling dot follows this path. */
  pulse?: boolean;
};

function LineSet({ paths, className }: { paths: readonly LinePath[]; className: string }) {
  return (
    <svg className={cn("lines", className)} viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden>
      {paths.map((path) => (
        <path
          key={path.d}
          className={cn("ln", path.soft && "ln-soft")}
          pathLength={1}
          d={toViewBox(path.d)}
          style={vars({ "--d": path.from ?? 0, "--k": path.speed ?? 3 })}
          data-pulse-path={path.pulse ? "" : undefined}
        />
      ))}
    </svg>
  );
}

/** Connector lines, drawn in as the scene builds. Use only absolute M / L / C commands. */
export function Lines({ paths, mobile }: { paths: readonly LinePath[]; mobile?: readonly LinePath[] }) {
  return (
    <>
      <LineSet paths={paths} className={mobile ? "lines-wide" : ""} />
      {mobile && <LineSet paths={mobile} className="lines-narrow" />}
    </>
  );
}

type Phone = { x: number; y: number } | false;

type NodeKind = "core" | "stage" | "flow" | "tag";

type NodeProps = {
  x: number;
  y: number;
  z?: number;
  /** Build threshold (0–1) at which the node appears. */
  d?: number;
  kind?: NodeKind;
  sub?: string;
  m?: Phone;
  children: ReactNode;
};

/** A labelled point in the world. `flow` nodes also light up as the travelling dot reaches them. */
export function Node({ x, y, z = 0, d = 0, kind = "tag", sub, m, children }: NodeProps) {
  return (
    <span
      className={cn(`n n-${kind}`, m === false && "m-hide")}
      style={vars({ "--x": x, "--y": y, "--z": z, "--d": d, "--mx": m ? m.x : undefined, "--my": m ? m.y : undefined })}
    >
      <span className="n-label">{children}</span>
      {sub && <span className="n-sub">{sub}</span>}
    </span>
  );
}

type PlaneProps = {
  x: number;
  y: number;
  /** Width in container-width percent. */
  w: number;
  z?: number;
  /** Y rotation in degrees. */
  r?: number;
  d?: number;
  m?: { x: number; y: number; w?: number } | false;
  className?: string;
  children: ReactNode;
};

/** A floating card-like plane that carries a small drawing. */
export function Plane({ x, y, w, z = 0, r = 0, d = 0, m, className, children }: PlaneProps) {
  return (
    <span
      className={cn("pl", m === false && "m-hide", className)}
      style={vars({
        "--x": x,
        "--y": y,
        "--w": w,
        "--z": z,
        "--r": `${r}deg`,
        "--d": d,
        "--mx": m ? m.x : undefined,
        "--my": m ? m.y : undefined,
        "--mw": m ? m.w : undefined,
      })}
    >
      {children}
    </span>
  );
}

/** Moves along the path marked `pulse` (see capability-controller.tsx). */
export function Pulse() {
  return <span className="pulse" data-pulse-dot aria-hidden />;
}
