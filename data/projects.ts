import type { Project } from "../types/content";

// These are review drafts based solely on the supplied brief. ADULive is never
// included in review exports. Public publication needs explicit content approval.
export const projects: Project[] = [
  {
    slug: "adulive-university-systems",
    title: "ADULive University Systems",
    category: "professional",
    summary:
      "Contributions to university web applications and system modernization.",
    overview:
      "Full-stack development work on university applications using React, Laravel, REST APIs, and relational databases.",
    role: "Full-Stack Web Developer · contributor",
    technologies: [
      "React",
      "Laravel",
      "MySQL",
      "Microsoft SQL Server",
      "REST APIs",
      "IIS",
    ],
    problem:
      "Support existing university workflows and modernization initiatives.",
    responsibilities: [
      "Contribute to application modules and API integration.",
      "Work with database operations, permissions, and authentication functionality.",
    ],
    approach: ["Work within existing application and hosting environments."],
    features: [],
    images: [],
    featured: true,
    publicationStatus: "draft",
    narrativeApproved: false,
    reviewable: false,
    cover: "enterprise",
  },
  {
    slug: "interactive-digital-invitations",
    title: "Interactive digital invitations",
    category: "independent",
    summary:
      "Turning a special occasion into a thoughtful, interactive web experience.",
    overview:
      "A collection of web-based invitations that brings together responsive design and interactive experiences. This work connects my interest in visual design with modern frontend development.",
    role: "Independent developer",
    technologies: ["React", "Next.js", "TypeScript", "Vercel"],
    problem:
      "Give an occasion a welcoming digital home that feels personal and remains easy to use across phones, tablets, and desktops.",
    responsibilities: [
      "Develop responsive invitation websites using React and Next.js.",
      "Create visually engaging interfaces and interactive page sections.",
      "Work with cloud database integration and deployment where required by each project.",
    ],
    approach: [
      "Build the page around a clear reading order, with typography and spacing that adapt to the screen.",
      "Use modern React and Next.js tooling for the frontend and Vercel for deployment.",
      "Use Supabase or TiDB Cloud where implemented; the database choice belongs to the individual invitation, rather than every project in the collection.",
    ],
    features: ["Responsive page layouts", "Interactive invitation experiences"],
    images: [],
    featured: true,
    publicationStatus: "draft",
    narrativeApproved: false,
    reviewable: true,
    cover: "invitation",
  },
  {
    slug: "gate-management-system",
    title: "Gate management system",
    category: "independent",
    summary:
      "A full-stack application designed around clearer visitor and gate workflows.",
    overview:
      "An independent React and Laravel project designed for visitor registration and gate management. The application brings frontend workflows, backend APIs, and relational data together around a practical operational use case.",
    role: "Independent full-stack developer",
    technologies: ["React", "Laravel", "MySQL", "REST APIs"],
    problem:
      "Design a clear way to register visitors and record movement across gates while keeping related information organized.",
    responsibilities: [
      "Develop the project as an independent full-stack application.",
      "Connect React interfaces with Laravel REST APIs and MySQL data.",
      "Design workflows around visitor information and gate activity.",
    ],
    approach: [
      "Separate the React user interface from the Laravel API and database layer.",
      "Organize the application around visitor registration and gate management workflows.",
      "Treat photo and identification information as sensitive and exclude real visitor data from portfolio demonstrations.",
    ],
    // These describe intended scope, not a claim of completed functionality.
    features: [],
    images: [],
    featured: true,
    publicationStatus: "draft",
    narrativeApproved: false,
    reviewable: true,
    cover: "gate",
  },
];
