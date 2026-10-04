import type { Metadata } from "next";
import type { PublishedCaseStudy } from "@/data/projects";
import { caseStudyPath } from "./routes";
import { ogImage, siteConfig } from "./site";

export const sharedOpenGraph = {
  type: "website",
  siteName: siteConfig.name,
  locale: siteConfig.locale,
  images: [ogImage],
} satisfies Metadata["openGraph"];

type PageMetadataInput = {
  title?: string;
  description?: string;
  path: `/${string}`;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description = siteConfig.description,
  path,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const resolvedTitle = title ?? siteConfig.title;

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, title: resolvedTitle, description, url: path },
    twitter: { card: "summary_large_image", title: resolvedTitle, description, images: [ogImage] },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

const titleCase = (value: string) => value.replace(/\b\w/g, (letter) => letter.toUpperCase());

export function createCaseStudyMetadata({ project, caseStudy }: PublishedCaseStudy): Metadata {
  const discipline = caseStudy.role ? `${titleCase(caseStudy.role)} ` : "";

  return createPageMetadata({
    title: `${project.name} — ${discipline}Case Study`,
    description: `${project.name} case study by ${siteConfig.name}. ${project.summary ?? ""}`.trim(),
    path: caseStudyPath(project.slug),
  });
}
