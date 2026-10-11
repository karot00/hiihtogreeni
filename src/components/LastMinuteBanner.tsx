import Link from "next/link";
import type { Lang, LastMinuteStrings } from "../content/types.ts";
import {
  dealHref,
  fill,
  formatDealDates,
  formatEuros,
  seasonFor,
  type LastMinuteDeal,
} from "../lib/last-minute.ts";

/**
 * Front-page last-minute offer, always in the same structure: dates, headline
 * with the discount, the arrival's season, free apartments, price and a link
 * to the rates page with the stay preselected in the booking calendar.
 * Server-rendered, so the offer is in the page's HTML for search engines.
 */
export function LastMinuteBanner({
  lang,
  deal,
  strings,
}: {
  lang: Lang;
  deal: LastMinuteDeal;
  strings: LastMinuteStrings;
}) {
  const season = strings.seasons[seasonFor(deal.checkIn)];
  const free =
    deal.units === "AB" ? strings.wholeHouseFree : fill(strings.apartmentFree, { apartment: deal.units });

  return (
    <section aria-labelledby="last-minute-title" className="bg-snow pt-10 md:pt-14">
      <div className="container-page">
        <div className="grid gap-8 rounded-[var(--radius-card)] bg-fjord-dark p-6 text-white md:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="eyebrow text-white/80">
              {fill(strings.eyebrow, { dates: formatDealDates(lang, deal) })}
            </p>
            <h2 id="last-minute-title" className="mt-3 max-w-[28ch] text-white">
              {fill(strings.title, { percent: deal.discountPercent })}
            </h2>
            <p className="mt-4 max-w-[60ch] text-lead text-white/90">
              <strong className="font-semibold text-white">{season.name}.</strong> {season.text}
            </p>
            <p className="mt-2 text-white/90">{free}</p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end lg:text-right">
            <span className="rounded-[var(--radius-tag)] bg-ember px-3 py-1 font-display text-sm font-bold text-ink">
              −{deal.discountPercent}
              {lang === "fi" ? "\u00a0%" : "%"}
            </span>
            <p>
              <span className="font-display text-4xl font-bold">{formatEuros(lang, deal.priceCents)}</span>
              <span className="mt-1 block text-sm text-white/80">
                {fill(strings.priceNote, { nights: deal.nights })}
              </span>
              <span className="block text-sm text-white/80">
                {fill(strings.normally, { price: "" })}
                <s>{formatEuros(lang, deal.normalPriceCents)}</s>
              </span>
            </p>
            <Link
              href={dealHref(lang, deal)}
              className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-control)] bg-white px-5 font-display text-sm font-semibold tracking-wide text-fjord-dark transition-colors hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {strings.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
