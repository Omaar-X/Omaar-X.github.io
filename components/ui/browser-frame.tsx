import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type BrowserFrameProps = {
  url?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function displayHost(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function BrowserFrame({ url, children, className, style }: BrowserFrameProps) {
  return (
    <div
      className={cn("overflow-hidden rounded-md border border-border bg-surface", className)}
      style={style}
    >
      <div
        aria-hidden
        className="grid h-8 grid-cols-[3rem_minmax(0,1fr)_3rem] items-center border-b border-border px-3"
      >
        <span className="browser-dots" />
        {url && (
          <span className="truncate text-center text-[0.6875rem] tracking-wide text-subtle">
            {displayHost(url)}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
