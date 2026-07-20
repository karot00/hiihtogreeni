import { SiteShell } from "../../../components/SiteShell.tsx";
import { Hero, Section, Eyebrow, ButtonLink, CallToAction } from "../../../components/ui/Primitives.tsx";
import { fiRates, fiRatesSections } from "../../../content/fi.ts";
import { RATES_PDF, EXTERNAL_LINKS, CAPACITY, RENTAL_CONTACT } from "../../../content/shared.ts";
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
          src: "/wp-content/uploads/2022/10/nosto_hinnasto.jpg",
          width: 450,
          height: 1900,
          alt: "Hiihtogreenin hinnoittelu",
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

      <Section tone="mist">
        <Eyebrow>Kaudet</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Kausikohtaiset hinnat</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {s.seasons.map((season, index) => (
            <div key={index} className="rounded-[var(--radius-card)] border border-frost bg-white p-6">
              <h3 className="font-display text-h3 font-bold text-fjord-dark">{season.title}</h3>
              <p className="mt-1 text-sm text-slate">{season.note}</p>
              <dl className="mt-4 space-y-2 text-body">
                <div>
                  <dt className="text-sm font-semibold text-ink">Viikot</dt>
                  <dd className="text-slate">{season.weeks}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-ink">Vaihtopäivä</dt>
                  <dd className="text-slate">{season.changeover}</dd>
                </div>
                {season.holiday ? (
                  <div>
                    <dt className="text-sm font-semibold text-ink">Juhlapyhät</dt>
                    <dd className="text-slate">{season.holiday}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          ))}
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
            href={RATES_PDF.href}
            className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-fjord px-4 font-display text-sm font-semibold text-fjord-dark transition-colors hover:bg-fjord/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord"
          >
            Lataa varausehdot (PDF)
          </a>
        </p>
      </Section>

      <Section tone="mist">
        <Eyebrow>{s.greenFeeLead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Levi Golf -green fee</h2>
        <p className="mt-4 max-w-[68ch] text-body">{s.greenFee}</p>
        <div className="mt-6">
          <ButtonLink href={getHref("fi", "contact")} external={false}>
            {s.greenFeeCta}
          </ButtonLink>
        </div>
        <p className="mt-4 text-sm text-slate">
          Green fee -varaus:{" "}
          <a
            href={EXTERNAL_LINKS.greenFee}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-fjord-dark underline-offset-2 hover:underline"
          >
            greenfee.levifinland.fi
          </a>
        </p>
      </Section>

      <CallToAction
        eyebrow={`Jopa ${CAPACITY.guestsPerApartment} vierasta / huoneisto`}
        title="Kysy saatavuutta ja tarjousta"
        body={`Vuokraus: ${RENTAL_CONTACT.name}, ${RENTAL_CONTACT.phoneDisplay}.`}
      >
        <ButtonLink href={getHref("fi", "contact")}>Ota yhteyttä</ButtonLink>
        <ButtonLink href={`tel:${RENTAL_CONTACT.phone}`} variant="secondary">
          {RENTAL_CONTACT.phoneDisplay}
        </ButtonLink>
      </CallToAction>
    </SiteShell>
  );
}
