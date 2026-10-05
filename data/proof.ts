import { education } from "./education";
import { currentPosition } from "./experience";
import { projects } from "./projects";
import { publications } from "./research";

/**
 * The hero's proof strip and client row. Every value is derived from the records in data/, so the
 * numbers can never drift from what the rest of the site shows.
 */
export type ProofPoint = { value: string; label: string };

const pad = (value: number) => String(value).padStart(2, "0");

const liveProjects = projects.filter((project) => project.status === "live");
const acceptedPaper = publications.find((item) => item.status === "accepted");
const degree = education.find((entry) => entry.level === "degree");

export const proofPoints: readonly ProofPoint[] = [
  { value: pad(liveProjects.length), label: "Live websites & web apps" },
  ...(acceptedPaper?.publisher
    ? [{ value: acceptedPaper.publisher, label: `${acceptedPaper.shortTitle} paper accepted` }]
    : []),
  { value: "Now", label: `${currentPosition.role}, ${currentPosition.organization.name}` },
  ...(degree
    ? [
        {
          value: degree.qualification.split(" in ")[0] ?? degree.qualification,
          label: `${degree.qualification.split(" in ").at(-1)}, ${degree.institution.match(/\(([^)]+)\)/)?.[1] ?? degree.institution}`,
        },
      ]
    : []),
];

/** Client-facing products only: internal tools are left out of the "built for" row. */
export const clientNames: readonly string[] = [
  ...new Set(
    projects
      .filter((project) => project.sector !== "Internal tool")
      .map((project) => project.client ?? project.name),
  ),
];

/** The scrolling fact strip under About. */
export const highlights: readonly string[] = [
  ...proofPoints.map((point) => `${point.value} ${point.label}`),
  "Idea to launch to growth",
];
