import type { MetadataRoute } from "next";
import { apps } from "@/content/apps";
import { site } from "@/content/site";

export const dynamic = "force-static";

/** `/sitemap.xml`, listing every page so search engines find them. */
export default function sitemap(): MetadataRoute.Sitemap {
  const appPages = apps.flatMap((app) => [
    `/${app.slug}/`,
    `/${app.slug}/privacy-policy/`,
    `/${app.slug}/terms/`,
  ]);
  return ["/", ...appPages].map((path) => ({ url: `${site.url}${path}` }));
}
