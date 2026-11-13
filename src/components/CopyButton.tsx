"use client";

import { useState } from "react";

/**
 * Copies `text` to the clipboard and says so. Used next to email links,
 * because a `mailto:` link does nothing on computers with no mail app set up.
 */
export function CopyButton({ text, label = "Copy", className = "" }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Older browsers or blocked clipboard: fall back to a hidden textarea.
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`btn-ghost inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-5 font-medium ${className}`}
    >
      {copied ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="size-4 animate-pop text-accent" aria-hidden>
          <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} className="size-4" aria-hidden>
          <rect x="9" y="9" width="11" height="11" rx="2.5" />
          <path d="M5 15V6a2 2 0 0 1 2-2h9" strokeLinecap="round" />
        </svg>
      )}
      {copied ? "Copied!" : label}
    </button>
  );
}
