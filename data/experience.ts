import type { Organization, Period, Status } from "./types";

export type Experience = {
  id: string;
  role: string;
  organization: Organization;
  period: Period;
  status?: Extract<Status, "current">;
  listed: boolean;
  summary?: string;
  capabilities: readonly string[];
  contributions: readonly string[];
  highlights: readonly string[];
  relatedProjects: readonly string[];
};

const midtownAabashon = {
  id: "midtown-aabashon",
  role: "Web Developer & Digital Marketer",
  organization: {
    name: "Midtown Aabashon Ltd.",
    url: "https://midtownaabashonltd.com/",
  },
  period: { end: "present" },
  status: "current",
  listed: true,
  summary:
    "Working across the company's digital presence, combining web development with digital marketing and brand-focused online execution.",
  capabilities: ["Web development", "Digital marketing", "Digital presence", "Content / brand support"],
  contributions: [],
  highlights: [],
  relatedProjects: ["midtown-aabashon"],
} as const satisfies Experience;

const tripFlyBd: Experience = {
  id: "trip-fly-bd",
  role: "Travel Operations & Ticketing Assistant",
  organization: {
    name: "Trip Fly BD",
    url: "https://www.tripflybd.com/",
    location: "Dhaka, Bangladesh",
  },
  period: { start: "2026-03", end: "2026-08" },
  listed: true,
  summary:
    "A customer-facing role at a Dhaka travel agency that combined ticketing and booking operations with website and digital tooling work for the team.",
  capabilities: ["Travel operations", "Ticketing", "Web development", "Digital operations"],
  contributions: [
    "Issued and managed domestic and international air tickets on Sabre GDS.",
    "Owned bookings after issue: itinerary changes, reservation queries and travel documentation.",
    "Built the Smart Attendance System, replacing the team's paper attendance register.",
    "Built and maintained the agency's website sections and landing pages.",
  ],
  highlights: [
    "Issued and managed domestic and international air tickets end to end on Sabre GDS — fare display, reservation creation, reissue and booking updates.",
    "Owned each booking after it was made: itinerary changes, reservation queries and travel documentation.",
    "Resolved fare, schedule and travel-condition questions by phone, chat and in person, in Bangla and English.",
    "Coordinated between customers and the internal team so confirmations, changes and refunds closed inside the same working day.",
    "Built the Smart Attendance System, a role-based web app that replaced the team's paper attendance register.",
    "Built and maintained the agency's website sections and landing pages in HTML, CSS and JavaScript.",
  ],
  relatedProjects: ["trip-fly-bd", "smart-attendance-system"],
};

const independent: Experience = {
  id: "independent",
  role: "Independent Web Developer",
  organization: { name: "Client and self-directed projects" },
  period: { end: "present" },
  listed: false,
  capabilities: [],
  contributions: [],
  summary:
    "Designing, building and deploying websites and small web apps end to end for paying clients — from first conversation and layout to hosting, forms, handover and post-launch fixes.",
  highlights: [
    "Delivered paid client websites and web apps across travel, real estate, consultancy and trading.",
    "Took each project from requirements to launch as the sole developer: design, build, content structure, deployment, handover and ongoing fixes.",
    "Built mobile-first, responsive layouts with accessible navigation for the low-end Android devices most customers browse from.",
    "Structured every page for SEO — semantic markup, metadata, structured data and sitemaps.",
    "Replaced paid form services with a Google Apps Script and Google Sheets lead-capture backend at zero running cost.",
    "Managed version control and deployment with Git, GitHub and GitHub Pages.",
  ],
  relatedProjects: ["rover-consultancy", "fmz-trading", "trip-fly-bd"],
};

export const currentPosition = midtownAabashon;

export const experience: readonly Experience[] = [midtownAabashon, tripFlyBd, independent];

export const careerEntries: readonly Experience[] = experience.filter((entry) => entry.listed);
