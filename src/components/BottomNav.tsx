"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Just the product fields the sheet needs. The header passes only these (not
 * whole products with their long texts), because everything given to a
 * client component is copied into the page for the browser.
 */
export type NavProduct = { slug: string; name: string; iconSrc: string; tagline: string; client?: string };

/** Small line icons for the tabs (24×24 grid). */
const TAB_ICONS: Record<string, ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z" />,
  products: <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" />,
  services: <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />,
  contact: <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm-1 2 9 6 9-6" />,
};

function TabIcon({ name }: { name: keyof typeof TAB_ICONS }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden>
      {TAB_ICONS[name]}
    </svg>
  );
}

/** Shared look of one tab: icon above a label, highlighted when active. */
function tabClass(active: boolean) {
  return `relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 py-2 text-[0.7rem] font-medium transition-colors active:scale-95 ${
    active ? "text-accent" : "text-muted"
  }`;
}

/** The little glowing pill above the active tab. */
function ActiveDot({ show }: { show: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute top-0 h-1 w-8 rounded-full bg-accent shadow-[0_0_12px_var(--accent)] transition-transform duration-300 ${show ? "scale-100" : "scale-0"}`}
    />
  );
}

/**
 * The app-style tab bar fixed to the bottom of the screen on phones and
 * tablets (hidden from the `lg` desktop width up). Tabs: Home, Products,
 * Services and Contact. "Products" slides up a bottom sheet listing every
 * product, like a native app.
 *
 * It leaves room for the phone's home indicator with
 * `env(safe-area-inset-bottom)` (works because layout.tsx sets
 * `viewportFit: "cover"`).
 *
 * "use client": this runs in the browser because it knows the current page,
 * opens and closes the sheet on taps, and listens for the Escape key.
 *
 * Used by: src/app/layout.tsx
 */
export function BottomNav({ products }: { products: NavProduct[] }) {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = () => setSheetOpen(false);

  // While the sheet is open: close it with Escape, and stop the page behind it from scrolling.
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheetOpen(false);
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [sheetOpen]);

  // Which tab is "current": Home on the home page, Products on any product
  // page (or while the sheet is open), Contact on the contact page.
  const onProductPage = products.some((p) => pathname.startsWith(`/${p.slug}/`));
  const active = {
    home: pathname === "/" && !sheetOpen,
    products: sheetOpen || onProductPage,
    contact: pathname.startsWith("/contact") && !sheetOpen,
  };

  return (
    <div className="lg:hidden">
      {/* Bottom sheet with every product (only rendered while open) */}
      {sheetOpen && (
        <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label="Products">
          {/* Dimmed backdrop: tap to close */}
          <button type="button" aria-label="Close products" onClick={closeSheet} className="absolute inset-0 animate-fade bg-black/50 backdrop-blur-sm" />
          <div className="absolute inset-x-0 bottom-0 max-h-[80dvh] animate-sheet overflow-y-auto overscroll-contain rounded-t-[1.75rem] border-t border-border bg-bg px-4 pt-3 pb-[calc(5.5rem+env(safe-area-inset-bottom))] shadow-[0_-20px_60px_-20px_var(--shadow)]">
            {/* Drag-handle look, like native sheets */}
            <div aria-hidden className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="font-display text-xl font-bold">Products</p>
              <Link href="/#products" onClick={closeSheet} className="text-sm font-medium text-accent">
                See all
              </Link>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/${product.slug}/`}
                    onClick={closeSheet}
                    className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-surface p-3 transition-transform active:scale-[0.98]"
                  >
                    <Image src={product.iconSrc} alt="" width={56} height={56} className="size-14 shrink-0 rounded-2xl" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{product.name}</span>
                      <span className="mt-0.5 line-clamp-2 block text-xs text-muted">{product.tagline}</span>
                      {product.client && <span className="mt-1 block text-[0.7rem] font-medium text-accent-3">Client project</span>}
                    </span>
                    <span aria-hidden className="text-muted">
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* The tab bar itself */}
      <nav
        aria-label="App navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-2xl items-stretch px-2">
          <Link href="/" onClick={closeSheet} aria-current={active.home ? "page" : undefined} className={tabClass(active.home)}>
            <ActiveDot show={active.home} />
            <TabIcon name="home" />
            Home
          </Link>
          <button
            type="button"
            onClick={() => setSheetOpen((open) => !open)}
            aria-expanded={sheetOpen}
            className={tabClass(active.products)}
          >
            <ActiveDot show={active.products} />
            <TabIcon name="products" />
            Products
          </button>
          <Link href="/#capabilities" onClick={closeSheet} className={tabClass(false)}>
            <ActiveDot show={false} />
            <TabIcon name="services" />
            Services
          </Link>
          <Link href="/contact/" onClick={closeSheet} aria-current={active.contact ? "page" : undefined} className={tabClass(active.contact)}>
            <ActiveDot show={active.contact} />
            <TabIcon name="contact" />
            Contact
          </Link>
        </div>
      </nav>
    </div>
  );
}
