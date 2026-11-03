import type { Lang } from "../content/types.ts";
import { enBrochure, enCompaniesSections } from "../content/en.ts";
import { fiBrochure, fiCompaniesSections } from "../content/fi.ts";
import { RENTAL_CONTACT } from "../content/shared.ts";
import { SITE_CONFIG } from "./config.ts";
import { formatDate, formatDateRange, type Quote } from "./booking-api.ts";
import type { CompanyExample } from "./company-examples.ts";
import { fill, formatEuros } from "./last-minute.ts";
import { getHref } from "./routes.ts";

/**
 * The downloadable brochure for companies (docs/geo-ja-yritysnakyvyys-suunnitelma.md
 * phase 4): nine 16:9 slides of real text, built from the same content as the
 * companies page and printed to PDF by scripts/build-brochure.ts.
 */
export { BROCHURE_PATHS } from "./routes.ts";

export const BROCHURE_STRINGS = { fi: fiBrochure, en: enBrochure } as const;
const SECTIONS = { fi: fiCompaniesSections, en: enCompaniesSections } as const;

const UTM = { utm_source: "esite", utm_medium: "pdf", utm_campaign: "yritysryhmat" };

/** A site URL with the brochure's UTM tags (plan 7.3). */
export function brochureLink(lang: Lang, route: "rates" | "companies", hash = ""): string {
  return `${SITE_CONFIG.url}${getHref(lang, route)}?${new URLSearchParams(UTM)}${hash}`;
}

export interface BrochureImages {
  cover: string;
  living: string;
  conference: string;
  workshop: string;
  mapSummer: string;
  mapWinter: string;
  floorDown: string;
  floorUp: string;
}

export interface BrochureInput {
  lang: Lang;
  /** The day the prices were read (YYYY-MM-DD). */
  today: string;
  examples: { example: CompanyExample; quote: Quote }[];
  images: BrochureImages;
  /** @font-face rules (data URIs, so the print needs no network). */
  fontCss: string;
  /** Inline SVG of the QR code to the booking calendar. */
  qrSvg: string;
}

const esc = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const euros = (lang: Lang, amount: number) => formatEuros(lang, Math.round(amount * 100));

/** Whole euros per person per night for an example. */
export function perPersonNight(example: CompanyExample, quote: Quote): number {
  return Math.round(quote.totalEur / example.guests / quote.nights);
}

const CSS = `
@page { size: 1280px 720px; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: "Fira Sans", sans-serif; color: #172126; font-size: 17px; line-height: 1.5; }
h1, h2, h3, .display { font-family: "Montserrat", sans-serif; letter-spacing: -0.01em; }
.slide { width: 1280px; height: 720px; position: relative; overflow: hidden; page-break-after: always; break-after: page; background: #f7f8f6; }
.slide:last-child { page-break-after: auto; break-after: auto; }
.pad { padding: 56px 64px 72px; height: 100%; }
.eyebrow { font-family: "Montserrat", sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #486c7a; }
h2 { font-size: 40px; font-weight: 800; line-height: 1.1; margin-top: 8px; }
h3 { font-size: 19px; font-weight: 700; color: #294955; line-height: 1.25; }
.footer { position: absolute; left: 64px; bottom: 26px; font-size: 12px; color: #46545a; }
.split { display: grid; height: 100%; }
.img { width: 100%; height: 100%; object-fit: cover; display: block; }
.cover { background: #203b34; color: #fff; grid-template-columns: 1fr 560px; }
.cover .text { padding: 72px 64px; display: flex; flex-direction: column; justify-content: center; }
.cover .eyebrow { color: rgba(255,255,255,0.8); }
.cover h1 { font-size: 58px; font-weight: 800; line-height: 1.04; margin-top: 14px; }
.cover p { font-size: 21px; line-height: 1.5; margin-top: 24px; color: rgba(255,255,255,0.92); max-width: 30em; }
.cover .brand { font-family: "Montserrat", sans-serif; font-weight: 800; font-size: 22px; position: absolute; left: 64px; top: 48px; }
.cover .site { position: absolute; left: 64px; bottom: 40px; font-size: 15px; color: rgba(255,255,255,0.8); }
ul.dots { list-style: none; margin-top: 28px; }
ul.dots li { position: relative; padding-left: 24px; margin-top: 14px; font-size: 19px; }
ul.dots li::before { content: ""; position: absolute; left: 0; top: 11px; width: 8px; height: 8px; border-radius: 50%; background: #e47d33; }
.facts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 32px; margin-top: 22px; }
.facts div { border-top: 1px solid #dde5e7; padding-top: 8px; }
.facts dt { font-family: "Montserrat", sans-serif; font-weight: 700; font-size: 14px; color: #294955; }
.facts dd { font-size: 14px; line-height: 1.45; margin-top: 2px; }
.cards { display: grid; gap: 14px; margin-top: 24px; }
.card { background: #fff; border: 1px solid #dde5e7; border-radius: 14px; padding: 16px 18px; }
.card p { font-size: 15px; margin-top: 6px; line-height: 1.45; }
.program .card dt { font-size: 12px; font-weight: 600; color: #46545a; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.06em; }
.program .card dd { font-size: 15.5px; line-height: 1.45; }
.price { font-family: "Montserrat", sans-serif; font-size: 30px; font-weight: 800; margin-top: 8px; }
.muted { color: #46545a; font-size: 13px; }
.from { display: inline-block; background: #e47d33; color: #172126; font-family: "Montserrat", sans-serif; font-weight: 700; font-size: 16px; padding: 6px 14px; border-radius: 8px; margin-top: 14px; }
.label { position: absolute; left: 16px; bottom: 16px; background: rgba(23,33,38,0.78); color: #fff; font-size: 12px; padding: 5px 10px; border-radius: 6px; }
.maps { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 22px; }
.maps figure { position: relative; }
.maps img { width: 100%; height: auto; aspect-ratio: 1024 / 681; border-radius: 14px; display: block; }
.maps figcaption { font-family: "Montserrat", sans-serif; font-weight: 700; font-size: 16px; margin-top: 8px; color: #294955; }
.floors img { width: 100%; display: block; border-radius: 10px; border: 1px solid #dde5e7; background: #fff; margin-top: 12px; }
.qr { width: 230px; height: 230px; background: #fff; padding: 12px; border-radius: 14px; }
.qr svg { width: 100%; height: 100%; display: block; }
a { color: inherit; text-decoration: none; }
`;

