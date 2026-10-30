import type { NextConfig } from "next";

/**
 * The site is exported as plain HTML files (`out/`) so GitHub Pages can
 * host it with no server.
 *
 * - `trailingSlash` makes every page a folder with an `index.html`
 *   (`/jaxbudget/privacy-policy/`), which GitHub Pages serves cleanly.
 * - Images are not optimized because there is no server to do it.
 * - No `basePath`: the repo is `jaxenlabs.github.io`, so the site lives at
 *   the domain root. If it ever moves to a project repo (for example
 *   `jaxenlabs.github.io/site`), set `basePath: "/site"` here.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
