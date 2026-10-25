import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "../lib/config.ts";

const DISALLOW = ["/wp-admin/", "/wp-json/", "/feed/"];

/**
 * AI search, assistant and training crawlers, allowed by name so a later
 * change to the `*` rule cannot block them silently (AGENT-VISIBILITY-PLAN.md
 * step 2; Google-Extended and Applebot-Extended approved by the owner
 * 2026-10-25). A crawler obeys only its own group, so each repeats DISALLOW.
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
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
