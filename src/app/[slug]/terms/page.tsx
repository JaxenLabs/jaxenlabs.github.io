import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocumentView } from "@/components/LegalDocumentView";
import { apps, getApp } from "@/content/apps";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug);
  return app ? { title: `${app.name} Terms & Conditions`, description: app.terms.intro } : {};
}

/** `/<slug>/terms/`. */
export default async function TermsPage({ params }: Props) {
  const app = getApp((await params).slug);
  if (!app) notFound();
  return <LegalDocumentView app={app} doc={app.terms} />;
}
