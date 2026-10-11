import { SiteShell } from "../../../components/SiteShell.tsx";
import { BookingCalendar } from "../../../components/BookingCalendar.tsx";
import { Hero, Section, Eyebrow, ButtonLink, SplitSection, CallToAction } from "../../../components/ui/Primitives.tsx";
import { fiRates, fiRatesSections } from "../../../content/fi.ts";
import { EXTERNAL_LINKS, CAPACITY, RENTAL_CONTACT, bookingTermsUrl } from "../../../content/shared.ts";
import { getHref } from "../../../lib/routes.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "fi",
  key: "rates",
  title: fiRates.title,
  description: fiRates.description,
  ogImage: OG_IMAGES.default,
});

export default function RatesPage() {
  const s = fiRatesSections;

  return (
    <SiteShell lang="fi" activeKey="rates">
      <Hero
        image={{
          avif: "/hero/rates.avif",
          webp: "/hero/rates.webp",
          jpg: "/hero/rates.jpg",
          width: 1600,
          height: 1067,
          alt: "Hiihtogreeni-mökki Levillä",
        }}
        eyebrow="Levi, Lappi"
        title={fiRates.h1}
        lead="Kausikohtaiset majoitus- ja green fee -hinnat sekä varausehdot."
      />

      <Section>
        <Eyebrow>{s.lead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Majoitus kahdella huoneistolla</h2>
        <p className="mt-4 max-w-[68ch] text-body">{s.capacityNote}</p>
        <p className="mt-4 max-w-[68ch] text-body">{s.meetingNote}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <ButtonLink href={getHref("fi", "contact")}>{s.askLead}</ButtonLink>
          <span className="inline-flex min-h-11 items-center text-sm text-slate">{s.askNote}</span>
        </div>
      </Section>

      <Section tone="white" id="booking-calendar" className="scroll-mt-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] lg:items-start">
          <div>
            <Eyebrow>{s.calendarLead}</Eyebrow>
            <h2 className="mt-3 text-h2 font-display text-ink">{s.calendarTitle}</h2>
            <p className="mt-4 max-w-[60ch] text-body">{s.calendarBody}</p>
          </div>
          <BookingCalendar lang="fi" strings={s.calendar} />
        </div>
      </Section>

      <Section>
        <Eyebrow>Varausehdot</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Hintaan sisältyy ja maksuehdot</h2>
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
            href={bookingTermsUrl("fi")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-fjord px-4 font-display text-sm font-semibold text-fjord-dark transition-colors hover:bg-fjord/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord"
          >
            {s.termsLink}
          </a>
        </p>
      </Section>

      <Section tone="mist">
        <SplitSection
          imageSide="right"
          image={{
            src: "/wp-content/uploads/2026/07/osta_green_fee_levi_golfiin.jpg",
            width: 1632,
            height: 1229,
            alt: "Osta green fee Levi Golfiin",
          }}
        >
          <Eyebrow>{s.greenFeeLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">Levi Golf -green fee</h2>
          <p className="mt-4 max-w-[68ch] text-body">{s.greenFee}</p>
          <div className="mt-6">
            <ButtonLink href={EXTERNAL_LINKS.greenFee} external>
              {s.greenFeeCta}
            </ButtonLink>
          </div>
        </SplitSection>
      </Section>

      <CallToAction
        eyebrow={`Jopa ${CAPACITY.guestsPerApartment} vierasta / huoneisto`}
        title="Kysy saatavuutta ja tarjousta"
        body={`Vuokraus: ${RENTAL_CONTACT.name}, ${RENTAL_CONTACT.phoneDisplay}.`}
      >
        <ButtonLink href={getHref("fi", "contact")} variant="light">Ota yhteyttä</ButtonLink>
        <ButtonLink href={`tel:${RENTAL_CONTACT.phone}`} variant="light">
          {RENTAL_CONTACT.phoneDisplay}
        </ButtonLink>
      </CallToAction>
    </SiteShell>
  );
}
