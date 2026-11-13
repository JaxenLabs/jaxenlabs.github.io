"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type MenuApp = { slug: string; name: string; iconSrc: string; tagline: string };

/** Hamburger menu for small screens: every app, contact and Facebook. */
export function MobileMenu({ apps, facebookUrl }: { apps: MenuApp[]; facebookUrl: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close after navigating, and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-10 cursor-pointer place-items-center rounded-xl border border-border bg-surface-strong"
      >
        <span className="relative block h-3 w-4">
          <span className={`absolute left-0 h-0.5 w-4 rounded bg-current transition-all duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
          <span className={`absolute top-[5px] left-0 h-0.5 w-4 rounded bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-0 h-0.5 w-4 rounded bg-current transition-all duration-300 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
        </span>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full mt-2 animate-pop overflow-hidden rounded-2xl border border-border bg-bg p-3 shadow-[0_20px_60px_-20px_var(--shadow)] backdrop-blur-xl"
        >
          <p className="px-3 pt-1 pb-2 text-xs font-semibold tracking-[0.2em] text-accent uppercase">Apps</p>
          <ul className="grid grid-cols-[minmax(0,1fr)] gap-1">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link
                  href={`/${app.slug}/`}
                  className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent-soft"
                >
                  <Image src={app.iconSrc} alt="" width={36} height={36} className="size-9 rounded-[0.7rem]" />
                  <span className="min-w-0 flex-1 overflow-hidden">
                    <span className="block font-medium">{app.name}</span>
                    <span className="block truncate text-xs text-muted">{app.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
            <Link href="/contact/" className="btn-primary flex h-11 items-center justify-center rounded-xl font-semibold">
              Contact
            </Link>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost flex h-11 items-center justify-center rounded-xl font-medium"
            >
              Facebook
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
