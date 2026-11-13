import type { Metadata } from "next";
import { site } from "@/content/site";
import type { AppInfo } from "@/content/types";

/*
 * Search-engine and link-preview helpers, shared by the pages in src/app.
 * - pageMetadata: the <head> tags for one page (title, canonical URL, share cards).
 * - *JsonLd: JSON-LD, i.e. structured data (facts in a format search engines
 *   read), rendered on the page by src/components/JsonLd.tsx.
 */

/** Site-wide share card (public/og.png, 1200x630), the picture shown when a link is shared. */
export const SHARE_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` };

/**
 * Full metadata for one page: canonical URL plus Open Graph and Twitter
 * cards (the previews shown when a link is shared). Next merges `openGraph`
 * shallowly (a page's `openGraph` replaces the layout's completely, rather
 * than filling in only the missing parts), so every page sets it whole.
 *
 * Used by: src/app/contact/page.tsx and the three [slug] pages
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title?: string;
  description: string;
  /** Path with trailing slash, e.g. "/jaxbudget/". */
  path: string;
  /** Square app icon; the site-wide share image is used when omitted. */
  image?: string;
}): Metadata {
  // Share cards don't use the layout's title template, so add " · Jaxen Labs" here.
  const fullTitle = title ? `${title} · ${site.name}` : site.name;
  const images = image ? [{ url: image, width: 512, height: 512, alt: title ?? site.name }] : [SHARE_IMAGE];
  return {
    // Only set `title` when given; the layout's template then adds the company name.
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      // A square app icon suits the small card; the wide share image suits the large one.
      card: image ? "summary" : "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/**
 * schema.org Organization + WebSite, for the home page. (schema.org is the
 * shared vocabulary search engines use for structured data.)
 *
 * Used by: src/app/page.tsx
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    // "@graph" holds several linked items; "@id" gives each a name other items can point to.
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        // The older one-word spelling, so both are recognised as the same company.
        alternateName: "JaxenLabs",
        url: `${site.url}/`,
        logo: `${site.url}/logo.png`,
        email: site.contactEmail,
        description: site.description,
        sameAs: [site.facebookUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: `${site.url}/`,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };
}

/**
 * schema.org MobileApplication + breadcrumbs, for a product's page.
 *
 * Used by: src/app/[slug]/page.tsx
 */
export function appJsonLd(app: AppInfo) {
  const url = `${site.url}/${app.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        name: app.name,
        url,
        description: app.description,
        image: `${site.url}${app.iconSrc}`,
        operatingSystem: "Android",
        applicationCategory: app.category,
        ...(app.playStoreUrl && { installUrl: app.playStoreUrl, downloadUrl: app.playStoreUrl }),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: app.features.map((f) => f.title),
        // Our own products are published by Jaxen Labs; client work by its owner on Google Play.
        publisher: app.client
          ? { "@type": "Organization", name: app.store.developer }
          : { "@id": `${site.url}/#organization`, "@type": "Organization", name: site.name },
      },
      breadcrumbJsonLd([{ name: app.name, path: `/${app.slug}/` }]),
    ],
  };
}

/**
 * schema.org BreadcrumbList from the home page down to `trail`, e.g.
 * Jaxen Labs > JaxBudget > Privacy Policy. Google can show this path in results.
 * Returns the item without "@context", so callers add it or put it in a "@graph".
 *
 * Used by: appJsonLd above, src/app/contact/page.tsx, src/components/LegalDocumentView.tsx
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: site.name, path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
