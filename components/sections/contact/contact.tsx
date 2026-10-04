import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SmartLink } from "@/components/ui/smart-link";
import { contactEmail, contactMethods } from "@/data/contact";
import { profile } from "@/data/profile";

export function ContactSection() {
  const { location, professionalTitles } = profile;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      data-surface="plum"
      className="defer-render relative bg-(--panel) pt-section pb-section-compact text-foreground [--defer-h:50rem] md:[--defer-h:56rem] lg:[--defer-h:56rem]"
    >
      <Container className="flex flex-col gap-fluid-xl">
        <div className="rule-top flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-fluid-sm">
          <Eyebrow index="06" className="whitespace-nowrap">
            Contact
          </Eyebrow>
          <p className="type-micro flex items-center gap-2 text-subtle before:size-1.5 before:rounded-full before:bg-accent before:content-['']">
            Open to conversations
          </p>
        </div>

        <h2
          id="contact-title"
          className="scroll-rise max-w-[16ch] font-serif text-[clamp(3rem,1.5rem+7.2vw,9.5rem)] leading-[0.92] tracking-[-0.03em] text-balance"
        >
          Have a project, opportunity or idea?
        </h2>

        <div className="editorial-grid gap-y-fluid-lg">
          <div className="col-span-full flex flex-col gap-fluid-sm lg:col-span-4">
            <p className="type-body-lg max-w-[26rem] text-muted">
              I’m open to conversations around web development, digital work, business systems and
              applied AI research.
            </p>
            <p className="type-small text-muted">
              Based in {location.city}, {location.country}. Working across web, digital growth and
              applied AI.
            </p>
            <p className="type-micro text-subtle">{professionalTitles.join(" · ")}</p>
          </div>

          <div className="col-span-full flex flex-col gap-fluid-md lg:col-span-8 lg:col-start-5">
            <div className="flex flex-col items-start gap-fluid-sm">
              <Button size="lg" href={contactEmail.href} icon={Mail}>
                Email Omar
              </Button>
              <SmartLink
                href={contactEmail.href}
                className="group/email inline-flex min-h-11 items-center gap-3 font-display text-[clamp(1.5rem,0.85rem+3.4vw,3.5rem)] leading-tight tracking-[-0.03em] [overflow-wrap:anywhere] text-foreground"
              >
                <span className="link-underline transition-transform duration-500 ease-editorial group-hover/email:translate-x-1.5">
                  {contactEmail.value}
                </span>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-[0.7em] shrink-0 text-mauve transition-transform duration-300 ease-editorial group-hover/email:translate-x-1 group-hover/email:-translate-y-1"
                />
              </SmartLink>
            </div>

            <ul aria-label="Other ways to reach Omar" className="border-t border-border">
              {contactMethods.map((method) => (
                <li key={method.id} className="border-b border-border">
                  <SmartLink
                    href={method.href}
                    download={method.download}
                    className="group/row grid min-h-14 grid-cols-[6.5rem_minmax(0,1fr)_auto] items-center gap-x-4 py-3 sm:grid-cols-[9rem_minmax(0,1fr)_auto]"
                  >
                    <span className="type-micro text-subtle">{method.label}</span>
                    <span className="type-body text-foreground [overflow-wrap:anywhere]">
                      {method.value}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.5}
                      className="size-4 text-muted transition-transform duration-300 ease-editorial group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
                    />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
