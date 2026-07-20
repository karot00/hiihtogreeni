import { SiteShell } from "../../../../components/SiteShell.tsx";
import { Hero, Section, Eyebrow, ButtonLink, CallToAction } from "../../../../components/ui/Primitives.tsx";
import { enRates, enRatesSections } from "../../../../content/en.ts";
import { EXTERNAL_LINKS, CAPACITY, RENTAL_CONTACT } from "../../../../content/shared.ts";
import { getHref } from "../../../../lib/routes.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "en",
  key: "rates",
  title: enRates.title,
  description: enRates.description,
  ogImage: OG_IMAGES.default,
});

export default function RatesPage() {
  const s = enRatesSections;

  return (
    <SiteShell lang="en" activeKey="rates">
      <Hero
        image={{
          src: "/wp-content/uploads/2022/10/nosto_hinnasto.jpg",
          width: 450,
          height: 1900,
          alt: "Hiihtogreeni rates",
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

      <Section tone="mist">
        <Eyebrow>Seasons</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Seasonal rates</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {s.seasons.map((season, index) => (
            <div key={index} className="rounded-[var(--radius-card)] border border-frost bg-white p-6">
              <h3 className="font-display text-h3 font-bold text-fjord-dark">{season.title}</h3>
              <p className="mt-1 text-sm text-slate">{season.note}</p>
              <dl className="mt-4 space-y-2 text-body">
                <div>
                  <dt className="text-sm font-semibold text-ink">Weeks</dt>
                  <dd className="text-slate">{season.weeks}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-ink">Changeover</dt>
                  <dd className="text-slate">{season.changeover}</dd>
                </div>
                {season.holiday ? (
                  <div>
                    <dt className="text-sm font-semibold text-ink">Public holidays</dt>
                    <dd className="text-slate">{season.holiday}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          ))}
        </div>
      </Section>

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
      </Section>

      <Section tone="mist">
        <Eyebrow>{s.greenFeeLead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Levi Golf green fees</h2>
        <p className="mt-4 max-w-[68ch] text-body">{s.greenFee}</p>
        <div className="mt-6">
          <ButtonLink href={EXTERNAL_LINKS.greenFee} external>
            {s.greenFeeCta}
          </ButtonLink>
        </div>
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
