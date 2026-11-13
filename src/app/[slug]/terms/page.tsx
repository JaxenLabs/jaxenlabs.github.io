import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocumentView } from "@/components/LegalDocumentView";
import { apps, getApp } from "@/content/apps";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return apps.filter((app) => app.terms).map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug);
  return app?.terms
    ? { title: `${app.name} Terms & Conditions`, description: app.terms.intro ?? app.tagline }
    : {};
}

/** `/<slug>/terms/`. */
export default async function TermsPage({ params }: Props) {
  const app = getApp((await params).slug);
  if (!app?.terms) notFound();
  return <LegalDocumentView app={app} doc={app.terms} />;
}
