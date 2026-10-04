import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublishedCaseStudy, publishedCaseStudies } from "@/data/projects";
import { createCaseStudyMetadata } from "@/lib/metadata";
import { caseStudyStructuredData } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCaseStudies.map(({ project }) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const entry = getPublishedCaseStudy(slug);
  return entry ? createCaseStudyMetadata(entry) : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const entry = getPublishedCaseStudy(slug);
  if (!entry) notFound();

  const position = publishedCaseStudies.indexOf(entry);
  const previous = publishedCaseStudies[position - 1]?.project;
  const next = publishedCaseStudies[position + 1]?.project;

  return (
    <>
      <JsonLd data={caseStudyStructuredData(entry)} />
      <CaseStudyLayout
        project={entry.project}
        caseStudy={entry.caseStudy}
        previous={previous}
        next={next}
      />
    </>
  );
}
