import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { CopyButton } from "./CopyButton";
import { FacebookIcon } from "./FacebookLink";
import { Icon } from "./Icon";

/**
 * Email and Facebook side by side. Email has a Copy button as well as the
 * mail link, because `mailto:` does nothing without a mail app set up.
 */
export function ContactCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div data-reveal className="glow-card flex flex-col p-6 sm:p-8">
        <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent ring-1 ring-accent/25">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="size-6" aria-hidden>
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold">Email us</h3>
        <p className="mt-1.5 text-sm text-muted">Projects, partnerships, product support or privacy questions. We reply as soon as we can.</p>
        <p className="mt-5 font-display text-lg font-medium break-all text-accent select-all">{site.contactEmail}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <a href={`mailto:${site.contactEmail}`} className="btn-primary inline-flex h-12 items-center gap-2 rounded-2xl px-5 font-semibold">
            Send email
          </a>
          <CopyButton text={site.contactEmail} label="Copy address" className="h-12" />
        </div>
      </div>

      <div data-reveal style={{ "--delay": "120ms" } as CSSProperties} className="glow-card flex flex-col p-6 sm:p-8">
        <span className="grid size-12 place-items-center rounded-2xl bg-[#1877f2]/12 text-[#1877f2] ring-1 ring-[#1877f2]/25">
          <FacebookIcon className="size-6" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold">Follow on Facebook</h3>
        <p className="mt-1.5 text-sm text-muted">Company news, product updates and what we are building next.</p>
        <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted">
          <Icon name="spark" className="size-4 text-accent" />
          facebook.com · Jaxen Labs
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <a
            href={site.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2.5 rounded-2xl bg-[#1877f2] px-5 font-semibold text-white shadow-[0_10px_30px_-10px_#1877f2] transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <FacebookIcon className="size-5" />
            Open our page
          </a>
        </div>
      </div>
    </div>
  );
}
