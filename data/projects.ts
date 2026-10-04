import fmzTradingPreview from "@/assets/images/projects/fmz-trading.webp";
import midtownPreview from "@/assets/images/projects/midtown-aabashon.webp";
import sadiraBag from "@/assets/images/projects/sadira-bag.webp";
import sadiraProducts from "@/assets/images/projects/sadira-products.webp";
import sadiraPreview from "@/assets/images/projects/sadira.webp";
import roverPreview from "@/assets/images/projects/rover-consultancy.webp";
import attendancePreview from "@/assets/images/projects/smart-attendance-system.webp";
import trmHolidaysMobile from "@/assets/images/projects/trm-holidays-mobile.webp";
import trmHolidaysTours from "@/assets/images/projects/trm-holidays-tours.webp";
import trmHolidaysPreview from "@/assets/images/projects/trm-holidays.webp";
import tripFlyPreview from "@/assets/images/projects/trip-fly-bd.webp";
import { formatPeriod } from "@/lib/dates";
import { caseStudyPath } from "@/lib/routes";
import { currentPosition, experience } from "./experience";
import type { ImageAsset, Status, Year } from "./types";

export type CaseStudyScreen = {
  image: ImageAsset;
  caption: string;
  device: "desktop" | "mobile";
};

export type CaseStudy = {
  status: "published" | "in-preparation";
  role?: string;
  projectType?: string;
  overview?: string;
  challenge?: string;
  approach?: string;
  responsibilities?: readonly string[];
  keyAreas?: readonly { title: string; detail: string }[];
  screens?: readonly CaseStudyScreen[];
  outcome?: string;
  nextSteps?: string;
};

export type Project = {
  slug: string;
  name: string;
  client?: string;
  sector?: string;
  descriptor?: string;
  status: Extract<Status, "live" | "launching-soon">;
  year?: Year;
  url?: string;
  previewUrl?: string;
  repository?: string;
  summary?: string;
  capabilities: readonly string[];
  technologies: readonly string[];
  image?: ImageAsset;
  /** Close-up crops of the live product, shown overlapping the main visual. */
  details?: readonly ImageAsset[];
  caseStudy?: CaseStudy;
};

const screenshotPosition = "50% 0%";

const trmHomepage: ImageAsset = {
  src: trmHolidaysPreview,
  alt: "TRM Holidays homepage with flight, hotel and tour package search",
  position: screenshotPosition,
};

