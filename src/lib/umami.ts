import { BOOKING_ORIGIN } from "../content/shared.ts";
import { getHref } from "./routes.ts";

/**
 * Cookieless Umami statistics on the self-hosted instance shared with
 * experiencelevi.fi (same owner; chaletnulkka docs/analytics.md). No cookies,
 * no consent needed, Do Not Track honoured, so AI-referred visitors who never
 * answer the cookie banner are counted too. GA4 keeps running consent-gated
 * alongside (AGENT-VISIBILITY-PLAN.md step 3).
 */
export const UMAMI_SCRIPT_URL = "https://stats.experiencelevi.fi/s";
export const UMAMI_WEBSITE_ID: string = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? "";
/** The tracker ignores every other host, so local and preview builds send nothing. */
export const UMAMI_DOMAINS = "www.hiihtogreeni.fi";

export const UMAMI_EVENTS = {
  bookCtaClick: "book_cta_click",
  contactClick: "contact_click",
  inquirySubmitted: "inquiry_submitted",
} as const;

export type UmamiEventData = Record<string, string | number>;
export type ClickEvent = { name: string; data: UmamiEventData };

const RATES_PATHS = new Set([getHref("fi", "rates"), getHref("en", "rates")]);

/**
 * The event for a clicked link, or null. Booking CTAs are links to the rates
 * page (calendar) or to the booking site; contact clicks are tel:/mailto:.
 * Only the kind of link and where it sits are sent, never the number or address.
 */
export function classifyClick(href: string, origin: string, where: string): ClickEvent | null {
  if (href.startsWith("tel:")) return { name: UMAMI_EVENTS.contactClick, data: { kind: "tel", where } };
  if (href.startsWith("mailto:")) return { name: UMAMI_EVENTS.contactClick, data: { kind: "mailto", where } };
  let url: URL;
  try {
    url = new URL(href, origin);
  } catch {
    return null;
  }
  // The booking pages, not the agent API linked in the footer.
  if (url.origin === BOOKING_ORIGIN && url.pathname.includes("/hiihtogreeni") && !url.pathname.startsWith("/api/")) {
    return { name: UMAMI_EVENTS.bookCtaClick, data: { to: "booking-site", where } };
  }
  if (url.origin === origin && RATES_PATHS.has(url.pathname)) {
    return { name: UMAMI_EVENTS.bookCtaClick, data: { to: "rates", where } };
  }
  return null;
}

/** Sends an event if the tracker has loaded; a no-op otherwise. */
export function umamiTrack(event: ClickEvent): void {
  if (typeof window === "undefined") return;
  const umami = (window as unknown as { umami?: { track?: (name: string, data?: UmamiEventData) => void } }).umami;
  umami?.track?.(event.name, event.data);
}

const count = (value: unknown, max: number) => Number.isInteger(value) && (value as number) >= 0 && (value as number) <= max;

/**
 * The event for the booking widget's "hiihtogreeni-embed:inquiry" message (a
 * request was sent in the iframe), or null for anything else. Counts only:
 * nights, apartments, guests and days until arrival.
 */
export function inquiryEvent(data: unknown): ClickEvent | null {
  if (!data || typeof data !== "object") return null;
  const { type, nights, units, guests, leadDays } = data as Record<string, unknown>;
  if (type !== "hiihtogreeni-embed:inquiry") return null;
  if (!count(nights, 400) || !count(guests, 28) || !count(leadDays, 800) || (units !== "A" && units !== "B" && units !== "AB")) return null;
  return {
    name: UMAMI_EVENTS.inquirySubmitted,
    data: { channel: "web", nights: nights as number, units, guests: guests as number, lead_days: leadDays as number },
  };
}
