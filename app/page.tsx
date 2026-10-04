import { AboutSection } from "@/components/sections/about/about";
import { ContactSection } from "@/components/sections/contact/contact";
import { ExperienceSection } from "@/components/sections/experience/experience";
import { Hero } from "@/components/sections/hero/hero";
import { ResearchSection } from "@/components/sections/research/research";
import { CreativeShowcase } from "@/components/sections/showcase/creative-showcase";
import { MoreWork } from "@/components/sections/work/more-work";
import { SelectedWork } from "@/components/sections/work/selected-work";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { personStructuredData } from "@/lib/structured-data";

export const metadata = createPageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd data={personStructuredData()} />
      <Hero />
      <CreativeShowcase />
      <div id="work">
        <SelectedWork />
        <MoreWork />
      </div>
      <ExperienceSection />
      <ResearchSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
