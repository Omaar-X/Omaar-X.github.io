import Image from "next/image";
import { BrowserFrame } from "@/components/ui/browser-frame";
import type { CaseStudyScreen } from "@/data/projects";
import { cn } from "@/lib/cn";

type CaseStudyScreensProps = {
  screens: readonly CaseStudyScreen[];
  url?: string;
};

export function CaseStudyScreens({ screens, url }: CaseStudyScreensProps) {
  return (
    <div className="editorial-grid items-start gap-y-fluid-lg">
      {screens.map((screen) => {
        const mobile = screen.device === "mobile";
        return (
          <figure
            key={screen.image.src.src}
            className={cn(
              "col-span-full",
              mobile ? "md:col-span-3 lg:col-span-4" : "md:col-span-5 lg:col-span-8",
            )}
          >
            <BrowserFrame url={url} className={cn(mobile && "mx-auto w-full max-w-[16rem]")}>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: `${screen.image.src.width} / ${screen.image.src.height}` }}
              >
                <Image
                  src={screen.image.src}
                  alt={screen.image.alt}
                  fill
                  sizes={mobile ? "16rem" : "(min-width: 1024px) 60vw, (min-width: 768px) 60vw, 92vw"}
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            </BrowserFrame>
            <figcaption
              className={cn("type-small mt-3 text-subtle", mobile && "mx-auto max-w-[16rem]")}
            >
              {screen.caption}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
