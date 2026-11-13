import { Icon } from "./Icon";

/** An endless strip of the tools we build with. Pauses on hover. */
export function TechMarquee({ items }: { items: string[] }) {
  // Rendered twice so the -50% loop is seamless; the copy is hidden from screen readers.
  return (
    <div className="marquee-mask overflow-hidden py-2">
      <div className="flex w-max animate-marquee gap-3">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex gap-3" aria-hidden={copy === 1 || undefined}>
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 rounded-full border border-border bg-surface py-2 pr-4 pl-2 text-sm font-medium whitespace-nowrap backdrop-blur"
              >
                <span className="grid size-7 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon name="code" className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
