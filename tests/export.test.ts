import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { projects } from "../data/projects";
import { isReviewBuild } from "../data/site";

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(join(dir, entry.name))
      : [join(dir, entry.name)],
  );
}

test("export has real pages and a standalone 404 document", () => {
  for (const file of [
    "out/index.html",
    "out/projects/index.html",
    "out/404.html",
    "out/robots.txt",
    "out/sitemap.xml",
    "out/opengraph-image.png",
  ])
    assert.ok(existsSync(file), file);
});
test("excluded drafts leave no routes, media, HTML or client payload", () => {
  const excluded = projects.filter(
    (project) =>
      project.publicationStatus === "draft" &&
      (!isReviewBuild || !project.reviewable),
  );
  for (const file of files("out")) {
    for (const project of excluded) {
      assert.ok(!file.includes(project.slug), `Draft path leaked: ${file}`);
      if (/\.(html|js|json|txt|xml|rsc)$/.test(file)) {
        const text = readFileSync(file, "utf8");
        assert.ok(
          !text.includes(project.slug),
          `Draft slug leaked into ${file}`,
        );
        assert.ok(
          !text.includes(project.title),
          `Draft title leaked into ${file}`,
        );
      }
    }
  }
});
test("review artifacts are noindex and do not advertise draft pages in sitemap", () => {
  if (!isReviewBuild) return;
  assert.match(readFileSync("out/index.html", "utf8"), /noindex/);
  assert.match(readFileSync("out/robots.txt", "utf8"), /Disallow: \//);
  assert.ok(!readFileSync("out/sitemap.xml", "utf8").includes("<loc>"));
});
