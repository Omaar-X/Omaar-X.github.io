import { ArrowUp, Asterisk } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/ui/marquee";
import { SmartLink } from "@/components/ui/smart-link";
import { SocialLinks } from "@/components/ui/social-links";
import { contactEmail, contactMethods } from "@/data/contact";
import { profile } from "@/data/profile";
import { copyrightYear } from "@/lib/site";

const phone = contactMethods.find((method) => method.id === "phone");

/** Plum footer: the name as giant outlined type, an endless invitation line, then contact. */

const invitation = ["Have an idea?", "Let’s make it real", "Say hello"];
export function SiteFooter() {
  return (
    <footer
      data-surface="plum"
      className="defer-render relative overflow-hidden bg-(--panel) pt-fluid-xl text-foreground [--defer-h:40rem]"
    >
      <p
        aria-hidden
        className="pointer-events-none text-center font-display text-[clamp(3rem,10.4vw,13rem)] leading-[0.85] font-bold tracking-[-0.04em] whitespace-nowrap [font-stretch:125%] text-transparent uppercase select-none [-webkit-text-stroke:1px_rgb(251_248_244/0.16)]"
      >
        {profile.name}
      </p>

      <Marquee
        label={invitation.join(" ")}
        items={[...invitation, ...invitation]}
        duration={30}
        className="-mt-[0.35em] py-fluid-sm [--marquee-gap:clamp(1.5rem,3vw,3rem)]"
        itemClassName="font-display text-[clamp(2rem,1.2rem+3.4vw,4.5rem)] leading-none font-semibold tracking-[-0.035em] whitespace-nowrap [font-stretch:112%]"
        separator={<Asterisk aria-hidden strokeWidth={2} className="size-[0.8em] text-accent-soft" />}
      />

      <Container className="flex flex-col items-center gap-fluid-md pt-fluid-md pb-[calc(max(var(--fluid-md),env(safe-area-inset-bottom))+4.5rem)] text-center nav:pb-[calc(var(--fluid-md)+5rem)]">
        <div className="flex flex-col items-center gap-2">
          <SmartLink href={contactEmail.href} className="type-h3 link-underline">
            {contactEmail.value}
          </SmartLink>
          {phone && (
            <SmartLink href={phone.href} className="type-body text-muted hover:text-foreground">
              {phone.value}
            </SmartLink>
          )}
        </div>
        <SocialLinks tone="dark" className="justify-center" />

        <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-fluid-sm">
          <p className="type-small text-subtle">
            © {copyrightYear} {profile.name}. All rights reserved.
          </p>
          <a
            href="#"
            aria-label="Back to top"
            className="grid size-10 place-items-center rounded-full bg-white/8 ring-1 ring-white/12 transition-[background-color,translate] duration-300 hover:-translate-y-0.5 hover:bg-white/16"
          >
            <ArrowUp aria-hidden strokeWidth={1.75} className="size-4" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
