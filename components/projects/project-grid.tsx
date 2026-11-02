import type { Project } from "@/types/content";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div
      className={`project-grid ${projects.length >= 3 ? "project-grid-three" : ""}`}
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
