import Link from "next/link";
import { apps } from "@/content/apps";
import { site } from "@/content/site";
import { AppBarTitle } from "./AppBarTitle";
import { FacebookLink } from "./FacebookLink";
import { LogoMark } from "./LogoMark";
import { ThemeToggle } from "./ThemeToggle";

/** The links in the desktop navigation. `/#products` jumps to that section on the home page. */
const NAV = [
  { href: "/#capabilities", label: "What we do" },
  { href: "/#products", label: "Products" },
  { href: "/contact/", label: "Contact" },
];

/**
 * The bar at the top of every page. It stays stuck to the top while
 * scrolling (`sticky top-0`).
 *
 * - Desktop (`lg` and wider): a floating "glass" bar with the logo, section
 *   links, Facebook, the light/dark switch and a Contact button.
 * - Phones and tablets: a compact app bar: the logo on the home page, or a
 *   back button and page title elsewhere (AppBarTitle), plus the light/dark
 *   switch. Navigation moves to the BottomNav tab bar.
 *
 * `pt-[env(safe-area-inset-top)]` keeps it below a phone's notch or status
 * bar (see `viewportFit: "cover"` in layout.tsx).
 *
 * This is a server component (no "use client"): it is turned into plain HTML
 * at build time; only AppBarTitle and ThemeToggle inside it run in the browser.
 *
 * Used by: src/app/layout.tsx
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 pt-[env(safe-area-inset-top)] lg:px-6 lg:pt-4">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 border-b border-border bg-bg/80 px-4 backdrop-blur-xl lg:h-16 lg:rounded-2xl lg:border lg:bg-bg/70 lg:pr-2.5 lg:pl-4 lg:shadow-[0_8px_40px_-16px_var(--shadow)]">
        {/* Logo and name (desktop and home page), or a back button and page title (phone/tablet sub-pages) */}
        <AppBarTitle
          productNames={Object.fromEntries(apps.map((app) => [app.slug, app.name]))}
          brand={
            <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
              <LogoMark className="size-8 lg:size-9" />
              {site.name}
            </Link>
          }
        />

        {/* Section links: desktop only (phones and tablets use the bottom tab bar) */}
        <nav aria-label="Main" className="hidden items-center gap-1 text-sm lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Facebook (desktop), theme switch, Contact button (desktop) */}
        <div className="flex items-center gap-1.5">
          <FacebookLink className="hidden lg:grid" />
          <ThemeToggle />
          <Link href="/contact/" className="btn-primary hidden h-10 items-center rounded-xl px-4 text-sm font-semibold lg:inline-flex">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
