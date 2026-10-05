import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Accent } from "@/components/ui/accent";
import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/smart-link";
import { contactEmail, contactMethods } from "@/data/contact";

/** "Start a project": a big invitation, the email as the main action, then every other channel. */
export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="defer-render relative pt-section pb-section [--defer-h:50rem]"
    >
      <Container>
        <div className="grid gap-fluid-lg rounded-[calc(var(--radius-card)*1.4)] border border-border bg-surface p-[clamp(1.5rem,0.75rem+4vw,4.5rem)] shadow-card lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-fluid-xl">
          <div className="flex flex-col gap-fluid-md">
            <p className="type-kicker text-muted">
              <span aria-hidden>/ </span>Start a project
            </p>
            <h2 id="contact-title" className="type-statement scroll-rise max-w-[14ch] text-balance">
              Let’s build something <Accent>remarkable.</Accent>
            </h2>
            <p className="type-body-lg max-w-[30rem] text-muted">
              Have a project, a role or an idea? I’m open to conversations around web development, digital
              growth, business systems and applied AI research.
            </p>
            <div className="flex flex-col items-start gap-fluid-sm">
              <Button size="lg" href={contactEmail.href} icon={Mail}>
                Email Omar
              </Button>
              <SmartLink
                href={contactEmail.href}
                className="type-h3 inline-flex min-h-11 items-center text-foreground [overflow-wrap:anywhere]"
              >
                <span className="link-underline">{contactEmail.value}</span>
              </SmartLink>
            </div>
          </div>

          <ul aria-label="Other ways to reach Omar" className="flex flex-col justify-end gap-2.5">
            {contactMethods.map((method) => (
              <li key={method.id}>
                <SmartLink
                  href={method.href}
                  download={method.download}
                  className="group/row flex min-h-16 items-center justify-between gap-4 rounded-xl border border-border bg-background px-5 py-3 transition-[border-color,background-color] duration-300 hover:border-accent-soft hover:bg-lavender-light"
                >
                  <span className="flex flex-col">
                    <span className="type-micro text-subtle">{method.label}</span>
                    <span className="type-body font-medium text-foreground [overflow-wrap:anywhere]">
                      {method.value}
                    </span>
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-muted transition-[rotate,color,background-color] duration-500 ease-editorial group-hover/row:rotate-45 group-hover/row:bg-accent group-hover/row:text-on-accent">
                    <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4" />
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
