import Link from "next/link";
import { site } from "@/content/site";
import { FacebookLink } from "./FacebookLink";
import { LogoMark } from "./LogoMark";

/** Floating glass bar with the studio name. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border border-border bg-bg/60 pr-2 pl-4 shadow-[0_8px_40px_-12px_rgb(0_0_0/0.6)] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
          <LogoMark className="size-8" />
          {site.name}
        </Link>
        <nav className="flex items-center gap-1.5 text-sm">
          <Link href="/#apps" className="hidden rounded-xl px-3 py-2 text-muted transition-colors hover:text-text sm:block">
            Apps
          </Link>
          <FacebookLink />
          <a
            href={`mailto:${site.contactEmail}`}
            className="rounded-xl border border-border bg-surface-strong px-4 py-2 font-medium transition-colors hover:border-accent/50 hover:text-accent"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
