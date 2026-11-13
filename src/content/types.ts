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
  /** Label shown before the date, as the app words it. Defaults to "Effective date". */
  dateLabel?: string;
  /** Opening paragraph before the sections, if the document has one. */
  intro?: string;
  sections: LegalSection[];
}

/** Names of the line icons in `components/Icon.tsx`. */
export type IconName =
  | "offline"
  | "chart"
  | "repeat"
  | "scan"
  | "cloud"
  | "lock"
  | "device"
  | "spark"
  | "noads"
  | "doc"
  | "text"
  | "qr"
  | "sign"
  | "book"
  | "compass"
  | "calendar"
  | "counter"
  | "clock"
  | "heart"
  | "code"
  | "layers"
  | "cpu"
  | "globe"
  | "rocket"
  | "pen";

/** A short feature card on an app's home page. */
export interface AppFeature {
  title: string;
  text: string;
  icon: IconName;
}

/** An app's Google Play listing, word for word (`apps/<slug>/store.ts`). */
export interface StoreListing {
  /** Title on Google Play, e.g. "JaxScan: PDF, OCR, Cam Scanner". */
  title: string;
  /** The 80-character short description. */
  shortDescription: string;
  /** Developer name shown on Google Play. */
  developer: string;
  /** Opening paragraphs of the full description. */
  intro: string[];
  /** A heading the listing puts above all its sections, if any. */
  sectionsTitle?: string;
  /** The listing's headed sections, as paragraphs and bullet lists. */
  sections: LegalSection[];
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
  /** Download count as Google Play shows it, e.g. "5K+". Update it from the listing now and then. */
  downloads: string;
  /** For client work: who it was built for. Client products have no policy pages here. */
  client?: string;
  /** schema.org application category, e.g. "FinanceApplication". */
  category: string;
  /** Extra search words for this app's pages. */
  keywords: string[];
  features: AppFeature[];
  /** The Google Play listing. */
  store: StoreListing;
  /**
   * Why the app asks for Google user data (shown on the app home page).
   * Google's OAuth review checks that the home page explains this.
   */
  googleDataUse?: { title: string; paragraphs: string[] };
  /** Privacy Policy, for our own products. Without it there is no `/<slug>/privacy-policy/` page. */
  privacy?: LegalDocument;
  /** Terms, if the app has them. Without them there is no `/<slug>/terms/` page. */
  terms?: LegalDocument;
}

/** Shorthand for a paragraph block. */
export const p = (text: string): LegalBlock => ({ kind: "paragraph", text });

/**
 * Shorthand for a bulleted list block. In items and paragraphs, `**text**`
 * is shown in bold (used for labels such as "Location:").
 */
export const ul = (...items: string[]): LegalBlock => ({ kind: "bullets", items });
