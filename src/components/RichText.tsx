import { Fragment } from "react";

/** Matches web links and email addresses inside plain legal text. */
const LINK_PATTERN = /(https?:\/\/[^\s),;]+|[\w.+-]+@[\w-]+\.[\w.]+\w)/g;

/**
 * Renders plain text with its URLs and email addresses turned into links,
 * so content files can stay plain strings.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(LINK_PATTERN);
  return (
    <>
      {parts.map((part, i) => {
        // split() with a capture group puts the matches at odd indexes.
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        const href = part.startsWith("http") ? part : `mailto:${part}`;
        return (
          <a key={i} href={href} className="break-words text-accent underline-offset-2 hover:underline">
            {part}
          </a>
        );
      })}
    </>
  );
}
