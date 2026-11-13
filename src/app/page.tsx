import type { CSSProperties } from "react";
import Link from "next/link";
import { AppCard } from "@/components/AppCard";
import { AppIconHero } from "@/components/AppIconHero";
import { ContactCards } from "@/components/ContactCards";
import { FeatureMarquee } from "@/components/FeatureMarquee";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { apps } from "@/content/apps";
import { site } from "@/content/site";
import type { IconName } from "@/content/types";
import { organizationJsonLd } from "@/lib/seo";

const PRINCIPLES: { icon: IconName; title: string; text: string }[] = [
  { icon: "device", title: "On your phone", text: "What you create in our apps is stored on your device. We run no servers of our own." },
  { icon: "noads", title: "No ads, no sign-up", text: "None of our apps show ads or ask you to create an account." },
  { icon: "offline", title: "Clear about data", text: "Each app's privacy policy explains what it uses, and why, in plain words." },
];

const STATS = [
  { value: String(apps.length), label: "apps on Google Play" },
  { value: "0", label: "ads in any app" },
  { value: "0", label: "accounts needed" },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Studio home page: `/`. */
export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-12 sm:px-6 sm:pt-24 lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Independent app studio
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] font-bold tracking-tight sm:text-7xl">
            Small apps.
            <br />
            <span className="text-gradient">Big on privacy.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{site.description}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="#apps" className="btn-primary inline-flex h-12 items-center gap-2 rounded-2xl px-6 font-semibold">
              Explore our apps
              <span aria-hidden>↓</span>
            </Link>
            <Link href="/contact/" className="btn-ghost inline-flex h-12 items-center rounded-2xl px-6 font-medium">
              Get in touch
            </Link>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-l border-border pl-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-gradient">{s.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="w-full animate-rise pb-8 [animation-delay:150ms]">
          <AppIconHero icons={apps.map((app) => ({ src: app.iconSrc, name: app.name, href: `/${app.slug}/` }))} />
        </div>
      </section>

      <section aria-label="Features across our apps" className="pb-16">
        <FeatureMarquee apps={apps} />
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} data-reveal style={delay(i * 120)} className="glow-card p-6 sm:p-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-linear-135 from-accent/20 to-accent-3/20 text-accent ring-1 ring-accent/20">
                <Icon name={p.icon} className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-lg font-semibold">{p.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="apps" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">Our apps</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Made with care.</h2>
          </div>
          <p className="max-w-sm text-muted">{site.tagline} Tap any app to see what it does, and read its privacy policy.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, i) => (
            <div key={app.slug} data-reveal style={delay(i * 120)}>
              <AppCard app={app} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2rem] border border-border bg-linear-120 from-accent/15 via-accent-2/10 to-accent-3/15 px-5 py-12 sm:px-12 sm:py-16"
        >
          <div className="pointer-events-none absolute -top-32 left-1/2 size-80 -translate-x-1/2 animate-pulse-glow rounded-full bg-accent/20 blur-3xl" />
          <div className="relative text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">Questions or ideas?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">Email us, or follow JaxenLabs on Facebook for news about our apps.</p>
          </div>
          <div className="relative mt-10 text-left">
            <ContactCards />
          </div>
        </div>
      </section>
    </>
  );
}
