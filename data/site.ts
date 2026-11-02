// Replace nulls with owner-verified information. Never substitute working-looking links.
export const site = {
  name: "Neil Tristan A. Atienza",
  shortName: "Neil Atienza",
  role: "Full-Stack Web Developer",
  description:
    "Neil Tristan A. Atienza is a full-stack web developer working with React, Next.js, and Laravel to build thoughtful websites and reliable web applications.",
  origin: null as string | null,
  email: null as string | null,
  github: null as string | null,
  linkedin: null as string | null,
  resume: null as string | null,
};

// A normal local/preview build is review-only. Production deployment is gated separately.
export const isReviewBuild =
  process.env.CONTEXT !== "production" && process.env.PORTFOLIO_RELEASE !== "1";

export const navigation = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const services = [
  {
    number: "01",
    title: "Websites with purpose",
    description:
      "Responsive websites and interactive digital invitations, built around the people who will use them.",
    detail: "Websites · Digital invitations · Responsive interfaces",
    icon: "window",
  },
  {
    number: "02",
    title: "Applications that work",
    description:
      "Custom full-stack web applications that connect clear user experiences with dependable backend functionality.",
    detail: "Business applications · Frontend & backend development",
    icon: "layers",
  },
  {
    number: "03",
    title: "Better connected systems",
    description:
      "Backend APIs, database integration, and improvements to existing websites and application workflows.",
    detail: "REST APIs · Database integration · Website improvements",
    icon: "workflow",
  },
] as const;
