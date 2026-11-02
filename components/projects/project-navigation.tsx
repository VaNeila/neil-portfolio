import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { Container } from "../ui/container";

export function ProjectNavigation({ next }: { next?: Project }) {
  return (
    <nav className="case-navigation" aria-label="Project navigation">
      <Container className="case-navigation-inner">
        <Link href="/projects/" className="text-link">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to all projects
        </Link>
        {next && (
          <Link href={`/projects/${next.slug}/`} className="next-project">
            <div>
              <span className="small-label">NEXT PROJECT</span>
              <span className="next-title">{next.title}</span>
            </div>
            <ArrowUpRight size={24} aria-hidden="true" />
          </Link>
        )}
      </Container>
    </nav>
  );
}
