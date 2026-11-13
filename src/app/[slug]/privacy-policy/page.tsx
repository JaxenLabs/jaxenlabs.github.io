import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocumentView } from "@/components/LegalDocumentView";
import { apps, getApp } from "@/content/apps";
import { pageMetadata } from "@/lib/seo";

/*
 * Privacy policy route. `[slug]` in the folder path is a placeholder that is
 * filled with each product's slug, giving e.g. `/jaxbudget/privacy-policy/`.
 */

/** What Next.js passes to this page: the slug from the URL (a Promise, so we `await` it). */
type Props = { params: Promise<{ slug: string }> };

/** Slugs not returned by generateStaticParams become a 404 (nothing is built on demand in the static export). */
export const dynamicParams = false;

/** Build this page only for products that have a privacy policy. */
export function generateStaticParams() {
  return apps.filter((app) => app.privacy).map((app) => ({ slug: app.slug }));
}

/** The <title>, description and share card for the page. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug);
  if (!app?.privacy) return {};
  return pageMetadata({
    title: `${app.name} Privacy Policy`,
    description: app.privacy.intro ?? `How ${app.name} handles your data. ${app.tagline}`,
    path: `/${app.slug}/privacy-policy/`,
    image: app.iconSrc,
  });
}

/**
 * Creates the page at `/<slug>/privacy-policy/` for each product. The URL is
 * registered with Google Play (and Google OAuth for some products), so keep it
 * stable. The layout itself is in src/components/LegalDocumentView.tsx.
 */
export default async function PrivacyPolicyPage({ params }: Props) {
  const app = getApp((await params).slug);
  if (!app?.privacy) notFound();
  return <LegalDocumentView app={app} doc={app.privacy} />;
}
