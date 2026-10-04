import type { Year, YearMonth } from "./types";

export type Education = {
  id: string;
  level: "degree" | "secondary";
  qualification: string;
  institution: string;
  location?: string;
  status: "completed";
  completed: Year | YearMonth;
  result: string;
  coursework?: readonly string[];
  capstoneResearchId?: string;
};

export type Activity = {
  id: string;
  title: string;
  role: string;
  year?: Year;
};

export const education: readonly Education[] = [
  {
    id: "bsc-cse",
    level: "degree",
    qualification: "B.Sc. in Computer Science & Engineering",
    institution: "Bangladesh University of Business and Technology (BUBT)",
    location: "Dhaka, Bangladesh",
    status: "completed",
    completed: "2026-07",
    result: "CGPA 3.24 / 4.00",
    coursework: [
      "Data structures and algorithms",
      "Object-oriented programming",
      "Database systems",
      "Software engineering",
      "Computer networks",
      "Web technologies",
    ],
    capstoneResearchId: "tumormultinet",
  },
  {
    id: "hsc",
    level: "secondary",
    qualification: "Higher Secondary Certificate (Science)",
    institution: "Kharrah Adarsha Degree Honours College",
    status: "completed",
    completed: "2021",
    result: "GPA 4.58 / 5.00",
  },
  {
    id: "ssc",
    level: "secondary",
    qualification: "Secondary School Certificate (Science)",
    institution: "Churain Tarini Bama High School",
    status: "completed",
    completed: "2019",
    result: "GPA 4.17 / 5.00",
  },
];

export const activities: readonly Activity[] = [
  { id: "bubt-icpc-2025", title: "BUBT ICPC 2025", role: "Contest participant", year: "2025" },
  { id: "biupc", title: "BIUPC Programming Contest", role: "Contest participant" },
  { id: "bubt-innovtex", title: "BUBT Innovtex Hackathon", role: "Event volunteer" },
];
