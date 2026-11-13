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

/**
 * Style that sets the `--delay` CSS variable. globals.css uses it as the
 * fade-in delay of `[data-reveal]` elements, so cards in a row appear one
 * after another instead of all at once.
 */
/**
 * Shared layout classes for the app-style phone design (below `sm`, 640px),
 * which switch to the tablet/desktop layout from `sm` up:
 * - GROUPED_LIST: rows inside one rounded box split by thin lines (like
 *   iOS Settings); a normal grid from `sm`.
 * - LIST_ROW: one row in that list (icon left, text right); a card from `sm`.
 *   The max-sm: classes switch off the card look on phones only.
 * - CAROUSEL: a sideways-swiping row that snaps card by card; a grid from `sm`.
 */
const GROUPED_LIST =
  "grid overflow-hidden rounded-3xl border border-border bg-surface divide-y divide-border sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent sm:divide-y-0";
const LIST_ROW = "flex items-start gap-4 p-4 max-sm:rounded-none max-sm:border-0 max-sm:bg-none max-sm:shadow-none sm:block";
const CAROUSEL = "app-carousel -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Small uppercase label above a section heading (an "eyebrow" in design speak). */
function Eyebrow({ children }: { children: string }) {
  return <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">{children}</p>;
}

/**
 * The company home page. Creates the page at `/` (exported as `index.html`).
 * In Next.js, a file named `page.tsx` inside `src/app` becomes a page, and
 * its folder path becomes the URL.
 *
 * Most of the text comes from src/content (company.ts, site.ts and the
 * product files), so wording can change without touching this layout.
 */
