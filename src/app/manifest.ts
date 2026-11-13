import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Build this file once at build time (needed for the static export).
export const dynamic = "force-static";

/**
 * Creates `/manifest.webmanifest`: the name, colours and icons a phone uses
 * when someone taps "Add to home screen".
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#05080d",
    theme_color: "#05080d",
    // "maskable" is a version with extra padding, so Android can crop it to a
    // circle or rounded square without cutting off the logo.
    icons: [
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
