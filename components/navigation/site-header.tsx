import { BrandLockup } from "@/components/brand/brand-lockup";
import {
  contactCallToAction,
  primaryNavigation,
  sectionHref,
  sectionIdList,
  sections,
} from "@/data/navigation";
import { profile } from "@/data/profile";
import { SiteNavigation } from "./site-navigation";

const toMenuLink = (section: (typeof sections)[number]) => ({
  id: section.id,
  label: section.label,
  href: sectionHref(section.id),
});

export function SiteHeader() {
  const { cv, email, socials, currentRole, currentCompany, location } = profile;

  return (
    <SiteNavigation
      brand={<BrandLockup />}
      links={primaryNavigation.map(toMenuLink)}
      menuLinks={sections.map(toMenuLink)}
      callToAction={contactCallToAction}
      secondaryAction={{ label: "Resume", href: cv.general.href, download: cv.general.fileName }}
      menuHeading={profile.name}
      menuFooterLinks={[
        ...socials.map((social) => ({ label: social.label, href: social.href })),
        { label: "CV", href: cv.general.href, download: cv.general.fileName },
        { label: "Email", href: `mailto:${email}` },
      ]}
      menuNote={`${currentRole}, ${currentCompany.name} · ${location.city}, ${location.country}`}
      sectionIds={sectionIdList}
    />
  );
}
