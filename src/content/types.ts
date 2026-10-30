/**
 * Shapes of the site's content. Pages only render these; all wording lives
 * in `src/content/apps/<app>/`.
 *
 * The legal types mirror the Flutter app's `LegalDocument` model
 * (`lib/features/settings/presentation/legal/legal_content.dart`), so text
 * can be copied across section by section.
 */

/** One block of a legal document: a paragraph or a bulleted list. */
export type LegalBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "bullets"; items: string[] };

/** A numbered section, such as "2. Camera, photos and voice". */
export interface LegalSection {
  /** Section title, including its number. */
  heading: string;
  blocks: LegalBlock[];
}

/** A whole legal document (Terms or Privacy Policy). */
export interface LegalDocument {
  title: string;
  /** Date the current wording took effect, e.g. "29 October 2026". */
  effectiveDate: string;
  /** Opening paragraph before the numbered sections. */
  intro: string;
  sections: LegalSection[];
}

/** A short feature card on an app's home page. */
export interface AppFeature {
  title: string;
  text: string;
}

/** Everything the site knows about one app. Add a new app by adding one of these. */
export interface AppInfo {
  /** URL folder: `/jaxbudget/`. Lowercase, never change once published. */
  slug: string;
  name: string;
  /** One line under the name. */
  tagline: string;
  /** A short paragraph explaining what the app does. */
  description: string;
  /** Path under `public/`, square PNG. */
  iconSrc: string;
  /** Store link, if the app is live. */
  playStoreUrl?: string;
  features: AppFeature[];
  /**
   * Why the app asks for Google user data (shown on the app home page).
   * Google's OAuth review checks that the home page explains this.
   */
  googleDataUse?: { title: string; paragraphs: string[] };
  privacy: LegalDocument;
  terms: LegalDocument;
}

/** Shorthand for a paragraph block. */
export const p = (text: string): LegalBlock => ({ kind: "paragraph", text });

/** Shorthand for a bulleted list block. */
export const ul = (...items: string[]): LegalBlock => ({ kind: "bullets", items });
