import { projects } from "../data/projects";
import { releaseReadiness } from "../lib/content-validation";

const release =
  process.argv.includes("--release") ||
  process.env.CONTEXT === "production" ||
  process.env.PORTFOLIO_RELEASE === "1";
if (release) {
  const errors = releaseReadiness(projects);
  if (errors.length) {
    console.error(
      "Production release is not ready:\n" +
        errors.map((error) => `  • ${error}`).join("\n"),
    );
    process.exit(1);
  }
  console.log("Production content checks passed.");
} else {
  console.log("Building a noindex review preview. ADULive remains excluded.");
}
