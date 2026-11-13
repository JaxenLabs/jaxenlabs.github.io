import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocumentView } from "@/components/LegalDocumentView";
import { apps, getApp } from "@/content/apps";
import { pageMetadata } from "@/lib/seo";

/*
 * Terms & Conditions route. `[slug]` in the folder path is a placeholder that
 * is filled with each product's slug, giving e.g. `/jaxbudget/terms/`.
 */

/** What Next.js passes to this page: the slug from the URL (a Promise, so we `await` it). */
type Props = { params: Promise<{ slug: string }> };

/** Slugs not returned by generateStaticParams become a 404 (nothing is built on demand in the static export). */
export const dynamicParams = false;

/** Build this page only for products that have terms. */
export function generateStaticParams() {
  return apps.filter((app) => app.terms).map((app) => ({ slug: app.slug }));
}

/** The <title>, description and share card for the page. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug);
  if (!app?.terms) return {};
  return pageMetadata({
    title: `${app.name} Terms & Conditions`,
    description: app.terms.intro ?? `The terms for using ${app.name}. ${app.tagline}`,
    path: `/${app.slug}/terms/`,
    image: app.iconSrc,
  });
}

/**
 * Creates the page at `/<slug>/terms/` for each product that has terms.
 * The layout itself is in src/components/LegalDocumentView.tsx.
 */
export default async function TermsPage({ params }: Props) {
  const app = getApp((await params).slug);
  if (!app?.terms) notFound();
  return <LegalDocumentView app={app} doc={app.terms} />;
}
