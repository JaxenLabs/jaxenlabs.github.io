import Image from "next/image";
import Link from "next/link";
import type { AppInfo } from "@/content/types";

/** A large app tile on the studio home page. */
export function AppCard({ app }: { app: AppInfo }) {
  return (
    <Link href={`/${app.slug}/`} className="glow-card group flex flex-col overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:bg-accent-2/20" />
      <div className="flex items-start justify-between gap-4">
        <Image
          src={app.iconSrc}
          alt=""
          width={88}
          height={88}
          className="size-20 rounded-[1.4rem] shadow-[0_16px_40px_-12px_rgb(34_211_238/0.5)] ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
        />
        <span className="grid size-10 place-items-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-[#04120d]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4" aria-hidden>
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">{app.name}</h3>
      <p className="mt-2 text-muted">{app.tagline}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {app.features.slice(0, 3).map((f) => (
          <span key={f.title} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
            {f.title}
          </span>
        ))}
      </div>
    </Link>
  );
}
