import { SiteShell } from "../../../../components/SiteShell.tsx";
import { HomeCarousel } from "../../../../components/HomeCarousel.tsx";
import { Hero, Section, Eyebrow, ButtonLink, FactStrip, SplitSection, ImageCard, CallToAction } from "../../../../components/ui/Primitives.tsx";
import { enHome, enHomeSections, enHomeCarousel, EN_UI } from "../../../../content/en.ts";
import { CAPACITY, EXTERNAL_LINKS, RENTAL_CONTACT } from "../../../../content/shared.ts";
import { getHref } from "../../../../lib/routes.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "en",
  key: "home",
  title: enHome.title,
  description: enHome.description,
  ogImage: OG_IMAGES.homeEn,
});

export default function EnglishHomePage() {
  const s = enHomeSections;
  const cta = (
    <>
      <ButtonLink href={getHref("en", "cabin")}>Explore the cabin</ButtonLink>
      <ButtonLink href={getHref("en", "contact")} variant="secondary">
        Get in touch
      </ButtonLink>
    </>
  );
  const heroCta = (
    <>
      <ButtonLink href={getHref("en", "cabin")}>Explore the cabin</ButtonLink>
      <ButtonLink href={getHref("en", "contact")} variant="light">
        Get in touch
      </ButtonLink>
    </>
  );

  return (
    <SiteShell lang="en" activeKey="home">
      <Hero
        image={{
          avif: "/hero/home-en.avif",
          webp: "/hero/home-en.webp",
          jpg: "/hero/home-en.jpg",
          width: 1600,
          height: 1067,
          alt: "Hiihtogreeni in winter by Levi fell and the lake",
        }}
        eyebrow="Levi, Lapland"
        title={enHome.h1}
        lead="A high-quality rental cabin next to the Levi pistes and golf course – up to 14 guests per apartment."
      >
        {heroCta}
      </Hero>

      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ImageCard
            href={getHref("en", "cabin")}
            image={{
              src: "/wp-content/uploads/2022/10/nosto_mokki.jpg",
              width: 450,
              height: 1900,
              alt: "Hiihtogreeni cabin",
            }}
            title="Cabin"
            description="Two 14-person apartments, private bathroom in every bedroom."
          />
          <ImageCard
            href={getHref("en", "teams")}
            image={{
              src: "/wp-content/uploads/2026/07/large_warm_ski_maintenance_facilities_for_alpine_skiing_teams.jpg",
              width: 1613,
              height: 907,
              alt: "Warm ski maintenance facilities for alpine skiing teams",
            }}
            title="For Teams"
            description="For ski teams: sleeps 28, own ski maintenance room and a briefing room."
          />
          <ImageCard
            href={getHref("en", "rates")}
            image={{
              src: "/wp-content/uploads/2022/10/nosto_hinnasto.jpg",
              width: 450,
              height: 1900,
              alt: "Rates",
            }}
            title="Rates"
            description="Seasonal accommodation and green-fee pricing and booking terms."
          />
          <ImageCard
            href={getHref("en", "gallery")}
            image={{
              src: "/wp-content/uploads/2022/10/nosto_vuokramokki-galleria.jpg",
              width: 450,
              height: 1900,
              alt: "Photo gallery",
            }}
            title="Photo Gallery"
            description="See the cabin, apartments, conference room, and surroundings."
          />
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Photos</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Hiihtogreeni in pictures</h2>
        <div className="mt-8">
          <HomeCarousel
            images={enHomeCarousel}
            label={EN_UI.carouselLabel}
            strings={{
              previous: EN_UI.galleryPrevious,
              next: EN_UI.galleryNext,
              slide: EN_UI.carouselSlide,
            }}
          />
        </div>
      </Section>

      <Section tone="mist">
        <SplitSection
          imageSide="right"
          image={{
            src: "/wp-content/uploads/2024/07/Levi-Majoitus-suuri-olohuone-Hiihtogreeni.jpg",
            width: 1250,
            height: 2160,
            alt: "Large living room with fell views",
          }}
        >
          <Eyebrow>{s.introLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">A cabin right by the pistes</h2>
          <p className="mt-4 text-body">{s.intro}</p>
          <p className="mt-4 text-body">{s.location}</p>
          <div className="mt-6">{cta}</div>
        </SplitSection>
      </Section>

      <Section>
        <Eyebrow>Accommodation facts</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Comfortable for larger groups too</h2>
        <div className="mt-8">
          <FactStrip
            facts={[
              { value: String(CAPACITY.apartments), label: "Apartments" },
              { value: `${CAPACITY.guestsPerApartment}`, label: "Guests / apartment" },
              { value: String(CAPACITY.bedrooms), label: "Bedrooms / Apartment" },
              { value: String(CAPACITY.bathrooms), label: "Bathrooms / Apartment" },
              { value: CAPACITY.area, label: "Area / apartment" },
            ]}
          />
        </div>
      </Section>

      <Section tone="mist">
        <SplitSection
          imageSide="left"
          image={{
            src: "/wp-content/uploads/2026/07/Hiihgreeni-levi-rental-cabin-for-large-groups.jpg",
            width: 1600,
            height: 900,
            alt: "Hiihtogreeni – a large rental cabin for groups in Levi",
          }}
        >
          <Eyebrow>{s.groupsLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">For groups, from corporate to friends</h2>
          <p className="mt-4 text-body">{s.groups}</p>
          <p className="mt-4 text-body">{s.groupsCta}</p>
          <p className="mt-4 text-body">
            {s.leviLink}:{" "}
            <a
              href={EXTERNAL_LINKS.leviEn}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-fjord-dark underline-offset-2 hover:underline"
            >
              levifinland.fi
            </a>
          </p>
        </SplitSection>
      </Section>

      <Section>
        <SplitSection
          imageSide="right"
          image={{
            src: "/wp-content/uploads/2026/07/levi_golf_green_fee.jpg",
            width: 1767,
            height: 1330,
            alt: "Levi Golf course in summer",
          }}
        >
          <Eyebrow>{s.golfLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">Levi Golf green fees</h2>
          <p className="mt-4 text-body">{s.golf}</p>
          <p className="mt-4 text-body">{s.golfAfter}</p>
          <div className="mt-6">
            <ButtonLink href={EXTERNAL_LINKS.greenFee} external>{s.golfCta}</ButtonLink>
          </div>
        </SplitSection>
      </Section>

      <Section tone="mist">
        <SplitSection
          imageSide="left"
          image={{
            src: "/wp-content/uploads/2026/07/golf_course_views_from_hiihtogreeni_terrace.jpg",
            width: 1632,
            height: 1229,
            alt: "Golf course view from the Hiihtogreeni terrace",
          }}
        >
          <Eyebrow>{s.viewsLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">Scenery</h2>
          <p className="mt-4 text-body">{s.views}</p>
          <p className="mt-4 text-body">{s.closing}</p>
        </SplitSection>
      </Section>

      <CallToAction
        eyebrow="Book a unique Lapland stay"
        title="Get in touch and ask about availability"
        body={`${CAPACITY.guestsPerApartment} guests per apartment. Rental: ${RENTAL_CONTACT.name}, ${RENTAL_CONTACT.phoneDisplay}.`}
      >
        <ButtonLink href={getHref("en", "contact")} variant="light">Contact information</ButtonLink>
        <ButtonLink href={`tel:${RENTAL_CONTACT.phone}`} variant="light">
          {RENTAL_CONTACT.phoneDisplay}
        </ButtonLink>
      </CallToAction>
    </SiteShell>
  );
}
