import { ArrowUp } from "lucide-react";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { Container } from "@/components/layout/container";
import { SmartLink } from "@/components/ui/smart-link";
import { footerLinks } from "@/data/contact";
import { primaryNavigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { copyrightYear } from "@/lib/site";

const linkClasses =
  "inline-flex min-h-10 items-center text-[0.9375rem] md:min-h-9 text-muted transition-colors duration-300 hover:text-foreground";

export function SiteFooter() {
  return (
    <footer data-surface="plum" className="defer-render bg-(--panel) text-foreground [--defer-h:25rem] lg:[--defer-h:19rem]">
      <Container className="flex flex-col gap-fluid-md border-t border-border pt-fluid-md pb-[max(var(--fluid-sm),env(safe-area-inset-bottom))]">
        <div className="editorial-grid gap-y-fluid-sm">
          <div className="col-span-full flex flex-col gap-2 lg:col-span-5">
            <div>
              <BrandLockup />
            </div>
            <p className="type-small max-w-xs text-muted">
              {profile.professionalTitles.join(" · ")}
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-2 md:col-span-3 lg:col-span-3 lg:col-start-7">
            <p className="type-micro mb-1 text-subtle">Explore</p>
            <ul>
              {primaryNavigation.map((item) => (
                <li key={item.id}>
                  <SmartLink href={`/#${item.id}`} className={linkClasses}>
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            aria-label="Professional links"
            className="col-span-2 md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-10"
          >
            <p className="type-micro mb-1 text-subtle">Elsewhere</p>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <SmartLink href={link.href} download={link.download} className={linkClasses}>
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-fluid-sm">
          <p className="type-small text-subtle">
            © {copyrightYear} {profile.name}
            <span aria-hidden className="hidden sm:inline"> · </span>
            <span className="block sm:inline">Built with Next.js</span>
          </p>
          <a
            href="#"
            className="group/top inline-flex min-h-10 items-center gap-2 text-[0.9375rem] font-medium text-foreground"
          >
            <span className="link-underline">Back to top</span>
            <ArrowUp
              aria-hidden
              strokeWidth={1.75}
              className="size-4 text-muted transition-transform duration-300 ease-editorial group-hover/top:-translate-y-0.5"
            />
          </a>
        </div>
      </Container>
    </footer>
  );
}
