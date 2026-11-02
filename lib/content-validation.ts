import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import type { Project } from "../types/content";
import { site } from "../data/site";

function publicFile(path: string) {
  if (!path.startsWith("/") || path.includes("..")) return undefined;
  const file = resolve("public", `.${path}`);
  return existsSync(file) ? file : undefined;
}

export function isPublicHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !/^(localhost|127\.|0\.|\[::1\])/.test(url.hostname) &&
      !/(^|\.)(example\.(com|org|net)|invalid|test|localhost)$/.test(
        url.hostname,
      )
    );
  } catch {
    return false;
  }
}

export function validateProjects(projects: Project[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const project of projects) {
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) ||
      seen.has(project.slug)
    )
      errors.push(`Invalid or duplicate slug: ${project.slug}`);
    seen.add(project.slug);
    for (const key of ["liveUrl", "repositoryUrl"] as const) {
      if (project[key] && !isPublicHttpsUrl(project[key]))
        errors.push(`${project.slug}: invalid ${key}`);
    }
    if (project.publicationStatus !== "published") continue;
    if (!project.narrativeApproved)
      errors.push(`${project.slug}: narrative approval required`);
    for (const key of [
      "title",
      "summary",
      "overview",
      "role",
      "problem",
    ] as const) {
      if (!project[key].trim()) errors.push(`${project.slug}: ${key} required`);
    }
    for (const key of [
      "technologies",
      "responsibilities",
      "approach",
    ] as const) {
      if (!project[key].length || project[key].some((item) => !item.trim()))
        errors.push(`${project.slug}: ${key} required`);
    }
    if (
      !project.images.length ||
      project.images.some((image) => !image.approved)
    )
      errors.push(`${project.slug}: approved imagery required`);
    for (const image of project.images) {
      if (!image.alt.trim() || image.width <= 0 || image.height <= 0)
        errors.push(`${project.slug}: invalid image metadata`);
      if (
        !image.src.startsWith(`/images/projects/${project.slug}/`) ||
        !image.src.endsWith(".webp")
      )
        errors.push(`${project.slug}: image must be a local project WebP`);
      if (image.kind === "illustration" && !image.caption)
        errors.push(`${project.slug}: illustration caption required`);
      if (!publicFile(image.src))
        errors.push(`${project.slug}: missing ${image.src}`);
      for (const width of [480, 768, 1200, 1600]) {
        if (
          !image.variants.includes(width) ||
          !publicFile(image.src.replace(/\.webp$/, `-${width}.webp`))
        )
          errors.push(`${project.slug}: missing ${width}px variant`);
      }
    }
    if (project.socialImage && !publicFile(project.socialImage))
      errors.push(`${project.slug}: missing social image`);
  }
  return errors;
}

export function releaseReadiness(
  projects: Project[],
  config: typeof site = site,
): string[] {
  const errors = validateProjects(projects);
  const mediaDirectory = "public/images/projects";
  if (existsSync(mediaDirectory)) {
    const allowed = new Set(
      projects
        .filter((project) => project.publicationStatus === "published")
        .flatMap((project) =>
          project.images
            .filter((image) => image.approved)
            .flatMap((image) => [
              image.src,
              ...image.variants.map((width) =>
                image.src.replace(/\.webp$/, `-${width}.webp`),
              ),
            ]),
        ),
    );
    for (const entry of readdirSync(mediaDirectory, {
      recursive: true,
      withFileTypes: true,
    })) {
      if (entry.isDirectory()) continue;
      const path = resolve(entry.parentPath, entry.name)
        .slice(resolve("public").length)
        .replaceAll("\\", "/");
      if (entry.isSymbolicLink() || !allowed.has(path))
        errors.push(`Unapproved or unreferenced public project asset: ${path}`);
    }
  }
  if (!config.origin || !isPublicHttpsUrl(config.origin))
    errors.push("Set the real HTTPS production origin in data/site.ts.");
  if (
    !config.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email) ||
    /example\.(com|org|net)$/.test(config.email)
  )
    errors.push("Supply a verified professional email.");
  if (
    !config.github ||
    !isPublicHttpsUrl(config.github) ||
    !/^https:\/\/github\.com\/[a-zA-Z0-9-]+\/?$/.test(config.github)
  )
    errors.push("Supply a verified GitHub profile URL.");
  if (
    config.linkedin &&
    (!isPublicHttpsUrl(config.linkedin) ||
      new URL(config.linkedin).hostname !== "www.linkedin.com")
  )
    errors.push("Verify the LinkedIn URL.");
  const resume = config.resume ? publicFile(config.resume) : undefined;
  if (!resume || readFileSync(resume).subarray(0, 5).toString() !== "%PDF-")
    errors.push("Supply an approved résumé PDF and set site.resume.");
  if (
    projects.filter(
      (project) =>
        project.publicationStatus === "published" &&
        project.category === "independent",
    ).length < 2
  )
    errors.push(
      "Approve and publish the two independent case studies before launch.",
    );
  return errors;
}
