import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Build this file once at build time. Required for `output: "export"`
// (the static export: the whole site saved as plain files, with no server).
export const dynamic = "force-static";

/**
 * Creates `/robots.txt`, the file search-engine robots read first: every
 * page may be crawled, and here is where the sitemap is.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
