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

/** Consent Mode v2 ad-related signals while the marketing category is not granted. */
export const GA4_ADS_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

export type GtagConsentArgs = Record<string, string>;

/**
 * Build the `gtag('consent', 'update', ...)` payload for the visitor's choice.
 * All four v2 signals are present: `analytics_storage` follows the analytics
 * category and the three ad signals follow the marketing category, so
 * revocation of either is honored immediately.
 */
export function buildConsentUpdate(
  analyticsAllowed: boolean,
  marketingAllowed = false,
): GtagConsentArgs {
  const ads = marketingAllowed ? "granted" : "denied";
  return {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: analyticsAllowed ? "granted" : "denied",
  };
}

/**
 * Google Ads conversion tracking (account 717-274-3401). The tag ID and the
 * conversion labels are public identifiers, not secrets; they were printed by
 * docs/google-ads/google-ads-hakukampanja.js when it created the conversion
 * actions. Like GA4, the tag only loads in production (where the GA4 ID is set).
 */
export const GOOGLE_ADS_ID = "AW-18574960377";

export const ADS_CONVERSIONS = {
  /** Contact form sent on hiihtogreeni.fi (primary). */
  contactForm: `${GOOGLE_ADS_ID}/rGs1CNy73LgdEPnNnZlF`,
  /** tel: or mailto: link clicked (primary). */
  contactClick: `${GOOGLE_ADS_ID}/7HCTCM-93LgdEPnNnZlF`,
  /** Link to the cabins.levifinland.fi booking calendar clicked (secondary). */
  bookingCalendarClick: `${GOOGLE_ADS_ID}/YQceCNK93LgdEPnNnZlF`,
  /** Booking request sent in the embedded calendar (primary). */
  bookingRequest: `${GOOGLE_ADS_ID}/ImkcCNfA5LgdEPnNnZlF`,
} as const;

export type AdsConversion = keyof typeof ADS_CONVERSIONS;

/** Hosts whose links count as a click to the booking calendar. */
export const BOOKING_CALENDAR_HOSTS: ReadonlySet<string> = new Set(["cabins.levifinland.fi"]);

let adsConsentGranted = false;

/** Set by GoogleAnalytics whenever the marketing consent category changes. */
export function setAdsConsent(granted: boolean): void {
  adsConsentGranted = granted;
}

/**
 * Report a Google Ads conversion. A no-op unless the visitor has granted the
 * marketing category and gtag is present, so callers need no consent checks.
 * Sends no parameters beyond the conversion's own `send_to`.
 */
export function trackAdsConversion(conversion: AdsConversion): void {
  const sendTo = ADS_CONVERSIONS[conversion];
  if (!adsConsentGranted || !sendTo) {
    return;
  }
  const gtag = getGtag();
  if (!gtag) {
    return;
  }
  gtag("event", "conversion", { send_to: sendTo });
}

/** Stable, bilingual-safe GA4 event names (one taxonomy for both languages). */
export const GA4_EVENTS = {
  contactSubmit: "contact_form_submit",
  contactClick: "contact_click",
  outboundClick: "outbound_click",
  galleryLightboxOpen: "gallery_lightbox_open",
  brochureDownload: "brochure_download",
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
  // gtag.js reads queued commands as array-like objects, not arrays. Calling
  // window.gtag is not reliable here because the loader may still be pending.
  if (Array.isArray(command)) {
    const queuedCommand = Object.assign(Object.create(null), command, {
      length: command.length,
    });
    dataLayer.push(queuedCommand);
    return;
  }
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
