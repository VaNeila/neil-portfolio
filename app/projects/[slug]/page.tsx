import { notFound } from "next/navigation";
import { getVisibleProjects, getProject, getNextProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/metadata";
import { ProjectCaseStudy } from "@/components/projects/project-case-study";

export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const metadata = pageMetadata(
    project.title,
    project.summary,
    `/projects/${project.slug}/`,
  );
  if (project.socialImage) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [
        {
          url: project.socialImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    };
    metadata.twitter = { ...metadata.twitter, images: [project.socialImage] };
  }
  return metadata;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return (
    <ProjectCaseStudy project={project} next={getNextProject(project.slug)} />
  );
}
