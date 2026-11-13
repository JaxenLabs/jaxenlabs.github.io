"use client";

import { useEffect, useState } from "react";

/**
 * The contents list beside a legal document. Highlights the section being
 * read, so long policies are easy to follow.
 *
 * "use client": this runs in the browser because it watches scrolling to
 * know which section is on screen.
 *
 * Used by: src/components/LegalDocumentView.tsx
 */
export function LegalToc({ items }: { items: { id: string; heading: string }[] }) {
  // The id of the section currently being read; starts on the first one.
  const [active, setActive] = useState(items[0]?.id);

  // An IntersectionObserver (a browser helper that reports when elements enter
  // or leave the screen) watches every section. The rootMargin shrinks the
  // "watch zone" to a band near the top of the screen (from 20% down to 35%
  // down), so a section counts as "being read" when its top reaches that band.
  // If several are in the band, the highest one wins.
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <ol className="mt-4 grid gap-1 text-sm">
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className={`relative block rounded-lg py-1.5 pr-2 pl-4 transition-colors ${
                isActive ? "bg-accent-soft font-medium text-accent" : "text-muted hover:text-text"
              }`}
            >
              {/* Small accent bar on the left that grows in for the active item */}
              <span
                className={`absolute top-1/2 left-1.5 h-4 w-0.5 -translate-y-1/2 rounded bg-accent transition-transform duration-300 ${
                  isActive ? "scale-y-100" : "scale-y-0"
                }`}
              />
              {item.heading}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
