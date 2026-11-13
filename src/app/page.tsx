import Link from "next/link";
import { AppCard } from "@/components/AppCard";
import { AppIconHero } from "@/components/AppIconHero";
import { FacebookIcon } from "@/components/FacebookLink";
import { Icon } from "@/components/Icon";
import { apps } from "@/content/apps";
import { site } from "@/content/site";
import type { IconName } from "@/content/types";

const PRINCIPLES: { icon: IconName; title: string; text: string }[] = [
  { icon: "device", title: "On your phone", text: "What you create in our apps is stored on your device. We run no servers of our own." },
  { icon: "noads", title: "No ads, no sign-up", text: "None of our apps show ads or ask you to create an account." },
  { icon: "offline", title: "Clear about data", text: "Each app's privacy policy explains what it uses, and why, in plain words." },
];

/** Studio home page: `/`. */
export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            Independent app studio
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] font-bold tracking-tight sm:text-7xl">
            Small apps.
            <br />
            <span className="text-gradient">Big on privacy.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{site.description}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="#apps" className="btn-primary inline-flex h-12 items-center rounded-2xl px-6 font-semibold">
              Explore our apps
            </Link>
            <a
              href={`mailto:${site.contactEmail}`}
              className="inline-flex h-12 items-center rounded-2xl border border-border bg-surface px-6 font-medium backdrop-blur transition-colors hover:border-accent/50"
            >
              Get in touch
            </a>
          </div>
        </div>
        <div className="w-full animate-rise [animation-delay:150ms]">
          <AppIconHero icons={apps.map((app) => ({ src: app.iconSrc, name: app.name }))} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="bg-bg/90 p-6 backdrop-blur sm:p-8">
              <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon name={p.icon} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="apps" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">Our apps</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Made with care.</h2>
          </div>
          <p className="max-w-sm text-muted">{site.tagline}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-linear-120 from-accent/15 via-accent-2/10 to-accent-3/15 px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -top-32 left-1/2 size-80 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
          <h2 className="relative font-display text-3xl font-bold tracking-tight sm:text-4xl">Questions or ideas?</h2>
          <p className="relative mx-auto mt-3 max-w-md text-muted">
            Email us, or follow JaxenLabs on Facebook for news about our apps.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${site.contactEmail}`}
              className="btn-primary inline-flex h-12 items-center rounded-2xl px-6 font-semibold"
            >
              {site.contactEmail}
            </a>
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-2xl bg-[#1877f2] px-6 font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <FacebookIcon />
              Follow on Facebook
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
