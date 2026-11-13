/**
 * THE PRODUCT LIST: every product shown on the site, in display order.
 *
 * The home page, header menu, footer, solar system, sitemap and product
 * pages all read from `apps` below, so adding a product here is all it
 * takes to put it everywhere. To add one, see "Add a product" in README.md.
 *
 * Each product's pages are created automatically from its `slug`:
 *   /<slug>/                    always
 *   /<slug>/privacy-policy/     only if it has `privacy`
 *   /<slug>/terms/              only if it has `terms`
 */
import type { AppInfo } from "@/content/types";
import { babyshop } from "./babyshop";
import { jaxbudget } from "./jaxbudget";
import { jaxscan } from "./jaxscan";
import { smartummah } from "./smartummah";

/** All products, in the order they appear on the site. Baby Shop is first on purpose. */
export const apps: AppInfo[] = [babyshop, jaxbudget, jaxscan, smartummah];

/** Finds a product by its URL slug ("jaxscan"), or returns `undefined` if there is none. */
export function getApp(slug: string): AppInfo | undefined {
  return apps.find((app) => app.slug === slug);
}

const MULTIPLIERS = { "": 1, K: 1_000, M: 1_000_000, B: 1_000_000_000 } as const;

/**
 * Turns a Google Play download count into a number, using its lower bound:
 * "10+" → 10, "5K+" → 5000, "1.5M+" → 1500000.
 */
function downloadsToNumber(count: string): number {
  const match = count.match(/^([\d.,]+)\s*([KMB]?)/i);
  if (!match) return 0;
  const [, digits, suffix] = match;
  const multiplier = MULTIPLIERS[suffix.toUpperCase() as keyof typeof MULTIPLIERS];
  return Math.round(parseFloat(digits.replace(/,/g, "")) * multiplier);
}

/**
 * All products' Google Play downloads added together (e.g. 5070). Shown as
 * "Total users" on the home page. The counts come from each product's
 * `store.ts`, refreshed with `npm run update:play`.
 */
export const totalDownloads = apps.reduce((sum, app) => sum + downloadsToNumber(app.store.downloads), 0);
