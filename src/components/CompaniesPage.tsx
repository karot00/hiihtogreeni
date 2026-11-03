import type { Lang } from "../content/types.ts";
import { enCompanies, enCompaniesSections } from "../content/en.ts";
import { fiCompanies, fiCompaniesSections } from "../content/fi.ts";
import { bookingTermsUrl } from "../content/shared.ts";
import { formatDate, formatDateRange, getPricing, getQuote, type Quote } from "../lib/booking-api.ts";
import { companiesFaq, companyExamples, todayInFinland, type CompanyExample } from "../lib/company-examples.ts";
import { fill, formatEuros } from "../lib/last-minute.ts";
import { getHref } from "../lib/routes.ts";
import { FaqJsonLd } from "./JsonLd.tsx";
import { SiteShell } from "./SiteShell.tsx";
import { ButtonLink, CallToAction, Eyebrow, Hero, Section, SplitSection } from "./ui/Primitives.tsx";

const SECTIONS = { fi: fiCompaniesSections, en: enCompaniesSections } as const;
const PAGES = { fi: fiCompanies, en: enCompanies } as const;

const euros = (lang: Lang, amount: number) => formatEuros(lang, Math.round(amount * 100));

function calendarHref(lang: Lang, stay: { checkIn: string; checkOut: string; units: string }) {
  const params = new URLSearchParams({ checkIn: stay.checkIn, checkOut: stay.checkOut, units: stay.units });
  return `${getHref(lang, "rates")}?${params}#booking-calendar`;
}

function PriceExample({ lang, example, quote }: { lang: Lang; example: CompanyExample; quote: Quote }) {
  const s = SECTIONS[lang];
  // Whole euros: "about" a per-person price, never cents.
  const perNight = Math.round(quote.totalEur / example.guests / quote.nights);
  return (
    <div className="flex flex-col rounded-[var(--radius-card)] border border-frost bg-white p-6">
      <h3 className="font-display text-h3 font-bold text-fjord-dark">{s.examples[example.key]}</h3>
      <p className="mt-1 text-sm text-slate">{formatDateRange(lang, quote.checkIn, quote.checkOut)}</p>
      <p className="mt-4 font-display text-3xl font-bold text-ink">{fill(s.total, { price: euros(lang, quote.totalEur) })}</p>
      <p className="mt-1 text-body">{fill(s.perPerson, { price: euros(lang, perNight) })}</p>
      <details className="mt-4 text-sm">
        <summary className="cursor-pointer font-semibold text-fjord-dark">{s.breakdown}</summary>
        <ul className="mt-2 space-y-1">
          {quote.lines.map((line, index) => (
            <li key={index} className="flex justify-between gap-4">
              <span>
                {s.lineLabels[line.item] ?? line.description}
                {/minimum/i.test(line.description) ? ` (${s.minimumCharge})` : ""}
                {line.quantity > 1 ? ` × ${line.quantity}` : ""}
              </span>
              <span className="whitespace-nowrap">{euros(lang, line.totalEur)}</span>
            </li>
          ))}
        </ul>
      </details>
      <a
        href={calendarHref(lang, example)}
        className="mt-auto pt-4 font-display text-sm font-semibold text-fjord-dark underline-offset-2 hover:underline focus-visible:underline"
      >
        {s.openCalendar}
      </a>
    </div>
  );
}

/**
 * The companies page in either language (docs/geo-ja-yritysnakyvyys-suunnitelma.md
 * phase 3). Price examples and the shortest stay come live from the booking
 * API; an example the API cannot price (booked, outside the booking window)
 * is left out, and without any the page points to the booking calendar.
 */
