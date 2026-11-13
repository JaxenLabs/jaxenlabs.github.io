"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Page-wide motion, mounted once in the layout and re-run on every route:
 * - fades `[data-reveal]` elements in as they scroll into view;
 * - moves the spotlight on `.glow-card`s with the pointer;
 * - shows a reading-progress bar and a back-to-top button.
 *
 * "use client": this runs in the browser because it watches scrolling and
 * pointer movement, which only exist in a real browser window.
 *
 * Used by: src/app/layout.tsx
 */
export function Effects() {
  // Changes on every page change, so the effects below re-run for the new page.
  const pathname = usePathname();
  // How far down the page the visitor has scrolled, from 0 (top) to 1 (bottom).
  const [progress, setProgress] = useState(0);

  // 1. Scroll reveal. An IntersectionObserver is a browser helper that tells us
  // when an element enters the screen; we then add `is-visible`, and the CSS
  // in globals.css fades it in. Each element is revealed once, then forgotten.
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      // Trigger slightly before the bottom edge, once 8% of the element shows.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    items.forEach((el) => observer.observe(el));
    // Clean-up: stop watching when the page changes or the component unmounts.
    return () => observer.disconnect();
  }, [pathname]);

  // 2. Card spotlight. One listener on the whole document (cheaper than one per
  // card) writes the pointer position into the card's --mx/--my CSS variables,
  // which the .glow-card::before gradient in globals.css uses as its centre.
  useEffect(() => {
    function onMove(e: PointerEvent) {
      const card = (e.target as Element | null)?.closest<HTMLElement>(".glow-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  // 3. Reading progress: recalculated on scroll and on window resize.
  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Show the back-to-top button once the visitor is 15% down the page.
  const showTop = progress > 0.15;
  return (
    <>
      {/* Thin gradient bar along the top edge; scaleX stretches it from 0 to full width */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-linear-to-r from-accent via-accent-2 to-accent-3"
        style={{ transform: `scaleX(${progress})` }}
      />
      {/* Back-to-top button (above the tab bar on phones and tablets). When hidden it is
          also removed from keyboard tab order. */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={`fixed right-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-40 grid size-12 cursor-pointer place-items-center rounded-2xl border border-border bg-surface-strong text-accent shadow-[0_10px_30px_-10px_var(--shadow)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 lg:right-6 lg:bottom-6 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5" aria-hidden>
          <path d="M12 19V5m-6 6 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
