import type { MetadataRoute } from "next";
import { isReviewBuild, site } from "@/data/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isReviewBuild ? { disallow: "/" } : { allow: "/" }),
    },
    ...(!isReviewBuild && site.origin
      ? { sitemap: `${site.origin}/sitemap.xml` }
      : {}),
  };
}
