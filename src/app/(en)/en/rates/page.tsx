import { SiteShell } from "../../../../components/SiteShell.tsx";
import { FaqJsonLd } from "../../../../components/JsonLd.tsx";
import { BookingCalendar } from "../../../../components/BookingCalendar.tsx";
import { FreePeriods, SeasonPrices } from "../../../../components/LiveRates.tsx";
import { getAvailability, getPricing, priceRange } from "../../../../lib/booking-api.ts";
import { SITE_CONFIG } from "../../../../lib/config.ts";
import { Hero, Section, Eyebrow, ButtonLink, SplitSection, CallToAction } from "../../../../components/ui/Primitives.tsx";
import { enRates, enRatesSections } from "../../../../content/en.ts";
import { EXTERNAL_LINKS, CAPACITY, RENTAL_CONTACT, bookingTermsUrl } from "../../../../content/shared.ts";
import { getHref } from "../../../../lib/routes.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "en",
  key: "rates",
  title: enRates.title,
  description: enRates.description,
  ogImage: OG_IMAGES.default,
});

// Prices and free dates come from the booking API (src/lib/booking-api.ts),
// so the page is rebuilt every 15 minutes like the API's CDN cache.
export const revalidate = 900;

export default async function RatesPage() {
  const s = enRatesSections;
  const [pricing, availability] = await Promise.all([getPricing(), getAvailability()]);
  const range = pricing ? priceRange(pricing) : null;
  const offer = range ? { ...range, url: `${SITE_CONFIG.url}${getHref("en", "rates")}` } : undefined;

  return (
    <SiteShell lang="en" activeKey="rates" offer={offer}>
      <FaqJsonLd items={s.faq} />
      <Hero
        image={{
          avif: "/hero/rates.avif",
          webp: "/hero/rates.webp",
          jpg: "/hero/rates.jpg",
          width: 1600,
          height: 1067,
          alt: "Hiihtogreeni cabin in Levi",
        }}
        eyebrow="Levi, Lapland"
        title={enRates.h1}
        lead="Seasonal accommodation and green-fee pricing, plus booking terms."
      />

      <Section>
        <Eyebrow>{s.lead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Accommodation with two apartments</h2>
        <p className="mt-4 max-w-[68ch] text-body">{s.capacityNote}</p>
        <p className="mt-4 max-w-[68ch] text-body">{s.meetingNote}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <ButtonLink href={getHref("en", "contact")}>{s.askLead}</ButtonLink>
          <span className="inline-flex min-h-11 items-center text-sm text-slate">{s.askNote}</span>
        </div>
      </Section>

      <SeasonPrices lang="en" s={s.live} pricing={pricing} />

      <Section tone="white" id="booking-calendar" className="scroll-mt-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] lg:items-start">
          <div>
            <Eyebrow>{s.calendarLead}</Eyebrow>
            <h2 className="mt-3 text-h2 font-display text-ink">{s.calendarTitle}</h2>
            <p className="mt-4 max-w-[60ch] text-body">{s.calendarBody}</p>
          </div>
          <BookingCalendar lang="en" strings={s.calendar} />
        </div>
      </Section>

      <FreePeriods lang="en" s={s.live} availability={availability} minNights={pricing?.minNights ?? 1} />

      <Section>
        <Eyebrow>Booking terms</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">What is included and payment terms</h2>
        <ul className="mt-6 grid gap-3 text-body md:grid-cols-2">
          {s.terms.map((term, index) => (
            <li key={index} className="flex gap-3 rounded-[var(--radius-control)] border border-frost bg-white p-4">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
              <span>{term}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate">{s.termsNote}</p>
        <p className="mt-4">
          <a
            href={bookingTermsUrl("en")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-fjord px-4 font-display text-sm font-semibold text-fjord-dark transition-colors hover:bg-fjord/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord"
          >
            {s.termsLink}
          </a>
        </p>
      </Section>

      <Section tone="white">
        <Eyebrow>{s.faqLead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">{s.faqTitle}</h2>
        <dl className="mt-8 space-y-6">
          {s.faq.map((item) => (
            <div key={item.q}>
              <dt className="font-display text-h3 font-bold text-fjord-dark">{item.q}</dt>
              <dd className="mt-2 max-w-[68ch] text-body">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="mist">
        <SplitSection
          imageSide="right"
          image={{
            src: "/wp-content/uploads/2026/07/osta_green_fee_levi_golfiin.jpg",
            width: 1632,
            height: 1229,
            alt: "Buy green fees for Levi Golf",
          }}
        >
          <Eyebrow>{s.greenFeeLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">Levi Golf green fees</h2>
          <p className="mt-4 max-w-[68ch] text-body">{s.greenFee}</p>
          <div className="mt-6">
            <ButtonLink href={EXTERNAL_LINKS.greenFee} external>
              {s.greenFeeCta}
            </ButtonLink>
          </div>
        </SplitSection>
      </Section>

      <CallToAction
        eyebrow={`Up to ${CAPACITY.guestsPerApartment} guests / apartment`}
        title="Ask about availability and a quote"
        body={`Rental: ${RENTAL_CONTACT.name}, ${RENTAL_CONTACT.phoneDisplay}.`}
      >
        <ButtonLink href={getHref("en", "contact")} variant="light">Get in touch</ButtonLink>
        <ButtonLink href={`tel:${RENTAL_CONTACT.phone}`} variant="light">
          {RENTAL_CONTACT.phoneDisplay}
        </ButtonLink>
      </CallToAction>
    </SiteShell>
  );
}
