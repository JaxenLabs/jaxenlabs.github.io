import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppIconHero } from "@/components/AppIconHero";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { StoreListingView } from "@/components/StoreListingView";
import { apps, getApp } from "@/content/apps";
import { appJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

/** Only the listed apps exist; anything else is a 404 in the static export. */
export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug);
  if (!app) return {};
  return {
    ...pageMetadata({ title: app.name, description: app.tagline, path: `/${app.slug}/`, image: app.iconSrc }),
    keywords: [app.name, ...app.keywords],
  };
}

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** An app's home page: `/<slug>/`. This is the "Application home page" for Google. */
export default async function AppPage({ params }: Props) {
  const app = getApp((await params).slug);
  if (!app) notFound();
  const others = apps.filter((a) => a.slug !== app.slug);

  return (
    <>
      <JsonLd data={appJsonLd(app)} />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 sm:pt-20 lg:grid-cols-[1.2fr_1fr]">
        <div className="animate-rise">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/#products" className="transition-colors hover:text-accent">
                  Products
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-text">
                {app.name}
              </li>
            </ol>
          </nav>
          {app.client && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-3/30 bg-accent-3/10 px-3 py-1 text-xs font-medium text-accent-3">
              <Icon name="spark" className="size-3.5" />
              Client project · Built for {app.client}
            </p>
          )}
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight sm:text-7xl">
            <span className="text-gradient">{app.name}</span>
          </h1>
          <p className="mt-3 text-sm font-medium tracking-wide text-muted">
            {app.store.title} · <span className="text-text">{app.downloads}</span> downloads on Google Play
          </p>
          <p className="mt-4 font-display text-xl text-text sm:text-2xl">{app.tagline}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{app.description}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            {app.playStoreUrl && (
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex h-14 items-center gap-3 rounded-2xl px-6 font-semibold"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                  <path d="M4.2 2.3a1.5 1.5 0 0 0-.7 1.3v16.8c0 .5.3 1 .7 1.3l9.6-9.7-9.6-9.7Zm10.7 8.6 2.6-2.6L6.6 2l8.3 8.9Zm0 2.2-8.3 8.9 10.9-6.3-2.6-2.6Zm5.6-3.3-2.4-1.4-2.8 2.8 2.8 2.8 2.4-1.4c.8-.5.8-2.3 0-2.8Z" />
                </svg>
                <span className="flex flex-col leading-tight">
                  <span className="text-[0.65rem] font-medium tracking-wide uppercase opacity-70">Get it on</span>
                  Google Play
                </span>
              </a>
            )}
            {app.privacy && (
              <Link
                href={`/${app.slug}/privacy-policy/`}
                className="btn-ghost inline-flex h-14 items-center rounded-2xl px-5 font-medium"
              >
                Privacy Policy
              </Link>
            )}
            {app.terms && (
              <Link href={`/${app.slug}/terms/`} className="btn-ghost inline-flex h-14 items-center rounded-2xl px-5 font-medium">
                Terms
              </Link>
            )}
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm animate-rise [animation-delay:150ms] lg:max-w-none">
          <AppIconHero icons={[{ src: app.iconSrc, name: app.name }]} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <div data-reveal>
          <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">Features</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Everything you need.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {app.features.map((f, i) => (
            <div key={f.title} data-reveal style={delay((i % 3) * 100)} className="glow-card group p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-linear-135 from-accent/20 to-accent-3/20 text-accent ring-1 ring-accent/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Icon name={f.icon} className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <StoreListingView app={app} />

      {app.googleDataUse && (
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          {/* No reveal: Google's OAuth review reads this, so it is always visible. */}
          <div className="glow-card overflow-hidden p-6 sm:p-12">
            <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-accent-2/15 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[auto_1fr]">
              <span className="grid size-14 place-items-center rounded-2xl bg-accent-soft text-accent ring-1 ring-accent/25">
                <Icon name="lock" className="size-7" />
              </span>
              <div className="max-w-3xl">
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{app.googleDataUse.title}</h2>
                {app.googleDataUse.paragraphs.map((text) => (
                  <p key={text} className="mt-4 leading-relaxed text-text/85">
                    {text}
                  </p>
                ))}
                <p className="mt-4 leading-relaxed text-text/85">
                  Full details are in the{" "}
                  <Link href={`/${app.slug}/privacy-policy/`} className="font-medium text-accent hover:underline">
                    {app.name} Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {app.playStoreUrl && (
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <div
            data-reveal
            className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[2rem] border border-border bg-linear-120 from-accent/15 via-accent-2/10 to-accent-3/15 px-6 py-12 text-center sm:flex-row sm:px-12 sm:text-left"
          >
            <Image src={app.iconSrc} alt="" width={96} height={96} className="size-20 animate-float rounded-[1.4rem] ring-1 ring-white/10" />
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Try {app.name} today</h2>
              <p className="mt-2 text-muted">Free to download on Google Play.</p>
            </div>
            <a
              href={app.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex h-12 items-center rounded-2xl px-6 font-semibold"
            >
              Get it on Google Play
            </a>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <h2 data-reveal className="font-display text-2xl font-bold tracking-tight">More from JaxenLabs</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((o, i) => (
              <Link
                key={o.slug}
                href={`/${o.slug}/`}
                data-reveal
                style={delay(i * 100)}
                className="glow-card is-link group flex items-center gap-4 p-5"
              >
                <Image src={o.iconSrc} alt={`${o.name} icon`} width={64} height={64} className="size-16 rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-semibold transition-colors group-hover:text-accent">{o.name}</span>
                  <span className="mt-0.5 block text-sm text-muted">{o.tagline}</span>
                </span>
                <span aria-hidden className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
