export const skillGroups = [
  {
    number: "01",
    title: "Frontend",
    description: "Interfaces people enjoy using.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    number: "02",
    title: "Backend",
    description: "The logic behind the experience.",
    skills: ["PHP", "Laravel", "REST APIs", "Authentication", "Authorization"],
  },
  {
    number: "03",
    title: "Databases",
    description: "Structured, connected information.",
    skills: ["MySQL", "Microsoft SQL Server", "Supabase", "TiDB Cloud"],
  },
  {
    number: "04",
    title: "Deployment & tools",
    description: "From local development to delivery.",
    skills: [
      "Vercel",
      "Microsoft IIS",
      "Docker",
      "Git / GitHub",
      "Linux / Ubuntu",
      "WSL2",
      "Laravel Herd",
    ],
  },
] as const;
