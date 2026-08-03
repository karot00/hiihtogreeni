import { SiteShell } from "../../../../components/SiteShell.tsx";
import { Hero, Section, Eyebrow, ButtonLink, FactStrip, SplitSection, CallToAction } from "../../../../components/ui/Primitives.tsx";
import { enTeams, enTeamsSections } from "../../../../content/en.ts";
import { getHref } from "../../../../lib/routes.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../../lib/seo.ts";
import { FaqJsonLd } from "../../../../components/JsonLd.tsx";

export const metadata = buildPageMetadata({
  lang: "en",
  key: "teams",
  title: enTeams.title,
  description: enTeams.description,
  ogImage: OG_IMAGES.default,
});

const MAINTENANCE_GRID = [
  {
    src: "/wp-content/uploads/2026/07/sport_equipment_maintenance_room_levi_hiihtogreeni.jpg",
    alt: "Sports equipment maintenance room at Levi Hiihtogreeni",
  },
  {
    src: "/wp-content/uploads/2026/07/good_facilities_for_ski_maintenance_levi.jpg",
    alt: "Good facilities for ski maintenance in Levi",
  },
  {
    src: "/wp-content/uploads/2026/07/large_warm_ski_maintenance_facilities_for_alpine_skiing_teams.jpg",
    alt: "Large warm ski maintenance facilities for alpine skiing teams",
  },
  {
    src: "/wp-content/uploads/2026/07/levi_hiihtogreeni_ski_maintenance_room.jpg",
    alt: "Levi Hiihtogreeni ski maintenance room",
  },
  {
    src: "/wp-content/uploads/2026/07/ski_maintenance_room_hiihtogreeni.jpg",
    alt: "Ski maintenance room at Hiihtogreeni",
  },
] as const;

const EXTERIOR = [
  {
    src: "/wp-content/uploads/2026/07/rental_cabin_for_large_groups_levi_golf_course.jpg",
    width: 1440,
    height: 810,
    alt: "Rental cabin for large groups by the Levi golf course",
  },
  {
    src: "/wp-content/uploads/2022/10/Hiihtogreeni-1.jpg",
    width: 1024,
    height: 681,
    alt: "Hiihtogreeni exterior",
  },
] as const;

