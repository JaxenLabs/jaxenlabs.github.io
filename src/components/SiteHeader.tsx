import Link from "next/link";
import { site } from "@/content/site";

/** Sticky top bar with the studio name. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-lg bg-accent-soft text-sm font-bold text-accent">
            J
          </span>
          {site.name}
        </Link>
        <a href={`mailto:${site.contactEmail}`} className="text-sm text-muted hover:text-text">
          Contact
        </a>
      </div>
    </header>
  );
}
