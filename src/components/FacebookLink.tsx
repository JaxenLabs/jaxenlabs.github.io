import { site } from "@/content/site";

/**
 * The Facebook "f" logo as an inline SVG. `fill="currentColor"` means it takes
 * the text colour of whatever it sits in.
 *
 * Used by: FacebookLink below, ContactCards.tsx and SiteFooter.tsx
 */
export function FacebookIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}

/**
 * Small square icon button linking to the Jaxen Labs Facebook page (opens in
 * a new tab). `noopener noreferrer` stops the new tab from controlling ours.
 *
 * Used by: src/components/SiteHeader.tsx
 */
export function FacebookLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${site.name} on Facebook`}
      className={`grid size-10 place-items-center rounded-xl border border-border bg-surface-strong text-muted transition-colors hover:border-[#1877f2]/60 hover:text-[#4b93ff] ${className}`}
    >
      <FacebookIcon className="size-[1.125rem]" />
    </a>
  );
}
