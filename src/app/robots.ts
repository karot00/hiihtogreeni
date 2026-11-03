import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "../lib/config.ts";

/**
 * AI search, assistant and training crawlers, allowed by name so a later
 * change to the `*` rule cannot block them silently (AGENT-VISIBILITY-PLAN.md
 * step 2; Google-Extended and Applebot-Extended approved by the owner
 * 2026-10-25). Nothing is disallowed: the old WordPress paths answer 410 Gone,
 * and crawlers must be able to fetch them to see it and drop them from the index.
 */
export const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Bingbot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
