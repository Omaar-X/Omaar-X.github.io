import type { ReactNode } from "react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SkipLink } from "@/components/ui/skip-link";
import { Backdrop } from "./backdrop";
import { IntroLoader } from "./intro-loader";
import { PointerEffects } from "./pointer-effects";
import { SiteFooter } from "./site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-(--viewport-height-stable) flex-col overflow-x-clip">
      <IntroLoader />
      <SkipLink targetId="main" />
      <div aria-hidden className="scroll-progress" />
      <Backdrop />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter />
      <PointerEffects />
    </div>
  );
}
