import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  as?: "div" | "header" | "footer" | "article" | "nav";
  size?: "page" | "wide" | "prose";
};

export function Container({ as: Tag = "div", size = "page", className, ...rest }: ContainerProps) {
  return <Tag data-size={size} className={cn("layout-container", className)} {...rest} />;
}
