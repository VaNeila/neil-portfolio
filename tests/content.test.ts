import { test } from "node:test";
import assert from "node:assert/strict";
import { projects } from "../data/projects";
import { site } from "../data/site";
import { getPublishedProjects, getVisibleProjects } from "../lib/projects";
import {
  validateProjects,
  releaseReadiness,
  isPublicHttpsUrl,
} from "../lib/content-validation";

test("content has unique safe slugs and valid optional links", () => {
  assert.deepEqual(validateProjects(projects), []);
});
test("institutional draft is not reviewable or publicly published", () => {
  assert.equal(
    projects.find((project) => project.slug === "adulive-university-systems")
      ?.reviewable,
    false,
  );
  assert.ok(
    !getVisibleProjects().some(
      (project) => project.slug === "adulive-university-systems",
    ),
  );
  assert.ok(
    getPublishedProjects().every(
      (project) => project.publicationStatus === "published",
    ),
  );
  assert.deepEqual(getVisibleProjects(false), getPublishedProjects());
});
test("duplicate slugs and unapproved published content are rejected", () => {
  assert.ok(
    validateProjects([projects[1], projects[1]]).some((error) =>
      error.includes("duplicate"),
    ),
  );
  const errors = validateProjects([
    { ...projects[1], publicationStatus: "published" },
  ]);
  assert.ok(errors.some((error) => error.includes("narrative approval")));
  assert.ok(errors.some((error) => error.includes("approved imagery")));
});
test("release validation rejects missing identity and placeholder configuration", () => {
  const errors = releaseReadiness(projects, {
    ...site,
    email: "hello@example.com",
    origin: "https://example.com",
    resume: "/missing.pdf",
    github: null,
  });
  assert.ok(errors.some((error) => error.includes("email")));
  assert.ok(errors.some((error) => error.includes("origin")));
  assert.ok(errors.some((error) => error.includes("résumé")));
  assert.ok(errors.some((error) => error.includes("GitHub")));
});
test("external URL validation rejects unsafe or placeholder destinations", () => {
  for (const url of [
    "javascript:alert(1)",
    "http://github.com/neil",
    "https://localhost",
    "https://example.com",
    "https://user:pass@github.com/neil",
  ])
    assert.equal(isPublicHttpsUrl(url), false, url);
  assert.equal(isPublicHttpsUrl("https://github.com/verified-owner"), true);
});
