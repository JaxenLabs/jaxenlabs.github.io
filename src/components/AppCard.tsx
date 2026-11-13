import Image from "next/image";
import Link from "next/link";
import type { AppInfo } from "@/content/types";

/** A large app tile on the home page; the whole card opens the app's page. */
export function AppCard({ app }: { app: AppInfo }) {
  return (
    <Link href={`/${app.slug}/`} className="glow-card is-link group flex h-full flex-col overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-accent/10 blur-3xl transition-colors duration-500 group-hover:bg-accent-2/25" />
      <div className="flex items-start justify-between gap-4">
        <Image
          src={app.iconSrc}
          alt={`${app.name} icon`}
          width={88}
          height={88}
          className="size-20 rounded-[1.4rem] shadow-[0_16px_40px_-12px_rgb(34_211_238/0.5)] ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
        />
        <span className="grid size-10 place-items-center rounded-full border border-border text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-[#04120d]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4 -rotate-45" aria-hidden>
            <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">{app.name}</h3>
      {app.client && (
        <p className="mt-2 w-fit rounded-full border border-accent-3/30 bg-accent-3/10 px-2.5 py-0.5 text-xs font-medium text-accent-3">
          Client project · {app.client}
        </p>
      )}
      <p className="mt-2 flex-1 text-muted">{app.tagline}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {app.features.slice(0, 3).map((f) => (
          <span key={f.title} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
            {f.title}
          </span>
        ))}
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Learn more
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
