import type { Lang } from "../content/types.ts";
import { buildFaqJsonLd, buildJsonLd } from "../lib/structured-data.ts";

/** Renders schema.org JSON-LD for the real business and accommodation facts. */
export function JsonLd({ lang }: { lang: Lang }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
    />
  );
}

/**
 * FAQPage structured data. Mirrors a visible FAQ (Teams and Rates pages) so
 * search engines and AI assistants read the same questions as the page body.
 */
export function FaqJsonLd({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(items)) }}
    />
  );
}