export default function HomePage() {
  return (
    <>
      {/* Structured data (JSON-LD) telling search engines who the company is */}
      <JsonLd data={organizationJsonLd()} />

      {/* Hero: headline, intro, buttons and stats on the left, solar system on the right */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-8 pb-10 sm:gap-12 sm:px-6 sm:pt-24 sm:pb-12 lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-rise">
          <h1 className="font-display text-[2.15rem] leading-[1.08] font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Engineering software
            <br />
            <span className="text-gradient">for a connected world.</span>
          </h1>
          {/* "Jaxen Labs is " + the site description with its first letter lower-cased */}
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
            {site.name} is {site.description.charAt(0).toLowerCase()}
            {site.description.slice(1)}
          </p>
          {/* Phones: full-width stacked buttons, like an app; wider screens: side by side */}
          <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Link href="#products" className="btn-primary inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-6 font-semibold">
              Explore our products
              <span aria-hidden>↓</span>
            </Link>
            <Link href="/contact/" className="btn-ghost inline-flex h-12 items-center justify-center rounded-2xl px-6 font-medium">
              Start a conversation
            </Link>
          </div>
          {/* Stats: combined user count and number of products, then a row of product icons.
              Phones: two app-style tiles; wider screens: plain numbers side by side.
              The <dt> labels are for screen readers only (sr-only). A <dl> may only
              hold <dt>/<dd> groups, so the icon row sits outside it. */}
          <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            <dl className="grid grid-cols-2 gap-3 sm:flex sm:gap-8">
              <div className="rounded-2xl border border-border bg-surface p-4 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0">
                <dt className="sr-only">Total users</dt>
                <dd className="font-display text-3xl font-bold sm:text-5xl">
                  <span className="text-gradient">{totalDownloads.toLocaleString("en-US")}+</span>
                </dd>
                <dd className="mt-1 text-sm font-medium">Total users</dd>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-4 sm:rounded-none sm:border-0 sm:border-l sm:bg-transparent sm:p-0 sm:pl-8">
                <dt className="sr-only">Products</dt>
                <dd className="font-display text-3xl font-bold sm:text-5xl">
                  <span className="text-gradient">{apps.length}</span>
                </dd>
                <dd className="mt-1 text-sm font-medium">Live products</dd>
              </div>
            </dl>
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
          </div>
        </div>
        {/* Starts its rise animation 150ms after the text, for a staggered entrance */}
        <div className="mx-auto w-full max-w-[22rem] animate-rise pb-4 [animation-delay:150ms] sm:max-w-none sm:pb-8">
          <SolarSystem apps={apps} />
        </div>
      </section>

      {/* Scrolling strip of technologies */}
      <section aria-label="Technologies we use" className="pb-10 sm:pb-16">
        <TechMarquee items={techStack} />
      </section>

      {/* Values: three cards that fade in one after another (delay 0, 120, 240ms).
          Phones: one app-style grouped list (rows split by thin lines); from `sm` up: three cards. */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={`${GROUPED_LIST} sm:grid-cols-3 sm:gap-5`}>
          {values.map((v, i) => (
            <div key={v.title} data-reveal style={delay(i * 120)} className={`glow-card ${LIST_ROW} sm:p-8`}>
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-linear-135 from-accent/20 to-accent-3/20 text-accent ring-1 ring-accent/20 sm:size-12">
                <Icon name={v.icon} className="size-6" />
              </span>
              <div className="sm:mt-5">
                <h2 className="font-display text-lg font-semibold sm:text-2xl">{v.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted sm:mt-2">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities ("What we do"). The id lets the header link /#capabilities jump here.
          `i % 3` restarts the delay on each row of three cards. */}
      <section id="capabilities" className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-24">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-2 font-display text-[1.75rem] leading-tight font-bold tracking-tight sm:mt-3 sm:text-5xl">What we engineer.</h2>
          </div>
          <p className="max-w-sm text-sm text-muted sm:text-base">From the first idea to the store release, we design, build and maintain software end to end.</p>
        </div>
        {/* Phones: a swipeable row (focusable, so keyboard users can scroll it too); from `sm` up: a grid */}
        <div tabIndex={0} role="region" aria-label="What we engineer" className={`mt-6 sm:mt-10 ${CAROUSEL} sm:grid-cols-2 lg:grid-cols-3`}>
          {capabilities.map((c, i) => (
            <div key={c.title} data-reveal style={delay((i % 3) * 100)} className="glow-card group w-[78%] shrink-0 p-6 sm:w-auto">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent ring-1 ring-accent/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Icon name={c.icon} className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products: one AppCard per product. The id is the target of /#products links. */}
      <section id="products" className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-24">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Our products</Eyebrow>
            <h2 className="mt-2 font-display text-[1.75rem] leading-tight font-bold tracking-tight sm:mt-3 sm:text-5xl">Products we&apos;ve built.</h2>
          </div>
          <p className="max-w-sm text-sm text-muted sm:text-base">
            Our own products and work for clients, designed and engineered by our team. Open any product to see what it does.
          </p>
        </div>
        <div tabIndex={0} role="region" aria-label="Our products" className={`mt-6 sm:mt-10 ${CAROUSEL} sm:grid-cols-2 sm:gap-5 xl:grid-cols-4`}>
          {apps.map((app, i) => (
            <div key={app.slug} data-reveal style={delay(i * 120)} className="w-[78%] shrink-0 sm:w-auto">
              <AppCard app={app} />
            </div>
          ))}
        </div>
      </section>

      {/* Scrolling strip of every product's features */}
      <section aria-label="Product features" className="pt-10">
        <FeatureMarquee apps={apps} />
      </section>

      {/* Process ("How we work"): numbered steps */}
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-24">
        <div data-reveal>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-2 font-display text-[1.75rem] leading-tight font-bold tracking-tight sm:mt-3 sm:text-5xl">From idea to release.</h2>
        </div>
        <div className="relative mt-8 sm:mt-10">
          {/* Faint line joining the steps, only on wide screens where they sit in one row.
              It sits outside the <ol> because a list may only contain <li> items. */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-10 right-[12%] left-[12%] hidden h-px bg-linear-to-r from-accent/0 via-accent/40 to-accent/0 lg:block"
          />
          {/* Phones: a grouped list of steps; from `sm` up: cards in a grid */}
          <ol className={`${GROUPED_LIST} sm:grid-cols-2 sm:gap-4 lg:grid-cols-4`}>
            {process.map((p, i) => (
              <li key={p.step} data-reveal style={delay(i * 120)} className={`glow-card relative ${LIST_ROW} sm:p-6`}>
                <span className="w-10 shrink-0 font-display text-2xl font-bold text-gradient sm:w-auto sm:text-4xl">{p.step}</span>
                <div className="sm:mt-3">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted sm:mt-1.5">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact: call to action in a tinted panel, with the email and Facebook cards */}
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-24">
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
