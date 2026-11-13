import Image from "next/image";
import Link from "next/link";

type HeroIcon = { src: string; name: string; href?: string };

/** Spots around the orbit for extra icons (studio home), as % offsets. */
const SATELLITES = [
  "left-[0%] top-[12%] [animation-delay:-2s]",
  "right-[0%] bottom-[10%] [animation-delay:-4s]",
  "right-[4%] top-[4%] [animation-delay:-1s]",
  "left-[4%] bottom-[2%] [animation-delay:-5s]",
];

/** One icon; a link with a hover label when it has `href`. */
function HeroImage({ icon, size, priority, className }: { icon: HeroIcon; size: number; priority?: boolean; className: string }) {
  const img = (
    <Image
      src={icon.src}
      alt={`${icon.name} icon`}
      width={size}
      height={size}
      priority={priority}
      className={`h-auto w-full rounded-[28%] ring-1 ring-white/10 transition-transform duration-500 ${className}`}
    />
  );
  if (!icon.href) return img;
  return (
    <Link href={icon.href} className="group/icon relative block" aria-label={`Open ${icon.name}`}>
      <span className="block group-hover/icon:scale-110 transition-transform duration-500">{img}</span>
      <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 translate-y-1 rounded-full border border-border bg-bg/90 px-3 py-1 text-xs font-medium whitespace-nowrap opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover/icon:translate-y-0 group-hover/icon:opacity-100">
        {icon.name} →
      </span>
    </Link>
  );
}

/**
 * An app icon floating in a pulsing glow with slow orbit rings. Extra icons
 * (the other apps, on the studio home page) float around it. Icons with an
 * `href` open that app's page.
 */
export function AppIconHero({ icons }: { icons: HeroIcon[] }) {
  const [main, ...others] = icons;
  if (!main) return null;

  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[26rem] place-items-center">
      <div className="absolute inset-[12%] animate-pulse-glow rounded-full bg-linear-135 from-accent/50 via-accent-2/40 to-accent-3/40 blur-3xl" />
      <div className="absolute inset-[4%] animate-spin-slow rounded-full border border-dashed border-accent/25">
        <span className="absolute top-1/2 -left-1 size-2 rounded-full bg-accent-2 shadow-[0_0_12px_var(--accent-2)]" />
      </div>
      <div className="absolute inset-[20%] animate-spin-reverse rounded-full border border-border">
        <span className="absolute -top-1 left-1/2 size-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
      </div>
      <div className="relative z-10 w-[52%] animate-float">
        <HeroImage icon={main} size={240} priority className="shadow-[0_30px_80px_-20px_rgb(34_211_238/0.55)]" />
      </div>
      {others.slice(0, SATELLITES.length).map((icon, i) => (
        <div key={icon.src} className={`absolute z-10 w-[24%] animate-float ${SATELLITES[i]}`}>
          <HeroImage icon={icon} size={120} className="shadow-[0_20px_50px_-16px_var(--shadow)]" />
        </div>
      ))}
    </div>
  );
}
