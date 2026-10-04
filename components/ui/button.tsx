import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isExternalHref, SmartLink } from "./smart-link";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";
type IconNudge = "right" | "up-right" | "down";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "start" | "end";
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof SharedProps> & { href?: never };

type ButtonAsLink = SharedProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof SharedProps | "href"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClasses =
  "group/button relative inline-flex items-center justify-center gap-2.5 rounded-sm text-center font-medium tracking-[-0.005em] select-none touch-manipulation transition-[background-color,border-color,color,translate] duration-300 ease-editorial active:translate-y-px disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent-strong text-on-accent hover:bg-accent",
  secondary:
    "border border-border-strong bg-surface text-foreground hover:border-accent-soft hover:bg-surface-soft",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4.5 py-2.5 text-sm leading-tight",
  md: "min-h-12 px-5.5 py-3 text-[0.9375rem] leading-tight",
  lg: "min-h-14 px-7 py-3.5 text-base leading-tight",
};

const nudgeClasses: Record<IconNudge, string> = {
  right: "group-hover/button:translate-x-0.5",
  "up-right": "group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5",
  down: "group-hover/button:translate-y-0.5",
};

function isLink(props: ButtonProps): props is ButtonAsLink {
  return typeof props.href === "string";
}

function resolveNudge(props: ButtonProps): IconNudge {
  if (!isLink(props)) return "right";
  if (props.download !== undefined || props.href.startsWith("#")) return "down";
  return (props.external ?? isExternalHref(props.href)) ? "up-right" : "right";
}

function ButtonContent({
  icon: Icon,
  iconPosition,
  nudge,
  children,
}: Pick<SharedProps, "icon" | "children"> & {
  iconPosition: "start" | "end";
  nudge: IconNudge;
}) {
  const icon = Icon ? (
    <Icon
      aria-hidden
      strokeWidth={1.75}
      className={cn(
        "size-4 shrink-0 transition-transform duration-300 ease-editorial",
        iconPosition === "end" && nudgeClasses[nudge],
      )}
    />
  ) : null;

  return (
    <>
      {iconPosition === "start" && icon}
      <span>{children}</span>
      {iconPosition === "end" && icon}
    </>
  );
}

export function Button(props: ButtonProps) {
  const nudge = resolveNudge(props);

  if (isLink(props)) {
    const {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "end",
      className,
      children,
      ...linkProps
    } = props;

    return (
      <SmartLink
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...linkProps}
      >
        <ButtonContent icon={icon} iconPosition={iconPosition} nudge={nudge}>
          {children}
        </ButtonContent>
      </SmartLink>
    );
  }

  const {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "end",
    className,
    children,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      type={type}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...buttonProps}
    >
      <ButtonContent icon={icon} iconPosition={iconPosition} nudge={nudge}>
        {children}
      </ButtonContent>
    </button>
  );
}
