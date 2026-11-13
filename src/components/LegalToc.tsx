"use client";

import { useEffect, useState } from "react";

/**
 * The contents list beside a legal document. Highlights the section being
 * read, so long policies are easy to follow.
 */
export function LegalToc({ items }: { items: { id: string; heading: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

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
