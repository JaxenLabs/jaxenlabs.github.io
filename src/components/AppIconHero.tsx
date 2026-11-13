import Image from "next/image";

type HeroIcon = { src: string; name: string };

/** Spots around the orbit for extra icons (studio home), as % offsets. */
const SATELLITES = [
  "left-[2%] top-[14%] [animation-delay:-2s]",
  "right-[0%] bottom-[12%] [animation-delay:-4s]",
  "right-[4%] top-[6%] [animation-delay:-1s]",
  "left-[6%] bottom-[4%] [animation-delay:-5s]",
];

/**
 * An app icon floating in a pulsing glow with slow orbit rings. Extra icons
 * (the other apps, on the studio home page) float around it.
 */
export function AppIconHero({ icons }: { icons: HeroIcon[] }) {
  const [main, ...others] = icons;
  if (!main) return null;

  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[26rem] place-items-center">
      <div className="absolute inset-[12%] animate-pulse-glow rounded-full bg-linear-135 from-accent/50 via-accent-2/40 to-accent-3/40 blur-3xl" />
      <div className="absolute inset-[4%] animate-spin-slow rounded-full border border-dashed border-accent/20" />
      <div className="absolute inset-[20%] rounded-full border border-border">
        <span className="absolute -top-1 left-1/2 size-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
      </div>
      <div className="w-[52%] animate-float">
        <Image
          src={main.src}
          alt={`${main.name} icon`}
          width={240}
          height={240}
          priority
          className="h-auto w-full rounded-[28%] shadow-[0_30px_80px_-20px_rgb(34_211_238/0.55)] ring-1 ring-white/10"
        />
      </div>
      {others.slice(0, SATELLITES.length).map((icon, i) => (
        <div key={icon.src} className={`absolute w-[24%] animate-float ${SATELLITES[i]}`}>
          <Image
            src={icon.src}
            alt={`${icon.name} icon`}
            width={120}
            height={120}
            className="h-auto w-full rounded-[28%] shadow-[0_20px_50px_-16px_rgb(0_0_0/0.8)] ring-1 ring-white/10"
          />
        </div>
      ))}
    </div>
  );
}
