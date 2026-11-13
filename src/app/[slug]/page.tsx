import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppIconHero } from "@/components/AppIconHero";
import { Icon } from "@/components/Icon";
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
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:grid-cols-[1.2fr_1fr]">
        <div className="animate-rise">
          <Link href="/#apps" className="text-sm text-muted transition-colors hover:text-accent">
            ← All apps
          </Link>
          <h1 className="mt-6 font-display text-5xl font-bold tracking-tight sm:text-7xl">
            <span className="text-gradient">{app.name}</span>
          </h1>
          <p className="mt-4 font-display text-xl text-text sm:text-2xl">{app.tagline}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{app.description}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            {app.playStoreUrl && (
              <a
                href={app.playStoreUrl}
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
            <Link
              href={`/${app.slug}/privacy-policy/`}
              className="inline-flex h-14 items-center rounded-2xl border border-border bg-surface px-5 font-medium transition-colors hover:border-accent/50"
            >
              Privacy Policy
            </Link>
            {app.terms && (
              <Link
                href={`/${app.slug}/terms/`}
                className="inline-flex h-14 items-center rounded-2xl border border-border bg-surface px-5 font-medium transition-colors hover:border-accent/50"
              >
                Terms
              </Link>
            )}
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm animate-rise [animation-delay:150ms] lg:max-w-none">
          <AppIconHero icons={[{ src: app.iconSrc, name: app.name }]} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">Features</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Everything you need.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {app.features.map((f) => (
            <div key={f.title} className="glow-card group p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-linear-135 from-accent/20 to-accent-3/20 text-accent ring-1 ring-accent/20 transition-transform duration-300 group-hover:scale-110">
                <Icon name={f.icon} className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {app.googleDataUse && (
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 backdrop-blur sm:p-12">
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
                  <Link href={`/${app.slug}/privacy-policy/`} className="text-accent hover:underline">
                    {app.name} Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
