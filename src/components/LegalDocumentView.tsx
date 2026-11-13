import Image from "next/image";
import Link from "next/link";
import type { AppInfo, LegalDocument } from "@/content/types";
import { JsonLd } from "./JsonLd";
import { LegalToc } from "./LegalToc";
import { RichText } from "./RichText";
import { breadcrumbJsonLd } from "@/lib/seo";

/** Turns "2. Camera, photos and voice" into the anchor id "camera-photos-and-voice". */
function sectionId(heading: string): string {
  return heading
    .replace(/^\d+\.\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * A full legal page (Privacy Policy or Terms): a header card with the
 * product's name, the title and date, a contents list (sticky beside the text
 * on wide screens) and the sections.
 *
 * Used by: src/app/[slug]/privacy-policy/page.tsx and src/app/[slug]/terms/page.tsx
 */
export function LegalDocumentView({ app, doc }: { app: AppInfo; doc: LegalDocument }) {
  // One entry per section for the contents list: its anchor id and heading.
  const tocItems = doc.sections.map((s) => ({ id: sectionId(s.heading), heading: s.heading }));
  // A link to the product's *other* legal page (Terms when reading the Privacy
  // Policy, and the other way round), or nothing if that page doesn't exist.
  const otherDoc =
    doc === app.privacy
      ? app.terms && { href: `/${app.slug}/terms/`, title: app.terms.title }
      : app.privacy && { href: `/${app.slug}/privacy-policy/`, title: app.privacy.title };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-10 lg:pt-14">
      {/* Breadcrumb trail for search engines: Jaxen Labs > Product > this document */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...breadcrumbJsonLd([
            { name: app.name, path: `/${app.slug}/` },
            { name: doc.title, path: doc === app.privacy ? `/${app.slug}/privacy-policy/` : `/${app.slug}/terms/` },
          ]),
        }}
      />
      {/* Header card: link back to the product, title and effective date */}
      <header className="relative animate-rise overflow-hidden rounded-3xl border border-border bg-surface p-6 backdrop-blur sm:p-10">
        <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-accent/15 blur-3xl" />
        <Link
          href={`/${app.slug}/`}
          className="relative inline-flex items-center gap-2.5 rounded-full border border-border bg-bg/50 py-1 pr-4 pl-1 text-sm text-muted transition-colors hover:text-text"
        >
          <Image src={app.iconSrc} alt="" width={28} height={28} className="size-7 rounded-full" />
          {app.name}
        </Link>
        <h1 className="relative mt-4 font-display text-3xl font-bold tracking-tight sm:mt-5 sm:text-5xl">{doc.title}</h1>
        <p className="relative mt-3 inline-flex items-center gap-2 text-sm text-muted">
          <span className="size-1.5 rounded-full bg-accent" />
          {doc.dateLabel ?? "Effective date"}: {doc.effectiveDate}
        </p>
      </header>

      {/* Two columns on wide screens: contents on the left, the document on the right */}
      <div className="mt-6 grid gap-8 lg:mt-10 lg:grid-cols-[16rem_1fr] lg:gap-10">
        <nav aria-label="Contents" className="lg:sticky lg:top-24 lg:self-start">
          {/* Phones and tablets: a tap-to-open panel, so the document starts right away.
              <details>/<summary> is a built-in HTML disclosure; no JavaScript needed. */}
          <details className="group rounded-2xl border border-border bg-surface backdrop-blur lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-medium [&::-webkit-details-marker]:hidden">
              <span>
                Contents <span className="text-sm font-normal text-muted">· {doc.sections.length} sections</span>
              </span>
              <span aria-hidden className="text-muted transition-transform duration-300 group-open:rotate-180">
                ⌄
              </span>
            </summary>
            <div className="border-t border-border px-3 pb-3">
              <LegalToc items={tocItems} />
            </div>
          </details>
          {/* Desktop: always open, sticky beside the text */}
          <div className="hidden rounded-2xl border border-border bg-surface p-5 backdrop-blur lg:block">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Contents</p>
            <LegalToc items={tocItems} />
          </div>
          {otherDoc && (
            <Link
              href={otherDoc.href}
              className="mt-3 flex items-center justify-between rounded-2xl border border-border px-5 py-3 text-sm text-muted transition-colors hover:border-accent/50 hover:text-text"
            >
              {otherDoc.title}
              <span aria-hidden>→</span>
            </Link>
          )}
        </nav>

        {/* The document text; max-w-[70ch] keeps lines short enough to read comfortably */}
        <article className="min-w-0 max-w-[70ch] leading-relaxed">
          {doc.intro && <p className="text-lg text-text">{doc.intro}</p>}
          {/* Each section gets an id so the contents links (#id) can jump to it.
              Every section except the very first gets a divider line above it. */}
          {doc.sections.map((s, i) => (
            <section
              key={s.heading}
              id={sectionId(s.heading)}
              className={i === 0 && !doc.intro ? "" : "mt-12 border-t border-border pt-10"}
            >
              <h2 className="font-display text-2xl font-semibold tracking-tight">{s.heading}</h2>
              {/* A section is a list of blocks: either a paragraph or a bullet list */}
              {s.blocks.map((block, j) =>
                block.kind === "paragraph" ? (
                  <p key={j} className="mt-4 text-text/80">
                    <RichText text={block.text} />
                  </p>
                ) : (
                  <ul key={j} className="mt-4 grid list-disc gap-2.5 pl-5 text-text/80 marker:text-accent">
                    {block.items.map((item) => (
                      <li key={item}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