export async function CompaniesPage({ lang }: { lang: Lang }) {
  const s = SECTIONS[lang];
  const today = todayInFinland();
  const examples = companyExamples(today);
  const [pricing, ...quotes] = await Promise.all([getPricing(), ...examples.map((stay) => getQuote(lang, stay))]);
  const priced = examples.flatMap((example, i) => (quotes[i] ? [{ example, quote: quotes[i] }] : []));
  const faq = companiesFaq(lang, pricing);
  const calendar = `${getHref(lang, "rates")}#booking-calendar`;

  return (
    <SiteShell lang={lang} activeKey="companies">
      <FaqJsonLd items={faq} />

      <Hero
        image={{
          avif: "/hero/companies.avif",
          webp: "/hero/companies.webp",
          jpg: "/hero/companies.jpg",
          width: 1600,
          height: 900,
          alt: s.images.hero,
        }}
        eyebrow={s.heroEyebrow}
        title={PAGES[lang].h1}
        lead={s.heroLead}
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={calendar}>{s.heroCalendar}</ButtonLink>
          <ButtonLink href={getHref(lang, "contact")} variant="light">
            {s.heroContact}
          </ButtonLink>
        </div>
      </Hero>

      <Section>
        <Eyebrow>{s.factsLead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">{s.factsTitle}</h2>
        <dl className="mt-8 grid gap-x-8 gap-y-5 md:grid-cols-2">
          {s.facts.map((fact) => (
            <div key={fact.label} className="border-t border-frost pt-4">
              <dt className="font-display font-bold text-fjord-dark">{fact.label}</dt>
              <dd className="mt-1 text-body">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="mist">
        <Eyebrow>{s.useCasesLead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">{s.useCasesTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {s.useCases.map((uc) => (
            <div key={uc.title} className="rounded-[var(--radius-card)] border border-frost bg-white p-6">
              <h3 className="font-display text-h3 font-bold text-fjord-dark">{uc.title}</h3>
              <p className="mt-2 text-body">{uc.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SplitSection
          imageSide="right"
          image={{ src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-7.jpg", width: 800, height: 533, alt: s.images.bedroom }}
        >
          <Eyebrow>{s.configsLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">{s.configsTitle}</h2>
          <ol className="mt-6 space-y-5">
            {s.configs.map((config, index) => (
              <li key={config.title} className="flex gap-4">
                <span aria-hidden="true" className="w-6 shrink-0 font-display text-2xl font-bold text-ember">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-h3 font-bold text-fjord-dark">{config.title}</h3>
                  <p className="mt-1 text-body">{config.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </SplitSection>
      </Section>

      <Section tone="mist" id="prices" className="scroll-mt-20">
        <Eyebrow>{s.pricesLead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">{s.pricesTitle}</h2>
        {priced.length > 0 ? (
          <>
            <p className="mt-4 max-w-[68ch] text-body">{fill(s.pricesIntro, { date: formatDate(lang, today) })}</p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {priced.map(({ example, quote }) => (
                <PriceExample key={example.key} lang={lang} example={example} quote={quote} />
              ))}
            </div>
          </>
        ) : (
          <p className="mt-4 max-w-[68ch] text-body">{s.pricesUnavailable}</p>
        )}
      </Section>

      <Section>
        <Eyebrow>{s.programLead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">{s.programTitle}</h2>
        <p className="mt-4 max-w-[68ch] text-body">{s.programIntro}</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {s.programs.map((program) => (
            <div key={program.season} className="rounded-[var(--radius-card)] border border-frost bg-white p-6">
              <h3 className="font-display text-h3 font-bold text-fjord-dark">{program.season}</h3>
              <dl className="mt-4 space-y-3">
                {program.days.map((day) => (
                  <div key={day.when}>
                    <dt className="text-sm font-semibold text-slate">{day.when}</dt>
                    <dd className="text-body">{day.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SplitSection
          imageSide="left"
          image={{
            src: "/wp-content/uploads/2026/10/hiihtogreeni-levi-cabin-large-groups-livingroom.jpg",
            width: 1920,
            height: 1080,
            alt: s.images.living,
          }}
        >
          <Eyebrow>{s.practicalLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">{s.practicalTitle}</h2>
          <dl className="mt-6 space-y-4">
            {s.practical.map((item) => (
              <div key={item.title}>
                <dt className="font-display font-bold text-fjord-dark">{item.title}</dt>
                <dd className="mt-1 text-body">{item.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6">
            <a
              href={bookingTermsUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-fjord px-4 font-display text-sm font-semibold text-fjord-dark transition-colors hover:bg-fjord/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord"
            >
              {s.termsLink}
            </a>
          </p>
        </SplitSection>
      </Section>

      <Section tone="white">
        <Eyebrow>{s.faqLead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">{s.faqTitle}</h2>
        <dl className="mt-8 space-y-6">
          {faq.map((item) => (
            <div key={item.q}>
              <dt className="font-display text-h3 font-bold text-fjord-dark">{item.q}</dt>
              <dd className="mt-2 max-w-[68ch] text-body">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CallToAction eyebrow={s.ctaEyebrow} title={s.ctaTitle} body={s.ctaBody}>
        <ButtonLink href={calendar} variant="light">
          {s.heroCalendar}
        </ButtonLink>
        <ButtonLink href={getHref(lang, "contact")} variant="light">
          {s.heroContact}
        </ButtonLink>
      </CallToAction>
    </SiteShell>
  );
}
