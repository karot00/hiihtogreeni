import { CAPACITY, COMPANY, EXTERNAL_LINKS, RENTAL_CONTACT, bookingPageUrl, bookingTermsUrl } from "../content/shared.ts";
import type { PageContent } from "../content/types.ts";
import { enCabin, enCabinSections, enContact, enGallery, enHome, enRates, enRatesSections, enTeams, enTeamsSections } from "../content/en.ts";
import { fiCabin, fiContact, fiGallery, fiHome, fiRates, fiTeams } from "../content/fi.ts";
import { SITE_CONFIG } from "./config.ts";
import { API_BASE, OPENAPI_URL, formatDate, formatDateRange, freeRanges, type ApartmentPrices, type Availability, type FreeRange, type Pricing } from "./booking-api.ts";
import { formatEuros } from "./last-minute.ts";

/**
 * /llms.txt and /llms-full.txt (https://llmstxt.org), built from the same
 * content the pages render, so an AI assistant reads the facts a guest sees.
 * Prices and free dates come live from the booking API, exactly as on the
 * rates pages; without them the files point to the booking calendar instead.
 * The email stays out because the site shows it only on click.
 */

/** Live data from the booking API; either part may be missing. */
export interface LiveData {
  pricing: Pricing | null;
  availability: Availability | null;
}

const EN_PAGES = [enHome, enCabin, enTeams, enRates, enGallery, enContact];
const FI_PAGES = [fiHome, fiCabin, fiTeams, fiRates, fiGallery, fiContact];

const url = (path: string) => `${SITE_CONFIG.url}${path}`;
const list = (items: readonly string[]) => items.map((item) => `- ${item}`).join("\n");
const pageLink = (page: PageContent) => `- [${page.title}](${url(page.slug)}): ${page.description}`;

type Bedroom = (typeof enCabinSections.bedrooms)[number];
const bedroomLine = (item: Bedroom) =>
  typeof item === "string" ? `- ${item}` : [`- ${item.text}`, ...item.children.map((child) => `  - ${child}`)].join("\n");

const whole = CAPACITY.guestsPerApartment * CAPACITY.apartments;
const address = `${COMPANY.address.street}, ${COMPANY.address.postalCode} Levi, ${COMPANY.address.country}`;

function header(): string {
  return [
    `# ${SITE_CONFIG.name}`,
    "",
    `> ${SITE_CONFIG.name} is a log-built duplex rental cabin in Levi, Finnish Lapland, next to Levi Golf and the Koillisrinteet (northeast) slopes. ${CAPACITY.apartments} similar apartments for ${CAPACITY.guestsPerApartment} guests each, ${whole} for the whole house, rented separately or together. Owner: ${COMPANY.name} (VAT ID ${COMPANY.vatId}).`,
  ].join("\n");
}

function facts(): string {
  return [
    "## Facts",
    "",
    list([
      `Address: ${address} (lat ${COMPANY.geo.latitude}, lon ${COMPANY.geo.longitude})`,
      `Capacity: ${CAPACITY.guestsPerApartment} guests per apartment, ${whole} for the whole house`,
      `Per apartment: ${CAPACITY.bedrooms} bedrooms, ${CAPACITY.bathrooms} bathrooms (one per bedroom), sauna, kitchen, living room`,
      ...enCabinSections.apartments,
      enRatesSections.meetingNote,
      enTeamsSections.maintenanceTitle,
      `Location: ${enTeamsSections.location}`,
      `Built in ${COMPANY.builtYear}`,
    ]),
  ].join("\n");
}

const eur = (amount: number) => formatEuros("en", Math.round(amount * 100));
const cell = (a: ApartmentPrices, b: ApartmentPrices, key: keyof ApartmentPrices) =>
  a[key] === b[key] ? eur(a[key]) : `A ${eur(a[key])} / B ${eur(b[key])}`;

function livePrices(pricing: Pricing): string {
  const rows = pricing.seasons.map(
    (season) => `| ${season.name} | ${formatDateRange("en", season.firstNight, season.lastNight)} | ${cell(season.a, season.b, "weekly")} | ${cell(season.a, season.b, "nightly")} |`,
  );
  if (pricing.base) rows.push(`| Other times | | ${cell(pricing.base.a, pricing.base.b, "weekly")} | ${cell(pricing.base.a, pricing.base.b, "nightly")} |`);
  const e = pricing.extras;
  const extras = [
    e.cleaningPerApartment && `Final cleaning ${eur(e.cleaningPerApartment)} per apartment (always added)`,
    e.linenPerGuest && `Bed linen and towels ${eur(e.linenPerGuest)} per guest (optional)`,
    e.bedsMadePerGuest && `Made-up beds ${eur(e.bedsMadePerGuest)} per guest on top of linen (optional)`,
    e.conferenceRoomPerStay && `Conference room ${eur(e.conferenceRoomPerStay)} per stay, free with the whole house`,
    e.maintenanceRoomPerStay && `Ski and equipment maintenance room ${eur(e.maintenanceRoomPerStay)} per stay`,
  ].filter((line): line is string => Boolean(line));
  return [
    "### Seasonal prices (live from the booking system)",
    "",
    `Per apartment, VAT included. A full Saturday-to-Saturday week costs the weekly price; every other night costs the nightly price. The whole house is both apartments. Minimum stay ${pricing.minNights} nights.`,
    "",
    "| Season | Nights | Week (Sat–Sat) | Night |",
    "|---|---|---|---|",
    ...rows,
    "",
    list(extras),
    ...(pricing.lastMinute
      ? ["", `Last minute: ${pricing.lastMinute.percent}% off the accommodation for arrivals until ${formatDate("en", pricing.lastMinute.arrivalsUntil)} (not cleaning or extras).`]
      : []),
  ].join("\n");
}

