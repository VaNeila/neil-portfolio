import type { Metadata } from "next";
import { isReviewBuild, site } from "../data/site";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const canonical = site.origin ? new URL(path, site.origin).href : undefined;
  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: { index: !isReviewBuild, follow: !isReviewBuild },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.shortName,
      title,
      description,
      url: canonical,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}
