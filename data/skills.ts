/**
 * Skills: the ten disciplines, grouped into the five stages of the "How I work" section.
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

/** The five stages, in order. `scene` is the skill that leads each stage. */
export const showcaseStages: readonly { id: StageId; label: string; scene: SceneId }[] = [
  { id: "build", label: "Build", scene: "web" },
  { id: "grow", label: "Grow", scene: "marketing" },
  { id: "automate", label: "Automate", scene: "ai-automation" },
  { id: "create", label: "Create", scene: "create" },
  { id: "research", label: "Research", scene: "research" },
];

/** The compact tools index in About. */
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

/** The five "How I work" cards: one per stage, with the skills it covers as tags. */
export type SkillGroup = {
  id: StageId;
  kicker: string;
  title: string;
  description: string;
  tags: readonly string[];
};

const stageCopy: Record<StageId, Omit<SkillGroup, "id" | "tags">> = {
  build: {
    kicker: "Building the product",
    title: "Web Development",
    description:
      "Responsive business websites, storefronts and internal tools, hand-built and taken from the first layout to a live, maintained site.",
  },
  grow: {
    kicker: "Bringing people in",
    title: "Digital Marketing",
    description:
      "SEO, social and paid campaigns on Meta and Google, working as one system that leads from a search or an ad to the right landing page.",
  },
  automate: {
    kicker: "Removing the busywork",
    title: "Automation",
    description:
      "Manual tasks turned into simple systems: Google Apps Script and Sheets back ends, AI-assisted workflows and digitised paperwork.",
  },
  create: {
    kicker: "Making the content",
    title: "Creative Production",
    description:
      "Short-form and promotional video, photography and visual design in Canva, so a brand has something worth showing.",
  },
  research: {
    kicker: "Thinking ahead",
    title: "AI Research",
    description:
      "Applied deep learning and computer vision for medical imaging, with explainable AI so a model's decisions can be checked.",
  },
};

export const skillGroups: readonly SkillGroup[] = showcaseStages.map(({ id }) => {
  const members = showcaseSkills.filter((skill) => skill.stage === id);
  const names = members.length > 1 ? members.map((skill) => skill.name) : [];
  const tags = [...new Set([...names, ...members.flatMap((skill) => skill.skills)])];
  return { id, ...stageCopy[id], tags: tags.slice(0, 6) };
});
