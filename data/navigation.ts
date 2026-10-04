export type SiteSection = {
  id: string;
  label: string;
  title: string;
};

export const sections = [
  { id: "work", label: "Work", title: "Selected Work" },
  { id: "experience", label: "Experience", title: "Experience" },
  { id: "research", label: "Research", title: "Research" },
  { id: "about", label: "About", title: "About" },
  { id: "contact", label: "Contact", title: "Contact" },
] as const satisfies readonly SiteSection[];

export type SectionId = (typeof sections)[number]["id"];

export function sectionHref(id: SectionId) {
  return `/#${id}`;
}

export const primaryNavigation = sections.filter((section) => section.id !== "contact");

export const contactCallToAction = { label: "Let’s Talk", href: sectionHref("contact") };

export const sectionIdList: readonly SectionId[] = sections.map((section) => section.id);
