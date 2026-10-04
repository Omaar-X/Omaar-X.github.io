/**
 * Skills, in the order the opening showcase presents them. The showcase draws one scene per skill
 * (plus a combined "create" scene) and also lists every skill name as real text.
 */

export type ShowcaseId =
  | "web"
  | "marketing"
  | "meta"
  | "google"
  | "ai-automation"
  | "video"
  | "photography"
  | "design"
  | "business"
  | "research";

/** A scene is a skill, or "create" (video + photography + design on one canvas). */
export type SceneId = ShowcaseId | "create";

export type StageId = "build" | "grow" | "automate" | "create" | "research";

export type ShowcaseSkill = {
  id: ShowcaseId;
  name: string;
  /** One short line shown beside the drawing. */
  description: string;
  /** Skills this scene stands for, shown as small text. */
  skills: readonly string[];
  stage: StageId;
};

export const showcaseSkills: readonly ShowcaseSkill[] = [
  {
    id: "web",
    name: "Web Development",
    description: "Responsive websites, platforms and internal tools.",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Next.js"],
    stage: "build",
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    description: "Search, social and brand presence working as one connected system.",
    skills: ["SEO", "Social Media Marketing", "Digital Presence"],
    stage: "grow",
  },
  {
    id: "meta",
    name: "Meta / Facebook Ads",
    description: "From the audience to the campaign to the creative, down to the landing page.",
    skills: ["Campaign Setup & Management"],
    stage: "grow",
  },
  {
    id: "google",
    name: "Google Ads",
    description: "From a search query to an ad to a landing page.",
    skills: ["Search", "Landing pages"],
    stage: "grow",
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    description: "AI-assisted workflows: input in, finished output out.",
    skills: ["Workflow Automation"],
    stage: "automate",
  },
  {
    id: "video",
    name: "Video Editing",
    description: "Short-form and promotional video, cut on layered tracks.",
    skills: ["Short-form", "Promotional"],
    stage: "create",
  },
  {
    id: "photography",
    name: "Photography",
    description: "Visual composition and image capture.",
    skills: ["Composition", "Focus"],
    stage: "create",
  },
  {
    id: "design",
    name: "Visual Design / Canva",
    description: "Layered editorial layouts and content design.",
    skills: ["Canva", "Content design"],
    stage: "create",
  },
  {
    id: "business",
    name: "Business Automation",
    description: "Manual tasks turned into simple, automated systems.",
    skills: ["Google Apps Script", "Google Sheets Automation", "Workflow Digitization"],
    stage: "automate",
  },
  {
    id: "research",
    name: "AI / Computer Vision Research",
    description: "Applied deep learning for medical imaging, with explainable AI.",
    skills: ["Python", "PyTorch", "Computer Vision", "Deep Learning", "Medical Imaging", "Explainable AI"],
    stage: "research",
  },
];

/** The five stages of the short pinned opening, and the scene each one shows. */
export const showcaseStages: readonly { id: StageId; label: string; scene: SceneId }[] = [
  { id: "build", label: "Build", scene: "web" },
  { id: "grow", label: "Grow", scene: "marketing" },
  { id: "automate", label: "Automate", scene: "ai-automation" },
  { id: "create", label: "Create", scene: "create" },
  { id: "research", label: "Research", scene: "research" },
];

/** What the automatic cycle shows before the visitor interacts. */
export const autoSequence: readonly ShowcaseId[] = [
  "web",
  "marketing",
  "ai-automation",
  "video",
  "photography",
  "research",
];

/** Copy for the combined "create" scene. */
export const createScene = {
  name: "Create",
  description: "Video, photography and visual design on one canvas, with the documents and data around them.",
  skills: ["Video Editing", "Photography", "Canva", "Microsoft Word", "Microsoft Excel", "Google Workspace"],
} as const;

/** Small supporting tools drawn at the foot of the "create" scene. */
export const supportingTools = [
  { id: "word", label: "Microsoft Word" },
  { id: "excel", label: "Microsoft Excel" },
  { id: "workspace", label: "Google Workspace" },
] as const;

/** One-line notes for the hover captions in the "create" scene. */
export const creativeNotes: Record<string, string> = {
  photography: "Visual composition & image capture",
  video: "Short-form and promotional video editing",
  canva: "Content design and visual composition",
  word: "Documents and structured writing",
  excel: "Structured data and operational worksheets",
  workspace: "Shared documents, sheets and collaboration",
};

/** The compact index shown later in the page, with no animation. */
export const toolsIndex = [
  {
    label: "Development",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "Next.js", "Responsive web development", "Accessible layouts"],
  },
  {
    label: "Marketing",
    items: [
      "Digital Marketing",
      "Meta / Facebook Ads",
      "Google Ads",
      "SEO",
      "Social Media Marketing",
      "Campaign Setup & Management",
      "Digital Presence",
    ],
  },
  {
    label: "Automation",
    items: [
      "AI Automation",
      "Workflow Automation",
      "Google Apps Script",
      "Google Sheets Automation",
      "Business Automation",
    ],
  },
  { label: "Creative", items: ["Video Editing", "Photography", "Canva"] },
  {
    label: "Research",
    items: [
      "Python",
      "PyTorch",
      "OpenCV",
      "scikit-learn",
      "Computer Vision",
      "Deep Learning",
      "Medical Imaging",
      "Classification",
      "Segmentation",
      "Explainable AI",
    ],
  },
  {
    label: "Tools",
    items: [
      "Microsoft Word",
      "Microsoft Excel",
      "Google Workspace",
      "Git",
      "GitHub",
      "GitHub Pages",
      "VS Code",
      "Overleaf",
      "Kaggle",
      "Sabre GDS",
    ],
  },
] as const;
