import { profile } from "@/data/profile";

function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/+$/, "");

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  return "https://omaar-x.github.io";
}

export const copyrightYear = new Date().getFullYear();

export const siteConfig = {
  url: resolveSiteUrl(),
  name: profile.name,
  locale: "en_US",
  title: `${profile.name} — Web Developer, Digital Marketer & AI Researcher`,
  description: `Web developer and digital marketer at ${profile.currentCompany.name}, ${profile.location.city} — building websites and digital products, and researching explainable AI for brain MRI.`,
};

/** Mirrors styles/tokens.css for contexts that cannot read CSS variables (viewport, OG images, icons). */
/** Social card, a static file in public/ so it exports as a plain, extension-ful URL. */
export const ogImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: `${profile.name} — ${profile.professionalTitles.join(", ")}`,
} as const;

export const brandColors = {
  background: "#f7f4fc",
  foreground: "#19171d",
  muted: "#6f6878",
  subtle: "#665f70",
  accent: "#78609a",
  mauve: "#b9a7c9",
} as const;
