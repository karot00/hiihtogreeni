/**
 * GA4 helpers for Hiihtogreeni. The gtag.js loader and Consent Mode v2 defaults
 * live in `src/components/GoogleAnalytics.tsx`; this module holds the small,
 * testable pieces the rest of the app uses to fire conversion events without
 * touching the `gtag` global directly. Every event is consent-gated:
 * `trackEvent` is a no-op unless the gtag library is present, which only happens
 * after the visitor has granted the analytics category.
 */

export const GA4_MEASUREMENT_ID: string =
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "";

/** Consent Mode v2 ad-related signals are always denied (no advertising here). */
export const GA4_ADS_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

export type GtagConsentArgs = Record<string, string>;

/**
 * Build the `gtag('consent', 'update', ...)` payload for the current analytics
 * choice. All four v2 signals are present; only `analytics_storage` follows the
 * visitor's choice so revocation is honored immediately.
 */
export function buildConsentUpdate(analyticsAllowed: boolean): GtagConsentArgs {
  return {
    ...GA4_ADS_DENIED,
    analytics_storage: analyticsAllowed ? "granted" : "denied",
  };
}

/** Stable, bilingual-safe GA4 event names (one taxonomy for both languages). */
export const GA4_EVENTS = {
  contactSubmit: "contact_form_submit",
  contactClick: "contact_click",
  outboundClick: "outbound_click",
  galleryLightboxOpen: "gallery_lightbox_open",
} as const;

export type GtagEventParams = Record<string, string | number | boolean>;

/**
 * Push a command onto the GA4 `dataLayer`. Used for consent/config commands so
 * they queue correctly even before the gtag.js library has finished loading.
 */
export function pushToDataLayer(command: unknown): void {
  if (typeof window === "undefined") {
    return;
  }
  const w = window as unknown as { dataLayer?: unknown[] };
  const dataLayer = (w.dataLayer ??= []);
  dataLayer.push(command);
}

/**
 * Returns the external hostname for an outbound link, or `null` when the href is
 * invalid or same-origin. Only the hostname is returned so no path, query, or
 * PII reaches GA4.
 */
export function safeOutboundHostname(
  href: string,
  origin: string,
): string | null {
  try {
    const url = new URL(href, origin);
    if (url.origin === origin) {
      return null;
    }
    return url.hostname;
  } catch {
    return null;
  }
}

type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }
  const gtag = (window as unknown as { gtag?: unknown }).gtag;
  return typeof gtag === "function" ? (gtag as GtagFn) : undefined;
}

/**
 * Fire a GA4 event. No-op when `window.gtag` is undefined (the library is only
 * injected after the visitor grants analytics consent), so callers never need
 * to check consent themselves. Never pass personally identifiable values.
 */
export function trackEvent(
  name: string,
  params: GtagEventParams = {},
): void {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }
  gtag("event", name, params);
}
