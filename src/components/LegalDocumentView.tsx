import Image from "next/image";
import Link from "next/link";
import type { AppInfo, LegalDocument } from "@/content/types";
import { RichText } from "./RichText";

/** Turns "2. Camera, photos and voice" into the anchor id "camera-photos-and-voice". */
function sectionId(heading: string): string {
  return heading
    .replace(/^\d+\.\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * A full legal page: app header card, title, date, a contents list (sticky
 * beside the text on wide screens) and the sections.
 */
export function LegalDocumentView({ app, doc }: { app: AppInfo; doc: LegalDocument }) {
  const otherDoc =
    doc === app.privacy
      ? app.terms && { href: `/${app.slug}/terms/`, title: app.terms.title }
      : { href: `/${app.slug}/privacy-policy/`, title: app.privacy.title };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
      <header className="relative animate-rise overflow-hidden rounded-3xl border border-border bg-surface p-6 backdrop-blur sm:p-10">
        <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-accent/15 blur-3xl" />
        <Link
          href={`/${app.slug}/`}
          className="relative inline-flex items-center gap-2.5 rounded-full border border-border bg-bg/50 py-1 pr-4 pl-1 text-sm text-muted transition-colors hover:text-text"
        >
          <Image src={app.iconSrc} alt="" width={28} height={28} className="size-7 rounded-full" />
          {app.name}
        </Link>
        <h1 className="relative mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">{doc.title}</h1>
        <p className="relative mt-3 inline-flex items-center gap-2 text-sm text-muted">
          <span className="size-1.5 rounded-full bg-accent" />
          {doc.dateLabel ?? "Effective date"}: {doc.effectiveDate}
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[16rem_1fr]">
        <nav aria-label="Contents" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-surface p-5 backdrop-blur">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Contents</p>
            <ol className="mt-4 grid gap-1 text-sm">
              {doc.sections.map((s) => (
                <li key={s.heading}>
                  <a
                    href={`#${sectionId(s.heading)}`}
                    className="block rounded-lg px-2 py-1.5 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
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

        <article className="min-w-0 max-w-[70ch] leading-relaxed">
          {doc.intro && <p className="text-lg text-text">{doc.intro}</p>}
          {doc.sections.map((s, i) => (
            <section
              key={s.heading}
              id={sectionId(s.heading)}
              className={i === 0 && !doc.intro ? "" : "mt-12 border-t border-border pt-10"}
            >
              <h2 className="font-display text-2xl font-semibold tracking-tight">{s.heading}</h2>
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
