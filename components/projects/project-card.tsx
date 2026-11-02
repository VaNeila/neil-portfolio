import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { Badge } from "../ui/badge";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const lead = project.images.find((image) => image.approved);
  return (
    <article className="project-card">
      <div className="project-image-link">
        {lead ? (
          <div className="project-image-frame">
            <Image
              src={lead.src}
              alt={lead.alt}
              width={lead.width}
              height={lead.height}
              sizes="(min-width: 1024px) 570px, (min-width: 768px) 45vw, 92vw"
            />
            {lead.kind === "illustration" && (
              <span className="visual-caption">Illustration</span>
            )}
          </div>
        ) : (
          <ProjectVisual variant={project.cover} />
        )}
      </div>
      <div className="project-card-body">
        <div className="project-meta">
          <span>{project.category} project</span>
          <span className="project-index">0{index + 1}</span>
        </div>
        <h3>
          <Link href={`/projects/${project.slug}/`}>
            {project.title}
            <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        </h3>
        <p>{project.summary}</p>
        <ul className="badge-list" aria-label="Technologies">
          {project.technologies.slice(0, 4).map((technology) => (
            <li key={technology}>
              <Badge>{technology}</Badge>
            </li>
          ))}
        </ul>
        <Link
          href={`/projects/${project.slug}/`}
          className="text-link project-detail-link"
        >
          Explore project <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only">: {project.title}</span>
        </Link>
        {(project.liveUrl || project.repositoryUrl) && (
          <div className="project-external-links">
            {project.liveUrl && (
              <a href={project.liveUrl}>
                Live demo <span className="sr-only">of {project.title}</span>
              </a>
            )}
            {project.repositoryUrl && (
              <a href={project.repositoryUrl}>
                Repository <span className="sr-only">for {project.title}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
