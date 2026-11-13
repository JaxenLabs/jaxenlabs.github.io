import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactCards } from "@/components/ContactCards";
import { JsonLd } from "@/components/JsonLd";
import { apps } from "@/content/apps";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// The page's <title>, description and share-card tags (built by src/lib/seo.ts).
export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${site.name}, a software company, by email or on Facebook about projects, product support and privacy questions.`,
  path: "/contact/",
});

/**
 * The contact page. Creates the page at `/contact/` (the folder name
 * `contact` becomes the URL). Shows email (with a Copy button), Facebook, and
 * links to each product's policies.
 */
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-14 lg:pt-20">
      {/* Breadcrumb structured data (JSON-LD) for search engines: Jaxen Labs > Contact */}
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbJsonLd([{ name: "Contact", path: "/contact/" }]) }} />

      {/* Hero heading */}
      <div className="animate-rise text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:mt-4 sm:text-6xl">
          Say <span className="text-gradient">hello.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-muted">
          Have a project in mind, need help with one of our products, or a privacy question? We would love to hear from you.
        </p>
      </div>

      {/* Email and Facebook cards */}
      <div className="mt-8 sm:mt-14">
        <ContactCards headingLevel={2} />
      </div>

      {/* Product policies: one card per product that has a Privacy Policy.
          `--delay` staggers their fade-in by 100ms each (see globals.css). */}
      <section className="mt-12 sm:mt-20">
        <h2 data-reveal className="font-display text-2xl font-bold tracking-tight">Product policies</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {apps.filter((app) => app.privacy).map((app, i) => (
            <div key={app.slug} data-reveal style={{ "--delay": `${i * 100}ms` } as CSSProperties} className="glow-card p-5">
              <Link href={`/${app.slug}/`} className="group flex items-center gap-3">
                <Image src={app.iconSrc} alt="" width={48} height={48} className="size-12 rounded-xl transition-transform duration-300 group-hover:scale-110" />
                <span className="font-display text-lg font-semibold transition-colors group-hover:text-accent">{app.name}</span>
              </Link>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <Link href={`/${app.slug}/privacy-policy/`} className="btn-ghost rounded-xl px-3 py-1.5">
                  Privacy Policy
                </Link>
                {app.terms && (
                  <Link href={`/${app.slug}/terms/`} className="btn-ghost rounded-xl px-3 py-1.5">
                    Terms
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
