import { Icon } from "./Icon";

/**
 * An endless, scrolling strip of the technologies we build with (names come
 * from `techStack` in src/content/company). Pauses on hover.
 *
 * Used by: src/app/page.tsx
 */
export function TechMarquee({ items }: { items: string[] }) {
  // Rendered twice: the animation slides left by -50%, where the second copy
  // takes the first one's place, so the loop is seamless. The copy is hidden
  // from screen readers so names aren't read out twice.
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
