import type { CompanyExampleKey, Lang } from "../content/types.ts";
import { enCompaniesSections } from "../content/en.ts";
import { fiCompaniesSections } from "../content/fi.ts";
import { formatNights, type Pricing, type StayRequest } from "./booking-api.ts";
import { fill } from "./last-minute.ts";

const SECTIONS = { fi: fiCompaniesSections, en: enCompaniesSections } as const;

/**
 * Example stays for the companies page (docs/geo-ja-yritysnakyvyys-suunnitelma.md
 * 6.3): weekday stays in the quiet May season and in the autumn colours. The
 * dates move forward every year, so the page never shows a past stay; the price
 * always comes from the booking system's /quote, never from this file.
 */

export interface CompanyExample extends StayRequest {
  key: CompanyExampleKey;
}

interface Template {
  key: CompanyExampleKey;
  /** Month (1–12) and day the search for the weekday starts from. */
  month: number;
  day: number;
  /** 0 = Sunday … 6 = Saturday */
  weekday: number;
  nights: number;
  units: StayRequest["units"];
  guests: number;
  conferenceRoom: boolean;
}

const TEMPLATES: Template[] = [
  // In the order of the set-ups (CompaniesSections.configs).
  { key: "mayHouse", month: 5, day: 10, weekday: 1, nights: 3, units: "AB", guests: 14, conferenceRoom: true },
  { key: "autumnHouse", month: 9, day: 7, weekday: 2, nights: 3, units: "AB", guests: 18, conferenceRoom: true },
  { key: "mayApartment", month: 5, day: 10, weekday: 1, nights: 3, units: "A", guests: 12, conferenceRoom: true },
];

/** Examples closer than this are skipped to next year, as they are likely booked. */
const LEAD_DAYS = 21;
const DAY_MS = 86_400_000;

const iso = (t: number) => new Date(t).toISOString().slice(0, 10);

/** The first `weekday` on or after month/day, in the first year where it is at least LEAD_DAYS after `today`. */
export function upcomingWeekday(today: string, month: number, day: number, weekday: number): string {
  const earliest = Date.parse(`${today}T00:00:00Z`) + LEAD_DAYS * DAY_MS;
  for (let year = Number(today.slice(0, 4)); ; year++) {
    const start = Date.UTC(year, month - 1, day);
    const date = start + (((weekday - new Date(start).getUTCDay()) + 7) % 7) * DAY_MS;
    if (date >= earliest) return iso(date);
  }
}

export function companyExamples(today: string): CompanyExample[] {
  return TEMPLATES.map(({ key, month, day, weekday, nights, units, guests, conferenceRoom }) => {
    const checkIn = upcomingWeekday(today, month, day, weekday);
    const checkOut = iso(Date.parse(`${checkIn}T00:00:00Z`) + nights * DAY_MS);
    return { key, checkIn, checkOut, units, guests, conferenceRoom, bedsMade: true };
  });
}

/** Today's date in Finland (YYYY-MM-DD), as the booking system counts it. */
export function todayInFinland(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Helsinki" }).format(now);
}

/** The shortest-stay answer from the live stay rules, so the page never contradicts the booking system. */
export function shortStayAnswer(lang: Lang, pricing: Pricing | null): string {
  const s = SECTIONS[lang].shortStay;
  if (!pricing) return s.unknown;
  const n = pricing.minNights;
  const min = formatNights(lang, n);
  return pricing.minChargedNights > n
    ? fill(s.withMinimumCharge, { min, charged: pricing.minChargedNights })
    : fill(s.minimumOnly, { min });
}

/** The visible FAQ with the live shortest-stay answer after the meeting room price. */
export function companiesFaq(lang: Lang, pricing: Pricing | null) {
  const s = SECTIONS[lang];
  const faq = [...s.faq];
  faq.splice(5, 0, { q: s.shortStay.q, a: shortStayAnswer(lang, pricing) });
  return faq;
}
