/**
 * Adds JSON-LD to the page. JSON-LD is "structured data": a hidden block of
 * facts (company name, product, breadcrumbs...) that search engines like
 * Google read to show richer results. The objects come from src/lib/seo.ts.
 *
 * `<` is escaped as `<` so text inside the data can never close the
 * <script> tag early (a common safety trick).
 *
 * Used by: home, contact, product and legal pages
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
