import type { AppInfo } from "@/content/types";
import { jaxbudget } from "./jaxbudget";
import { jaxscan } from "./jaxscan";
import { smartummah } from "./smartummah";

/**
 * Every app on the site, in display order. To add an app: create
 * `src/content/apps/<slug>/` like `jaxbudget/` and add it here. Its pages
 * (`/<slug>/`, `/<slug>/privacy-policy/`, and `/<slug>/terms/` when it has
 * terms) appear automatically.
 */
export const apps: AppInfo[] = [jaxbudget, jaxscan, smartummah];

/** Finds an app by its URL slug, or `undefined`. */
export function getApp(slug: string): AppInfo | undefined {
  return apps.find((app) => app.slug === slug);
}
