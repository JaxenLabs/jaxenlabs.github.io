import type { MetadataRoute } from "next";
import { apps } from "@/content/apps";
import { site } from "@/content/site";

export const dynamic = "force-static";

/** `/sitemap.xml`, listing every page so search engines find them. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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
