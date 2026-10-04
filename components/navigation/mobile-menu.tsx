"use client";

import Link from "next/link";
import { useEffect, useRef, type AnimationEvent, type CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { TextLink } from "@/components/ui/text-link";

export type MenuLink = { id: string; label: string; href: string };
export type MenuFooterLink = { label: string; href: string; download?: string };

type MobileMenuProps = {
  open: boolean;
  onExited: () => void;
  onNavigate: () => void;
  heading: string;
  links: readonly MenuLink[];
  activeId: string | null;
  footerLinks: readonly MenuFooterLink[];
  note: string;
};

const exitFallbackMs = 450;

/** Stagger position for the enter animation (see `.mobile-menu` in styles/motion.css). */
const position = (index: number) => ({ "--menu-index": index }) as CSSProperties;

export function MobileMenu({
  open,
  onExited,
  onNavigate,
  heading,
  links,
  activeId,
  footerLinks,
  note,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus({ preventScroll: true });
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onExited();
      return;
    }
    // `animationend` unmounts the panel; this covers the case where it never fires.
    const timer = window.setTimeout(onExited, exitFallbackMs);
    return () => window.clearTimeout(timer);
  }, [open, onExited]);

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (!open && event.target === event.currentTarget) onExited();
  };

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      data-state={open ? "open" : "closing"}
      onAnimationEnd={handleAnimationEnd}
      className="mobile-menu fixed inset-0 -z-20 overflow-y-auto overscroll-contain bg-background nav:hidden"
    >
      <NoiseOverlay />
      <Container className="relative flex min-h-full flex-col justify-between gap-fluid-xl pt-[calc(var(--header-offset)+var(--fluid-md))] pb-[max(var(--fluid-lg),env(safe-area-inset-bottom))]">
        <nav aria-label="Menu">
          <p data-menu-item style={position(0)} className="type-eyebrow text-muted">
            {heading}
          </p>
          <ol className="mt-fluid-sm border-t border-border">
            {links.map((link, index) => (
              <li
                key={link.id}
                data-menu-item
                style={position(index + 1)}
                className="border-b border-border"
              >
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  aria-current={activeId === link.id ? "location" : undefined}
                  className="group/item flex min-h-[4.25rem] items-center gap-5 py-2"
                >
                  <span className="type-micro w-6 shrink-0 text-mauve-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="type-h2 transition-colors duration-300 group-hover/item:text-accent group-aria-[current=location]/item:text-accent">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div
          data-menu-item
          style={position(links.length + 1)}
          className="flex flex-col gap-fluid-xs"
        >
          <ul className="flex flex-wrap gap-x-7">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <TextLink href={link.href} download={link.download}>
                  {link.label}
                </TextLink>
              </li>
            ))}
          </ul>
          <p className="type-small text-subtle">{note}</p>
        </div>
      </Container>
    </div>
  );
}