export const projects: readonly Project[] = [
  {
    slug: "sadira",
    name: "SADIRA",
    sector: "E-commerce",
    descriptor: "E-commerce · Fashion · Digital product",
    status: "live",
    url: "https://sadira-store.vercel.app/",
    summary:
      "Premium modest fashion e-commerce storefront for Bangladesh — an online shop with Abaya, Niqab, Scarf and Accessories categories, product search, a shopping bag, new arrivals and customer-care pages.",
    capabilities: ["E-commerce", "Product catalogue & search", "Shopping bag", "Responsive storefront"],
    technologies: ["Next.js", "Vercel"],
    image: {
      src: sadiraPreview,
      alt: "SADIRA homepage: a modest fashion hero with the headline Pretty. Modest. Powerful. and a Shop Now button",
      position: "50% 0%",
    },
    details: [
      {
        src: sadiraProducts,
        alt: "SADIRA product grid, Sadira Picks, with abaya, bag and watch product cards and prices",
      },
      {
        src: sadiraBag,
        alt: "SADIRA shopping bag drawer with an item, subtotal, View Bag and Checkout buttons",
      },
    ],
  },
  {
    slug: "trm-holidays",
    name: "TRM Holidays",
    sector: "Travel",
    descriptor: "Travel technology · Business website",
    status: "live",
    year: "2026",
    url: "https://trmholidays.com/",
    summary:
      "Travel website for a Bangladeshi agency, with search for flights, hotels and tour packages — domestic and international.",
    capabilities: ["Travel search interface", "Responsive experience", "SEO foundations"],
    technologies: ["HTML", "CSS", "JavaScript", "Swiper", "AOS"],
    image: trmHomepage,
    caseStudy: {
      status: "published",
      role: "Web development",
      projectType: "Travel agency website",
      overview:
        "TRM Holidays is a Bangladesh-based travel agency selling flights, hotels and tour packages, both domestic and international. The website brings those services together and gives visitors three direct routes in: search, browse tour packages, or contact the team.",
      approach:
        "A multi-page site with dedicated pages for flights, hotels and tours, an about page and a contact page, plus separate privacy, terms and cancellation policies. The homepage leads with search, and the tour catalogue is split into domestic and international collections, with a detail page for every package.",
      keyAreas: [
        {
          title: "Web development",
          detail:
            "Hand-built HTML, CSS and JavaScript across the core pages, with the tour catalogue driven by a dedicated data file and opened into per-package detail pages.",
        },
        {
          title: "Travel search interface",
          detail:
            "Tabbed search for flights, hotels and tour packages, with round-trip, one-way and multi-city options for flights.",
        },
        {
          title: "Responsive experience",
          detail:
            "Layouts that adapt from desktop to phone, with call, WhatsApp and Messenger shortcuts kept within reach.",
        },
        {
          title: "SEO foundations",
          detail:
            "Descriptive page titles and meta descriptions, a canonical URL, an Open Graph cover image, an XML sitemap and robots.txt.",
        },
      ],
      screens: [
        {
          image: trmHomepage,
          caption: "Homepage — search for flights, hotels and tour packages.",
          device: "desktop",
        },
        {
          image: {
            src: trmHolidaysTours,
            alt: "TRM Holidays tour packages page with region, trip type and budget filters",
          },
          caption: "Tour packages — domestic and international collections, trip types and a budget range.",
          device: "desktop",
        },
        {
          image: {
            src: trmHolidaysMobile,
            alt: "TRM Holidays homepage on a phone, showing the flight search",
          },
          caption: "Homepage on a phone.",
          device: "mobile",
        },
      ],
      outcome: "Live at trmholidays.com.",
    },
  },
  {
    slug: "fmz-trading",
    name: "FMZ Trading",
    client: "FM Trading F.Z.E",
    sector: "Interior solutions",
    descriptor: "Business website · Corporate digital presence",
    status: "launching-soon",
    year: "2026",
    previewUrl: "https://omaar-x.github.io/FMZ-Trading-Website-Main/",
    repository: "https://github.com/Omaar-X/FMZ-Trading-Website-Main",
    summary:
      "Website for FM Trading F.Z.E, an interior solutions business in Ajman, UAE, with service pages, a project gallery and downloadable product catalogues.",
    capabilities: [],
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    image: {
      src: fmzTradingPreview,
      alt: "FMZ Trading website homepage on its staging build",
      caption: "Staging build",
      position: screenshotPosition,
    },
  },
  {
    slug: "midtown-aabashon",
    name: "Midtown Aabashon Ltd.",
    client: "Midtown Aabashon Ltd.",
    sector: "Real estate",
    descriptor: "Real estate · Digital presence",
    status: "live",
    year: "2026",
    url: "https://midtownaabashonltd.com/",
    repository: "https://github.com/Omaar-X/Midtown-website",
    summary:
      "Real-estate corporate website with clear property positioning, project discovery, a responsive layout and high-intent contact paths.",
    capabilities: ["Web development", "Digital marketing", "Digital presence"],
    technologies: ["HTML", "CSS", "JavaScript"],
    image: {
      src: midtownPreview,
      alt: "Midtown Aabashon Ltd. homepage for the Purbachal South East Valley land project",
      position: screenshotPosition,
    },
    caseStudy: { status: "in-preparation" },
  },
  {
    slug: "trip-fly-bd",
    name: "Trip Fly BD",
    client: "Trip Fly BD",
    sector: "Travel",
    descriptor: "Travel services · Digital operations",
    status: "live",
    year: "2026",
    url: "https://www.tripflybd.com/",
    repository: "https://github.com/Omaar-X/Trip-Fly-BD",
    summary:
      "Travel agency website with clear service positioning, consultation calls to action and trust-focused design — built and maintained alongside the agency's travel operations.",
    capabilities: ["Web development", "Travel operations", "Digital operations"],
    technologies: ["HTML", "CSS", "JavaScript"],
    image: {
      src: tripFlyPreview,
      alt: "Trip Fly BD homepage in light mode, with ticket, hotel and visa checklist search",
      position: screenshotPosition,
    },
    caseStudy: { status: "in-preparation" },
  },
  {
    slug: "rover-consultancy",
    name: "Rover Consultancy",
    client: "Rover Consultancy Services",
    sector: "Travel & visa services",
    descriptor: "Travel & visa services · Business website",
    status: "live",
    year: "2026",
    url: "https://www.roverconsultancy.com/",
    repository: "https://github.com/Omaar-X/Rover-consultancy-website",
    summary:
      "Website for a Dhaka travel consultancy covering visa services by destination, air tickets, hotel booking and tour packages, with schema.org structured data.",
    capabilities: [],
    technologies: ["HTML", "CSS", "JavaScript", "JSON-LD structured data"],
    image: {
      src: roverPreview,
      alt: "Rover Consultancy Services homepage with visa search",
      position: screenshotPosition,
    },
  },
  {
    slug: "smart-attendance-system",
    name: "Smart Attendance System",
    client: "Trip Fly BD",
    sector: "Internal tool",
    descriptor: "Business automation · Internal tool",
    status: "live",
    year: "2026",
    url: "https://omaar-x.github.io/Tripfly-Smart-Attendance-System/",
    repository: "https://github.com/Omaar-X/Tripfly-Smart-Attendance-System",
    summary:
      "Browser-based attendance system for Trip Fly BD: rotating QR codes for check-in, GPS verification, admin and employee panels, and a Google Sheets back end through Google Apps Script.",
    capabilities: [],
    technologies: ["HTML", "CSS", "JavaScript", "Google Apps Script", "Google Sheets", "GitHub Pages"],
    image: {
      src: attendancePreview,
      alt: "Smart Attendance System sign-in screen with admin and employee roles",
      caption: "Sign-in screen",
      position: screenshotPosition,
    },
  },
];

