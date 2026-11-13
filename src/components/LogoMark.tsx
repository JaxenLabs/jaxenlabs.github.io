/** The JaxenLabs "J" on a mint-to-blue gradient tile. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative grid place-items-center rounded-xl bg-linear-135 from-accent via-accent-2 to-accent-3 font-display font-bold text-[#04120d] shadow-[0_0_24px_-4px_rgb(52_227_160/0.7)] ${className}`}
    >
      J
    </span>
  );
}
