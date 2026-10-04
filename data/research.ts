import type { Status, Year } from "./types";

export type ResearchType = "thesis" | "paper";
export type ResearchStatus = Extract<Status, "accepted" | "submitted" | "research">;

export type DatasetInfo = {
  name: string;
  modality?: string;
  slices?: number;
  classes?: readonly string[];
  pixelMasks?: number;
};

export type ExternalValidation = {
  name: string;
  slices?: number;
  patients?: number;
  note?: string;
};

export type ModelStage = {
  stage: "input" | "classification" | "segmentation" | "explainability";
  label: string;
  models: readonly string[];
  produces?: string;
};

export type ResearchItem = {
  id: string;
  type: ResearchType;
  title: string;
  shortTitle: string;
  status: ResearchStatus;
  institution?: string;
  publisher?: string;
  venue?: string;
  year?: Year;
  context?: string;
  summary: string;
  researchAreas: readonly string[];
  stages?: readonly ModelStage[];
  dataset?: DatasetInfo;
  externalValidation?: ExternalValidation;
  outputs?: readonly string[];
  notice?: string;
  relatedResearch?: string;
  link?: string;
  pdf?: string;
  featured: boolean;
};

const tumorMultiNetTitle =
  "TumorMultiNet: A Statistically Validated Hybrid Deep Learning Framework for Brain Tumor MRI Classification and Segmentation on BRISC2025 with Explainable AI";

const tumorMultiNetThesis: ResearchItem = {
  id: "tumormultinet",
  type: "thesis",
  title: tumorMultiNetTitle,
  shortTitle: "TumorMultiNet",
  status: "research",
  institution: "Bangladesh University of Business and Technology (BUBT)",
  year: "2026",
  context: "Group capstone thesis · B.Sc. in Computer Science & Engineering",
  summary:
    "A two-branch hybrid framework for brain tumor MRI. One branch classifies the slice, the other segments the tumor, and Grad-CAM shows which regions drove the classifier’s prediction. Each branch combines two complementary models, and a second, external cohort is used to test how well the results transfer.",
  researchAreas: [
    "Deep learning",
    "Computer vision",
    "Medical imaging",
    "Image classification",
    "Segmentation",
    "Explainable AI",
  ],
  stages: [
    {
      stage: "input",
      label: "Input MRI",
      models: ["T1-weighted brain MRI slice"],
    },
    {
      stage: "classification",
      label: "Classification",
      models: ["EfficientNet-B0", "DenseNet121"],
      produces: "Four-class prediction",
    },
    {
      stage: "segmentation",
      label: "Segmentation",
      models: ["SegFormer", "DeepLabV3+"],
      produces: "Tumor mask and overlay",
    },
    {
      stage: "explainability",
      label: "Explainability",
      models: ["Grad-CAM"],
      produces: "Attention map over the slice",
    },
  ],
  dataset: {
    name: "BRISC2025",
    modality: "T1-weighted",
    slices: 6000,
    classes: ["Glioma", "Meningioma", "Pituitary", "No tumor"],
    pixelMasks: 4793,
  },
  externalValidation: { name: "Cheng cohort", slices: 3064, patients: 233 },
  outputs: ["Class prediction", "Tumor segmentation mask", "Grad-CAM explanation"],
  notice: "A research prototype, not a clinical tool.",
  featured: true,
};

const tumorMultiNetPaper: ResearchItem = {
  id: "tumormultinet-paper",
  type: "paper",
  title: tumorMultiNetTitle,
  shortTitle: "TumorMultiNet",
  status: "accepted",
  publisher: "IEEE",
  summary:
    "Hybrid deep learning framework for brain tumor MRI classification and segmentation, statistically validated on the BRISC2025 dataset, with explainable-AI interpretation of model decisions.",
  researchAreas: ["Medical imaging", "Deep learning", "Explainable AI"],
  relatedResearch: "tumormultinet",
  featured: true,
};

const smartFirstAidBox: ResearchItem = {
  id: "smart-first-aid-box",
  type: "paper",
  title: "Smart First Aid Box",
  shortTitle: "Smart First Aid Box",
  status: "submitted",
  venue: "ICCIT",
  summary:
    "IoT-based first aid system for automated supply monitoring and emergency response support.",
  researchAreas: ["Internet of Things"],
  featured: true,
};

const researchItems: readonly ResearchItem[] = [
  tumorMultiNetThesis,
  tumorMultiNetPaper,
  smartFirstAidBox,
];

export const thesis = tumorMultiNetThesis;

export const publications: readonly ResearchItem[] = researchItems.filter(
  (item) => item.type === "paper",
);
