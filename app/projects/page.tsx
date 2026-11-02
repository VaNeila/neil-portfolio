import { Container } from "@/components/ui/container";
import { ProjectGrid } from "@/components/projects/project-grid";
import { getVisibleProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Selected projects",
  "Explore Neil Atienza’s independent web development projects, from interactive digital invitations to full-stack applications.",
  "/projects/",
);

export default function Projects() {
  return (
    <>
      <header className="page-heading">
        <Container>
          <p className="eyebrow">
            <span className="accent-dash" />
            The work
          </p>
          <h1>Ideas, brought to the web.</h1>
          <p>
            A selection of independent projects exploring thoughtful interfaces,
            practical workflows, and the systems behind them.
          </p>
        </Container>
      </header>
      <section className="archive-section" aria-label="Project archive">
        <Container>
          <ProjectGrid projects={getVisibleProjects()} />
        </Container>
      </section>
    </>
  );
}