function footer(b: (typeof BROCHURE_STRINGS)[Lang], date: string, page: number) {
  return `<div class="footer"><span>${esc(fill(b.footer, { date }))} · ${page}</span></div>`;
}

/** The brochure as one HTML document, ready to print to PDF. */
export function buildBrochureHtml({ lang, today, examples, images, fontCss, qrSvg }: BrochureInput): string {
  const b = BROCHURE_STRINGS[lang];
  const s = SECTIONS[lang];
  const date = formatDate(lang, today);
  const img = (src: string, alt: string) => `<img class="img" src="${esc(src)}" alt="${esc(alt)}">`;
  const companies = brochureLink(lang, "companies");
  const calendar = brochureLink(lang, "rates", "#booking-calendar");
  const lowest = examples.length ? Math.min(...examples.map(({ example, quote }) => perPersonNight(example, quote))) : null;
  let page = 1;
  const slides: string[] = [];

  slides.push(`<section class="slide"><div class="split cover">
  <div class="text"><span class="brand">Hiihtogreeni</span>
    <p class="eyebrow">${esc(b.coverEyebrow)}</p>
    <h1>${esc(b.coverTitle)}</h1>
    <p>${esc(b.coverLead)}</p>
    <a class="site" href="${esc(companies)}">${esc(SITE_CONFIG.url.replace("https://", ""))}${esc(getHref(lang, "companies"))}</a>
  </div>
  ${img(images.cover, s.images.hero)}
</div></section>`);

  slides.push(`<section class="slide"><div class="split" style="grid-template-columns: 1fr 520px">
  <div class="pad"><p class="eyebrow">Hiihtogreeni</p><h2>${esc(b.whyTitle)}</h2>
    <ul class="dots">${b.why.map((line) => `<li>${esc(line)}</li>`).join("")}</ul></div>
  ${img(images.living, s.images.living)}
</div>${footer(b, date, ++page)}</section>`);

  slides.push(`<section class="slide"><div class="split" style="grid-template-columns: 1fr 400px">
  <div class="pad" style="padding-right:40px"><p class="eyebrow">${esc(s.factsLead)}</p><h2>${esc(b.factsTitle)}</h2>
    <dl class="facts">${s.facts.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join("")}</dl></div>
  ${img(images.conference, s.images.hero)}
</div>${footer(b, date, ++page)}</section>`);

  slides.push(`<section class="slide"><div class="split" style="grid-template-columns: 1fr 420px">
  <div class="pad" style="padding-right:40px"><p class="eyebrow">${esc(s.useCasesLead)}</p><h2>${esc(b.useCasesTitle)}</h2>
    <div class="cards" style="grid-template-columns: 1fr 1fr">${s.useCases
      .map((uc) => `<div class="card"><h3>${esc(uc.title)}</h3><p>${esc(uc.text)}</p></div>`)
      .join("")}</div></div>
  <div style="position:relative">${img(images.workshop, b.aiLabel)}<span class="label">${esc(b.aiLabel)}</span></div>
</div>${footer(b, date, ++page)}</section>`);

  slides.push(`<section class="slide program"><div class="pad"><p class="eyebrow">${esc(s.programLead)}</p><h2>${esc(b.programTitle)}</h2>
  <p class="muted" style="margin-top:10px;font-size:15px;max-width:70em">${esc(s.programIntro)}</p>
  <div class="cards" style="grid-template-columns: repeat(3, 1fr)">${s.programs
    .map(
      (p) =>
        `<div class="card"><h3>${esc(p.season)}</h3><dl>${p.days
          .map((d) => `<dt>${esc(d.when)}</dt><dd>${esc(d.text)}</dd>`)
          .join("")}</dl>${
          p.note
            ? `<p style="margin-top:10px;padding-top:8px;border-top:1px solid #dde5e7;font-size:14px;line-height:1.45">${esc(p.note.text)} <a href="${esc(p.note.href)}" style="font-weight:600;color:#294955;text-decoration:underline">${esc(p.note.linkText)}</a></p>`
            : ""
        }</div>`,
    )
    .join("")}</div>
</div>${footer(b, date, ++page)}</section>`);

  const priceCards = examples.length
    ? `<div class="cards" style="grid-template-columns: repeat(3, 1fr); margin-top:16px">${examples
        .map(
          ({ example, quote }) => `<div class="card"><h3>${esc(s.examples[example.key])}</h3>
      <p class="muted">${esc(formatDateRange(lang, quote.checkIn, quote.checkOut))}</p>
      <p class="price">${esc(fill(s.total, { price: euros(lang, quote.totalEur) }))}</p>
      <p>${esc(fill(s.perPerson, { price: euros(lang, perPersonNight(example, quote)) }))}</p></div>`,
        )
        .join("")}</div>
    <p class="muted" style="margin-top:12px">${esc(fill(b.pricesNote, { date }))}</p>`
    : `<p style="margin-top:16px">${esc(b.pricesUnavailable)}</p>`;
  slides.push(`<section class="slide"><div class="pad"><p class="eyebrow">${esc(s.pricesLead)}</p><h2>${esc(b.pricesTitle)}</h2>
  ${lowest ? `<span class="from">${esc(fill(b.fromPrice, { price: euros(lang, lowest) }))}</span>` : ""}
  <div class="cards" style="grid-template-columns: repeat(3, 1fr); margin-top:18px">${s.configs
    .map((c, i) => `<div class="card" style="background:#eef2f1"><h3>${i + 1}. ${esc(c.title)}</h3><p>${esc(c.text)}</p></div>`)
    .join("")}</div>
  ${priceCards}
</div>${footer(b, date, ++page)}</section>`);

  slides.push(`<section class="slide"><div class="pad"><p class="eyebrow">Levi</p><h2>${esc(b.locationTitle)}</h2>
  <p style="margin-top:10px;max-width:62em">${esc(b.locationLead)}</p>
  <div class="maps">
    <figure><img src="${esc(images.mapSummer)}" alt="${esc(b.mapSummer)}"><figcaption>${esc(b.mapSummer)}</figcaption></figure>
    <figure><img src="${esc(images.mapWinter)}" alt="${esc(b.mapWinter)}"><figcaption>${esc(b.mapWinter)}</figcaption></figure>
  </div>
</div>${footer(b, date, ++page)}</section>`);

  slides.push(`<section class="slide"><div class="split" style="grid-template-columns: 1fr 440px">
  <div class="pad" style="padding-right:40px"><p class="eyebrow">${esc(s.practicalLead)}</p><h2>${esc(b.practicalTitle)}</h2>
    <dl class="facts">${s.practical.map((p) => `<div><dt>${esc(p.title)}</dt><dd>${esc(p.text)}</dd></div>`).join("")}</dl></div>
  <div class="floors" style="padding:48px 48px 72px 0"><img src="${esc(images.floorDown)}" alt=""><img src="${esc(images.floorUp)}" alt=""></div>
</div>${footer(b, date, ++page)}</section>`);

  slides.push(`<section class="slide" style="background:#203b34;color:#fff"><div class="pad" style="display:grid;grid-template-columns:1fr 280px;gap:48px;align-items:center">
  <div><p class="eyebrow" style="color:rgba(255,255,255,0.8)">${esc(s.ctaEyebrow)}</p><h2>${esc(b.bookTitle)}</h2>
    <ol style="margin-top:22px;padding-left:24px;font-size:19px">${b.bookSteps.map((step) => `<li style="margin-top:10px">${esc(step)}</li>`).join("")}</ol>
    <p style="margin-top:28px;font-size:19px"><strong>${esc(b.phoneLabel)}:</strong> ${esc(RENTAL_CONTACT.name)}, ${esc(RENTAL_CONTACT.phoneDisplay)}</p>
    <p style="margin-top:6px;font-size:19px"><strong>${esc(b.webLabel)}:</strong> <a href="${esc(companies)}">${esc(SITE_CONFIG.url.replace("https://", ""))}${esc(getHref(lang, "companies"))}</a></p>
    <p style="margin-top:22px;font-size:15px;color:rgba(255,255,255,0.8)">${esc(b.agentNote)}</p></div>
  <div style="text-align:center"><a href="${esc(calendar)}"><div class="qr">${qrSvg}</div></a><p style="margin-top:10px;font-family:Montserrat;font-weight:700">${esc(b.qrCaption)}</p></div>
</div><div class="footer" style="color:rgba(255,255,255,0.7)"><span>${esc(fill(b.footer, { date }))} · ${++page}</span></div></section>`);

  return `<!doctype html><html lang="${lang === "fi" ? "fi" : "en-GB"}"><head><meta charset="utf-8"><title>${esc(b.docTitle)}</title><style>${fontCss}${CSS}</style></head><body>${slides.join("\n")}</body></html>`;
}
