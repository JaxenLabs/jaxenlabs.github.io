/**
 * Refreshes every product's Google Play details on the website.
 *
 * Run it with:   npm run update:play
 *
 * For each product folder in src/content/apps/ that has a `playStoreUrl`,
 * this script downloads the public Google Play page and rewrites that
 * folder's `store.ts` with:
 *   - the Play title             ("JaxScan: PDF, OCR, Cam Scanner")
 *   - the short description      (the 80-character line under the title)
 *   - the developer name         ("Jaxen Labs", or a client's name)
 *   - the download count         ("50+"), used for "Total users" on the home page
 *   - the full description, split into an intro and headed sections
 *
 * The wording is copied exactly. Never edit a `store.ts` by hand: change the
 * listing in Google Play Console, then run this script again.
 *
 * It needs Node.js 18 or newer (for the built-in `fetch`) and an internet
 * connection. Nothing else is installed.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const APPS_DIR = join(import.meta.dirname, "..", "src", "content", "apps");

// ---------------------------------------------------------------------------
// 1. Reading the Google Play page
// ---------------------------------------------------------------------------

/** Turns the HTML of a piece of text into plain text (line breaks kept). */
function htmlToText(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** Returns the first group of `pattern` in `html`, as plain text, or "" if missing. */
function find(html, pattern) {
  const match = html.match(pattern);
  return match ? htmlToText(match[1]).trim() : "";
}

/** Downloads a Play page and pulls out the fields we show on the site. */
async function fetchListing(packageId) {
  const url = `https://play.google.com/store/apps/details?id=${packageId}&hl=en_US&gl=US`;
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
  if (!response.ok) throw new Error(`Google Play answered ${response.status} for ${packageId}`);
  const html = await response.text();

  const listing = {
    title: find(html, /<title id="main-title">([^<]*)/).replace(/ - Apps on Google Play$/, ""),
    shortDescription: find(html, /itemprop="description" content="([^"]*)/),
    developer: find(html, /href="\/store\/apps\/developer\?id=[^"]*"><span>([^<]*)/),
    downloads: find(html, />([\d.,]+\s*[KMB]?\+)<\/div><div[^>]*>Downloads</i),
    fullDescription: find(html, /data-g-id="description"[^>]*>([\s\S]*?)<\/div>/),
  };
  for (const [field, value] of Object.entries(listing)) {
    if (!value) throw new Error(`Could not find the ${field} on the Play page for ${packageId}. Google may have changed the page.`);
  }
  return listing;
}

// ---------------------------------------------------------------------------
// 2. Splitting the full description into an intro and sections
// ---------------------------------------------------------------------------

const isBullet = (line) => line.startsWith("•");

/**
 * A heading is a short line that starts with an emoji ("📊 1. BUDGETS"),
 * ends with ":" or "?" ("Why Choose Smart Ummah?"), or is in capitals
 * ("KIDS FASHION FOR EVERY AGE").
 */
function isHeading(line) {
  if (isBullet(line) || line.length > 70) return false;
  const letters = line.replace(/[^\p{L}]/gu, "");
  const startsWithSymbol = /^[^\p{L}\p{N}]/u.test(line);
  const endsLikeHeading = /[:?]$/.test(line);
  const allCapitals = letters.length > 3 && letters === letters.toUpperCase();
  return startsWithSymbol || endsLikeHeading || allCapitals;
}

/**
 * Reads the description line by line:
 *  - a blank line ends a paragraph,
 *  - a heading starts a new section,
 *  - bullet lines ("• ...") form a list,
 *  - any other line is added to the current paragraph.
 * A ":"/"?" sentence straight under a heading ("You can order through:") is
 * treated as that section's first paragraph, not as another heading.
 */
