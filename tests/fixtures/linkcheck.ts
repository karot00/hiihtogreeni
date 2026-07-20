import { ROUTES } from "../../src/lib/routes.ts";

/**
 * Pages to crawl for the link/media check, keyed by their canonical path.
 */
export const LINK_CHECK_PAGES: string[] = [
  ROUTES.fi.home + "/",
  ROUTES.fi.cabin + "/",
  ROUTES.fi.gallery + "/",
  ROUTES.fi.rates + "/",
  ROUTES.fi.contact + "/",
  ROUTES.en.home + "/",
  ROUTES.en.cabin + "/",
  ROUTES.en.gallery + "/",
  ROUTES.en.rates + "/",
  ROUTES.en.contact + "/",
];

/**
 * Same-origin link hrefs that are intentionally NOT crawled as broken because
 * they are approved retired endpoints returning 410, or are non-HTML handlers.
 */
export const EXPECTED_NON_200_SAME_ORIGIN = new Set<string>([
  "/feed/",
  "/en/feed/",
  "/comments/feed/",
  "/wp-json/",
  "/wp-admin/",
  "/sitemap.xml",
  "/robots.txt",
]);
