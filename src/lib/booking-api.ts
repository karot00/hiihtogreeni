import { BOOKING_ORIGIN } from "../content/shared.ts";
import type { Lang } from "../content/types.ts";

/**
 * Prices and availability from the cabins.levifinland.fi booking system's
 * public API (/api/v1/hiihtogreeni, levifinland2026 plan 7.8.3), rendered as
 * HTML on the rates pages and in llms.txt so AI assistants can read them
 * (AGENT-VISIBILITY-PLAN.md step 4). Never typed by hand: when the API is
 * down, the pages say "see the booking calendar" instead of showing numbers.
 */
export const API_BASE = `${BOOKING_ORIGIN}/api/v1/hiihtogreeni`;
export const PRICING_URL = `${API_BASE}/pricing`;
export const AVAILABILITY_URL = `${API_BASE}/availability`;
/** The property document and the API contract, linked for agents (step 6). */
export const PROPERTY_URL = `${API_BASE}/property`;
export const OPENAPI_URL = `${API_BASE}/openapi.json`;
/** Same freshness as the API's CDN cache, so a price change shows within 15 minutes. */
export const REVALIDATE_SECONDS = 900;
const TIMEOUT_MS = 8000;

/** Euros, VAT included, for one apartment. */
export interface ApartmentPrices {
  weekly: number;
  nightly: number;
}

export interface Season {
  name: string;
  /** First and last night (inclusive), YYYY-MM-DD. */
  firstNight: string;
  lastNight: string;
  a: ApartmentPrices;
  b: ApartmentPrices;
}

export interface Pricing {
  seasons: Season[];
  /** Nights outside the seasons. */
  base: { a: ApartmentPrices; b: ApartmentPrices } | null;
  extras: {
    cleaningPerApartment: number | null;
    linenPerGuest: number | null;
    bedsMadePerGuest: number | null;
    conferenceRoomPerStay: number | null;
    maintenanceRoomPerStay: number | null;
  };
  minNights: number;
  lastMinute: { percent: number; arrivalsUntil: string } | null;
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const isRecord = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const price = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) && v > 0 ? v : null);

function apartment(v: unknown): ApartmentPrices | null {
  if (!isRecord(v)) return null;
  const weekly = price(v.weekly_eur);
  const nightly = price(v.nightly_eur);
  return weekly && nightly ? { weekly, nightly } : null;
}

/** The pricing document, or null when it is not in the expected shape. */
export function parsePricing(json: unknown): Pricing | null {
  if (!isRecord(json) || !Array.isArray(json.seasons) || !isRecord(json.extras) || !isRecord(json.rules)) return null;
  const seasons: Season[] = [];
  for (const s of json.seasons) {
    if (!isRecord(s) || typeof s.name !== "string") return null;
    const a = apartment(s.apartment_a);
    const b = apartment(s.apartment_b);
    if (typeof s.first_night !== "string" || !DATE.test(s.first_night) || typeof s.last_night !== "string" || !DATE.test(s.last_night)) return null;
    // A season without prices for both apartments is not bookable; leave it out.
    if (a && b) seasons.push({ name: s.name, firstNight: s.first_night, lastNight: s.last_night, a, b });
  }
  const baseA = isRecord(json.base_rate) ? apartment(json.base_rate.apartment_a) : null;
  const baseB = isRecord(json.base_rate) ? apartment(json.base_rate.apartment_b) : null;
  const minNights = json.rules.min_nights;
  if (!Number.isInteger(minNights) || (minNights as number) < 1) return null;
  const lm = json.last_minute;
  const lastMinute =
    isRecord(lm) && typeof lm.percent === "number" && lm.percent > 0 && typeof lm.arrivals_until === "string" && DATE.test(lm.arrivals_until)
      ? { percent: lm.percent, arrivalsUntil: lm.arrivals_until }
      : null;
  const e = json.extras;
  return {
    seasons,
    base: baseA && baseB ? { a: baseA, b: baseB } : null,
    extras: {
      cleaningPerApartment: price(e.final_cleaning_per_apartment_eur),
      linenPerGuest: price(e.bed_linen_and_towels_per_guest_eur),
      bedsMadePerGuest: price(e.made_up_beds_per_guest_eur),
      conferenceRoomPerStay: price(e.conference_room_per_stay_eur),
      maintenanceRoomPerStay: price(e.maintenance_room_per_stay_eur),
    },
    minNights: minNights as number,
    lastMinute,
  };
}

