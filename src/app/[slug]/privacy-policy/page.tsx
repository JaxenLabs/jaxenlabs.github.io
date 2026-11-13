import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocumentView } from "@/components/LegalDocumentView";
import { apps, getApp } from "@/content/apps";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return apps.filter((app) => app.privacy).map((app) => ({ slug: app.slug }));
}

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

/** `/<slug>/privacy-policy/`. */
export default async function PrivacyPolicyPage({ params }: Props) {
  const app = getApp((await params).slug);
  if (!app?.privacy) notFound();
  return <LegalDocumentView app={app} doc={app.privacy} />;
}
