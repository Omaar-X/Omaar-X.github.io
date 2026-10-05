"use client";

import { Download, House } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/cn";
import { MobileMenu, type MenuFooterLink, type MenuLink } from "./mobile-menu";

type SiteNavigationProps = {
  brand: ReactNode;
  links: readonly MenuLink[];
  menuLinks: readonly MenuLink[];
  callToAction: { label: string; href: string };
  /** Shown top right on desktop, where the section links used to be. */
  secondaryAction: { label: string; href: string; download?: string };
  menuHeading: string;
  menuFooterLinks: readonly MenuFooterLink[];
  menuNote: string;
  sectionIds: readonly string[];
};

const desktopQuery = "(width >= 56rem)";
const focusableSelector = "a[href], button:not([disabled])";

function setScrollLock(locked: boolean) {
  if (locked) document.documentElement.dataset.scrollLocked = "";
  else delete document.documentElement.dataset.scrollLocked;
}

export function SiteNavigation({
  brand,
  links,
  menuLinks,
  callToAction,
  secondaryAction,
  menuHeading,
  menuFooterLinks,
  menuNote,
  sectionIds,
}: SiteNavigationProps) {
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusOnClose = useRef(true);
  const wasOpen = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const activeId = useActiveSection(sectionIds);

  const openMenu = () => {
    restoreFocusOnClose.current = true;
    setMenuMounted(true);
    setMenuOpen(true);
  };

  const closeMenu = useCallback((restoreFocus = true) => {
    restoreFocusOnClose.current = restoreFocus;
    setScrollLock(false);
    setMenuOpen(false);
  }, []);

  const unmountMenu = useCallback(() => setMenuMounted(false), []);

  useEffect(() => {
    // Deferred sections (.defer-render) must be fully rendered before an anchor scroll, or it lands
    // in the wrong place. Fragment loads are covered in CSS (:target); this covers in-page clicks.
    const root = document.documentElement;
    const renderAll = () => {
      root.dataset.renderAll = "";
    };
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element).closest("a[href*='#']")) renderAll();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", renderAll);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", renderAll);
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      header.dataset.scrolled = String(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const header = headerRef.current;
    const main = document.getElementById("main");

    setScrollLock(true);
    main?.setAttribute("inert", "");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !header) return;

      const focusable = [...header.querySelectorAll<HTMLElement>(focusableSelector)].filter(
        (element) => element.getClientRects().length > 0,
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia(desktopQuery);
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);

    return () => {
      setScrollLock(false);
      main?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current && restoreFocusOnClose.current) menuButtonRef.current?.focus();
    wasOpen.current = false;
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      data-menu-open={menuOpen ? "" : undefined}
      className="group/header fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 border-b border-transparent transition-[background-color,border-color,opacity] duration-500 ease-editorial group-data-[menu-open]/header:opacity-0 group-data-[scrolled=true]/header:border-border group-data-[scrolled=true]/header:bg-background/88 group-data-[scrolled=true]/header:backdrop-blur-md"
      />
      <Container className="flex h-(--header-height) items-center justify-between gap-3">
        <div>{brand}</div>

        <div className="flex items-center">
          <div className="hidden nav:block">
            <Button
              size="sm"
              variant="secondary"
              href={secondaryAction.href}
              download={secondaryAction.download}
              icon={Download}
            >
              {secondaryAction.label}
            </Button>
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuMounted ? "mobile-menu" : undefined}
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            className="group/menu -mr-3 inline-flex min-h-11 min-w-11 items-center gap-3 px-3 text-sm font-medium text-foreground nav:hidden"
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span aria-hidden className="relative block h-2.5 w-5">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-editorial",
                  menuOpen && "translate-y-[4.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ease-editorial",
                  menuOpen && "-translate-y-[4.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Desktop: the section links live in a floating pill at the bottom of the window. */}
      <nav
        aria-label="Primary"
        className="enter-rise fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-40 hidden -translate-x-1/2 nav:block"
      >
        <ul className="flex items-center gap-1 rounded-full bg-ink p-1.5 text-on-ink shadow-float ring-1 ring-white/10">
          <li>
            <Link
              href="/#hero"
              aria-label="Back to the top"
              className="grid size-10 place-items-center rounded-full bg-white/8 text-on-ink transition-colors duration-300 hover:bg-white/16"
            >
              <House aria-hidden strokeWidth={1.75} className="size-4" />
            </Link>
          </li>
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                aria-current={activeId === link.id ? "location" : undefined}
                className="inline-flex min-h-10 items-center rounded-full px-3.5 text-sm whitespace-nowrap text-on-ink-muted transition-colors duration-300 hover:text-on-ink aria-[current=location]:bg-white/10 aria-[current=location]:text-on-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pl-1">
            <Link
              href={callToAction.href}
              className="inline-flex min-h-10 items-center rounded-full bg-accent px-5 text-sm font-medium whitespace-nowrap text-on-accent transition-colors duration-300 hover:bg-accent-soft hover:text-ink"
            >
              {callToAction.label}
            </Link>
          </li>
        </ul>
      </nav>

      {menuMounted && (
        <MobileMenu
          open={menuOpen}
          onExited={unmountMenu}
          onNavigate={() => closeMenu(false)}
          heading={menuHeading}
          links={menuLinks}
          activeId={activeId}
          footerLinks={menuFooterLinks}
          note={menuNote}
        />
      )}
    </header>
  );
}
