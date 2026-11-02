import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { Container } from "../ui/container";
import { Badge } from "../ui/badge";
import { ProjectVisual } from "./project-visual";
import { ProjectGallery } from "./project-gallery";
import { ProjectNavigation } from "./project-navigation";

function CaseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="case-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function ProjectCaseStudy({
  project,
  next,
}: {
  project: Project;
  next?: Project;
}) {
  const lead = project.images.find((image) => image.approved);
  return (
    <article>
      <header className="page-heading case-header">
        <Container>
          <Link className="breadcrumb" href="/projects/">
            <ArrowLeft size={15} aria-hidden="true" />
            All projects
          </Link>
          <p className="eyebrow">
            <span className="accent-dash" />
            {project.category} project
          </p>
          <h1>{project.title}</h1>
          <p>{project.overview}</p>
          <dl className="case-facts">
            <div>
              <dt>My role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Built with</dt>
              <dd>
                <ul className="badge-list">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            {project.timeline && (
              <div>
                <dt>Timeline</dt>
                <dd>{project.timeline}</dd>
              </div>
            )}
          </dl>
          {(project.liveUrl || project.repositoryUrl) && (
            <div className="hero-actions">
              {project.liveUrl && (
                <a className="text-link" href={project.liveUrl}>
                  Live demo <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              {project.repositoryUrl && (
                <a className="text-link" href={project.repositoryUrl}>
                  View repository <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </Container>
      </header>
      <Container className="case-cover">
        <figure>
          {lead ? (
            <Image
              src={lead.src}
              alt={lead.alt}
              width={lead.width}
              height={lead.height}
              sizes="(min-width: 1200px) 1160px, 94vw"
              loading="eager"
            />
          ) : (
            <ProjectVisual variant={project.cover} />
          )}
          <figcaption>
            {lead
              ? lead.kind === "illustration"
                ? `Illustration — ${lead.caption ?? "not a product screenshot"}`
                : lead.caption
              : "Concept illustration for this portfolio. Not a screenshot of the application."}
          </figcaption>
        </figure>
      </Container>
      <div className="case-body">
        <CaseSection title="The objective">
          <p>{project.problem}</p>
        </CaseSection>
        <CaseSection title="My contribution">
          <ul>
            {project.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseSection>
        <CaseSection title="The technical approach">
          <ul>
            {project.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseSection>
        {project.features.length > 0 && (
          <CaseSection title="Key features">
            <ul>
              {project.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseSection>
        )}
        {project.challenges?.length ? (
          <CaseSection title="Challenges & solutions">
            {project.challenges.map((item) => (
              <div key={item.challenge}>
                <h3>{item.challenge}</h3>
                <p>{item.solution}</p>
              </div>
            ))}
          </CaseSection>
        ) : null}
        {project.outcomes?.length ? (
          <CaseSection title="Results & lessons">
            <ul>
              {project.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseSection>
        ) : null}
        <ProjectGallery
          images={project.images.filter((image) => image !== lead)}
        />
      </div>
      <ProjectNavigation next={next} />
    </article>
  );
}
