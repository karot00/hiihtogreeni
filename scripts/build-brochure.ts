/**
 * Builds the companies brochure PDFs (docs/geo-ja-yritysnakyvyys-suunnitelma.md
 * phase 4) into public/, in Finnish and English:
 *
 *   npm run brochure
 *
 * Prices come from the booking API's /quote at run time, so run this again
 * when facts or prices change, and at least when the season changes. Needs a
 * Chrome or Chromium binary (CHROME=/path/to/chrome to choose one).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import type { Lang } from "../src/content/types.ts";
import { getQuote } from "../src/lib/booking-api.ts";
import { BROCHURE_PATHS, BROCHURE_STRINGS, brochureLink, buildBrochureHtml, type BrochureImages } from "../src/lib/brochure.ts";
import { companyExamples, todayInFinland } from "../src/lib/company-examples.ts";
import { COMPANY } from "../src/content/shared.ts";

const ROOT = resolve(import.meta.dirname, "..");
const PUBLIC = join(ROOT, "public");
const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Source photos: the owner's photos in assets/brochure (resized, metadata
 * removed; the phone originals stay out of git) and the site's own images.
 */
const SOURCES: Record<keyof BrochureImages, { path: string; width: number; height: number }> = {
  cover: { path: "assets/brochure/meeting-room-wide.jpg", width: 1120, height: 1440 },
  living: { path: "public/wp-content/uploads/2026/10/hiihtogreeni-levi-cabin-large-groups-livingroom.jpg", width: 1040, height: 1440 },
  conference: { path: "assets/brochure/meeting-room.jpg", width: 800, height: 1440 },
  workshop: { path: "assets/brochure/workshop-ai-generated-people.jpg", width: 840, height: 1440 },
  mapSummer: { path: "public/wp-content/uploads/2025/07/Points-of-interest-Hiihtogreeni-summer.jpg", width: 1024, height: 681 },
  mapWinter: { path: "public/wp-content/uploads/2025/07/Points-of-interest-Hiihtogreeni-winter.jpg", width: 1024, height: 681 },
  floorDown: { path: "public/wp-content/uploads/2022/10/Hgr3dalakerta.jpg", width: 1024, height: 594 },
  floorUp: { path: "public/wp-content/uploads/2022/10/Hgr3dylakerta.jpg", width: 1024, height: 499 },
};

function findChrome(): string {
  if (process.env.CHROME) return process.env.CHROME;
  for (const bin of ["google-chrome", "chromium", "chromium-browser"]) {
    try {
      execFileSync("which", [bin], { stdio: "ignore" });
      return bin;
    } catch {
      // try the next one
    }
  }
  const cache = join(homedir(), ".cache/ms-playwright");
  if (existsSync(cache)) {
    for (const dir of readdirSync(cache).filter((d) => d.startsWith("chromium-")).sort().reverse()) {
      const bin = join(cache, dir, "chrome-linux/chrome");
      if (existsSync(bin)) return bin;
    }
  }
  throw new Error("No Chrome or Chromium found; set CHROME=/path/to/chrome");
}

function fontCss(): string {
  const face = (family: string, pkg: string, weight: number) => {
    const file = join(ROOT, "node_modules/@fontsource", pkg, "files", `${pkg}-latin-${weight}-normal.woff2`);
    const data = readFileSync(file).toString("base64");
    return `@font-face{font-family:"${family}";font-weight:${weight};font-style:normal;src:url(data:font/woff2;base64,${data}) format("woff2");}`;
  };
  return [
    ...[600, 700, 800].map((w) => face("Montserrat", "montserrat", w)),
    ...[400, 500, 600].map((w) => face("Fira Sans", "fira-sans", w)),
  ].join("");
}

/** Resized copies for the PDF, without metadata. */
async function prepareImages(dir: string): Promise<BrochureImages> {
  const out = {} as BrochureImages;
  for (const [key, { path, width, height }] of Object.entries(SOURCES) as [keyof BrochureImages, (typeof SOURCES)[keyof BrochureImages]][]) {
    const file = join(dir, `${key}.jpg`);
    await sharp(join(ROOT, path)).rotate().resize(width, height, { fit: "cover" }).jpeg({ quality: 74, mozjpeg: true }).toFile(file);
    out[key] = pathToFileURL(file).href;
  }
  return out;
}

async function build(lang: Lang, chrome: string, work: string, images: BrochureImages, fonts: string) {
  const today = todayInFinland();
  const examples = companyExamples(today);
  const quotes = await Promise.all(examples.map((stay) => getQuote(lang, stay)));
  const priced = examples.flatMap((example, i) => (quotes[i] ? [{ example, quote: quotes[i] }] : []));
  if (priced.length < examples.length) console.warn(`${lang}: ${examples.length - priced.length} price example(s) left out (not priced by /quote)`);

  const qrSvg = await QRCode.toString(brochureLink(lang, "rates", "#booking-calendar"), { type: "svg", margin: 0, errorCorrectionLevel: "M" });
  const html = buildBrochureHtml({ lang, today, examples: priced, images, fontCss: fonts, qrSvg });
  const htmlFile = join(work, `brochure-${lang}.html`);
  const rawPdf = join(work, `brochure-${lang}.pdf`);
  writeFileSync(htmlFile, html);
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=10000", `--print-to-pdf=${rawPdf}`, pathToFileURL(htmlFile).href], {
    stdio: "ignore",
  });

  const b = BROCHURE_STRINGS[lang];
  const pdf = await PDFDocument.load(readFileSync(rawPdf));
  pdf.setTitle(b.docTitle, { showInWindowTitleBar: true });
  pdf.setAuthor(COMPANY.name);
  pdf.setSubject(b.subject);
  pdf.setKeywords(b.keywords.split(", "));
  pdf.setLanguage(lang === "fi" ? "fi-FI" : "en-GB");
  pdf.setCreator("hiihtogreeni scripts/build-brochure.ts");
  const now = new Date();
  pdf.setCreationDate(now);
  pdf.setModificationDate(now);

  const target = join(PUBLIC, BROCHURE_PATHS[lang]);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, await pdf.save());
  const size = statSync(target).size;
  console.log(`${lang}: ${BROCHURE_PATHS[lang]} (${pdf.getPageCount()} pages, ${(size / 1024 / 1024).toFixed(2)} MB, ${priced.length} price examples)`);
  if (size > MAX_BYTES) throw new Error(`${target} is over 5 MB`);
}

const work = mkdtempSync(join(tmpdir(), "hg-brochure-"));
try {
  const chrome = findChrome();
  const images = await prepareImages(work);
  const fonts = fontCss();
  for (const lang of ["fi", "en"] as const) await build(lang, chrome, work, images, fonts);
} finally {
  rmSync(work, { recursive: true, force: true });
}
