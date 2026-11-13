import type { IconName } from "@/content/types";

/**
 * The drawing for each icon, as an SVG path on a 24x24 grid. The keys are the
 * allowed icon names (the `IconName` type in src/content/types.ts), so content
 * files can only ask for icons that exist. To add an icon, add its name to
 * `IconName` and its path here.
 */
const PATHS: Record<IconName, string> = {
  offline: "M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Zm-3 9 2 2 4-4",
  chart: "M4 20V10m6 10V4m6 16v-7m4 7H2",
  repeat: "M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3m13-3v2a4 4 0 0 1-4 4H4",
  scan: "M4 8V5a1 1 0 0 1 1-1h3m8 0h3a1 1 0 0 1 1 1v3m0 8v3a1 1 0 0 1-1 1h-3m-8 0H5a1 1 0 0 1-1-1v-3M8 9h8M8 12h8M8 15h5",
  cloud: "M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18H7Zm5-7v6m-2.5-2.5L12 17l2.5-2.5",
  lock: "M6 11h12v10H6V11Zm2 0V8a4 4 0 0 1 8 0v3m-4 4v2",
  device: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3 17h2",
  spark: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6",
  noads: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM5.6 5.6l12.8 12.8",
  doc: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6m-6 4h4",
  text: "M4 7V5h16v2M12 5v14m-3 0h6",
  qr: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h2v2h-2v-2Zm4 0h2m-6 4h2v2m2-2h2v2",
  sign: "M3 20c3-1 4-6 6-6s1 4 3 4 2-3 4-3 2 2 5 2M16 3l5 5-9 9H7v-5l9-9Z",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm0 16a2 2 0 0 1 2-2h13v2H6M9 7h6",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z",
  calendar: "M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm-1 5h16M8 3v4m8-4v4m-2 9.5a2.5 2.5 0 1 1-1-4.5 2 2 0 1 0 1 4.5Z",
  counter: "M12 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-5 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm10 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM5 13a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm14 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-7 4v4",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2",
  heart: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z",
  code: "m8 8-4 4 4 4m8-8 4 4-4 4M14 4l-4 16",
  layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
  cpu: "M8 8h8v8H8V8ZM5 5h14v14H5V5Zm4-3v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z",
  rocket: "M14 4c3-1 6-1 6-1s0 3-1 6l-6 6-4-4 5-7Zm-5 7-4 1-2 3 4 1m6-1-1 4-3 2-1-4m6-8.5a1.5 1.5 0 1 0 0 .01",
  pen: "m15 4 5 5L9 20H4v-5L15 4Zm-3 3 5 5",
};

/**
 * A simple line icon (1.75 stroke) chosen by `name`. It uses `currentColor`,
 * so it takes the text colour of its parent; `aria-hidden` because icons here
 * are decoration next to text.
 *
 * Used by: home page, product pages, feature/tech marquees, ContactCards
 */
export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
