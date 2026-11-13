import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { AppInfo } from "@/content/types";

/** The rings, inner to outer: size (inset from the edge, %) and how long a light dot takes to travel each. */
const RINGS = [
  { inset: 29, dot: 18 },
  { inset: 17, dot: 30 },
  { inset: 5, dot: 44 },
];

/**
 * Where each product sits, in display order: its ring and fixed angle (0° is
 * the top). Up to four fit without touching; the outer ring holds two,
 * opposite each other. `bob` staggers the floating so they move in rhythm.
 */
const PLACES = [
  { ring: 2, angle: 315, bob: 0 },
  { ring: 0, angle: 60, bob: 1.2 },
  { ring: 1, angle: 195, bob: 2.4 },
  { ring: 2, angle: 135, bob: 3.6 },
];

/**
 * The home hero: the JaxenLabs logo fixed at the centre as the sun, with each
 * product fixed at its own point on its own ring. Products float and pulse
 * gently in place (staggered, so they move in rhythm), while small light dots
 * travel along the rings. Each product opens its page.
 */
export function SolarSystem({ apps }: { apps: AppInfo[] }) {
  return (
    <div className="solar @container relative mx-auto grid aspect-square w-full max-w-[30rem] place-items-center">
      {/* Sun glow */}
      <div className="absolute inset-[22%] animate-pulse-glow rounded-full bg-linear-135 from-accent/45 via-accent-2/40 to-accent-3/45 blur-3xl" />

      {/* Sun: the company logo, fixed in place */}
      <div className="relative z-10 grid aspect-square w-[20%] place-items-center">
        <span className="absolute inset-[-18%] animate-spin-slow rounded-full border border-dashed border-accent-2/30" />
        <span className="absolute inset-[-6%] rounded-full bg-surface-strong shadow-[0_0_60px_-6px_rgb(34_211_238/0.6)] ring-1 ring-border backdrop-blur-xl" />
        <Image
          src="/logo.png"
          alt="JaxenLabs logo"
          width={200}
          height={200}
          priority
          className="relative h-auto w-[78%] drop-shadow-[0_10px_25px_rgb(0_80_255/0.45)]"
        />
      </div>

      {/* Rings, each with a light dot travelling along it */}
      {RINGS.map((ring) => (
        <div key={ring.inset} className="pointer-events-none absolute" style={{ inset: `${ring.inset}%` }}>
          <div className="absolute inset-0 rounded-full border border-border" />
          <div className="orbit-dot absolute inset-0" style={{ "--duration": `${ring.dot}s` } as CSSProperties}>
            <span className="absolute top-0 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2 shadow-[0_0_10px_2px_var(--accent-2)]" />
          </div>
        </div>
      ))}

      {apps.slice(0, PLACES.length).map((app, i) => {
        const place = PLACES[i];
        const angle = { "--start": `${place.angle}deg` } as CSSProperties;
        const bob = { "--bob-delay": `${-place.bob}s` } as CSSProperties;
        return (
          <div key={app.slug} className="pointer-events-none absolute z-10" style={{ inset: `${RINGS[place.ring].inset}%` }}>
            {/* The product, fixed at its angle on its ring */}
            <div className="orbit-ring absolute inset-0" style={angle}>
              <div className="absolute top-0 left-1/2 w-[10cqw] -translate-x-1/2 -translate-y-1/2">
                <div className="orbit-upright" style={angle}>
                  <div className="planet-bob" style={bob}>
                    <Link
                      href={`/${app.slug}/`}
                      aria-label={`Open ${app.name}`}
                      className="group/planet pointer-events-auto relative block"
                    >
                      <span aria-hidden className="planet-pulse absolute inset-0 rounded-[28%] ring-2 ring-accent-2/60" style={bob} />
                      <Image
                        src={app.iconSrc}
                        alt={`${app.name} icon`}
                        width={120}
                        height={120}
                        className="relative h-auto w-full rounded-[28%] shadow-[0_16px_40px_-12px_var(--shadow)] ring-1 ring-white/10 transition-transform duration-300 group-hover/planet:scale-115"
                      />
                      <span className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 translate-y-1 rounded-full border border-border bg-bg/90 px-3 py-1 text-xs font-medium whitespace-nowrap opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover/planet:translate-y-0 group-hover/planet:opacity-100">
                        {app.name} →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
