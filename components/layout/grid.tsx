import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type MobileColumns = 1 | 2 | 3 | 4;
type TabletColumns = MobileColumns | 5 | 6 | 7 | 8;
type DesktopColumns = TabletColumns | 9 | 10 | 11 | 12;

export type GridPlacement = {
  base?: MobileColumns;
  md?: TabletColumns;
  lg?: DesktopColumns;
};

type GridProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "ul" | "ol" | "header" | "footer";
};

export function Grid({ as: Tag = "div", className, ...rest }: GridProps) {
  return <Tag className={cn("editorial-grid", className)} {...rest} />;
}

type GridItemProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "li" | "article" | "figure" | "aside";
  span?: GridPlacement;
  start?: GridPlacement;
};

function placementVariables(span?: GridPlacement, start?: GridPlacement) {
  const entries: Array<[string, number | undefined]> = [
    ["--span", span?.base],
    ["--span-md", span?.md],
    ["--span-lg", span?.lg],
    ["--start", start?.base],
    ["--start-md", start?.md],
    ["--start-lg", start?.lg],
  ];

  return Object.fromEntries(
    entries
      .filter((entry): entry is [string, number] => entry[1] !== undefined)
      .map(([property, value]) => [property, String(value)]),
  ) as CSSProperties;
}

export function GridItem({ as: Tag = "div", span, start, style, ...rest }: GridItemProps) {
  return (
    <Tag data-grid-item="" style={{ ...placementVariables(span, start), ...style }} {...rest} />
  );
}
