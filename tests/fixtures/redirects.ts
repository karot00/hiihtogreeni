import { APP_REDIRECTS } from "../../src/lib/redirects.ts";

export interface RedirectFixture {
  /** Request path (origin-relative). */
  source: string;
  /** Expected HTTP status from the application layer (one hop). */
  expectedStatus: 308 | 307 | 410 | 404 | 200;
  /**
   * Expected `Location` header (origin-relative), or `null` when no location is
   * expected (e.g. 410 Gone, 404, 200).
   */
  expectedLocation: string | null;
  /** Human-readable note about the rationale for the fixture. */
  note: string;
}

/**
 * Executable redirect/legacy-response fixture.
 *
 * Each entry asserts the exact one-hop status and `Location` for a known source
 * URL. This is the single source of truth used by the redirect test and mirrors
 * the SEO parity gate (no loops, no avoidable chains, no soft 404s).
 *
 * Slashless content URLs are first normalized to their trailing-slash form by
 * `trailingSlash: true` (a platform hop that is not an avoidable redirect
 * chain); the trailing-slash forms below are the canonical redirect sources and
 * resolve in a single application hop.
 */
export const REDIRECT_FIXTURES: RedirectFixture[] = [
  {
    source: "/en/",
    expectedStatus: 308,
    expectedLocation: "/en/home/",
    note: "Phase 1 signed-off: /en/ -> /en/home/ permanent, one hop.",
  },
  {
    source: "/en/gallery/",
    expectedStatus: 308,
    expectedLocation: "/en/photo-gallery/",
    note: "Phase 1 signed-off: retire duplicate /en/gallery/ to /en/photo-gallery/ in one hop.",
  },
  {
    source: "/wp-sitemap.xml",
    expectedStatus: 308,
    expectedLocation: "/sitemap.xml",
    note: "Keep /sitemap.xml as the final sitemap; redirect legacy WP sitemap in one hop.",
  },
  {
    source: "/en",
    expectedStatus: 308,
    expectedLocation: "/en/",
    note: "Slashless /en normalizes to trailing-slash form (platform hop) before the /en/home/ redirect.",
  },
  {
    source: "/en/gallery",
    expectedStatus: 308,
    expectedLocation: "/en/gallery/",
    note: "Slashless retired gallery normalizes to trailing-slash form before redirect.",
  },
  {
    source: "/feed/",
    expectedStatus: 410,
    expectedLocation: null,
    note: "WordPress feed retired: 410 Gone per signed-off inventory.",
  },
  {
    source: "/en/feed/",
    expectedStatus: 410,
    expectedLocation: null,
    note: "WordPress EN feed retired: 410 Gone.",
  },
  {
    source: "/comments/feed/",
    expectedStatus: 410,
    expectedLocation: null,
    note: "WordPress comments feed retired: 410 Gone.",
  },
  {
    source: "/wp-json/",
    expectedStatus: 410,
    expectedLocation: null,
    note: "WordPress JSON API retired: 410 Gone.",
  },
  {
    source: "/wp-json/wp/v2/posts",
    expectedStatus: 308,
    expectedLocation: "/wp-json/wp/v2/posts/",
    note: "Slashless WP JSON child path normalizes to trailing-slash form before 410.",
  },
  {
    source: "/wp-json/wp/v2/posts/",
    expectedStatus: 410,
    expectedLocation: null,
    note: "WordPress JSON API child path retired: 410 Gone.",
  },
  {
    source: "/wp-admin/",
    expectedStatus: 410,
    expectedLocation: null,
    note: "WordPress admin retired: 410 Gone.",
  },
  {
    source: "/wp-admin/options-general.php",
    expectedStatus: 410,
    expectedLocation: null,
    note: "WordPress admin child path retired: 410 Gone.",
  },
  {
    source: "/nope/",
    expectedStatus: 404,
    expectedLocation: null,
    note: "Unknown URL must return 404, never redirect to the homepage.",
  },
  {
    source: "/en/nope/",
    expectedStatus: 404,
    expectedLocation: null,
    note: "Unknown EN URL must return 404.",
  },
];

/**
 * Static assertions that the application's canonical redirect list matches the
 * fixtures exactly (status + final location). This keeps `next.config.ts` and
 * the fixture from drifting without a running server. Slashless config sources
 * are validated against their trailing-slash fixture equivalent.
 */
export function assertConfigMatchesFixtures(): void {
  for (const cfg of APP_REDIRECTS) {
    const isDirectoryLike = !/\.[a-z0-9]+$/i.test(cfg.source);
    const lookup = cfg.source.endsWith("/") || !isDirectoryLike ? cfg.source : `${cfg.source}/`;
    const fx = REDIRECT_FIXTURES.find((f) => f.source === lookup);
    if (!fx) {
      throw new Error(`No fixture for redirect source ${cfg.source} (looked up ${lookup})`);
    }
    const expectedStatusCode = cfg.permanent ? 308 : 307;
    if (fx.expectedStatus !== expectedStatusCode) {
      throw new Error(
        `Redirect ${cfg.source} expects status ${expectedStatusCode} but fixture has ${fx.expectedStatus}`,
      );
    }
    if (fx.expectedLocation !== cfg.destination) {
      throw new Error(
        `Redirect ${cfg.source} expects location ${cfg.destination} but fixture has ${fx.expectedLocation}`,
      );
    }
  }
}
