import type { StaticImageData } from "next/image";

export type Status =
  | "live"
  | "current"
  | "accepted"
  | "submitted"
  | "launching-soon"
  | "case-study"
  | "research";

export type Year = `${number}`;
export type YearMonth = `${number}-${number}`;

export type Period = {
  start?: YearMonth;
  end?: YearMonth | "present";
};

export type ImageAsset = {
  src: StaticImageData;
  alt: string;
  caption?: string;
  position?: string;
};

export type Organization = {
  name: string;
  url?: string;
  location?: string;
};