function splitDescription(text) {
  const intro = [];
  const sections = [];
  let section = null;
  let paragraph = [];

  const endParagraph = () => {
    if (!paragraph.length) return;
    const joined = paragraph.join(" ");
    if (section) section.blocks.push({ kind: "paragraph", text: joined });
    else intro.push(joined);
    paragraph = [];
  };

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    const sectionIsEmpty = section && section.blocks.length === 0 && paragraph.length === 0;
    const isLeadInSentence = sectionIsEmpty && /^[\p{L}\p{N}]/u.test(line) && line !== line.toUpperCase();

    if (!line) {
      endParagraph();
    } else if (isBullet(line)) {
      endParagraph();
      if (!section) {
        section = { heading: "", blocks: [] };
        sections.push(section);
      }
      const last = section.blocks.at(-1);
      if (last?.kind === "bullets") last.items.push(line);
      else section.blocks.push({ kind: "bullets", items: [line] });
    } else if (isHeading(line) && !isLeadInSentence) {
      endParagraph();
      section = { heading: line, blocks: [] };
      sections.push(section);
    } else {
      paragraph.push(line);
    }
  }
  endParagraph();

  // A heading with nothing under it ("🌟 WHY YOU'LL LOVE JAXBUDGET") becomes the title above all sections.
  const sectionsTitle = sections.find((s) => s.blocks.length === 0)?.heading;
  return { intro, sectionsTitle, sections: sections.filter((s) => s.blocks.length > 0) };
}

/** "• Label: text" → "**Label:** text", so short lead-in labels show in bold. */
function formatBullet(line) {
  const text = line.replace(/^•\s*/, "");
  const labelled = text.match(/^([^:.!?]{2,40}):\s+(.+)$/);
  return labelled ? `**${labelled[1]}:** ${labelled[2]}` : text;
}

// ---------------------------------------------------------------------------
// 3. Writing store.ts
// ---------------------------------------------------------------------------

const quote = (s) => JSON.stringify(s);

function toTypeScript(listing, { intro, sectionsTitle, sections }) {
  const sectionCode = sections
    .map((section) => {
      const blocks = section.blocks
        .map((block) =>
          block.kind === "paragraph"
            ? `        p(${quote(block.text)}),`
            : `        ul(\n${block.items.map((item) => `          ${quote(formatBullet(item))},`).join("\n")}\n        ),`,
        )
        .join("\n");
      return `    {\n      heading: ${quote(section.heading)},\n      blocks: [\n${blocks}\n      ],\n    },`;
    })
    .join("\n");

  return `// GENERATED by \`npm run update:play\` from the live Google Play listing. Do not edit by hand.
import { p, ul, type StoreListing } from "@/content/types";

/** This product's Google Play listing, word for word. */
export const store: StoreListing = {
  title: ${quote(listing.title)},
  shortDescription: ${quote(listing.shortDescription)},
  developer: ${quote(listing.developer)},
  downloads: ${quote(listing.downloads)},
  intro: [
${intro.map((paragraph) => `    ${quote(paragraph)},`).join("\n")}
  ],
${sectionsTitle ? `  sectionsTitle: ${quote(sectionsTitle)},\n` : ""}  sections: [
${sectionCode}
  ],
};
`;
}

// ---------------------------------------------------------------------------
// 4. Run it for every product
// ---------------------------------------------------------------------------

const folders = (await readdir(APPS_DIR, { withFileTypes: true })).filter((entry) => entry.isDirectory());
let failures = 0;

for (const folder of folders) {
  const indexFile = join(APPS_DIR, folder.name, "index.ts");
  const source = await readFile(indexFile, "utf8").catch(() => "");
  const packageId = source.match(/playStoreUrl:\s*"[^"]*[?&]id=([\w.]+)/)?.[1];
  if (!packageId) {
    console.log(`- ${folder.name}: no playStoreUrl, skipped`);
    continue;
  }
  try {
    const listing = await fetchListing(packageId);
    const parts = splitDescription(listing.fullDescription);
    await writeFile(join(APPS_DIR, folder.name, "store.ts"), toTypeScript(listing, parts));
    console.log(`✓ ${folder.name}: "${listing.title}", ${listing.downloads} downloads, ${parts.sections.length} sections`);
  } catch (error) {
    failures += 1;
    console.error(`✗ ${folder.name}: ${error.message}`);
  }
}

if (failures) process.exit(1);
