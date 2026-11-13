import type { Metadata } from "next";
import { site } from "@/content/site";
import type { AppInfo } from "@/content/types";

/** Site-wide share card (public/og.png, 1200x630). */
export const SHARE_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` };

/**
 * Full metadata for one page: canonical URL plus Open Graph and Twitter
 * cards. Next merges `openGraph` shallowly, so every page sets it whole.
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
  const fullTitle = title ? `${title} · ${site.name}` : site.name;
  const images = image ? [{ url: image, width: 512, height: 512, alt: title ?? site.name }] : [SHARE_IMAGE];
  return {
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
      card: image ? "summary" : "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/** schema.org Organization + WebSite, for the home page. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
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

/** schema.org MobileApplication + breadcrumbs, for an app's home page. */
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
        // Our own products are published by JaxenLabs; client work by its owner on Google Play.
        publisher: app.client
          ? { "@type": "Organization", name: app.store.developer }
          : { "@id": `${site.url}/#organization`, "@type": "Organization", name: site.name },
      },
      breadcrumbJsonLd([{ name: app.name, path: `/${app.slug}/` }]),
    ],
  };
}

/** schema.org BreadcrumbList from the home page down to `trail`. */
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
