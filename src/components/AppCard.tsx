import Image from "next/image";
import Link from "next/link";
import type { AppInfo } from "@/content/types";

/** An app tile on the studio home page. */
export function AppCard({ app }: { app: AppInfo }) {
  return (
    <Link
      href={`/${app.slug}/`}
      className="group flex gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent"
    >
      <Image src={app.iconSrc} alt="" width={56} height={56} className="size-14 shrink-0 rounded-xl" />
      <div>
        <h3 className="font-semibold group-hover:text-accent">{app.name}</h3>
        <p className="mt-1 text-sm text-muted">{app.tagline}</p>
      </div>
    </Link>
  );
}
