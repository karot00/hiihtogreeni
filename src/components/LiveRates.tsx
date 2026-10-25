import type { Lang } from "../content/types.ts";
import { fiRatesSections } from "../content/fi.ts";
import {
  formatDate,
  formatDateRange,
  freeRanges,
  type ApartmentPrices,
  type Availability,
  type FreeRange,
  type Pricing,
} from "../lib/booking-api.ts";
import { fill, formatEuros } from "../lib/last-minute.ts";
import { Eyebrow, Section } from "./ui/Primitives.tsx";

/** The rates page strings for live prices; the same keys in both languages. */
export type LiveRatesStrings = Record<keyof (typeof fiRatesSections)["live"], string>;

const euros = (lang: Lang, amount: number) => formatEuros(lang, Math.round(amount * 100));

/** One price per cell when both apartments cost the same, else both. */
function priceCell(lang: Lang, s: LiveRatesStrings, a: ApartmentPrices, b: ApartmentPrices, key: keyof ApartmentPrices) {
  return a[key] === b[key] ? euros(lang, a[key]) : fill(s.apartmentPrices, { a: euros(lang, a[key]), b: euros(lang, b[key]) });
}

/**
 * Seasonal prices from the booking system, server-rendered so that search
 * engines and AI assistants read the same numbers as the calendar
 * (AGENT-VISIBILITY-PLAN.md step 4). Without data, a pointer to the calendar.
 */
export function SeasonPrices({ lang, s, pricing }: { lang: Lang; s: LiveRatesStrings; pricing: Pricing | null }) {
  const extras = pricing?.extras;
  const extraLines = extras
    ? [
        extras.cleaningPerApartment && fill(s.cleaning, { price: euros(lang, extras.cleaningPerApartment) }),
        extras.linenPerGuest && fill(s.linen, { price: euros(lang, extras.linenPerGuest) }),
        extras.bedsMadePerGuest && fill(s.bedsMade, { price: euros(lang, extras.bedsMadePerGuest) }),
        extras.conferenceRoomPerStay && fill(s.conferenceRoom, { price: euros(lang, extras.conferenceRoomPerStay) }),
        extras.maintenanceRoomPerStay && fill(s.maintenanceRoom, { price: euros(lang, extras.maintenanceRoomPerStay) }),
      ].filter((line): line is string => Boolean(line))
    : [];

  return (
    <Section tone="mist" id="prices" className="scroll-mt-20">
      <Eyebrow>{s.pricesLead}</Eyebrow>
      <h2 className="mt-3 text-h2 font-display text-ink">{s.pricesTitle}</h2>
      {pricing && (pricing.seasons.length > 0 || pricing.base) ? (
        <>
          <p className="mt-4 max-w-[68ch] text-body">{s.pricesIntro}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-body">
              <thead>
                <tr className="border-b border-frost text-sm text-slate">
                  <th scope="col" className="py-2 pr-4 font-semibold">{s.season}</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">{s.week}</th>
                  <th scope="col" className="py-2 font-semibold">{s.night}</th>
                </tr>
              </thead>
              <tbody>
                {pricing.seasons.map((season) => (
                  <tr key={`${season.firstNight}-${season.name}`} className="border-b border-frost/70 align-top">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      <span className="block font-semibold text-ink">{season.name}</span>
                      <span className="text-sm text-slate">{formatDateRange(lang, season.firstNight, season.lastNight)}</span>
                    </th>
                    <td className="py-3 pr-4">{priceCell(lang, s, season.a, season.b, "weekly")}</td>
                    <td className="py-3">{priceCell(lang, s, season.a, season.b, "nightly")}</td>
                  </tr>
                ))}
                {pricing.base ? (
                  <tr className="align-top">
                    <th scope="row" className="py-3 pr-4 font-semibold text-ink">{s.otherTimes}</th>
                    <td className="py-3 pr-4">{priceCell(lang, s, pricing.base.a, pricing.base.b, "weekly")}</td>
                    <td className="py-3">{priceCell(lang, s, pricing.base.a, pricing.base.b, "nightly")}</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          {pricing.lastMinute ? (
            <p className="mt-4 max-w-[68ch] rounded-[var(--radius-control)] border border-ember/40 bg-ember/10 p-3 text-body">
              {fill(s.lastMinute, { percent: pricing.lastMinute.percent, date: formatDate(lang, pricing.lastMinute.arrivalsUntil) })}
            </p>
          ) : null}
          {extraLines.length > 0 ? (
            <>
              <h3 className="mt-8 font-display text-h3 font-bold text-fjord-dark">{s.extrasTitle}</h3>
              <ul className="mt-3 space-y-1 text-body">
                {extraLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          ) : null}
          <p className="mt-4 text-sm text-slate">{fill(s.minNights, { nights: pricing.minNights })}</p>
        </>
      ) : (
        <p className="mt-4 max-w-[68ch] text-body">{s.pricesUnavailable}</p>
      )}
    </Section>
  );
}

function stayText(lang: Lang, s: LiveRatesStrings, range: FreeRange) {
  if (range.openEnded) return fill(s.openEnded, { date: formatDate(lang, range.checkIn) });
  return fill(s.stay, { range: formatDateRange(lang, range.checkIn, range.checkOut), nights: range.nights });
}

/** Free periods for the whole house and each apartment over the next six months. */
export function FreePeriods({
  lang,
  s,
  availability,
  minNights,
}: {
  lang: Lang;
  s: LiveRatesStrings;
  availability: Availability | null;
  minNights: number;
}) {
  const groups = availability
    ? ([
        [s.wholeHouse, freeRanges(availability.nights, "ab", minNights)],
        [fill(s.apartment, { apartment: "A" }), freeRanges(availability.nights, "a", minNights)],
        [fill(s.apartment, { apartment: "B" }), freeRanges(availability.nights, "b", minNights)],
      ] as const)
    : null;

  return (
    <Section tone="mist" id="free-dates" className="scroll-mt-20">
      <Eyebrow>{s.freeLead}</Eyebrow>
      <h2 className="mt-3 text-h2 font-display text-ink">{s.freeTitle}</h2>
      {groups ? (
        <>
          <p className="mt-4 max-w-[68ch] text-body">{s.freeIntro}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {groups.map(([title, ranges]) => (
              <div key={title} className="rounded-[var(--radius-card)] border border-frost bg-white p-5">
                <h3 className="font-display text-h3 font-bold text-fjord-dark">{title}</h3>
                {ranges.length > 0 ? (
                  <ul className="mt-3 space-y-1 text-body">
                    {ranges.map((range) => (
                      <li key={range.checkIn}>{stayText(lang, s, range)}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-body text-slate">{s.noFree}</p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-4 max-w-[68ch] text-body">{s.freeUnavailable}</p>
      )}
    </Section>
  );
}
