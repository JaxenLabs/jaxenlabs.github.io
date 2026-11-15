/**
 * Tells Bing, Yandex and other IndexNow search engines about every page in
 * the built sitemap, so new and changed pages are crawled within hours.
 *
 * Usage (in CI, after publishing main): node scripts/indexnow.mjs out
 * The key file public/<INDEXNOW_KEY>.txt proves the site owns the key.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const INDEXNOW_KEY = "54f8507f62fde42c7dc9d6ecddeccdac";

const outDir = process.argv[2] ?? "out";
const sitemap = readFileSync(join(outDir, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (urls.length === 0) throw new Error("No URLs found in the sitemap");

const { host, origin } = new URL(urls[0]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${origin}/${INDEXNOW_KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: sent ${urls.length} URLs for ${host}, HTTP ${res.status}`);
// 200 = accepted, 202 = accepted and the key is still being checked.
if (res.status >= 400) process.exitCode = 1;
