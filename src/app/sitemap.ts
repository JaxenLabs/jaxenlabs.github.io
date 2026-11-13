import type { MetadataRoute } from "next";
import { apps } from "@/content/apps";
import { site } from "@/content/site";

// Build this file once at build time (needed for the static export).
export const dynamic = "force-static";

/**
 * Creates `/sitemap.xml`, a list of every page so search engines find them.
 * Product pages are added automatically from the list in src/content/apps,
 * with their privacy and terms pages when the product has them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // "Last modified" is simply the build time.
  const now = new Date();
  // One sitemap entry. `priority` (0 to 1) hints which pages matter most.
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    ...apps.flatMap((app) => [
      page(`/${app.slug}/`, 0.9),
      ...(app.privacy ? [page(`/${app.slug}/privacy-policy/`, 0.6)] : []),
      ...(app.terms ? [page(`/${app.slug}/terms/`, 0.5)] : []),
    ]),
    page("/contact/", 0.5),
  ];
}
