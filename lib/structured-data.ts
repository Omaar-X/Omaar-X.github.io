import { education } from "@/data/education";
import { profile } from "@/data/profile";
import type { PublishedCaseStudy } from "@/data/projects";
import { caseStudyPath } from "./routes";
import { siteConfig } from "./site";

export function personStructuredData() {
  const degree = education[0];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteConfig.url,
    image: new URL(profile.portrait.src.src, siteConfig.url).toString(),
    email: `mailto:${profile.email}`,
    telephone: profile.phone.e164,
    jobTitle: profile.currentRole,
    worksFor: {
      "@type": "Organization",
      name: profile.currentCompany.name,
      url: profile.currentCompany.url,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressCountry: profile.location.countryCode,
    },
    ...(degree && {
      alumniOf: { "@type": "CollegeOrUniversity", name: degree.institution },
    }),
    knowsAbout: profile.focusAreas,
    knowsLanguage: profile.languages.map((language) => language.name),
    sameAs: profile.socials.map((social) => social.href),
  };
}

export function caseStudyStructuredData({ project, caseStudy }: PublishedCaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.name} case study`,
    url: new URL(caseStudyPath(project.slug), siteConfig.url).toString(),
    ...(project.summary && { description: project.summary }),
    ...(project.image && { image: new URL(project.image.src.src, siteConfig.url).toString() }),
    ...(project.year && { dateCreated: project.year }),
    ...(caseStudy.keyAreas && { keywords: caseStudy.keyAreas.map((area) => area.title).join(", ") }),
    creator: { "@type": "Person", name: profile.name, url: siteConfig.url },
    ...(project.url && {
      about: { "@type": "WebSite", name: project.name, url: project.url },
    }),
  };
}
