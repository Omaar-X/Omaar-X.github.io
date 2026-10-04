import type { MetadataRoute } from "next";
import { publishedCaseStudies } from "@/data/projects";
import { caseStudyPath } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const indexedRoutes = [
  "/",
  ...publishedCaseStudies.map(({ project }) => caseStudyPath(project.slug)),
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexedRoutes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
