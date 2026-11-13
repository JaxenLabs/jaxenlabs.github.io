"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Titles for pages that aren't products ("/contact/" → "Contact"). Products are looked up by slug. */
const PAGE_TITLES: Record<string, string> = { contact: "Contact", "privacy-policy": "Privacy Policy", terms: "Terms" };

/**
 * The left side of the app bar.
 *
 * - Desktop, and the home page on any screen: the logo and company name
 *   (passed in as `brand`).
 * - Phones and tablets on any other page: a "‹" back button plus the page
 *   title, like a native app. Back goes one level up the address:
 *   /jaxscan/privacy-policy/ → /jaxscan/ → home.
 *
 * "use client": this runs in the browser because it reads the current
 * address (usePathname) to decide what to show.
 *
 * Used by: src/components/SiteHeader.tsx
 */
export function AppBarTitle({ brand, productNames }: { brand: ReactNode; productNames: Record<string, string> }) {
  const pathname = usePathname();
  // "/jaxscan/privacy-policy/" → ["jaxscan", "privacy-policy"]
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return <>{brand}</>;

  const last = parts[parts.length - 1];
  const title = productNames[last] ?? PAGE_TITLES[last] ?? "";
  // One level up; a product page goes back to the products on the home page.
  const parent = parts.length > 1 ? `/${parts.slice(0, -1).join("/")}/` : productNames[last] ? "/#products" : "/";

  return (
    <>
      {/* Desktop keeps the logo and name */}
      <div className="hidden lg:block">{brand}</div>
      {/* Phones and tablets: back button and page title */}
      <div className="flex min-w-0 items-center gap-1 lg:hidden">
        <Link
          href={parent}
          aria-label="Back"
          className="-ml-2 grid size-10 shrink-0 place-items-center rounded-xl text-accent transition-transform active:scale-90"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden>
            <path d="m15 5-7 7 7 7" />
          </svg>
        </Link>
        <span className="truncate font-display text-lg font-semibold">{title}</span>
      </div>
    </>
  );
}