const stay = (range: FreeRange) =>
  range.openEnded ? `from ${formatDate("en", range.checkIn)}` : `${formatDateRange("en", range.checkIn, range.checkOut)} (${range.nights} nights)`;

function liveFreeDates(availability: Availability, minNights: number): string {
  const group = (title: string, unit: "a" | "b" | "ab") => {
    const ranges = freeRanges(availability.nights, unit, minNights);
    return `- ${title}: ${ranges.length ? ranges.map(stay).join("; ") : "no free periods"}`;
  };
  return [
    `### Free periods (live, next six months from ${formatDate("en", availability.today)})`,
    "",
    "Check-in to check-out dates of continuous free periods that fit the minimum stay.",
    "",
    group(`Whole house (${whole} guests)`, "ab"),
    group(`Apartment A (${CAPACITY.guestsPerApartment} guests)`, "a"),
    group(`Apartment B (${CAPACITY.guestsPerApartment} guests)`, "b"),
  ].join("\n");
}

function booking(live?: LiveData): string {
  const pricing = live?.pricing && (live.pricing.seasons.length > 0 || live.pricing.base) ? live.pricing : null;
  const intro = pricing
    ? `The prices and free periods below come live from the booking system and are refreshed every 15 minutes. The exact total for given dates (weeks, nights, cleaning and extras) is shown by the booking calendar: ${bookingPageUrl("en")} (Finnish: ${bookingPageUrl("fi")}).`
    : `Prices and free dates could not be read from the booking system just now. The booking calendar shows the free apartments and the exact price for any dates: ${bookingPageUrl("en")} (Finnish: ${bookingPageUrl("fi")}). Do not quote a price you have not read there.`;
  return [
    "## Prices, availability and booking",
    "",
    intro,
    ...(pricing ? ["", livePrices(pricing)] : []),
    ...(live?.availability ? ["", liveFreeDates(live.availability, pricing?.minNights ?? 1)] : []),
    "",
    "### Terms",
    "",
    list(enRatesSections.terms),
    "",
    "### How to book",
    "",
    `1. Pick the dates and apartments in the booking calendar and send a booking request. The owner replies by email; sending a request does not charge anything.`,
    `2. Or call ${RENTAL_CONTACT.name}, ${RENTAL_CONTACT.phoneDisplay}, or use the contact form at ${url(enContact.slug)}.`,
    "",
    `Booking terms: ${bookingTermsUrl("en")}`,
  ].join("\n");
}

function agents(): string {
  return [
    "## For AI agents",
    "",
    `The booking system has a public JSON API, live from the same data as the calendar. Contract: ${OPENAPI_URL}`,
    "",
    list([
      `GET ${API_BASE}/property: facts, apartments, rooms, rules, FAQ, how booking works`,
      `GET ${API_BASE}/pricing: seasons, extras, stay and payment rules, the last-minute offer`,
      `GET ${API_BASE}/availability?from=YYYY-MM-DD&to=YYYY-MM-DD: each night per apartment`,
      `GET ${API_BASE}/quote?check_in=YYYY-MM-DD&check_out=YYYY-MM-DD&units=A|B|AB&guests=N: the exact price of a stay`,
      `POST ${API_BASE}/inquiries: a booking request for a guest who has agreed to it and to the booking terms; the owner confirms by email and nothing is charged`,
    ]),
    "",
    "Never quote a total for given dates that /quote has not returned.",
  ].join("\n");
}

function pages(): string {
  return [
    "## Pages",
    "",
    EN_PAGES.map(pageLink).join("\n"),
    "",
    "Suomeksi:",
    "",
    FI_PAGES.map(pageLink).join("\n"),
  ].join("\n");
}

export function buildLlmsTxt(live?: LiveData): string {
  return [
    header(),
    facts(),
    booking(live),
    agents(),
    pages(),
    [
      "## Optional",
      "",
      `- [Full description](${url("/llms-full.txt")}): the cabin, team accommodation, booking FAQ and terms in one file`,
      `- [Hiihtogreeni on levifinland.fi](${EXTERNAL_LINKS.leviEn}): presentation by the sister site`,
      `- [Levi Golf green fees](${EXTERNAL_LINKS.greenFee}): sold by Hiihtogreeni`,
    ].join("\n"),
  ].join("\n\n") + "\n";
}

export function buildLlmsFullTxt(live?: LiveData): string {
  const s = enCabinSections;
  const t = enTeamsSections;
  return [
    header(),
    facts(),
    booking(live),
    ["### Questions about booking", "", enRatesSections.faq.map((item) => `**${item.q}**\n${item.a}`).join("\n\n")].join("\n"),
    ["## The cabin", "", s.lead, "", s.intro, "", s.introAfter].join("\n"),
    ["### Bedrooms (per apartment)", "", s.bedrooms.map(bedroomLine).join("\n")].join("\n"),
    ["### Living room, kitchen and sauna (per apartment)", "", list(s.livingKitchen)].join("\n"),
    ["### Special features", "", list(s.special)].join("\n"),
    ["## For teams and groups", "", t.intro, "", ...t.introParagraphs.flatMap((p) => [p, ""]), t.maintenance, "", t.location].join("\n"),
    ["### Questions from teams", "", t.faq.map((item) => `**${item.q}**\n${item.a}`).join("\n\n")].join("\n"),
    ["## Levi Golf green fees", "", enRatesSections.greenFee, "", EXTERNAL_LINKS.greenFee].join("\n"),
    agents(),
    pages(),
  ].join("\n\n") + "\n";
}
