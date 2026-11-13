import Image from "next/image";

/**
 * The big product icon on each product page (`/<slug>/`): the icon floats
 * gently inside a soft glow, with two slow orbit rings around it.
 *
 * Used by: src/app/[slug]/page.tsx
 */
export function AppIconHero({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[26rem] place-items-center">
      {/* Soft glow behind the icon */}
      <div className="absolute inset-[12%] animate-pulse-glow rounded-full bg-linear-135 from-accent/50 via-accent-2/40 to-accent-3/40 blur-3xl" />

      {/* Outer dashed ring, turning slowly */}
      <div className="absolute inset-[4%] animate-spin-slow rounded-full border border-dashed border-accent/25">
        <span className="absolute top-1/2 -left-1 size-2 rounded-full bg-accent-2 shadow-[0_0_12px_var(--accent-2)]" />
      </div>

      {/* Inner ring, turning the other way */}
      <div className="absolute inset-[20%] animate-spin-reverse rounded-full border border-border">
        <span className="absolute -top-1 left-1/2 size-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
      </div>

      {/* The icon itself */}
      <div className="relative z-10 w-[52%] animate-float">
        <Image
          src={src}
          alt={`${name} icon`}
          width={240}
          height={240}
          priority
          className="h-auto w-full rounded-[28%] shadow-[0_30px_80px_-20px_rgb(34_211_238/0.55)] ring-1 ring-white/10"
        />
      </div>
    </div>
  );
}
