import Image from "next/image";

/** The JaxenLabs logo mark (public/logo.png, transparent). */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={72}
      height={72}
      className={`shrink-0 object-contain drop-shadow-[0_4px_12px_rgb(0_90_255/0.35)] ${className}`}
    />
  );
}
