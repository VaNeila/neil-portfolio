export type ProjectCategory = "professional" | "independent" | "academic";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  kind: "screenshot" | "illustration";
  approved: boolean;
  variants: number[];
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  overview: string;
  role: string;
  timeline?: string;
  technologies: string[];
  problem: string;
  responsibilities: string[];
  approach: string[];
  features: string[];
  challenges?: { challenge: string; solution: string }[];
  outcomes?: string[];
  images: ProjectImage[];
  liveUrl?: string;
  repositoryUrl?: string;
  featured: boolean;
  publicationStatus: "draft" | "published";
  narrativeApproved: boolean;
  reviewable: boolean;
  cover: "invitation" | "gate" | "enterprise";
  socialImage?: string;
}

export interface Experience {
  organization: string;
  role: string;
  dates?: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}
