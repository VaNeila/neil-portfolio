import { projects } from "../data/projects";
import { isReviewBuild } from "../data/site";

export const getPublishedProjects = () =>
  projects.filter((project) => project.publicationStatus === "published");

export function getVisibleProjects(review = isReviewBuild) {
  return projects.filter(
    (project) =>
      project.publicationStatus === "published" ||
      (review && project.reviewable),
  );
}

export const getProject = (slug: string) =>
  getVisibleProjects().find((project) => project.slug === slug);

export function getNextProject(slug: string) {
  const visible = getVisibleProjects();
  if (visible.length < 2) return undefined;
  return visible[
    (visible.findIndex((project) => project.slug === slug) + 1) % visible.length
  ];
}