export interface Availability {
  today: string;
  /** Nights from today; true = free and priced. */
  nights: { date: string; a: boolean; b: boolean }[];
}

/** The availability document, or null when it is not in the expected shape. */
export function parseAvailability(json: unknown): Availability | null {
  if (!isRecord(json) || typeof json.today !== "string" || !DATE.test(json.today) || !Array.isArray(json.nights)) return null;
  const nights: Availability["nights"] = [];
  for (const n of json.nights) {
    if (!isRecord(n) || typeof n.date !== "string" || !DATE.test(n.date)) return null;
    const free = (v: unknown) => isRecord(v) && v.status === "available" && price(v.nightly_eur) !== null;
    nights.push({ date: n.date, a: free(n.apartment_a), b: free(n.apartment_b) });
  }
  return { today: json.today, nights };
}

export interface FreeRange {
  /** Check-in and check-out dates (check-out = the morning after the last night). */
  checkIn: string;
  checkOut: string;
  nights: number;
  /** Free up to the end of the data, so possibly longer. */
  openEnded: boolean;
}

const nextDay = (date: string) => new Date(Date.parse(`${date}T00:00:00Z`) + 86_400_000).toISOString().slice(0, 10);

/**
 * Continuous free periods of at least `minNights` nights, for apartment A, B,
 * or both at once (the whole house). Expects consecutive nights.
 */
export function freeRanges(nights: Availability["nights"], unit: "a" | "b" | "ab", minNights: number): FreeRange[] {
  const ranges: FreeRange[] = [];
  let start: string | null = null;
  let count = 0;
  const last = nights[nights.length - 1]?.date;
  const close = (endNight: string) => {
    if (start && count >= minNights) {
      ranges.push({ checkIn: start, checkOut: nextDay(endNight), nights: count, openEnded: endNight === last });
    }
    start = null;
    count = 0;
  };
  let previous: string | null = null;
  for (const n of nights) {
    const free = unit === "ab" ? n.a && n.b : n[unit];
    if (free) {
      if (start === null) start = n.date;
      count += 1;
    } else if (previous) {
      close(previous);
    }
    previous = n.date;
  }
  if (previous) close(previous);
  return ranges;
}

/** Lowest and highest nightly and weekly price of one apartment, over the coming seasons and the base rate. */
export function priceRange(pricing: Pricing): { nightly: [number, number]; weekly: [number, number] } | null {
  const rows = [...pricing.seasons, ...(pricing.base ? [pricing.base] : [])].flatMap((r) => [r.a, r.b]);
  if (rows.length === 0) return null;
  const span = (values: number[]): [number, number] => [Math.min(...values), Math.max(...values)];
  return { nightly: span(rows.map((r) => r.nightly)), weekly: span(rows.map((r) => r.weekly)) };
}

async function getJson(url: string): Promise<unknown> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS }, signal: AbortSignal.timeout(TIMEOUT_MS) });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

/** Live prices, or null; never throws, so an API problem only hides the numbers. */
export async function getPricing(): Promise<Pricing | null> {
  return parsePricing(await getJson(PRICING_URL));
}

/** The next 180 nights, or null; never throws. */
export async function getAvailability(): Promise<Availability | null> {
  return parseAvailability(await getJson(AVAILABILITY_URL));
}

const utc = (date: string) => new Date(`${date}T00:00:00Z`);
/** Intl puts thin and narrow no-break spaces around the dash; plain text reads better with normal ones. */
const plainSpaces = (text: string) => text.replace(/[\u2009\u202f]/g, " ");

/** "21.–28.11.2026" / "21–28 Nov 2026"; Intl drops the repeated month and year. */
export function formatDateRange(lang: Lang, from: string, to: string): string {
  return plainSpaces(
    new Intl.DateTimeFormat(lang === "fi" ? "fi-FI" : "en-GB", {
      day: "numeric",
      month: lang === "fi" ? "numeric" : "short",
      year: "numeric",
      timeZone: "UTC",
    }).formatRange(utc(from), utc(to)),
  );
}

/** "24.11.2026" / "24 Nov 2026" */
export function formatDate(lang: Lang, date: string): string {
  return plainSpaces(
    new Intl.DateTimeFormat(lang === "fi" ? "fi-FI" : "en-GB", {
      day: "numeric",
      month: lang === "fi" ? "numeric" : "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(utc(date)),
  );
}