function findProjects(slugs: readonly string[]) {
  return slugs.flatMap((slug) => {
    const project = projects.find((candidate) => candidate.slug === slug);
    return project ? [project] : [];
  });
}

export type PanelSurface = "white" | "plum" | "mauve";

export type FeaturedWork = {
  project: Project;
  surface: PanelSurface;
  badge: Status;
  context?: { label: string; value: string };
};

type FeaturedSelection = Omit<FeaturedWork, "project"> & { slug: string };

const tripFlyRole = experience.find((entry) => entry.id === "trip-fly-bd");

const featuredSelection: readonly FeaturedSelection[] = [
  { slug: "sadira", surface: "white", badge: "live" },
  {
    slug: "midtown-aabashon",
    surface: "plum",
    badge: "current",
    context: { label: "Current role", value: currentPosition.role },
  },
  { slug: "trm-holidays", surface: "mauve", badge: "live" },
  {
    slug: "trip-fly-bd",
    surface: "white",
    badge: "live",
    ...(tripFlyRole && {
      context: {
        label: "Role",
        value: `${tripFlyRole.role}, ${formatPeriod(tripFlyRole.period)}`,
      },
    }),
  },
];

export const featuredWork: readonly FeaturedWork[] = featuredSelection.flatMap(
  ({ slug, ...art }) => findProjects([slug]).map((project) => ({ project, ...art })),
);

export const moreWork: readonly Project[] = findProjects([
  "fmz-trading",
  "smart-attendance-system",
  "rover-consultancy",
]);

export type PublishedCaseStudy = { project: Project; caseStudy: CaseStudy };

export const publishedCaseStudies: readonly PublishedCaseStudy[] = [
  ...featuredWork.map(({ project }) => project),
  ...moreWork,
].flatMap((project) =>
  project.caseStudy?.status === "published" ? [{ project, caseStudy: project.caseStudy }] : [],
);

export function getPublishedCaseStudy(slug: string) {
  return publishedCaseStudies.find(({ project }) => project.slug === slug);
}

export function caseStudyHref(project: Project) {
  return project.caseStudy?.status === "published" ? caseStudyPath(project.slug) : undefined;
}