export default function TeamsPage() {
  const s = enTeamsSections;
  const cta = (
    <>
      <ButtonLink href={getHref("en", "contact")} variant="light">
        Get in touch
      </ButtonLink>
      <ButtonLink href={getHref("en", "rates")} variant="light">
        See rates
      </ButtonLink>
    </>
  );

  return (
    <SiteShell lang="en" activeKey="teams">
      <FaqJsonLd items={s.faq} />

      <Hero
        image={{
          avif: "/hero/teams.avif",
          webp: "/hero/teams.webp",
          jpg: "/hero/teams.jpg",
          width: 1600,
          height: 900,
          alt: "Hiihtogreeni in winter in Levi – accommodation for teams",
        }}
        eyebrow="Levi, Lapland — for teams"
        title={enTeams.h1}
        lead={s.heroLead}
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={getHref("en", "contact")}>Ask about availability</ButtonLink>
          <ButtonLink href={getHref("en", "rates")} variant="light">
            See rates
          </ButtonLink>
        </div>
      </Hero>

      <Section>
        <SplitSection
          imageSide="right"
          image={{
            src: "/wp-content/uploads/2026/07/levi_hiihtogreeni_best_accommodation_for_teams.jpg",
            width: 1966,
            height: 2458,
            alt: "Levi slopes and chairlift – best accommodation for teams in Levi",
          }}
        >
          <Eyebrow>{s.introLead}</Eyebrow>
          <h2 className="mt-3 max-w-[24ch] text-h2 font-display text-ink">
            A cabin for ski teams and sports groups
          </h2>
          <p className="mt-4 text-body">{s.intro}</p>
          {s.introParagraphs.map((p, idx) => (
            <p key={idx} className="mt-4 text-body">{p}</p>
          ))}
        </SplitSection>
      </Section>

      <Section tone="mist">
        <Eyebrow>{s.useCasesLead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">{s.useCasesTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {s.useCases.map((uc) => (
            <div key={uc.title} className="rounded-[var(--radius-card)] border border-frost bg-white p-6">
              <h3 className="font-display text-h3 font-bold text-fjord-dark">{uc.title}</h3>
              <p className="mt-2 text-body">{uc.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>{s.whyLead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">{s.whyTitle}</h2>
        <ul className="mt-8 max-w-[68ch] space-y-2 text-body">
          {s.why.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist">
        <Eyebrow>{s.capacityLead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">{s.capacityTitle}</h2>
        <div className="mt-8">
          <FactStrip
            facts={[
              { value: "14", label: "Guests / apartment" },
              { value: "28", label: "Guests in the whole cabin" },
              { value: "7", label: "Bedrooms / apartment" },
              { value: "7", label: "Ensuite bathrooms / apartment" },
              { value: "20", label: "Seats in the conference room" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SplitSection
          imageSide="right"
          image={{
            src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-7.jpg",
            width: 800,
            height: 533,
            alt: "Spacious room with ensuite bathroom",
          }}
        >
          <Eyebrow>{s.splitRoomsLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">{s.splitRoomsTitle}</h2>
          <p className="mt-4 text-body">{s.splitRooms}</p>
        </SplitSection>
      </Section>

      <Section tone="mist">
        <SplitSection
          imageSide="left"
          image={{
            src: "/wp-content/uploads/2024/07/Mokki-Levi-Hiihtogreeni-neuvottelutila.jpg",
            width: 2160,
            height: 1216,
            alt: "Conference room for 20 people",
          }}
        >
          <Eyebrow>{s.splitMeetingLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">{s.splitMeetingTitle}</h2>
          <p className="mt-4 text-body">{s.splitMeeting}</p>
        </SplitSection>
      </Section>

      <Section>
        <SplitSection
          imageSide="right"
          image={{
            src: "/wp-content/uploads/2026/07/excellent_ski_maintenance_room_levi_hiihtogreeni.jpg",
            width: 1613,
            height: 907,
            alt: "Excellent ski maintenance room at Levi Hiihtogreeni",
          }}
        >
          <Eyebrow>{s.maintenanceLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">{s.maintenanceTitle}</h2>
          <p className="mt-4 text-body">{s.maintenance}</p>
        </SplitSection>
        <h3 className="mt-12 font-display text-h3 font-bold text-fjord-dark">
          {s.maintenanceGridTitle}
        </h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MAINTENANCE_GRID.map((img) => (
            <img
              key={img.src}
              src={img.src}
              width={1613}
              height={907}
              alt={img.alt}
              loading="lazy"
              className="w-full rounded-[var(--radius-card)] border border-frost object-cover"
            />
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SplitSection
          imageSide="left"
          image={{
            src: "/wp-content/uploads/2025/07/Points-of-interest-Hiihtogreeni-winter.jpg",
            width: 1024,
            height: 681,
            alt: "Winter map of points of interest around Hiihtogreeni",
          }}
        >
          <Eyebrow>{s.locationLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">{s.locationTitle}</h2>
          <p className="mt-4 text-body">{s.location}</p>
        </SplitSection>
      </Section>

      <Section>
        <SplitSection
          imageSide="right"
          image={{
            src: "/wp-content/uploads/2026/07/northern_lights_levi_hiihtogreeni.jpg",
            width: 1814,
            height: 1021,
            alt: "Northern lights above Hiihtogreeni in Levi",
          }}
        >
          <Eyebrow>{s.privacyLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">{s.privacyTitle}</h2>
          <p className="mt-4 text-body">{s.privacy}</p>
        </SplitSection>
      </Section>

      <Section tone="mist">
        <Eyebrow>{s.exteriorLead}</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">{s.exteriorTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {EXTERIOR.map((img) => (
            <img
              key={img.src}
              src={img.src}
              width={img.width}
              height={img.height}
              alt={img.alt}
              loading="lazy"
              className="aspect-[16/9] w-full rounded-[var(--radius-card)] border border-frost object-cover"
            />
          ))}
        </div>
      </Section>

      <Section tone="mist">
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

      <CallToAction eyebrow={s.ctaEyebrow} title={s.ctaTitle}>
        {cta}
      </CallToAction>
    </SiteShell>
  );
}
