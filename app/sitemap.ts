import type { MetadataRoute } from "next";
import { isReviewBuild, site } from "@/data/site";
import { getPublishedProjects } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isReviewBuild || !site.origin) return [];
  return [
    "/",
    "/projects/",
    ...getPublishedProjects().map((project) => `/projects/${project.slug}/`),
  ].map((path) => ({ url: new URL(path, site.origin!).href }));
}
