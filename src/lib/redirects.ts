export type RedirectStatus = 308 | 307;

export interface AppRedirect {
  source: string;
  destination: string;
  permanent: boolean;
}

export interface GoneRoute {
  source: string;
}

/**
 * Canonical application-level redirects, keyed by old URL.
 *
 * This is the single source of truth consumed by `next.config.ts` and the
 * executable redirect test fixture. Every destination is a final canonical
 * URL (trailing slash included) so there is no avoidable redirect chain.
 */
export const APP_REDIRECTS: AppRedirect[] = [
  {
    source: "/en",
    destination: "/en/home/",
    permanent: true,
  },
  {
    source: "/en/gallery",
    destination: "/en/photo-gallery/",
    permanent: true,
  },
  {
    source: "/wp-sitemap.xml",
    destination: "/sitemap.xml",
    permanent: true,
  },
];

/** WordPress-only endpoints that must return `410 Gone` per the signed-off URL inventory. */
export const GONE_ROUTES: GoneRoute[] = [
  { source: "/feed" },
  { source: "/en/feed" },
  { source: "/comments/feed" },
  { source: "/wp-json" },
  { source: "/wp-admin" },
];

/** Convert the canonical redirect list into Next.js `redirects()` entries. */
export function buildNextRedirects(): Array<{
  source: string;
  destination: string;
  statusCode: RedirectStatus;
}> {
  return APP_REDIRECTS.map((r) => ({
    source: r.source,
    destination: r.destination,
    statusCode: r.permanent ? 308 : 307,
  }));
}
