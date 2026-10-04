import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { isExternalHref, SmartLink, type SmartLinkProps } from "./smart-link";

type TextLinkProps = SmartLinkProps & {
  arrow?: boolean;
  direction?: "forward" | "back";
};

export function TextLink({
  href,
  external,
  arrow = true,
  direction = "forward",
  className,
  children,
  ...rest
}: TextLinkProps) {
  const opensNewTab = external ?? isExternalHref(href);
  const back = direction === "back";
  const Arrow = back ? ArrowLeft : opensNewTab ? ArrowUpRight : ArrowRight;

  const icon = arrow ? (
    <Arrow
      aria-hidden
      strokeWidth={1.75}
      className={cn(
        "size-4 shrink-0 text-muted transition-[translate,color] duration-300 ease-editorial group-hover/link:text-foreground",
        back
          ? "group-hover/link:-translate-x-0.5"
          : opensNewTab
            ? "group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            : "group-hover/link:translate-x-0.5",
      )}
    />
  ) : null;

  return (
    <SmartLink
      href={href}
      external={external}
      className={cn(
        "text-link group/link inline-flex min-h-11 items-center gap-1.5 font-medium text-foreground",
        className,
      )}
      {...rest}
    >
      {back && icon}
      <span className="link-underline">{children}</span>
      {!back && icon}
    </SmartLink>
  );
}
