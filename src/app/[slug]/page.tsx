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
import { site } from "@/content/site";
import { appJsonLd, pageMetadata } from "@/lib/seo";

/*
 * Product page route. The folder name `[slug]` (with square brackets) is a
 * placeholder: one page is built for each product, with `[slug]` replaced by
 * that product's slug (its short URL name), e.g. `/jaxbudget/`.
 */

/** What Next.js passes to this page: the slug from the URL. It is a Promise in this Next.js version, so we `await` it. */
type Props = { params: Promise<{ slug: string }> };

/**
 * Only the listed products exist. With `false`, any slug not returned by
 * generateStaticParams is a 404 instead of being built on demand (there is
 * no server to build it in the static export).
 */
export const dynamicParams = false;

/** Tells Next.js which pages to build: one per product slug, e.g. { slug: "jaxbudget" }. */
export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

/** The <title>, description, keywords and share card for each product page. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug);
  if (!app) return {};
  return {
    ...pageMetadata({ title: app.name, description: app.tagline, path: `/${app.slug}/`, image: app.iconSrc }),
    keywords: [app.name, ...app.keywords],
  };
}

/** Style that sets the `--delay` CSS variable, used by globals.css to stagger fade-ins. */
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * A product's home page. Creates one page per product at `/<slug>/`, e.g.
 * `/jaxbudget/`. This URL is the "Application home page" registered with
 * Google, so keep it stable.
 */
export default async function AppPage({ params }: Props) {
  const app = getApp((await params).slug);
  if (!app) notFound();
  // Every other product, for the "More from Jaxen Labs" links at the bottom.
  const others = apps.filter((a) => a.slug !== app.slug);

  return (
    <>
      {/* Structured data (JSON-LD): describes the app and its breadcrumb for search engines */}
      <JsonLd data={appJsonLd(app)} />

      {/* Hero.
          Desktop: breadcrumb, big name, tagline, description and buttons, with the big floating icon on the right.
          Phones and tablets: an App Store-style header (small rounded icon beside the name), a
          full-width Google Play button and compact policy buttons; the app bar's back button
          replaces the breadcrumb. */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-6 pb-10 sm:px-6 sm:pt-10 lg:grid-cols-[1.2fr_1fr] lg:pt-20 lg:pb-16">
        <div className="animate-rise">
          <nav aria-label="Breadcrumb" className="hidden lg:block">
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
          {/* Icon + name row. Phones/tablets: the icon sits beside the name; desktop shows the big icon instead. */}
          <div className="flex items-center gap-4 lg:block">
            <Image
              src={app.iconSrc}
              alt={`${app.name} icon`}
              width={112}
              height={112}
              priority
              className="size-24 shrink-0 rounded-[1.6rem] shadow-[0_16px_40px_-12px_rgb(34_211_238/0.5)] ring-1 ring-white/10 sm:size-28 lg:hidden"
            />
            <div className="min-w-0">
              {/* Badge for products we built for a client */}
              {app.client && (
                <p className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-accent-3/30 bg-accent-3/10 px-2.5 py-0.5 text-[0.7rem] font-medium text-accent-3 lg:mt-6 lg:mb-0 lg:gap-2 lg:px-3 lg:py-1 lg:text-xs">
                  <Icon name="spark" className="size-3.5" />
                  Client project · Built for {app.client}
                </p>
              )}
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-5xl lg:mt-5 lg:text-7xl">
                <span className="text-gradient">{app.name}</span>
              </h1>
              <p className="mt-1 text-sm font-medium tracking-wide text-muted lg:mt-3">
                {app.store.title} · on Google Play
              </p>
            </div>
          </div>
          <p className="mt-5 font-display text-lg text-text sm:text-xl lg:mt-4 lg:text-2xl">{app.tagline}</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted lg:mt-6 lg:text-lg">{app.description}</p>

          {/* Buttons: each only appears if the product has that link or page.
              Phones: full-width Google Play button, policies side by side under it. */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-10">
            {app.playStoreUrl && (
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex h-14 items-center justify-center gap-3 rounded-2xl px-6 font-semibold"
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
            {(app.privacy || app.terms) && (
              <div className="grid grid-cols-2 gap-3 sm:flex">
                {app.privacy && (
                  <Link
                    href={`/${app.slug}/privacy-policy/`}
                    className="btn-ghost inline-flex h-12 items-center justify-center rounded-2xl px-5 font-medium sm:h-14"
                  >
                    Privacy Policy
                  </Link>
                )}
                {app.terms && (
                  <Link
                    href={`/${app.slug}/terms/`}
                    className="btn-ghost inline-flex h-12 items-center justify-center rounded-2xl px-5 font-medium sm:h-14"
                  >
                    Terms
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Big floating icon: desktop only (phones and tablets show the small icon beside the name) */}
        <div className="hidden w-full animate-rise [animation-delay:150ms] lg:block">
          <AppIconHero src={app.iconSrc} name={app.name} />
        </div>
      </section>

      {/* Features grid. `i % 3` restarts the fade-in delay on each row of three. */}
      <section className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:pt-8">
        <div data-reveal>
          <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">Features</p>
          <h2 className="mt-2 font-display text-[1.75rem] leading-tight font-bold tracking-tight sm:mt-3 sm:text-4xl">Everything you need.</h2>
        </div>
        {/* Phones: a swipeable row; from `sm` up: a grid */}
        <div tabIndex={0} role="region" aria-label="Features" className="mt-6 app-carousel -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {app.features.map((f, i) => (
            <div key={f.title} data-reveal style={delay((i % 3) * 100)} className="glow-card group w-[78%] shrink-0 p-6 sm:w-auto">
              <span className="grid size-12 place-items-center rounded-2xl bg-linear-135 from-accent/20 to-accent-3/20 text-accent ring-1 ring-accent/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Icon name={f.icon} className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* "About": the full Google Play description */}
      <StoreListingView app={app} />

      {/* How the product uses Google user data (only for products whose content file sets `googleDataUse`) */}
      {app.googleDataUse && (
        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:pt-24">
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

      {/* Download call to action (only when the product is on Google Play) */}
      {app.playStoreUrl && (
        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:pt-24">
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

      {/* "More from Jaxen Labs": links to the other products */}
      {others.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:pt-24">
          <h2 data-reveal className="font-display text-2xl font-bold tracking-tight">More from {site.name}</h2>
          <div tabIndex={0} role="region" aria-label={`More from ${site.name}`} className="mt-6 app-carousel -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2">
            {others.map((o, i) => (
              <Link
                key={o.slug}
                href={`/${o.slug}/`}
                data-reveal
                style={delay(i * 100)}
                className="glow-card is-link group flex w-[85%] shrink-0 items-center gap-4 p-5 sm:w-auto"
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
