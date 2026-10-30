import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apps, getApp } from "@/content/apps";

type Props = { params: Promise<{ slug: string }> };

/** Only the listed apps exist; anything else is a 404 in the static export. */
export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug);
  return app ? { title: app.name, description: app.tagline } : {};
}

/** An app's home page: `/<slug>/`. This is the "Application home page" for Google. */
export default async function AppPage({ params }: Props) {
  const app = getApp((await params).slug);
  if (!app) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <section className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Image src={app.iconSrc} alt={`${app.name} icon`} width={96} height={96} priority className="size-24 rounded-3xl" />
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{app.name}</h1>
          <p className="mt-2 text-lg text-muted">{app.tagline}</p>
        </div>
      </section>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed">{app.description}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {app.playStoreUrl && (
          <a
            href={app.playStoreUrl}
            className="inline-flex h-12 items-center rounded-xl bg-accent px-5 font-semibold text-white hover:opacity-90"
          >
            Get it on Google Play
          </a>
        )}
        <Link
          href={`/${app.slug}/privacy-policy/`}
          className="inline-flex h-12 items-center rounded-xl border border-border px-5 font-medium hover:border-accent"
        >
          Privacy Policy
        </Link>
        <Link
          href={`/${app.slug}/terms/`}
          className="inline-flex h-12 items-center rounded-xl border border-border px-5 font-medium hover:border-accent"
        >
          Terms
        </Link>
      </div>

      <section className="mt-16">
        <h2 className="text-sm font-semibold tracking-wider text-muted uppercase">Features</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {app.features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {app.googleDataUse && (
        <section className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight">{app.googleDataUse.title}</h2>
          {app.googleDataUse.paragraphs.map((text) => (
            <p key={text} className="mt-3 leading-relaxed text-text/90">
              {text}
            </p>
          ))}
          <p className="mt-3 leading-relaxed text-text/90">
            Full details are in the{" "}
            <Link href={`/${app.slug}/privacy-policy/`} className="text-accent hover:underline">
              {app.name} Privacy Policy
            </Link>
            .
          </p>
        </section>
      )}
    </div>
  );
}
