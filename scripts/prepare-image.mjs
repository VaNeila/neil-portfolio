import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const [input, output] = process.argv.slice(2);
if (!input || !output?.endsWith(".webp"))
  throw new Error(
    "Usage: node scripts/prepare-image.mjs <approved-source> <public/images/projects/slug/name.webp>",
  );
const metadata = await sharp(input).rotate().metadata();
// Ask for a sufficiently large original instead of inventing extra resolution.
const sourceWidth = metadata.autoOrient?.width ?? metadata.width;
if (!sourceWidth || sourceWidth < 1600)
  throw new Error(
    "Supply an original at least 1600px wide. Images are never upscaled.",
  );
await mkdir(dirname(output), { recursive: true });
await sharp(input)
  .rotate()
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(output);
for (const width of [480, 768, 1200, 1600])
  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(output.replace(/\.webp$/, `-${width}.webp`));
console.log(
  "Prepared metadata-stripped WebP variants. Review visual content separately before publication.",
);
