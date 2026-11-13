"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/** Name of the event we fire when the visitor switches theme, so every toggle on the page updates. */
const THEME_EVENT = "themechange";
const SYSTEM_LIGHT = "(prefers-color-scheme: light)";

/** The theme on screen now: the one the visitor chose, or the system's. */
function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia(SYSTEM_LIGHT).matches ? "light" : "dark";
}

/**
 * Tells React when the theme may have changed: when the visitor switches it,
 * or when the device's own light/dark setting changes. Returns a clean-up.
 */
function subscribe(onChange: () => void) {
  const media = window.matchMedia(SYSTEM_LIGHT);
  media.addEventListener("change", onChange);
  window.addEventListener(THEME_EVENT, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(THEME_EVENT, onChange);
  };
}

/**
 * Sun/moon button that switches light and dark mode and remembers the choice
 * in localStorage (the browser's small per-site storage). Setting
 * `data-theme` on <html> swaps the colour tokens in globals.css; the inline
 * script in layout.tsx re-applies the saved choice on the next visit.
 *
 * "use client": this runs in the browser because it reacts to clicks and
 * reads localStorage and the system colour setting.
 *
 * Used by: src/components/SiteHeader.tsx
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // useSyncExternalStore is React's safe way to read something that lives
  // outside React (here: the page's theme). On the server, and while React
  // first takes over the page, it uses the third argument (null = "unknown"),
  // so the pre-built HTML always matches; then it switches to the real theme.
  const theme = useSyncExternalStore<Theme | null>(subscribe, currentTheme, () => null);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  // While unknown (null), assume dark (the default theme). The HTML built ahead of
  // time must match what the browser first draws, or React complains during
  // "hydration" (the step where React takes over the pre-built HTML).
  const isDark = theme === null ? true : theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`relative grid size-10 cursor-pointer place-items-center overflow-hidden rounded-xl border border-border bg-surface-strong text-muted transition-colors hover:border-accent/50 hover:text-accent ${className}`}
    >
      {/* Both icons are always drawn on top of each other; one spins and shrinks
          away while the other grows in. Sun shows in dark mode (click for light). */}
      {/* Sun */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
        aria-hidden
        className={`absolute size-[1.125rem] transition-all duration-500 ${isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Moon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={`absolute size-[1.125rem] transition-all duration-500 ${isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
