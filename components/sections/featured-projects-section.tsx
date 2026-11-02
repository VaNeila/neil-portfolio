import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getVisibleProjects } from "@/lib/projects";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";
import { ProjectGrid } from "../projects/project-grid";

export function FeaturedProjectsSection() {
  return (
    <section id="work" tabIndex={-1} className="section work-section">
      <Container>
        <div className="section-header-row">
          <SectionHeading
            number="01"
            eyebrow="Selected work"
            title="A few things I’ve been building."
            description="From expressive websites to practical applications. A closer look at the work and the thinking behind it."
          />
          <Link href="/projects/" className="text-link">
            All projects <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <ProjectGrid
          projects={getVisibleProjects().filter((project) => project.featured)}
        />
      </Container>
    </section>
  );
}
