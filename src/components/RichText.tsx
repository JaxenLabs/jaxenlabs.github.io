import { Fragment } from "react";

/** Matches web links and email addresses inside plain legal text. */
const LINK_PATTERN = /(https?:\/\/[^\s),;]+|[\w.+-]+@[\w-]+\.[\w.]+\w)/g;

/** Matches `**bold**` spans, used for labels such as "Location:". */
const BOLD_PATTERN = /\*\*(.+?)\*\*/g;

/** Plain text with its URLs and email addresses turned into links (used by RichText below). */
function Linked({ text }: { text: string }) {
  const parts = text.split(LINK_PATTERN);
  return (
    <>
      {parts.map((part, i) => {
        // split() with a capture group puts the matches at odd indexes.
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        const href = part.startsWith("http") ? part : `mailto:${part}`;
        // Always underlined: inside a paragraph, colour alone is not enough to show it is a link.
        return (
          <a key={i} href={href} className="break-words text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">
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
 *
 * Used by: src/components/LegalDocumentView.tsx and src/components/StoreListingView.tsx
 */
export function RichText({ text }: { text: string }) {
  // e.g. "a **b** c" splits into ["a ", "b", " c"]: odd indexes were bold.
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
