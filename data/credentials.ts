import { activities } from "./education";
import { publications } from "./research";
import type { ResearchStatus } from "./research";
import type { Year } from "./types";

export type Credential = {
  id: string;
  category: "Research" | "Contests";
  title: string;
  detail?: string;
  year?: Year;
  status?: Extract<ResearchStatus, "accepted" | "submitted">;
  entries?: readonly { title: string; role: string; year?: Year }[];
};

const paperCredentials: readonly Credential[] = publications.flatMap((paper) =>
  paper.status === "accepted" || paper.status === "submitted"
    ? [
        {
          id: paper.id,
          category: "Research" as const,
          title: `${paper.shortTitle} paper`,
          detail: [paper.publisher, paper.venue].filter(Boolean).join(" · "),
          status: paper.status,
        },
      ]
    : [],
);

const contestCredential: Credential = {
  id: "contests",
  category: "Contests",
  title: "Programming contests & hackathons",
  entries: activities.map(({ title, role, year }) => ({ title, role, year })),
};

export const credentials: readonly Credential[] = [...paperCredentials, contestCredential];
