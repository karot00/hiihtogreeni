import { BOOKING_ORIGIN } from "../content/shared.ts";
import type { Lang, SeasonKey } from "../content/types.ts";
import { getHref } from "./routes.ts";

/**
 * The front-page last-minute banner reads one deal from the cabins.levifinland.fi
 * booking system (GET /api/public/hiihtogreeni/deals), which prices it like the
 * booking calendar. The front pages are rebuilt daily (revalidate = 86400).
 */
export const DEALS_URL = `${BOOKING_ORIGIN}/api/public/hiihtogreeni/deals`;

export interface LastMinuteDeal {
  checkIn: string;
  checkOut: string;
  nights: number;
  /** Free apartments: "A", "B" or both ("AB"). */
  units: "A" | "B" | "AB";
  /** One apartment with final cleaning, in cents. */
  priceCents: number;
  normalPriceCents: number;
  discountPercent: number;
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * The deal to show, or null. The banner only appears when the owner's
 * last-minute offer is on, the deal is discounted and inquiries are open
 * (owner decision 2026-10-11: no banner without the discount).
 */
export function visibleDeal(feed: unknown): LastMinuteDeal | null {
  if (!feed || typeof feed !== "object") return null;
  const { offer, inquiriesOpen, deal } = feed as Record<string, unknown>;
  if (inquiriesOpen !== true || (offer as { enabled?: unknown } | undefined)?.enabled !== true) return null;
  if (!deal || typeof deal !== "object") return null;
  const d = deal as Record<string, unknown>;
  const valid =
    typeof d.checkIn === "string" && DATE.test(d.checkIn) &&
    typeof d.checkOut === "string" && DATE.test(d.checkOut) && d.checkOut > d.checkIn &&
    Number.isInteger(d.nights) && (d.nights as number) > 0 &&
    (d.units === "A" || d.units === "B" || d.units === "AB") &&
    Number.isInteger(d.priceCents) && Number.isInteger(d.normalPriceCents) &&
    (d.priceCents as number) > 0 && (d.priceCents as number) < (d.normalPriceCents as number) &&
    typeof d.discountPercent === "number" && d.discountPercent > 0;
  if (!valid) return null;
  return {
    checkIn: d.checkIn as string,
    checkOut: d.checkOut as string,
    nights: d.nights as number,
    units: d.units as LastMinuteDeal["units"],
    priceCents: d.priceCents as number,
    normalPriceCents: d.normalPriceCents as number,
    discountPercent: d.discountPercent as number,
  };
}

/** Today's deal, or null; never throws, so a feed problem only hides the banner. */
export async function getLastMinuteDeal(): Promise<LastMinuteDeal | null> {
  try {
    const res = await fetch(DEALS_URL, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(8000) });
    return res.ok ? visibleDeal(await res.json()) : null;
  } catch {
    return null;
  }
}

/** Season starts (MM-DD, owner 2026-10-11); 1.–6.1. still belong to Christmas. */
const SEASON_STARTS: [string, SeasonKey][] = [
  ["01-07", "midwinter"],
  ["02-16", "peak"],
  ["04-01", "spring"],
  ["05-16", "quiet"],
  ["06-06", "summer"],
  ["09-01", "ruska"],
  ["10-01", "firstSnow"],
  ["11-11", "earlyWinter"],
  ["12-15", "christmas"],
];

export function seasonFor(date: string): SeasonKey {
  const monthDay = date.slice(5);
  let season: SeasonKey = "christmas";
  for (const [start, key] of SEASON_STARTS) if (monthDay >= start) season = key;
  return season;
}

/** The rates page with the stay preselected in its booking calendar. */
export function dealHref(lang: Lang, deal: LastMinuteDeal): string {
  const params = new URLSearchParams({ checkIn: deal.checkIn, checkOut: deal.checkOut });
  // With both apartments free the guest picks one or the whole house.
  if (deal.units !== "AB") params.set("units", deal.units);
  return `${getHref(lang, "rates")}?${params}#booking-calendar`;
}

const utc = (date: string) => new Date(`${date}T00:00:00Z`);
const locale = (lang: Lang) => (lang === "fi" ? "fi-FI" : "en-GB");

/** "la 7.11. – la 14.11." / "Sat 7 Nov – Sat 14 Nov" */
export function formatDealDates(lang: Lang, deal: LastMinuteDeal): string {
  const day = new Intl.DateTimeFormat(locale(lang), {
    weekday: "short",
    day: "numeric",
    month: lang === "fi" ? "numeric" : "short",
    timeZone: "UTC",
  });
  return `${day.format(utc(deal.checkIn))} – ${day.format(utc(deal.checkOut))}`;
}

/** "7.–14.11." / "7–14 Nov", for the meta description. */
export function formatShortDates(lang: Lang, deal: LastMinuteDeal): string {
  return new Intl.DateTimeFormat(locale(lang), {
    day: "numeric",
    month: lang === "fi" ? "numeric" : "short",
    timeZone: "UTC",
  }).formatRange(utc(deal.checkIn), utc(deal.checkOut));
}

/** Whole euros: "2 746 €" / "€2,746". */
export function formatEuros(lang: Lang, cents: number): string {
  return new Intl.NumberFormat(locale(lang), {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

/** Fills {name} placeholders. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
