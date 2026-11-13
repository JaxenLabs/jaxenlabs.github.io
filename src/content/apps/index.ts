import type { AppInfo } from "@/content/types";
import { babyshop } from "./babyshop";
import { jaxbudget } from "./jaxbudget";
import { jaxscan } from "./jaxscan";
import { smartummah } from "./smartummah";

/**
 * Every app on the site, in display order. To add an app: create
 * `src/content/apps/<slug>/` like `jaxbudget/` and add it here. Its pages
 * (`/<slug>/`, plus `/<slug>/privacy-policy/` and `/<slug>/terms/` when it has
 * them) appear automatically.
 */
export const apps: AppInfo[] = [babyshop, jaxbudget, jaxscan, smartummah];

/** Finds an app by its URL slug, or `undefined`. */
export function getApp(slug: string): AppInfo | undefined {
  return apps.find((app) => app.slug === slug);
}

/** Turns a Google Play count such as "5K+" or "10+" into its lower bound (5000, 10). */
function parseDownloads(count: string): number {
  const m = count.match(/^([\d.,]+)\s*([KMB]?)/i);
  if (!m) return 0;
  const scale = { "": 1, K: 1_000, M: 1_000_000, B: 1_000_000_000 }[m[2].toUpperCase() as "" | "K" | "M" | "B"];
  return Math.round(parseFloat(m[1].replace(/,/g, "")) * scale);
}

/** Combined Google Play downloads across every product (sum of lower bounds), e.g. 5070. */
export const totalDownloads = apps.reduce((sum, app) => sum + parseDownloads(app.downloads), 0);
