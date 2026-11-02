import { readFileSync, writeFileSync } from "node:fs";

const headers = readFileSync("out/_headers", "utf8");
writeFileSync(
  "out/_headers",
  headers.replace("/*\n", "/*\n  X-Robots-Tag: noindex, nofollow\n"),
);
