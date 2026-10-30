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
 * A full legal page: app breadcrumb, title, effective date, a contents list
 * (sticky beside the text on wide screens) and the numbered sections.
 */
export function LegalDocumentView({ app, doc }: { app: AppInfo; doc: LegalDocument }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href={`/${app.slug}/`} className="inline-flex items-center gap-2 text-sm text-muted hover:text-text">
        <Image src={app.iconSrc} alt="" width={24} height={24} className="rounded-md" />
        {app.name}
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{doc.title}</h1>
      <p className="mt-2 text-sm text-muted">Effective date: {doc.effectiveDate}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="Contents" className="lg:sticky lg:top-20 lg:self-start">
          <p className="text-xs font-semibold tracking-wider text-muted uppercase">Contents</p>
          <ol className="mt-3 grid gap-2 text-sm">
            {doc.sections.map((s) => (
              <li key={s.heading}>
                <a href={`#${sectionId(s.heading)}`} className="text-muted hover:text-accent">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0 max-w-prose leading-relaxed">
          <p className="text-lg">{doc.intro}</p>
          {doc.sections.map((s) => (
            <section key={s.heading} id={sectionId(s.heading)} className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">{s.heading}</h2>
              {s.blocks.map((block, i) =>
                block.kind === "paragraph" ? (
                  <p key={i} className="mt-3 text-text/90">
                    <RichText text={block.text} />
                  </p>
                ) : (
                  <ul key={i} className="mt-3 grid list-disc gap-2 pl-5 text-text/90 marker:text-accent">
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
