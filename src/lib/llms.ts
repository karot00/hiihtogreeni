import { CAPACITY, COMPANY, EXTERNAL_LINKS, RENTAL_CONTACT, bookingPageUrl, bookingTermsUrl } from "../content/shared.ts";
import type { PageContent } from "../content/types.ts";
import { enCabin, enCabinSections, enContact, enGallery, enHome, enRates, enRatesSections, enTeams, enTeamsSections } from "../content/en.ts";
import { fiCabin, fiContact, fiGallery, fiHome, fiRates, fiTeams } from "../content/fi.ts";
import { SITE_CONFIG } from "./config.ts";

/**
 * /llms.txt and /llms-full.txt (https://llmstxt.org), built from the same
 * content the pages render, so an AI assistant reads the facts a guest sees.
 * Prices and free dates are not written here: they live in the booking
 * calendar (AGENT-VISIBILITY-PLAN.md step 4 adds them from the booking API).
 * The email stays out because the site shows it only on click.
 */

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

function booking(): string {
  return [
    "## Prices, availability and booking",
    "",
    `Prices and free dates are not listed in this file. The booking calendar shows the free apartments and the exact price for any dates: ${bookingPageUrl("en")} (Finnish: ${bookingPageUrl("fi")}). Do not quote a price you have not read there.`,
    "",
    list(enRatesSections.terms),
    "",
    "How to book:",
    "",
    `1. Pick the dates and apartments in the booking calendar and send a booking request. The owner replies by email; sending a request does not charge anything.`,
    `2. Or call ${RENTAL_CONTACT.name}, ${RENTAL_CONTACT.phoneDisplay}, or use the contact form at ${url(enContact.slug)}.`,
    "",
    `Booking terms: ${bookingTermsUrl("en")}`,
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

export function buildLlmsTxt(): string {
  return [
    header(),
    facts(),
    booking(),
    pages(),
    [
      "## Optional",
      "",
      `- [Full description](${url("/llms-full.txt")}): the cabin, team accommodation and booking terms in one file`,
      `- [Hiihtogreeni on levifinland.fi](${EXTERNAL_LINKS.leviEn}): presentation by the sister site`,
      `- [Levi Golf green fees](${EXTERNAL_LINKS.greenFee}): sold by Hiihtogreeni`,
    ].join("\n"),
  ].join("\n\n") + "\n";
}

export function buildLlmsFullTxt(): string {
  const s = enCabinSections;
  const t = enTeamsSections;
  return [
    header(),
    facts(),
    booking(),
    ["### Questions about booking", "", enRatesSections.faq.map((item) => `**${item.q}**\n${item.a}`).join("\n\n")].join("\n"),
    ["## The cabin", "", s.lead, "", s.intro, "", s.introAfter].join("\n"),
    ["### Bedrooms (per apartment)", "", s.bedrooms.map(bedroomLine).join("\n")].join("\n"),
    ["### Living room, kitchen and sauna (per apartment)", "", list(s.livingKitchen)].join("\n"),
    ["### Special features", "", list(s.special)].join("\n"),
    ["## For teams and groups", "", t.intro, "", ...t.introParagraphs.flatMap((p) => [p, ""]), t.maintenance, "", t.location].join("\n"),
    ["### Questions from teams", "", t.faq.map((item) => `**${item.q}**\n${item.a}`).join("\n\n")].join("\n"),
    ["## Levi Golf green fees", "", enRatesSections.greenFee, "", EXTERNAL_LINKS.greenFee].join("\n"),
    pages(),
  ].join("\n\n") + "\n";
}
