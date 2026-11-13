import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppCard } from "@/components/AppCard";
import { ContactCards } from "@/components/ContactCards";
import { FeatureMarquee } from "@/components/FeatureMarquee";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { SolarSystem } from "@/components/SolarSystem";
import { TechMarquee } from "@/components/TechMarquee";
import { apps, totalDownloads } from "@/content/apps";
import { capabilities, process, techStack, values } from "@/content/company";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Small uppercase label above a section heading. */
function Eyebrow({ children }: { children: string }) {
  return <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">{children}</p>;
}

/** Company home page: `/`. */
export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-12 sm:px-6 sm:pt-24 lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-rise">
          <h1 className="font-display text-[2.6rem] leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Engineering software
            <br />
            <span className="text-gradient">for a connected world.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {site.name} is {site.description.charAt(0).toLowerCase()}
            {site.description.slice(1)}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="#products" className="btn-primary inline-flex h-12 items-center gap-2 rounded-2xl px-6 font-semibold">
              Explore our products
              <span aria-hidden>↓</span>
            </Link>
            <Link href="/contact/" className="btn-ghost inline-flex h-12 items-center rounded-2xl px-6 font-medium">
              Start a conversation
            </Link>
          </div>
          <dl className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6">
            <div>
              <dt className="sr-only">Total users</dt>
              <dd className="font-display text-4xl font-bold sm:text-5xl">
                <span className="text-gradient">{totalDownloads.toLocaleString("en-US")}+</span>
              </dd>
              <dd className="mt-1 text-sm font-medium">Total users</dd>
            </div>
            <div className="h-14 w-px bg-border" aria-hidden />
            <div>
              <dt className="sr-only">Products</dt>
              <dd className="font-display text-4xl font-bold sm:text-5xl">
                <span className="text-gradient">{apps.length}</span>
              </dd>
              <dd className="mt-1 text-sm font-medium">Live products</dd>
            </div>
            <div className="flex -space-x-3">
              {apps.map((app) => (
                <Link
                  key={app.slug}
                  href={`/${app.slug}/`}
                  title={app.name}
                  className="transition-transform hover:z-10 hover:-translate-y-1"
                >
                  <Image
                    src={app.iconSrc}
                    alt={`${app.name} icon`}
                    width={48}
                    height={48}
                    className="size-11 rounded-xl ring-2 ring-bg"
                  />
                </Link>
              ))}
            </div>
          </dl>
        </div>
        <div className="w-full animate-rise pb-8 [animation-delay:150ms]">
          <SolarSystem apps={apps} />
        </div>
      </section>

      <section aria-label="Technologies we use" className="pb-16">
        <TechMarquee items={techStack} />
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.title} data-reveal style={delay(i * 120)} className="glow-card p-6 sm:p-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-linear-135 from-accent/20 to-accent-3/20 text-accent ring-1 ring-accent/20">
                <Icon name={v.icon} className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold">{v.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">What we engineer.</h2>
          </div>
          <p className="max-w-sm text-muted">From the first idea to the store release, we design, build and maintain software end to end.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <div key={c.title} data-reveal style={delay((i % 3) * 100)} className="glow-card group p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent ring-1 ring-accent/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Icon name={c.icon} className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Our products</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Products we&apos;ve built.</h2>
          </div>
          <p className="max-w-sm text-muted">
            Our own products and work for clients, designed and engineered by our team. Open any product to see what it does.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {apps.map((app, i) => (
            <div key={app.slug} data-reveal style={delay(i * 120)}>
              <AppCard app={app} />
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Product features" className="pt-10">
        <FeatureMarquee apps={apps} />
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div data-reveal>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">From idea to release.</h2>
        </div>
        <ol className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="pointer-events-none absolute top-10 right-[12%] left-[12%] hidden h-px bg-linear-to-r from-accent/0 via-accent/40 to-accent/0 lg:block"
          />
          {process.map((p, i) => (
            <li key={p.step} data-reveal style={delay(i * 120)} className="glow-card relative p-6">
              <span className="font-display text-4xl font-bold text-gradient">{p.step}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2rem] border border-border bg-linear-120 from-accent/15 via-accent-2/10 to-accent-3/15 px-5 py-12 sm:px-12 sm:py-16"
        >
          <div className="pointer-events-none absolute -top-32 left-1/2 size-80 -translate-x-1/2 animate-pulse-glow rounded-full bg-accent/20 blur-3xl" />
          <div className="relative text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">Let&apos;s build something reliable.</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Have a project, a question or an idea? Email us, or follow Jaxen Labs on Facebook.
            </p>
          </div>
          <div className="relative mt-10 text-left">
            <ContactCards />
          </div>
        </div>
      </section>
    </>
  );
}
