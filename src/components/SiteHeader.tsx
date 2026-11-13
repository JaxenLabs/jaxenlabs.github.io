import Link from "next/link";
import { apps } from "@/content/apps";
import { site } from "@/content/site";
import { FacebookLink } from "./FacebookLink";
import { LogoMark } from "./LogoMark";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

/** Floating glass bar: logo, app links, contact, Facebook and the theme switch. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-2xl border border-border bg-bg/70 pr-2.5 pl-4 shadow-[0_8px_40px_-16px_var(--shadow)] backdrop-blur-xl">
        <Link href="/" className="group flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
          <LogoMark className="size-9 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 text-sm md:flex">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/${app.slug}/`}
              className="rounded-xl px-3 py-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
            >
              {app.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <FacebookLink className="hidden sm:grid" />
          <ThemeToggle />
          <Link
            href="/contact/"
            className="btn-primary hidden h-10 items-center rounded-xl px-4 text-sm font-semibold md:inline-flex"
          >
            Contact
          </Link>
          <MobileMenu
            apps={apps.map(({ slug, name, iconSrc, tagline }) => ({ slug, name, iconSrc, tagline }))}
            facebookUrl={site.facebookUrl}
          />
        </div>
      </div>
    </header>
  );
}
