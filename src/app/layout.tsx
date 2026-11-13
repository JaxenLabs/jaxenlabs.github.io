import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { Effects } from "@/components/Effects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { apps } from "@/content/apps";
import { site } from "@/content/site";
import { SHARE_IMAGE } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    site.name,
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
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: site.name,
    description: site.description,
    images: [SHARE_IMAGE],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: [SHARE_IMAGE.url] },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05080d" },
    { media: "(prefers-color-scheme: light)", color: "#f4f8f7" },
  ],
  colorScheme: "dark light",
};

/**
 * Runs before the page paints: applies the saved theme (so there is no flash
 * of the wrong one) and marks JS as available for the scroll reveals.
 */
const THEME_SCRIPT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}d.classList.add("js")})()`;

/** Shell shared by every page: aurora backdrop, header, content, footer. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="relative flex min-h-dvh flex-col overflow-x-clip font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-xl focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-[#04120d]"
        >
          Skip to content
        </a>
        <div className="aurora" aria-hidden />
        <Effects />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
