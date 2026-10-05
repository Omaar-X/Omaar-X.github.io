export type SiteSection = {
  id: string;
  label: string;
  title: string;
};

export const sections = [
  { id: "work", label: "Work", title: "Selected Work" },
  { id: "skills", label: "Skills", title: "How I work" },
  { id: "about", label: "About", title: "About" },
  { id: "experience", label: "Career", title: "Career" },
  { id: "research", label: "Research", title: "Research" },
  { id: "contact", label: "Contact", title: "Contact" },
] as const satisfies readonly SiteSection[];

export type SectionId = (typeof sections)[number]["id"];

export function sectionHref(id: SectionId) {
  return `/#${id}`;
}

export const primaryNavigation = sections.filter((section) => section.id !== "contact");

export const contactCallToAction = { label: "Contact me", href: sectionHref("contact") };

export const sectionIdList: readonly SectionId[] = sections.map((section) => section.id);
