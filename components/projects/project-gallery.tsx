import Image from "next/image";
import type { ProjectImage } from "@/types/content";

export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const approved = images.filter((image) => image.approved);
  if (!approved.length) return null;
  return (
    <div className="case-gallery">
      {approved.map((image) => (
        <figure key={image.src}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 800px) 760px, 92vw"
          />
          {(image.caption || image.kind === "illustration") && (
            <figcaption>
              {image.kind === "illustration" ? "Illustration — " : ""}
              {image.caption ??
                "A conceptual representation, not a product screenshot."}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
