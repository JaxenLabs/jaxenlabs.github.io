import { Fragment } from "react";

/** Matches web links and email addresses inside plain legal text. */
const LINK_PATTERN = /(https?:\/\/[^\s),;]+|[\w.+-]+@[\w-]+\.[\w.]+\w)/g;

/** Matches `**bold**` spans, used for labels such as "Location:". */
const BOLD_PATTERN = /\*\*(.+?)\*\*/g;

/** Plain text with its URLs and email addresses turned into links. */
function Linked({ text }: { text: string }) {
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

/**
 * Renders plain text with `**bold**` spans, URLs and email addresses, so
 * content files can stay plain strings.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(BOLD_PATTERN);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 0 ? (
          <Linked key={i} text={part} />
        ) : (
          <strong key={i} className="font-semibold text-text">
            {part}
          </strong>
        ),
      )}
    </>
  );
}
