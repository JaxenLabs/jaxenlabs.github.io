import Link from "next/link";
import type { AppInfo } from "@/content/types";
import { Icon } from "./Icon";

/** An endless strip of every app's features; each chip opens its app. Pauses on hover. */
export function FeatureMarquee({ apps }: { apps: AppInfo[] }) {
  const chips = apps.flatMap((app) => app.features.map((f) => ({ ...f, app })));
  // Rendered twice so the -50% loop is seamless; the copy is hidden from screen readers.
  return (
    <div className="marquee-mask overflow-hidden py-2">
      <div className="flex w-max animate-marquee gap-3">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex gap-3" aria-hidden={copy === 1 || undefined}>
            {chips.map((chip) => (
              <li key={`${chip.app.slug}-${chip.title}`}>
                <Link
                  href={`/${chip.app.slug}/`}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="flex items-center gap-2.5 rounded-full border border-border bg-surface py-2 pr-4 pl-2 text-sm whitespace-nowrap backdrop-blur transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon name={chip.icon} className="size-4" />
                  </span>
                  {chip.title}
                  <span className="text-xs text-muted">· {chip.app.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
