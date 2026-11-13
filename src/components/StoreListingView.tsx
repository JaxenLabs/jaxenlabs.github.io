import type { CSSProperties } from "react";
import type { AppInfo } from "@/content/types";
import { RichText } from "./RichText";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Splits "📊 1. SMART EXPENSE TRACKER" into its emoji and the rest. */
function splitEmoji(heading: string): [string, string] {
  const m = heading.match(/^([^\p{L}\p{N}\s]+(?:️)?)\s*(.*)$/u);
  return m ? [m[1], m[2]] : ["", heading];
}

/**
 * The app's Google Play description, word for word: each headed section as
 * a card (paragraphs and bullet lists in order). The short description and
 * intro paragraphs are the page's tagline and hero text.
 */
export function StoreListingView({ app }: { app: AppInfo }) {
  const { store } = app;
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
      <div data-reveal className="max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">About {app.name}</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{store.title}</h2>
      </div>

      {store.sectionsTitle && (
        <p data-reveal className="mt-12 font-display text-lg font-semibold tracking-wide">
          {store.sectionsTitle}
        </p>
      )}

      <div className="mt-6 columns-1 gap-4 md:columns-2 xl:columns-3">
        {store.sections.map((section, i) => {
          const [emoji, title] = splitEmoji(section.heading);
          return (
            <article
              key={section.heading}
              data-reveal
              style={delay((i % 3) * 80)}
              className="glow-card mb-4 break-inside-avoid p-6"
            >
              <h3 className="flex items-start gap-3 font-display text-base font-semibold tracking-wide">
                {emoji && (
                  <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-lg">
                    {emoji}
                  </span>
                )}
                <span className="pt-1.5">{title}</span>
              </h3>
              {section.blocks.map((block, j) =>
                block.kind === "paragraph" ? (
                  <p key={j} className="mt-3 text-sm leading-relaxed text-text/80">
                    <RichText text={block.text} />
                  </p>
                ) : (
                  <ul key={j} className="mt-3 grid list-disc gap-1.5 pl-5 text-sm leading-relaxed text-text/80 marker:text-accent">
                    {block.items.map((item) => (
                      <li key={item}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
