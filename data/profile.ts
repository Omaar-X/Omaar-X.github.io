import portrait from "@/assets/images/profile/omar-faruk-portrait.webp";
import { currentPosition } from "./experience";
import { socials, type SocialLink } from "./socials";
import type { ImageAsset, Organization, YearMonth } from "./types";

export type CvDocument = {
  label: string;
  description: string;
  href: `/cv/${string}.pdf`;
  fileName: string;
  updated: YearMonth;
};

export type AboutContent = {
  heading: string;
  introduction: string;
  paragraphs: readonly string[];
  currentFocus: readonly { label: string; detail: string }[];
};

export type Discipline = {
  title: string;
  focus: string;
};

export type PortraitAsset = ImageAsset & {
  framing: "circle-cutout" | "photograph";
};

export type Profile = {
  name: string;
  shortName: string;
  initials: string;
  disciplines: readonly Discipline[];
  /** The roles shown next to the name in the hero, and the one-line positioning. */
  heroRoles: readonly string[];
  /** Three-beat line above the name in the hero. */
  heroTagline: string;
  /** The promise, used as the About heading. `accent` is set in the accent colour. */
  heroStatement: { lead: string; accent: string; tail: string };
  heroSummary: string;
  positioning: readonly string[];
  professionalTitles: readonly string[];
  headline: readonly string[];
  introduction: string;
  currentRole: string;
  currentCompany: Organization;
  focusAreas: readonly string[];
  location: { city: string; country: string; countryCode: string };
  email: string;
  phone: { display: string; e164: string; whatsapp: string };
  availability: string | null;
  bio: string;
  languages: readonly { name: string; proficiency: string }[];
  interests: readonly string[];
  portrait: PortraitAsset;
  about: AboutContent;
  socials: readonly SocialLink[];
  cv: {
    general: CvDocument;
    webDigital: CvDocument;
    research: CvDocument;
  };
};

const disciplines: readonly Discipline[] = [
  { title: "Web Developer", focus: "Business websites, web apps and internal tools" },
  { title: "Digital Marketer", focus: "SEO, content and digital growth" },
  { title: "AI / Computer Vision Researcher", focus: "Brain MRI classification and segmentation" },
];

export const profile: Profile = {
  name: "Omar Faruk",
  shortName: "Omar",
  initials: "OF",
  disciplines,
  heroRoles: ["Web Developer", "Digital Marketer", "Creative Technologist"],
  heroTagline: "Web. Growth. AI.",
  heroStatement: { lead: "I build digital products that help businesses ", accent: "grow", tail: "." },
  heroSummary:
    "Web developer and digital marketer in Dhaka. I take businesses from first layout to a live site, then grow it with SEO, ads and automation, backed by applied AI research.",
  positioning: ["Development", "Digital growth", "Automation", "Creative production", "AI research"],
  professionalTitles: disciplines.map((discipline) => discipline.title),
  headline: ["Building digital products,", "growing brands &", "exploring intelligent systems."],
  introduction:
    "Web developer, digital marketer and AI researcher creating useful digital experiences across technology, business and intelligent systems.",
  currentRole: currentPosition.role,
  currentCompany: currentPosition.organization,
  focusAreas: [
    "Web Development",
    "Digital Products",
    "Digital Marketing",
    "SEO",
    "Business Automation",
    "AI / Computer Vision Research",
    "Academic Research",
  ],
  location: { city: "Dhaka", country: "Bangladesh", countryCode: "BD" },
  email: "umor2026@gmail.com",
  phone: {
    display: "+880 1705-182933",
    e164: "+8801705182933",
    whatsapp: "https://wa.me/8801705182933",
  },
  availability: null,
  bio: "I build websites and digital products for real businesses, grow them through SEO and automation, and research explainable deep learning for brain tumor MRI.",
  languages: [
    { name: "Bangla", proficiency: "Native" },
    { name: "English", proficiency: "Professional working proficiency" },
  ],
  interests: ["Cooking", "Cricket", "Football", "Video editing", "Photography"],
  portrait: {
    src: portrait,
    alt: "Omar Faruk in a dark suit and white shirt",
    position: "50% 30%",
    framing: "circle-cutout",
  },
  about: {
    heading: "Building at the intersection of technology, business & intelligent systems.",
    introduction:
      "A computer science graduate working across web development, digital marketing, business systems and applied AI research.",
    paragraphs: [
      "I’m a Computer Science & Engineering graduate who works across web development, digital marketing and applied AI research. My work ranges from commercial websites and digital operations to internal business tools and computer-vision research.",
      "Today I work as a Web Developer & Digital Marketer at Midtown Aabashon Ltd., combining website work with digital marketing and brand-focused online execution.",
      "Before that, at Trip Fly BD, I combined travel operations — ticketing and bookings — with website and internal-tool work. That is where the Smart Attendance System came from.",
      "My recent academic work is TumorMultiNet, a brain MRI classification, segmentation and explainable-AI framework, completed as a group capstone thesis at BUBT, with a related paper accepted (IEEE).",
    ],
    currentFocus: [
      { label: "Web development", detail: "Business websites and digital platforms" },
      { label: "Digital marketing", detail: "SEO, content and digital presence" },
      { label: "Business automation", detail: "Internal tools and workflow digitization" },
      { label: "AI / computer vision research", detail: "Brain MRI classification and segmentation" },
    ],
  },
  socials,
  cv: {
    general: {
      label: "CV",
      description: "General professional CV",
      href: "/cv/Omar-Faruk-General-CV.pdf",
      fileName: "Omar-Faruk-General-CV.pdf",
      updated: "2026-10",
    },
    webDigital: {
      label: "Web & Digital CV",
      description: "Web development, digital marketing and business systems roles",
      href: "/cv/Omar-Faruk-Web-Digital-CV.pdf",
      fileName: "Omar-Faruk-Web-Digital-CV.pdf",
      updated: "2026-10",
    },
    research: {
      label: "Research CV",
      description: "Research, academic and Master's applications",
      href: "/cv/Omar-Faruk-Research-CV.pdf",
      fileName: "Omar-Faruk-Research-CV.pdf",
      updated: "2026-10",
    },
  },
};
