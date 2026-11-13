import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Effects } from "@/components/Effects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { apps } from "@/content/apps";
import { site } from "@/content/site";
import { SHARE_IMAGE } from "@/lib/seo";
import "./globals.css";

// Google Fonts, downloaded at build time and served from this site (no request
// to Google from visitors). Each font is exposed as a CSS variable, which the
// @theme block in globals.css turns into the `font-sans` and `font-display` classes.
// display: "swap" shows a fallback font until the real one loads.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });

/**
 * Default <head> tags for every page: title, description, share cards and
 * search-engine settings. Each page can override parts of it with its own
 * `metadata` / `generateMetadata` (see pageMetadata in src/lib/seo.ts).
 *
 * Icons are not listed here: Next.js finds `favicon.ico`, `icon.png` and
 * `apple-icon.png` in this folder and adds their <link> tags automatically.
 */
export const metadata: Metadata = {
  // Base for turning relative URLs (like "/og.png") into full ones.
  metadataBase: new URL(site.url),
  // `template` adds " · Jaxen Labs" after each page's own title.
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    site.name,
    "JaxenLabs", // the old one-word spelling, so searches for it still match
    "software company",
    "software engineering",
    "mobile app development",
    "Android development",
    "Kotlin Multiplatform",
    "Flutter",
    "web development",
    "privacy-first software",
    ...apps.map((app) => app.name),
  ],
  // The one "official" URL for this page, so search engines don't count copies.
  alternates: { canonical: "/" },
  // Allow search engines to index everything and show large image previews.
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  // Open Graph = the preview card shown when a link is shared (Facebook, WhatsApp...).
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: site.name,
    description: site.description,
    images: [SHARE_IMAGE],
  },
  // The same preview card for X (Twitter).
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: [SHARE_IMAGE.url] },
  // Stop phones (mainly iOS Safari) turning text that looks like a phone number etc. into links.
  formatDetection: { email: false, telephone: false, address: false },
};

/** Browser UI colours (e.g. the mobile address bar) matching the dark and light backgrounds. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05080d" },
    { media: "(prefers-color-scheme: light)", color: "#f4f8f7" },
  ],
  colorScheme: "dark light",
  // Let the page use the whole screen on phones with a notch or home
  // indicator; the header and tab bar add the "safe area" padding themselves.
  viewportFit: "cover",
};

/**
 * A tiny script that runs in the <head>, before the page is drawn:
 * 1. applies the theme saved by ThemeToggle (`data-theme` on <html>), so a
 *    visitor who chose light mode never sees a flash of dark first;
 * 2. adds the `js` class to <html>, which tells globals.css that JavaScript
 *    works, so it is safe to hide `[data-reveal]` items until they scroll in.
 * It is a plain string (not React) because it must run before React loads.
 * try/catch: localStorage can throw in private mode or when storage is blocked.
 */
const THEME_SCRIPT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}d.classList.add("js")})()`;

/**
 * The root layout: the HTML shell shared by every page (aurora backdrop,
 * header, page content, footer). In Next.js, `layout.tsx` wraps every
 * `page.tsx` below it; the current page arrives as `children`.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: THEME_SCRIPT changes <html> (data-theme, class)
    // before React starts. Without this, React would warn during "hydration"
    // (when it attaches to the pre-built HTML) that <html> doesn't match.
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      {/* Bottom padding on phones/tablets keeps content clear of the BottomNav tab bar. */}
      <body className="relative flex min-h-dvh flex-col overflow-x-clip pb-[calc(4rem+env(safe-area-inset-bottom))] font-sans lg:pb-0">
        {/* "Skip to content" link: invisible until focused with the Tab key, so
            keyboard users can jump past the header */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-xl focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-[#04120d]"
        >
          Skip to content
        </a>
        {/* Fixed glowing background behind every page (.aurora in globals.css) */}
        <div className="aurora" aria-hidden />
        {/* Scroll reveals, card spotlight, progress bar and back-to-top button */}
        <Effects />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {/* App-style tab bar for phones and tablets (hidden on desktop) */}
        <BottomNav products={apps.map(({ slug, name, iconSrc, tagline, client }) => ({ slug, name, iconSrc, tagline, client }))} />
      </body>
    </html>
  );
}
